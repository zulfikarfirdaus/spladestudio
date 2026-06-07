import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

function IconMenu({ open, scrolled }) {
  const color = scrolled || open ? 'var(--navy)' : '#fff'
  if (open) {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <line x1="1" y1="1" x2="17" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <line x1="17" y1="1" x2="1" y2="17" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
      <line x1="0" y1="1" x2="22" y2="1" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="0" y1="13" x2="22" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function close() { setMenuOpen(false) }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--open' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo" onClick={close}>
          <img
            src={scrolled || menuOpen ? '/images/logo.webp' : '/images/logo-white.svg'}
            alt="Splade Studio"
            className="navbar__logo-img"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links">
          <NavLink
            to="/work"
            className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
          >
            Projects
          </NavLink>
          <NavLink to="/contact" className="btn btn-primary navbar__cta">Get in touch</NavLink>
        </nav>

        {/* Hamburger — mobile only */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <IconMenu open={menuOpen} scrolled={scrolled || menuOpen} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer${menuOpen ? ' navbar__drawer--open' : ''}`}>
        <nav className="navbar__drawer-links">
          <NavLink
            to="/"
            className={({ isActive }) => `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`}
            onClick={close}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/work"
            className={({ isActive }) => `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`}
            onClick={close}
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`}
            onClick={close}
          >
            Get in Touch
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
