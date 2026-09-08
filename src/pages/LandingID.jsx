import { Head } from 'vite-react-ssg'
import NavbarID from '../components/id/NavbarID'
import FooterID from '../components/id/FooterID'
import HeroID from '../components/id/HeroID'
import StatementID from '../components/id/StatementID'
import ValuePropsID from '../components/id/ValuePropsID'
import ProcessID from '../components/id/ProcessID'
import WorkPreviewID from '../components/id/WorkPreviewID'
import TestimonialsID from '../components/id/TestimonialsID'
import PricingID from '../components/id/PricingID'
import CTAID from '../components/id/CTAID'
import MetaPixel from '../components/id/MetaPixel'

// Dedicated landing page for Meta Ads (Indonesia).
// Self-contained: own navbar/footer, no internal site links, WhatsApp-only CTA.
export default function LandingID() {
  return (
    <>
      <Head>
        <title>Splade Studio — Jasa Pembuatan Website Custom</title>
        <meta
          name="description"
          content="Website custom untuk bisnis kamu. Didesain dengan taste, dibangun untuk kencang di Google. Mulai Rp 5jt, sekali bayar. Konsultasi gratis via WhatsApp."
        />
        {/* Ad landing page — keep out of search results so it never competes with the main site */}
        <meta name="robots" content="noindex, nofollow" />
        <html lang="id" />
      </Head>
      <MetaPixel />
      <NavbarID />
      <main>
        <HeroID />
        <StatementID />
        <ValuePropsID />
        <ProcessID />
        <WorkPreviewID />
        <TestimonialsID />
        <PricingID />
        <CTAID />
      </main>
      <FooterID />
    </>
  )
}
