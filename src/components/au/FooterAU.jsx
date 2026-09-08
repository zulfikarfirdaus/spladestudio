import '../Footer.css'

// Minimal footer for the AU landing page — contact channels only, no site nav.
export default function FooterAU() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <a
              href="#top"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            >
              <img
                src="/images/logo-white.svg"
                alt="Splade Studio"
                className="footer__logo-img"
                width="827"
                height="269"
                loading="lazy"
              />
            </a>
            <p className="footer__tagline">Custom websites, built to last.</p>
          </div>

          <nav className="footer__nav">
            <a href="#contact">Get in touch</a>
            <a href="mailto:spladestudio@gmail.com">Email</a>
            <a href="https://www.instagram.com/spladestudio/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </nav>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Splade Studio. All rights reserved.</p>
          <p className="footer__entity">A brand of PT Pedang Bermata Dua</p>
        </div>
      </div>
    </footer>
  )
}
