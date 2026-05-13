import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import './Testimonials.css'

export default function Testimonials() {
  const [idx, setIdx] = useState(0)
  const t = testimonials[idx]

  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIdx((i) => (i + 1) % testimonials.length)

  return (
    <section className="testimonials">
      <div className="container">

        <p className="testi__label">What our clients say about us</p>

        <blockquote className="testi__quote">
          "{t.quote}"
        </blockquote>

        <div className="testi__footer">
          <div className="testi__author">
            {t.avatar ? (
              <img src={t.avatar} alt={t.name} className="testi__avatar" />
            ) : (
              <div className="testi__avatar testi__avatar--placeholder">
                {t.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="testi__name">{t.name}</p>
              <p className="testi__meta">{t.title} at {t.company}</p>
            </div>
          </div>

          <div className="testi__nav">
            <button className="testi__nav-btn" onClick={prev} aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <button className="testi__nav-btn" onClick={next} aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
