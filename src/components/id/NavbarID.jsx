import { useState, useEffect } from 'react'
import { waHref, trackWaContact } from '../../lib/wa'
import WaIcon from './WaIcon'
import '../Navbar.css'
import './lp-id.css'

// Stripped navbar for the ad landing page: in-page anchors + WhatsApp CTA.
// No links off this page — paid traffic stays put.
export default function NavbarID() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toTop(e) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a
          href="#top"
          className="navbar__logo"
          onClick={toTop}
        >
          <img
            src={scrolled ? '/images/logo.webp' : '/images/logo-white.svg'}
            alt="Splade Studio"
            className="navbar__logo-img"
            width="827"
            height="269"
          />
        </a>

        <nav className="navbar__links" style={{ display: 'flex' }}>
          <span className="navbar__anchors">
            <a href="#top" onClick={toTop}>Home</a>
            <a href="#work">Project</a>
            <a href="#pricing">Biaya</a>
          </span>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWaContact}
            className="btn btn-primary navbar__cta navbar__cta--wa"
          >
            <WaIcon size={14} /> Chat WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
