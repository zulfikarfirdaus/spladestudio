import { useEffect, useRef, useSyncExternalStore } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  subscribeConsent,
  getConsentSnapshot,
  getServerConsentSnapshot,
} from '../lib/consent'
import { setConsent } from '../lib/analytics'
import './ConsentBanner.css'

// The /id landing page is written in Bahasa Indonesia; an English consent bar
// pinned to the bottom of it reads as a third-party interruption, which is the
// last thing a paid landing page needs.
const COPY = {
  en: {
    label: 'Cookie consent',
    text: 'We use cookies to measure how our ads perform. Nothing else, and nothing sold.',
    more: 'Privacy policy',
    href: '/privacy',
    accept: 'Accept',
    decline: 'Decline',
  },
  id: {
    label: 'Persetujuan cookie',
    text: 'Kami memakai cookie untuk mengukur performa iklan. Tidak lebih, dan tidak dijual.',
    more: 'Kebijakan privasi',
    href: '/kebijakan-privasi',
    accept: 'Terima',
    decline: 'Tolak',
  },
}

// Publishes the bar's live height so bottom-anchored content can clear it.
// Measured rather than hardcoded because the copy wraps at narrow widths and
// in Indonesian, and a stale constant would either under- or over-shoot.
function useConsentHeight(ref, active) {
  useEffect(() => {
    const root = document.documentElement
    if (!active) {
      root.style.removeProperty('--consent-h')
      return
    }
    const el = ref.current
    if (!el) return

    const publish = () => root.style.setProperty('--consent-h', `${el.offsetHeight}px`)
    publish()

    const ro = new ResizeObserver(publish)
    ro.observe(el)
    return () => {
      ro.disconnect()
      root.style.removeProperty('--consent-h')
    }
  }, [ref, active])
}

export default function ConsentBanner() {
  const { pathname } = useLocation()
  const barRef = useRef(null)

  // Consent lives in localStorage, outside React, so it is subscribed to
  // rather than copied into state. The server snapshot renders nothing, then
  // hydration swaps in the real value — no flash of a banner for visitors who
  // already answered, and no second source of truth to fall out of sync.
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  )

  const undecided = consent === null
  // Hooks cannot sit behind the early return below, so this runs either way
  // and no-ops when there is no bar to measure.
  useConsentHeight(barRef, undecided)

  // Answering notifies the store, which re-renders this straight back out.
  if (!undecided) return null

  const t = pathname.startsWith('/id') ? COPY.id : COPY.en

  return (
    <section className="consent" ref={barRef} role="region" aria-label={t.label}>
      <div className="consent__inner">
        <p className="consent__text">
          {t.text}{' '}
          {/* Consent is only informed if what is being consented to is one
              click away — and the link has to survive the banner, so it
              points at the page rather than expanding in place. */}
          <Link className="consent__link" to={t.href}>{t.more}</Link>
        </p>
        <div className="consent__actions">
          {/* Equal weight on both buttons on purpose: a decline styled as an
              afterthought is a dark pattern, and under the GDPR it invalidates
              the consent it collects. */}
          <button type="button" className="consent__btn" onClick={() => setConsent(false)}>
            {t.decline}
          </button>
          <button
            type="button"
            className="consent__btn consent__btn--accept"
            onClick={() => setConsent(true)}
          >
            {t.accept}
          </button>
        </div>
      </div>
    </section>
  )
}
