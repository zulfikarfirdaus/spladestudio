import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/portfolio'
import LogoStrip from '../components/sections/LogoStrip'
import CTA from '../components/sections/CTA'
import '../components/sections/WorkPreview.css'
import './Work.css'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const pageRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      gsap.set('.work-hero__content > *', { opacity: 1, y: 0 })
      gsap.set('.wp-card', { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-hero__content > *',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
      )

      gsap.utils.toArray('.wp-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 48 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.05,
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        )
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      <section className="work-hero">
        <div className="container work-hero__content">
          <p className="label work-hero__eyebrow">Our projects</p>
          <h1 className="work-hero__heading">What we've built.</h1>
          <p className="work-hero__sub">
            Every project is custom: designed and built around the brand, not the other way around.
          </p>

        </div>
      </section>

      <section className="wpage-list">
        <div className="container">
          <div className="wp-grid">
            {projects.map((p) => (
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
        </div>
      </section>

      <LogoStrip />
      <CTA />
    </div>
  )
}
