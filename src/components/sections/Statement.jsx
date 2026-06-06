import { clients } from '../../data/portfolio'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import BlurText from '../ui/BlurText'
import './Statement.css'

const logos = [...clients, ...clients]

export default function Statement() {
  useScrollReveal('.manifesto__split', { y: 40, duration: 0.9, start: 'top 80%' })

  return (
    <section className="manifesto">
      <div className="container">
        <div className="manifesto__split reveal">
          <div className="manifesto__aside">
            <span className="label">Our philosophy</span>
          </div>
          <BlurText
            text="We believe great design isn't decoration; it's the product. Every pixel, every line of code, every interaction is built with intention. We don't ship templates. We ship conviction."
            className="manifesto__quote"
            animateBy="words"
            direction="bottom"
            delay={60}
            stepDuration={0.4}
            threshold={0.2}
          />
        </div>
        <div className="manifesto__divider" />
        <p className="manifesto__trusted">Trusted by businesses from various industry</p>
      </div>
      <div className="manifesto__track-wrapper">
        <div className="manifesto__track">
          {logos.map((c, i) => (
            <div className={`manifesto__item${c.bitmap ? ' manifesto__item--bitmap' : ''}`} key={i}>
              <img src={c.logo} alt={c.name} style={c.height ? { height: c.height } : undefined} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
