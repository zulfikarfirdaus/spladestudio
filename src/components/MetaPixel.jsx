import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initPixel, trackPageView } from '../lib/pixel'

// Mounted once at the route root, so it covers the main site, /id and /au.
//
// PageView has to re-fire on navigation: fbq('init') sends the first one on a
// full page load, but client-side routing never reloads the document, so every
// route after the first would otherwise go uncounted.
export default function MetaPixel() {
  const { pathname } = useLocation()

  useEffect(() => {
    initPixel() // no-ops after the first call
    trackPageView()
  }, [pathname])

  return null
}
