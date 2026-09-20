import { Outlet } from 'react-router-dom'
import Analytics from './Analytics'
import ConsentBanner from './ConsentBanner'

// Pathless layout wrapping every route. Exists purely to give analytics and
// the consent banner a single mount point — /id and /au sit outside
// PublicLayout, so without this both would need duplicating in three places.
//
// The banner renders after <Outlet /> so it comes last in the tab order: on a
// paid landing page the CTA should be reachable before the cookie bar is.
export default function RootLayout() {
  return (
    <>
      <Analytics />
      <Outlet />
      <ConsentBanner />
    </>
  )
}
