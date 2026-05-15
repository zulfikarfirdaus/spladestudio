import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <Link to="/">
              <img src="/images/logo-white.svg" alt="Splade Studio" className="footer__logo-img" />
            </Link>
            <p className="footer__tagline">Custom websites. Delivered fast.</p>
          </div>

          <nav className="footer__nav">
            <Link to="/contact">Contact</Link>
            <a href="https://www.instagram.com/spladestudio/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="mailto:hello@spladestudio.com">Email</a>
          </nav>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Splade Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
