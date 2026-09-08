import PublicLayout from './components/PublicLayout'
import Home from './pages/Home'
import Work from './pages/Work'
import Contact from './pages/Contact'
import LandingID from './pages/LandingID'
import LandingAU from './pages/LandingAU'

export const routes = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'work', element: <Work /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  // Meta Ads landing page (Indonesia) — standalone layout, WhatsApp-only CTA
  { path: '/id', element: <LandingID /> },
  // Market landing page (Australia) — standalone layout, AUD pricing, form CTA
  { path: '/au', element: <LandingAU /> },
]
