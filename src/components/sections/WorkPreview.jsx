import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../../data/portfolio'
import './WorkPreview.css'

gsap.registerPlugin(ScrollTrigger)

export default function WorkPreview() {
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
          <h2 className="heading-lg">Explore our<br />selected projects.</h2>
        </div>

        <div className="wp-grid">
          {projects.slice(0, 4).map((p) => (
            <div className="wp-card" key={p.name}>

              <a
                href={`https://${p.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="wp-card__frame"
              >
                <img src={p.image} alt={p.name} style={p.objectPosition ? { objectPosition: p.objectPosition } : undefined} />
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

        <div className="wp-footer">
          <Link to="/work" className="btn wp-see-all-btn">
            See all projects <ArrowUpRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  )
}
