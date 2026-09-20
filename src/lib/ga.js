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
export const GA_MEASUREMENT_ID = 'G-1WWG60NLN5'

import { hasConsent } from './consent'

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

  // Consent Mode v2, set before config so no cookie is ever written ahead of a
  // decision. Denied is not the same as off: GA still sends cookieless pings
  // and models the conversions behind them, which is why this is wired through
  // Google's consent API instead of just withholding the script.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    // Holds tags briefly so a returning visitor's stored grant, applied on the
    // next line, lands before the first hit rather than after it.
    wait_for_update: 500,
  })
  if (hasConsent()) gaConsentUpdate(true)

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

// Called on init for a stored grant, and again the moment the banner is
// answered. Safe before gtag.js has finished loading: commands queue on
// dataLayer and replay in order once it does.
export function gaConsentUpdate(granted) {
  if (!isGaEnabled() || typeof window.gtag !== 'function') return
  const state = granted ? 'granted' : 'denied'
  window.gtag('consent', 'update', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
  })
}
