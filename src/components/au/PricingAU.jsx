import { Check, ArrowRight } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import '../sections/Pricing.css'
import './lp-au.css'

// `service` matches an option in the on-page contact form, so the card the
// visitor picked arrives with the enquiry instead of being re-asked.
const packages = [
  {
    name: 'Landing Page',
    for: 'For a product launch, a campaign, or a business that needs one page that actually converts.',
    price: 'A$1,500',
    unit: 'flat, one-time',
    service: 'Landing Page',
    features: [
      'One page, designed from scratch',
      'Live in 2 weeks',
      'Copywriting and SEO structure',
      'Contact form and enquiry routing',
      'Hand-coded, not a page builder',
    ],
  },
  {
    name: 'Business Website',
    for: 'For companies that need a full profile, service pages, and to be found on Google.',
    price: 'A$3,000',
    unit: 'flat, one-time',
    service: 'Multi-page Website',
    featured: true,
    features: [
      'Up to 5 pages, designed from scratch',
      'CMS if the site needs one — no extra charge',
      'Live in 2–4 weeks',
      'Copywriting and SEO structure on every page',
      'Contact form, enquiry routing, custom code',
    ],
    note: 'Additional pages A$400 each',
  },
  {
    name: 'Custom / Web App',
    for: 'For anything past a company profile.',
    price: 'A$6,000',
    prefix: 'from',
    unit: 'scope dependent',
    service: 'Custom Feature',
    features: [
      'Dashboards with authentication and a database',
      'E-commerce with payment and shipping integration',
      'Booking or reservation systems',
      'Multi-language builds',
      'Scope, timeline and final price set after we talk',
    ],
  },
]

const included = [
  ['Designed and built from scratch', 'not a template with your logo dropped in'],
  ['Free hosting on Cloudflare', 'no monthly fee, no annual renewal'],
  ['90+ PageSpeed', "if we don't hit it, we fix it free"],
  ['Technical SEO', 'meta tags, sitemap, schema, heading structure'],
  ['30-day bug warranty', 'after launch, at no cost'],
  ['Everything in your name', 'domain, hosting and repo — leave whenever you like'],
]

export default function PricingAU({ onPickService }) {
  useScrollReveal('.price-card', { stagger: 0.12, y: 30 })

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <h2 className="heading-lg pricing__heading">Clear pricing.<br />No surprises.</h2>
        <p className="pricing__sub">
          Flat project pricing in AUD. Pay once — no monthly rental, no annual renewal,
          no lock-in contract.
        </p>

        <div className="pricing__grid">
          {packages.map((p) => (
            <div
              className={`price-card${p.featured ? ' price-card--featured' : ''}`}
              key={p.name}
            >
              {p.featured && (
                <span className="price-card__badge">
                  Most Popular
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
                {/* Scrolls to the form and preselects this package. */}
                <a
                  href="#contact"
                  className="price-card__cta"
                  onClick={() => onPickService?.(p.service)}
                >
                  Start a project <ArrowRight size={15} strokeWidth={2} />
                </a>
                {/* Always rendered — reserves the line so every CTA sits level. */}
                <p className="price-card__note">{p.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pricing__included">
          <p className="pricing__included-label">Included in every package</p>
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
