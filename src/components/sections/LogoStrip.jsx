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
            <div className="logos__item" key={i}>
              <img src={c.logo} alt={c.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
