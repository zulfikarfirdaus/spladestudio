// Cookie consent, stored and read by both vendors before they load.
//
// GA4 and the Meta Pixel both set cookies, which Indonesia's PDP Law and the
// GDPR treat as personal data processing that needs consent first. The site
// sells to ID, AU and elsewhere from one codebase, so the strictest applicable
// rule sets the default: nothing tracks until the visitor says yes.
//
// The point of routing this through both vendors' own consent APIs rather than
// simply not loading the scripts is that Google's Consent Mode still returns
// modeled conversion data while denied, and Meta's queue survives a later
// grant. Blocking the script outright throws that away.

const STORAGE_KEY = 'splade_consent'

export const GRANTED = 'granted'
export const DENIED = 'denied'

// Authoritative for the rest of the page once a choice is made. Without it a
// visitor in Safari private mode — where setItem throws — would answer the
// banner and watch it reappear, because the next read finds nothing stored.
let sessionChoice = null

// A Set, not an array: unsubscribing on unmount has to be exact, and
// useSyncExternalStore can subscribe the same listener across re-renders.
const listeners = new Set()

export function readConsent() {
  if (typeof window === 'undefined') return null
  if (sessionChoice) return sessionChoice
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === GRANTED || value === DENIED ? value : null
  } catch {
    return null
  }
}

export function saveConsent(value) {
  sessionChoice = value
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // Storage blocked. The choice still holds for this page view via
    // sessionChoice; the banner just asks again next visit, which is the safe
    // direction to fail in.
  }
  for (const listener of listeners) listener()
}

// Undecided counts as denied. Consent must be affirmative — treating silence
// as a yes is exactly what the rules exist to prevent.
export function hasConsent() {
  return readConsent() === GRANTED
}

// ── useSyncExternalStore plumbing ──────────────────────────────
// Consent lives outside React, so the banner subscribes to it rather than
// mirroring it into state. Snapshots return primitives, which keeps them
// referentially stable without any caching.

export function subscribeConsent(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getConsentSnapshot = readConsent

// Used during prerender and hydration. Deliberately not null: null means
// "undecided, show the banner", and the prerendered HTML must not ship a
// banner that then disappears for everyone who already answered it.
export function getServerConsentSnapshot() {
  return 'pending'
}
