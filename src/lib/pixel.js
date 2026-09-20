// Meta Pixel — Events Manager calls it a "dataset" now, but the on-page API is
// still fbq. One ID covers the whole site: the main pages, /id and /au all
// report into the same dataset so campaigns across markets build shared
// conversion history instead of three cold, unrelated ones.
export const META_PIXEL_ID = '1919881244916302'

// Blank the ID above (or set it to any non-numeric string) to switch tracking
// off site-wide: every export below no-ops, no script loads, nothing is sent.
// Deliberately not a length check: pixel IDs are usually 15-16 digits, but a
// valid longer one silently staying dark is a worse failure than a loose regex.
export function isPixelEnabled() {
  return typeof window !== 'undefined' && /^\d+$/.test(META_PIXEL_ID)
}

// Idempotent: safe to call on every route change, only injects once.
export function initPixel() {
  if (!isPixelEnabled() || window.fbq) return

  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  window.fbq('init', META_PIXEL_ID)
}

// Raw transport. Event naming and market tagging live in analytics.js, which
// is the only module that should be calling this directly.
export function track(event, params) {
  if (!isPixelEnabled() || typeof window.fbq !== 'function') return
  if (params) window.fbq('track', event, params)
  else window.fbq('track', event)
}
