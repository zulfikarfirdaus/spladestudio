import { Outlet } from 'react-router-dom'
import Analytics from './Analytics'

// Pathless layout wrapping every route. Exists purely to give analytics a
// single mount point — /id and /au sit outside PublicLayout, so without this
// the tracking would need duplicating in three places.
export default function RootLayout() {
  return (
    <>
      <Analytics />
      <Outlet />
    </>
  )
}
