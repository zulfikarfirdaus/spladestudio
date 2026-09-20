import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics, trackPageView } from '../lib/analytics'
import { captureAttribution } from '../lib/attribution'

// Mounted once at the route root, so it covers the main site, /id and /au.
//
// PageView has to re-fire on navigation: the vendor snippets send the first one
// on a full document load, but client-side routing never reloads the document,
// so every route after the first would otherwise go uncounted.
//
// Keyed on search as well as pathname because campaign params live in the query
// string — an ad click landing on /id?utm_campaign=... must be captured, and no
// link on this site changes the query of the page it is already on, so there is
// no double-count to avoid.
export default function Analytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    initAnalytics() // no-ops after the first call
    // Before the pageview, so a conversion fired in the same tick already has
    // somewhere to read its attribution from.
    captureAttribution(search, pathname)
    trackPageView(pathname + search)
  }, [pathname, search])

  return null
}
