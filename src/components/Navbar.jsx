import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          <img
            src={scrolled ? '/images/logo.webp' : '/images/logo-white.svg'}
            alt="Splade Studio"
            className="navbar__logo-img"
          />
        </Link>

        <nav className="navbar__links">
          <NavLink to="/contact" className="btn btn-primary navbar__cta">Start a project</NavLink>
        </nav>
      </div>
    </header>
  )
}
