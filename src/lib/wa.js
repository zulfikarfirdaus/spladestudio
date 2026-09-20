import { trackContact, MARKET_ID } from './analytics'

// WhatsApp CTA config for the Indonesian ad landing page (/id)
export const WA_NUMBER = '6281217398515'

export const WA_MESSAGE =
  'Halo Splade Studio! Saya tertarik buat website untuk bisnis saya. Bisa konsultasi?'

export const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

// Fire the "Contact" conversion on WhatsApp clicks. Meta optimizes
// click-to-WA campaign delivery against this event.
//
// This is the one conversion with no attribution attached: the chat leaves the
// site, so unlike the forms there is no payload to carry utm params into. What
// produced an ID lead has to be read off Meta's own reporting — see the
// WhatsApp note in MARKETING.md.
export function trackWaContact() {
  trackContact(MARKET_ID)
}

// Per-package WhatsApp link. Prefilling the package name means the first
// message already carries the scope, so the chat starts past "berapa harganya?".
export function waHrefFor(paket) {
  const msg = `Halo Splade Studio! Saya tertarik dengan paket ${paket}. Bisa konsultasi?`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}
