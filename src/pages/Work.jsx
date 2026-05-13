import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/portfolio'
import LogoStrip from '../components/sections/LogoStrip'
import CTA from '../components/sections/CTA'
import './Work.css'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-hero__content > *',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' }
      )

      gsap.utils.toArray('.wpage-row').forEach((row) => {
        const info = row.querySelector('.wpage-row__info')
        const img  = row.querySelector('.wpage-row__img')
        gsap.fromTo(info,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 80%' } }
        )
        gsap.fromTo(img,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 80%' } }
        )
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="work-hero">
        <div className="container work-hero__content">
          <p className="label work-hero__eyebrow">Our work</p>
          <h1 className="work-hero__heading">
            What we've built.
          </h1>
          <p className="work-hero__sub">
            Every project is custom — designed and built around the brand, not the other way around.
          </p>
        </div>
      </section>

      {/* Row list */}
      <section className="wpage-list">
        <div className="container">
          <div className="wpage-rows">
            {projects.map((p) => (
              <div className="wpage-row" key={p.name}>
                <div className="wpage-row__info">
                  <h2 className="wpage-row__name">{p.name}</h2>
                  <p className="wpage-row__desc">{p.desc}</p>
                  <div className="wpage-row__tags">
                    {p.tags.map(t => (
                      <span className="tag tag-plain" key={t}>{t}</span>
                    ))}
                  </div>
                  <a
                    href={`https://${p.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wpage-row__visit"
                  >
                    Visit site <ArrowUpRight size={14} />
                  </a>
                </div>

                <a
                  href={`https://${p.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wpage-row__img"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img src={p.image} alt={p.name} />
                </a>
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
