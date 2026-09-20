// One place every conversion goes, fanning out to each vendor.
//
// Call sites ask for a business event ("a lead came in, from AU") and this
// module decides what that means per vendor. The alternative — every component
// importing both transports and firing two calls — is how the pixel and GA
// quietly drift apart until the two dashboards disagree and neither is trusted.
import { initPixel, track as pixelTrack, pixelConsentUpdate } from './pixel'
import { initGa, gaEvent, gaPageView, gaConsentUpdate } from './ga'
import { saveConsent, resetConsent, GRANTED, DENIED } from './consent'
import { leadValue } from './leadValue'

// One pixel dataset and one GA property serve three surfaces, so every
// conversion carries the market it came from. Without this a Lead from /au and
// a Lead from /contact are indistinguishable, and whoever is buying the media
// cannot tell which market actually converted.
export const MARKET_MAIN = 'Main site'
export const MARKET_ID = 'ID landing'
export const MARKET_AU = 'AU landing'

export function initAnalytics() {
  initPixel()
  initGa()
}

// The banner's only job: record the decision, then tell both vendors at once.
// Returning the value keeps the caller from having to re-read storage.
export function setConsent(granted) {
  saveConsent(granted ? GRANTED : DENIED)
  gaConsentUpdate(granted)
  pixelConsentUpdate(granted)

  // Replay the Meta PageView that was fired while consent was revoked. On a
  // single-page ad landing there is no later navigation to cover for it, so if
  // Meta drops rather than queues it, whoever accepts is never counted as
  // having arrived at all.
  //
  // Confirmed against production: Meta does not replay the event it held, so
  // without this line an accepting visitor is never counted as having arrived.
  // With it, exactly one PageView is sent on accept and none on decline.
  //
  // Meta only. GA already sent this page_view as a cookieless Consent Mode
  // ping, so re-firing it there would double-count the visit.
  if (granted) pixelTrack('PageView')
}

// Revoke at both vendors, then forget the choice so the banner asks again.
// Order matters: clearing first would leave the tags running until the next
// page load, which is the window a withdrawal is supposed to close.
export function clearConsent() {
  gaConsentUpdate(false)
  pixelConsentUpdate(false)
  resetConsent()
}

export function trackPageView(path) {
  pixelTrack('PageView')
  gaPageView(path)
}

// Meta: standard events only — it optimizes delivery against these by name, so
// a typo means a campaign silently optimizing against nothing.
// GA4: `generate_lead` is the recommended lead-gen event, which is what makes
// it available as a key event without custom setup.
//
// `market` has to be registered once in GA4 Admin > Custom definitions before
// it shows up in reports; Meta's content_category is standard and needs nothing.
export function trackLead(market, service) {
  // GA drops `value` unless `currency` rides with it, so they always travel
  // as a pair. See leadValue.js for why this is expected value, not price.
  const { value, currency } = leadValue(service)
  pixelTrack('Lead', { content_category: market, content_name: service, value, currency })
  gaEvent('generate_lead', { market, service, value, currency })
}

// A submission the visitor completed but that never reached us — the monthly
// cap on the form backend, or an outage. GA only: it is not a Meta standard
// event, and optimizing delivery toward failures would be actively harmful.
// Worth having because it is the one failure the inbox cannot show you.
export function trackFormError(market) {
  gaEvent('form_error', { market })
}

// Fired on a WhatsApp click, not on a message actually being sent, so it
// over-counts against real conversations. Good enough as a delivery signal for
// click-to-WhatsApp campaigns; it is not a lead count.
export function trackContact(market, pkg) {
  // Deliberately no value. A WhatsApp tap is a click, not an enquiry — the
  // click-to-conversation-to-sale rate is unknown and far below a completed
  // form's, so pricing it would quietly inflate every ID number. The package
  // still rides along, which is what makes ID segmentable at all.
  pixelTrack('Contact', { content_category: market, ...(pkg && { content_name: pkg }) })
  gaEvent('contact', { market, ...(pkg && { package: pkg }) })
}
