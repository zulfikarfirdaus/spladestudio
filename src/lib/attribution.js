// Ad clicks land with campaign params in the URL, but the visitor who actually
// converts usually does so on a later page — often a later day — by which point
// the URL is clean. Formspree only ever sees what the form posts, so without
// this every enquiry arrives in the inbox with no way back to the ad that paid
// for it: Meta claims the conversion and there is nothing to check it against.
//
// localStorage rather than sessionStorage on purpose. The sales cycle here is
// days, not minutes; someone who clicks an ad on Monday and sends the brief on
// Thursday should still be credited to that ad.

const STORAGE_KEY = 'splade_attribution'

// 90 days, matching the lifetime Meta gives its own _fbc click cookie. Past
// that the claim is too old to be worth much, and a stale campaign name in the
// inbox is worse than none — it reads as fact.
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

// gclid and ttclid cost nothing to capture and mean the record already works if
// the spend ever moves off Meta.
const CLICK_ID_KEYS = ['fbclid', 'gclid', 'ttclid']

const CAMPAIGN_KEYS = [...UTM_KEYS, ...CLICK_ID_KEYS]

// Every storage call is wrapped: Safari private mode throws on write, and an
// analytics nicety must never be the thing that breaks a contact form.
function read() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function write(record) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Storage unavailable or full — the form still submits, just unattributed.
  }
}

function isFresh(record) {
  if (!record?.captured_at) return false
  return Date.now() - Date.parse(record.captured_at) < MAX_AGE_MS
}

/**
 * Record where this visit came from. Safe to call on every route change.
 *
 * Two rules, in order:
 *   1. A URL carrying campaign params always wins — last paid touch overwrites,
 *      because that is the click the current campaign is being judged on.
 *   2. Otherwise, only fill an empty slot, storing the referrer as a first-touch
 *      fallback. An internal navigation must not overwrite Monday's ad click
 *      with today's blank visit.
 */
export function captureAttribution(search, pathname) {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(search || '')
  const campaign = {}
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key)
    if (value) campaign[key] = value
  }

  const existing = read()
  const hasCampaign = Object.keys(campaign).length > 0
  if (!hasCampaign && isFresh(existing)) return

  // document.referrer is empty on internal navigation, which is what we want:
  // it should describe how the visitor entered the site, not the last click.
  const referrer = document.referrer || ''

  write({
    ...campaign,
    landing_page: pathname || window.location.pathname,
    referrer: referrer && !referrer.startsWith(window.location.origin) ? referrer : '',
    captured_at: new Date().toISOString(),
  })
}

/**
 * Attribution fields for a form payload, flat so they stay readable as rows in
 * a Formspree notification email rather than one nested blob.
 * Returns {} when there is nothing known — no empty keys, no noise in the inbox.
 */
export function readAttribution() {
  const record = read()
  if (!isFresh(record)) return {}

  const out = {}
  for (const [key, value] of Object.entries(record)) {
    if (value) out[key] = value
  }
  return out
}
