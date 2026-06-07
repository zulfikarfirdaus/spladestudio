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
            <Link to="/work">Projects</Link>
            <a href="https://wa.me/6281217398515" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="mailto:spladestudio@gmail.com">Email</a>
            <a href="https://www.instagram.com/spladestudio/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </nav>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Splade Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
