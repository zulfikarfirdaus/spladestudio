import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../../data/testimonials'
import '../sections/Testimonials.css'

// Bahasa Indonesia versions of the client quotes, keyed by client name.
// Falls back to the original English quote if no translation exists.
const quotesID = {
  'Rijal Asyari':
    'Saya ingin website yang ringkas, minimalis, dan informatif dengan loading yang cepat — dan itu persis yang Splade Studio berikan.',
  'Wahyu Pambudi':
    'Kami butuh website yang rapi, informatif, dan mudah dikelola. Dengan Splade Studio, semua itu terpenuhi; tanpa ribet, tanpa drama.',
  'Sarah Fauzia':
    'Komunikasinya jelas dari hari pertama. Splade Studio langsung paham brand kami dan menghidupkannya secara online.',
}

export default function TestimonialsID() {
  const [idx, setIdx] = useState(0)
  const t = testimonials[idx]

  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIdx((i) => (i + 1) % testimonials.length)

  return (
    <section className="testimonials">
      <div className="container">

        <p className="testi__label">Kata klien tentang kami</p>

        <blockquote className="testi__quote">
          "{quotesID[t.name] || t.quote}"
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
              <p className="testi__meta">{t.title}, {t.company}</p>
            </div>
          </div>

          <div className="testi__nav">
            <button className="testi__nav-btn" onClick={prev} aria-label="Sebelumnya">
              <ChevronLeft size={18} />
            </button>
            <button className="testi__nav-btn" onClick={next} aria-label="Berikutnya">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
