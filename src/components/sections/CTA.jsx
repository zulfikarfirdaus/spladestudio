import { Link } from 'react-router-dom'
import './CTA.css'

export default function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta__card">

          <img
            src="https://images.unsplash.com/photo-1617957796155-72d8717ac882?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="cta__bg"
            aria-hidden="true"
          />

          <div className="cta__content">
            <div className="cta__text">
              <h2 className="cta__heading">Your business deserves<br />better than a template.</h2>
              <p className="cta__sub">
                Let's build a site that works as hard as you do.<br className="cta-br" />
                {' '}Ready in 2 weeks.
              </p>
            </div>
            <Link to="/contact" className="shader-btn shader-btn-solid" style={{ flexShrink: 0 }}>
              Start a project
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
