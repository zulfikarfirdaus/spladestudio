// Google Analytics 4 — the independent check on Meta's own reporting.
//
// Meta self-attributes on a 7-day-click / 1-day-view window and reports
// generously; a 20-40% gap against a last-click source is normal. With only one
// source of truth there is no way to tell an inflated report from a working
// campaign, which is the entire reason this exists alongside the pixel.

// Paste the Measurement ID from GA4 Admin > Data streams (format: G-XXXXXXXXXX).
// Left blank every export below no-ops and no script loads — same switch the
// Meta Pixel uses, so tracking can be killed per-vendor without touching a
// single call site.
export const GA_MEASUREMENT_ID = ''

export function isGaEnabled() {
  return typeof window !== 'undefined' && /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID)
}

// Idempotent: safe to call on every route change, only injects once.
export function initGa() {
  if (!isGaEnabled() || window.gtag) return

  window.dataLayer = window.dataLayer || []
  // Must be a real `arguments` push, not a rest param — gtag.js reads the
  // array-like shape, and (...args) => push(args) sends the wrong thing.
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag

  gtag('js', new Date())

  // send_page_view off, then fired by hand on every route. Left on, gtag counts
  // the first document load and nothing after it, because client-side routing
  // never reloads the document — the same trap the pixel's PageView avoids.
  gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
}

export function gaPageView(path) {
  if (!isGaEnabled() || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export function gaEvent(name, params) {
  if (!isGaEnabled() || typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}
