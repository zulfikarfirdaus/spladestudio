// WhatsApp CTA config for the Indonesian ad landing page (/id)
export const WA_NUMBER = '6281217398515'

export const WA_MESSAGE =
  'Halo Splade Studio! Saya tertarik buat website untuk bisnis saya. Bisa konsultasi?'

export const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

// Per-package WhatsApp link. Prefilling the package name means the first
// message already carries the scope, so the chat starts past "berapa harganya?".
export function waHrefFor(paket) {
  const msg = `Halo Splade Studio! Saya tertarik dengan paket ${paket}. Bisa konsultasi?`
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

// Social media management deck (/social). Its own opening line so the chat
// already says which service the visitor came for, not the website one above.
const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

export const waSocialHref = waLink(
  'Halo Splade Studio! Saya tertarik dengan layanan social media management. Bisa konsultasi?',
)

export function waSocialHrefFor(paket) {
  return waLink(`Halo Splade Studio! Saya tertarik dengan ${paket} social media management. Bisa konsultasi?`)
}
