import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './CTA.css'

export default function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__content">
          <img src="/images/icon-white.svg" alt="" className="cta__icon" aria-hidden="true" />
          <h2 className="cta__heading">Your business deserves<br />better than a template.</h2>
          <Link to="/contact" className="cta__btn">
            Get in touch <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  )
}
