import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/portfolio'
import { waHref, trackWaContact } from '../../lib/wa'
import WaIcon from './WaIcon'
import '../sections/WorkPreview.css'
import './lp-id.css'

gsap.registerPlugin(ScrollTrigger)

// LP-specific project selection (by name) with casual ID/EN descriptions.
// Order here is the display order: Bahasa-language sites first, and the four
// above the fold before the four behind "Lihat semua".
//
// Every project shown here needs an entry — falling back to the English desc
// on a Bahasa landing page is worse than not showing the project. Ventop and
// Capstify are left out because they sit on demo subdomains rather than
// client-owned ones; dropping the pair also leaves an even 8 for the grid.
const descID = {
  'Motherlight Birth Center': 'Website yang hangat dan welcoming untuk klinik gentle birth di Karanganyar.',
  "d'BestO": 'Revamp website brand F&B dengan desain yang bold dan clean.',
  'JuanUp 2026': 'Website yang modern dan energik untuk event JuanUp 2026 di Filipina.',
  'Azraai Azmi Portfolio': 'Website portfolio untuk Associate Creative Director di Malaysia.',
  'Al-Khair Investment': 'Website terpercaya untuk platform pendanaan bisnis berbasis syariah.',
  'Yayasan Al-Amanah': 'Website yang bersih dan terpercaya untuk yayasan sekolah di Bandung.',
  Tara: 'Website multi-halaman yang profesional untuk perusahaan konstruksi.',
  'Childreams Studio': 'Website yang ceria dan playful untuk studio buku anak & animasi.',
}

const featured = Object.keys(descID)
  .map((name) => projects.find((p) => p.name === name))
  .filter(Boolean)

const PREVIEW = 4

export default function WorkPreviewID() {
  const sectionRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? featured : featured.slice(0, PREVIEW)

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

  // The ScrollTrigger above is built at mount and only knows the first four.
  // Cards revealed later are already in the viewport, so a trigger would never
  // fire for them — they get a plain fade instead.
  const mounted = useRef(false)
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!expanded) return
    const ctx = gsap.context(() => {
      gsap.fromTo(gsap.utils.toArray('.wp-card').slice(PREVIEW),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [expanded])

  // Collapsing shortens the page under the reader, who is usually somewhere in
  // the rows about to disappear. Put them back at the top of the section.
  function toggle() {
    if (expanded) sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setExpanded(!expanded)
  }

  return (
    <section id="work" className="work-preview" ref={sectionRef}>
      <div className="container">

        <div className="work-preview__header">
          <h2 className="heading-lg">Lihat project<br />pilihan kami.</h2>
        </div>

        <div className="wp-grid" id="id-work-grid">
          {shown.map((p) => (
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

        <div className="wp-footer wp-footer--stack">
          <button
            type="button"
            className="wp-toggle"
            onClick={toggle}
            aria-expanded={expanded}
            aria-controls="id-work-grid"
          >
            {expanded ? 'Tampilkan lebih sedikit' : `Lihat semua ${featured.length} project`}
            <ChevronDown size={15} aria-hidden="true" />
          </button>
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
