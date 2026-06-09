import { clients } from '../../data/portfolio'
import './LogoStrip.css'

const logos = [...clients, ...clients]

export default function LogoStrip() {
  return (
    <section className="logos" id="logos">
      <div className="container">
        <p className="logos__headline">Trusted by businesses from various industry</p>
      </div>
      <div className="logos__track-wrapper">
        <div className="logos__track">
          {logos.map((c, i) => (
            <div className={`logos__item${c.bitmap ? ' logos__item--bitmap' : ''}`} key={i}>
              <img src={c.logo} alt={c.name} style={c.height ? { height: c.height } : undefined} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
