import { Check } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { waHrefFor, trackWaContact } from '../../lib/wa'
import WaIcon from './WaIcon'
import '../sections/Pricing.css'

const packages = [
  {
    name: 'Landing Page',
    for: 'Untuk launching produk, campaign, atau bisnis yang butuh satu halaman yang solid.',
    price: 'Rp 5jt',
    unit: 'sekali bayar',
    features: [
      '1 halaman, desain custom dari nol',
      'Live dalam 2 minggu',
      'Copywriting & struktur SEO',
      'Form kontak + tombol WhatsApp',
      'Custom coding, bukan page builder',
    ],
  },
  {
    name: 'Website Bisnis',
    for: 'Untuk perusahaan yang butuh profil lengkap, halaman layanan, dan ditemukan di Google.',
    price: 'Rp 10jt',
    unit: 'sekali bayar',
    featured: true,
    features: [
      'Sampai 6 halaman, desain custom dari nol',
      'CMS kalau memang dibutuhkan — tanpa biaya tambahan',
      'Live dalam 2–4 minggu',
      'Copywriting & struktur SEO tiap halaman',
      'Form kontak, WhatsApp, & custom coding',
    ],
    note: 'Halaman tambahan Rp 1jt / halaman',
  },
  {
    name: 'Custom / Web App',
    for: 'Untuk kebutuhan yang lebih dari sekadar company profile.',
    price: 'Rp 20jt',
    prefix: 'mulai',
    unit: 'tergantung scope',
    features: [
      'Dashboard dengan login & database',
      'E-commerce + payment gateway (Midtrans / Xendit)',
      'Sistem booking atau reservasi',
      'Website dua bahasa',
      'Scope, timeline, dan harga final setelah diskusi',
    ],
  },
]

const included = [
  ['Desain & build custom', 'dikerjakan dari nol, bukan template yang diganti logo'],
  ['Hosting gratis di Cloudflare', 'tanpa biaya bulanan, tanpa perpanjangan tahunan'],
  ['PageSpeed 90+', 'kalau tidak tercapai, kami perbaiki gratis'],
  ['SEO technical', 'meta tag, sitemap, schema, struktur heading'],
  ['Garansi bug 30 hari', 'setelah launch, gratis'],
  ['Semua atas nama kamu', 'domain, hosting, dan repo — bebas pindah kapan saja'],
]

export default function PricingID() {
  useScrollReveal('.price-card', { stagger: 0.12, y: 30 })

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="heading-lg pricing__heading">Harganya jelas.<br />Tidak ada kejutan.</h2>
        <p className="pricing__sub">
          Sekali bayar. Tidak ada biaya perpanjangan tahunan, tidak ada langganan bulanan.
        </p>

        <div className="pricing__grid">
          {packages.map((p) => (
            <div
              className={`price-card${p.featured ? ' price-card--featured' : ''}`}
              key={p.name}
            >
              {p.featured && (
                <span className="price-card__badge">
                  Paling Populer
                </span>
              )}

              <h3 className="price-card__name">{p.name}</h3>
              <p className="price-card__for">{p.for}</p>

              <div className="price-card__price">
                <span className="price-card__amount">
                  {p.prefix && <small>{p.prefix}</small>}
                  {p.price}
                </span>
                <span className="price-card__unit">{p.unit}</span>
              </div>

              <ul className="price-card__list">
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="price-card__foot">
                <a
                  href={waHrefFor(p.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackWaContact}
                  className="price-card__cta"
                >
                  <WaIcon size={15} /> Tanya paket ini
                </a>
                {/* Always rendered — reserves the line so every CTA sits level. */}
                <p className="price-card__note">{p.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pricing__included">
          <p className="pricing__included-label">Termasuk di semua paket</p>
          <ul className="pricing__included-grid">
            {included.map(([title, desc]) => (
              <li key={title}>
                <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                <span><strong>{title}</strong> — {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
