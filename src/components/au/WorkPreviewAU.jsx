import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/portfolio'
import '../sections/WorkPreview.css'
import './lp-au.css'

gsap.registerPlugin(ScrollTrigger)

// Both sit on demo subdomains rather than client-owned domains, so they stay
// off the landing pages. Dropping the pair also leaves an even 8, which is
// what makes the expanded two-column grid come out square.
const HIDDEN = ['Ventop', 'Capstify']
const featured = projects.filter((p) => !HIDDEN.includes(p.name))

const PREVIEW = 4

// Same grid as the main site, but the footer button points at the on-page
// form instead of /work — nothing leaves this page. That is also why the rest
// of the portfolio expands inline: there is no /work here to send anyone to.
export default function WorkPreviewAU() {
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
          <h2 className="heading-lg">Explore our<br />selected projects.</h2>
        </div>

        <div className="wp-grid" id="au-work-grid">
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
                  <p className="wp-card__desc">{p.desc}</p>
                </div>
                <a
                  href={`https://${p.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wp-card__btn"
                  aria-label={`Visit ${p.name}`}
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
            aria-controls="au-work-grid"
          >
            {expanded ? 'See less' : 'See more'}
            <ChevronDown size={15} aria-hidden="true" />
          </button>
          <a href="#contact" className="btn wp-see-all-btn">
            Want a site like this? Let's talk <ArrowUpRight size={15} />
          </a>
        </div>

      </div>
    </section>
  )
}
