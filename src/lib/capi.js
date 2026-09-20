import { hasConsent } from './consent'

// Client half of the Conversions API relay. The server half lives in
// functions/api/meta-capi.js and is what actually talks to Meta.
//
// Server-side tracking is still tracking, so this is gated on consent exactly
// like the pixel. Sending conversions from a Worker after someone declined
// would route around the banner rather than honour it.

const ENDPOINT = '/api/meta-capi'

export function newEventId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  // Older Safari. Collisions only matter within Meta's 48h dedup window, and
  // this is plenty for that.
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

/**
 * Mirror a conversion to the server relay. Fire-and-forget by design: the
 * visitor is mid-conversion, and measurement must never delay or break a
 * form submission or a tap through to WhatsApp.
 *
 * keepalive matters on the WhatsApp path — that click navigates away, and
 * without it the browser cancels the request in flight.
 */
export function sendCapi(payload) {
  if (typeof window === 'undefined' || !hasConsent()) return

  try {
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...payload, eventSourceUrl: window.location.href }),
      keepalive: true,
    }).catch(() => {})
  } catch {
    // Never let measurement surface as an error to someone converting.
  }
}
