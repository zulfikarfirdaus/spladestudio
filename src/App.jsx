import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Work from './pages/Work'
import Contact from './pages/Contact'
import LandingID from './pages/LandingID'
import LandingAU from './pages/LandingAU'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

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
