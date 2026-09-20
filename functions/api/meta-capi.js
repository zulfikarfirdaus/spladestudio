// Meta Conversions API relay.
//
// The browser pixel loses roughly 15-30% of events to iOS ATT, ad blockers
// and Safari's ITP. This sends the same conversions server-side, where none
// of that applies, and Meta merges the two by event_id.
//
// It runs as a Cloudflare Pages Function, so it is the site's own origin —
// the visitor's email and phone reach Meta only as SHA-256 digests, computed
// here. That is the whole reason this is server-side rather than in the page.

const PIXEL_ID = '2200164477221630'

// Probed against the live Graph API: v26.0 is the newest it accepts, v27.0+
// return "Unknown path components". Pinned rather than floating, because an
// unpinned version silently changes behaviour under you.
const API_VERSION = 'v26.0'

// Only these may post here. Not an authorization boundary — anyone can forge
// a request with curl — but it costs nothing and turns away casual noise. The
// real exposure is someone poisoning this account's own conversion data,
// which is unrewarding enough that nobody bothers.
const ALLOWED_ORIGINS = ['https://spladestudio.com', 'https://www.spladestudio.com']

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

async function sha256(value) {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

// Meta's rule: trim, lowercase, then SHA-256.
export async function hashEmail(email) {
  const normalized = String(email).trim().toLowerCase()
  return normalized ? sha256(normalized) : null
}

// Meta's rule: digits only, no leading zeros, and a country code is required.
//
// The country code is the part visitors get wrong. An Australian types
// "0412 345 678" and a literal reading of the rule strips the zero to leave
// "412345678", which hashes to something Meta can never match. So the market
// supplies the missing code: a number that already starts with it is left
// alone, anything else gets it prepended. A number typed with a leading +
// is trusted as already international.
const DIALLING_CODE = { 'AU landing': '61', 'ID landing': '62' }

export async function hashPhone(phone, market) {
  const raw = String(phone).trim()
  if (!raw) return null

  const digits = raw.replace(/\D/g, '')
  if (!digits) return null

  const code = DIALLING_CODE[market]
  let normalized

  if (raw.startsWith('+')) {
    normalized = digits // already international, take it as given
  } else if (code) {
    const local = digits.replace(/^0+/, '')
    normalized = local.startsWith(code) ? local : code + local
  } else {
    // Main site, no country to infer from. Better to send an imperfect hash
    // than none: a miss costs nothing, a match is a match.
    normalized = digits.replace(/^0+/, '')
  }

  return normalized ? sha256(normalized) : null
}

function readCookie(header, name) {
  const match = (header || '').match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get('Origin')
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return json(403, { error: 'forbidden' })

  // No token configured means the relay is simply off — same blank-to-disable
  // switch the pixel and GA use. The page must not care either way.
  const token = env.META_CAPI_TOKEN
  if (!token) return json(200, { skipped: 'no token configured' })

  let body
  try {
    body = await request.json()
  } catch {
    return json(400, { error: 'invalid json' })
  }

  const { eventName, eventId, eventSourceUrl, market, service, value, currency, email, phone } = body
  if (!eventName || !eventId) return json(400, { error: 'eventName and eventId are required' })

  const cookies = request.headers.get('Cookie')
  const user_data = {
    // Never hashed, per Meta: these are already opaque identifiers.
    client_ip_address: request.headers.get('CF-Connecting-IP') || undefined,
    client_user_agent: request.headers.get('User-Agent') || undefined,
    fbp: readCookie(cookies, '_fbp') || undefined,
    fbc: readCookie(cookies, '_fbc') || undefined,
  }

  if (email) user_data.em = [await hashEmail(email)].filter(Boolean)
  if (phone) {
    const hashed = await hashPhone(phone, market)
    if (hashed) user_data.ph = [hashed]
  }

  const event = {
    event_name: eventName,
    // Seconds, not milliseconds — Meta rejects the event outright otherwise.
    event_time: Math.floor(Date.now() / 1000),
    // Must match the browser event's eventID for Meta to merge the pair
    // rather than count it twice. The window is 48 hours.
    event_id: eventId,
    action_source: 'website',
    event_source_url: eventSourceUrl || undefined,
    user_data,
    custom_data: {
      content_category: market || undefined,
      content_name: service || undefined,
      value: typeof value === 'number' ? value : undefined,
      currency: currency || undefined,
    },
  }

  const payload = { data: [event] }
  // Set META_CAPI_TEST_CODE while verifying in Events Manager > Test Events,
  // then remove it: events carrying a test code stay out of reporting.
  if (env.META_CAPI_TEST_CODE) payload.test_event_code = env.META_CAPI_TEST_CODE

  const res = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
    { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) },
  )

  const result = await res.json().catch(() => ({}))
  // The page fires this and forgets, so a failure here is invisible to the
  // visitor by design. Status is returned for curl-based debugging only.
  return json(res.ok ? 200 : 502, result)
}
