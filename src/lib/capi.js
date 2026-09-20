import { hasConsent } from './consent'
import { gaEvent } from './ga'

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
    })
      .then((res) => { if (!res.ok) reportFailure(payload.eventName, res.status) })
      .catch(() => reportFailure(payload.eventName, 0))
  } catch {
    // Never let measurement surface as an error to someone converting.
  }
}

// A relay failure is invisible by design — the visitor's form still submits
// and the browser pixel still fires, so nothing looks wrong. That silence is
// the hazard: an expired or revoked Meta token takes server-side coverage
// down and nobody finds out until someone questions the numbers weeks later.
// This is the only place that failure becomes observable.
//
// Reported to GA rather than Meta on purpose: when the Meta path is the thing
// that is broken, it cannot be the thing that reports it.
function reportFailure(eventName, status) {
  gaEvent('capi_error', { event_name: eventName, status })
}
