import { waHref, trackWaContact } from '../../lib/wa'
import WaIcon from './WaIcon'
import '../sections/CTA.css'
import './lp-id.css'

export default function CTAID() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__content">
          <img src="/images/icon-white.svg" alt="" className="cta__icon" aria-hidden="true" />
          <h2 className="cta__heading">Bisnis kamu layak dapat lebih dari sekadar template.</h2>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWaContact}
            className="cta__btn"
          >
            <WaIcon size={15} /> Chat via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
