import { useState, useEffect } from 'react'
import './lp-au.css'
import '../Navbar.css'

// Stripped navbar for the AU landing page: in-page anchors + a CTA that
// scrolls to the form. No links off this page — paid traffic stays put.
export default function NavbarAU() {
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
        <a href="#top" className="navbar__logo" onClick={toTop}>
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
            <a href="#work">Projects</a>
            <a href="#pricing">Pricing</a>
          </span>

          <a href="#contact" className="btn btn-primary navbar__cta">Get in touch</a>
        </nav>
      </div>
    </header>
  )
}
