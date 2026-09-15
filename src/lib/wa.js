import { track } from './pixel'

// WhatsApp CTA config for the Indonesian ad landing page (/id)
export const WA_NUMBER = '6281217398515'

export const WA_MESSAGE =
  'Halo Splade Studio! Saya tertarik buat website untuk bisnis saya. Bisa konsultasi?'

export const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

// Fire the Meta Pixel "Contact" event on WhatsApp clicks.
// Meta optimizes click-to-WA campaign delivery against this event.
//
// Note this fires on *click*, not on a message actually being sent — it will
// over-count relative to real conversations. Good enough as an optimization
// signal, but it is not a lead count.
export function trackWaContact() {
  track('Contact')
}

// Per-package WhatsApp link. Prefilling the package name means the first
// message already carries the scope, so the chat starts past "berapa harganya?".
export function waHrefFor(paket) {
  const msg = `Halo Splade Studio! Saya tertarik dengan paket ${paket}. Bisa konsultasi?`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}
