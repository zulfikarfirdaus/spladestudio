import { Outlet } from 'react-router-dom'
import MetaPixel from './MetaPixel'

// Pathless layout wrapping every route. Exists purely to give the Meta Pixel a
// single mount point — /id and /au sit outside PublicLayout, so without this
// the pixel would need duplicating in three places.
export default function RootLayout() {
  return (
    <>
      <MetaPixel />
      <Outlet />
    </>
  )
}
