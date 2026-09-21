import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/portfolio'
import { waHref, trackWaContact } from '../../lib/wa'
import WaIcon from './WaIcon'
import '../sections/WorkPreview.css'
import './lp-id.css'

gsap.registerPlugin(ScrollTrigger)

// LP-specific project selection (by name) with casual ID/EN descriptions.
// Order here is the display order: Bahasa-language sites first.
// Falls back to the original English desc from portfolio.js.
const descID = {
  'Motherlight Birth Center': 'Website yang hangat dan welcoming untuk klinik gentle birth di Karanganyar.',
  "d'BestO": 'Revamp website brand F&B dengan desain yang bold dan clean.',
  'JuanUp 2026': 'Website yang modern dan energik untuk event JuanUp 2026 di Filipina.',
  'Azraai Azmi Portfolio': 'Website portfolio untuk Associate Creative Director di Malaysia.',
}

const featured = Object.keys(descID)
  .map((name) => projects.find((p) => p.name === name))
  .filter(Boolean)

export default function WorkPreviewID() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.wp-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 85%' } }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" className="work-preview" ref={sectionRef}>
      <div className="container">

        <div className="work-preview__header">
          <h2 className="heading-lg">Lihat project<br />pilihan kami.</h2>
        </div>

        <div className="wp-grid">
          {featured.map((p) => (
            <div className="wp-card" key={p.name}>

              <a
                href={`https://${p.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="wp-card__frame"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  width="960"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  style={p.objectPosition ? { objectPosition: p.objectPosition } : undefined}
                />
              </a>

              <div className="wp-card__footer">
                <div className="wp-card__text">
                  <h3 className="wp-card__name">{p.name}</h3>
                  <p className="wp-card__desc">{descID[p.name] || p.desc}</p>
                </div>
                <a
                  href={`https://${p.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wp-card__btn"
                  aria-label={`Kunjungi ${p.name}`}
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>

            </div>
          ))}
        </div>

        <div className="wp-footer">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWaContact}
            className="btn wp-see-all-btn"
          >
            Mau website seperti ini? Chat kami <WaIcon size={15} />
          </a>
        </div>

      </div>
    </section>
  )
}
