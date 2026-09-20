import { lazy, Suspense } from 'react'
import { clients } from '../../data/portfolio'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import '../sections/Statement.css'

const BlurText = lazy(() => import('../ui/BlurText'))

const logos = [...clients, ...clients]

const QUOTE = "Website yang baik bukan sekadar dekorasi, website yang menghadirkan nyawa. Setiap pixel, kode, dan interaksi dibuat dengan makna. Website yang membangun trust, bukan template semata."

export default function StatementID() {
  useScrollReveal('.manifesto__split', { y: 40, duration: 0.9, start: 'top 80%' })

  return (
    <section className="manifesto">
      <div className="container">
        <div className="manifesto__split reveal">
          <div className="manifesto__aside">
            <span className="label">Filosofi kami</span>
          </div>
          <Suspense fallback={<p className="manifesto__quote">{QUOTE}</p>}>
            <BlurText
              text={QUOTE}
              // BlurText splits on spaces, so the segment here is "trust," —
              // comma attached. Italicising the whole thing slants the comma
              // too, which reads as a mistake, so only the word is wrapped.
              renderSegment={(word) => {
                const match = word.match(/^(trust)(\W*)$/)
                return match ? <><em>{match[1]}</em>{match[2]}</> : word
              }}
              className="manifesto__quote"
              animateBy="words"
              direction="bottom"
              delay={60}
              stepDuration={0.4}
              threshold={0.2}
            />
          </Suspense>
        </div>
        <div className="manifesto__divider" />
        <p className="manifesto__trusted">Dipercaya bisnis dari berbagai industri</p>
      </div>
      <div className="manifesto__track-wrapper">
        <div className="manifesto__track">
          {logos.map((c, i) => (
            <div className={`manifesto__item${c.bitmap ? ' manifesto__item--bitmap' : ''}`} key={i}>
              <img
                src={c.logo}
                alt={c.name}
                width={c.width}
                height={c.height}
                loading="lazy"
                decoding="async"
                style={c.height ? { height: c.height } : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
