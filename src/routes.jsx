import RootLayout from './components/RootLayout'
import PublicLayout from './components/PublicLayout'
import Home from './pages/Home'
import Work from './pages/Work'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import LandingID from './pages/LandingID'
import LandingAU from './pages/LandingAU'

export const routes = [
  {
    // Pathless root — carries the Meta Pixel across every route below.
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <PublicLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'work', element: <Work /> },
          { path: 'contact', element: <Contact /> },
          // Two routes, one component. Bahasa gets its own URL rather than a
          // toggle because /id is a paid landing page for Indonesian
          // businesses and a notice nobody can read is not notice.
          { path: 'privacy', element: <Privacy lang="en" /> },
          { path: 'kebijakan-privasi', element: <Privacy lang="id" /> },
        ],
      },
      // Meta Ads landing page (Indonesia) — standalone layout, WhatsApp-only CTA
      { path: '/id', element: <LandingID /> },
      // Market landing page (Australia) — standalone layout, AUD pricing, form CTA
      { path: '/au', element: <LandingAU /> },
    ],
  },
]
