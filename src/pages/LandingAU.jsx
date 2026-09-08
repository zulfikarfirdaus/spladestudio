import { useState } from 'react'
import Seo from '../components/Seo'
import NavbarAU from '../components/au/NavbarAU'
import FooterAU from '../components/au/FooterAU'
import HeroAU from '../components/au/HeroAU'
import Statement from '../components/sections/Statement'
import ValueProps from '../components/sections/ValueProps'
import Process from '../components/sections/Process'
import WorkPreviewAU from '../components/au/WorkPreviewAU'
import Testimonials from '../components/sections/Testimonials'
import PricingAU from '../components/au/PricingAU'
import ContactAU from '../components/au/ContactAU'

// Dedicated landing page for the Australian market.
// Self-contained: own navbar/footer, no internal site links, AUD pricing,
// and the contact form folded in as the closing CTA.
export default function LandingAU() {
  // Set by the pricing cards, consumed by the form below them.
  const [service, setService] = useState('')

  return (
    <>
      {/* Market landing page — noindex keeps it out of search so it never
          competes with the main site for the same terms. */}
      <Seo
        title="Splade Studio — Custom Websites for Australian Business"
        description="Custom websites designed and built from scratch for Australian businesses. Flat pricing from A$1,500, live in two weeks. No templates, no lock-in."
        path="/au"
        lang="en-AU"
        noindex
        ogTitle="Custom Websites for Australian Business — Splade Studio"
        ogDescription="Designed and built from scratch. Flat pricing in AUD from A$1,500, live in two weeks. No templates, no lock-in."
      />
      <NavbarAU />
      <main>
        <HeroAU />
        <Statement />
        <ValueProps />
        <Process />
        <WorkPreviewAU />
        <Testimonials />
        <PricingAU onPickService={setService} />
        <ContactAU service={service} />
      </main>
      <FooterAU />
    </>
  )
}
