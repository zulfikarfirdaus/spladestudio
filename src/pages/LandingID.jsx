import Seo from '../components/Seo'
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

// Dedicated landing page for Meta Ads (Indonesia).
// Self-contained: own navbar/footer, no internal site links, WhatsApp-only CTA.
export default function LandingID() {
  return (
    <>
      {/* Ad landing page — noindex keeps it out of search so it never
          competes with the main site for the same terms. */}
      <Seo
        title="Splade Studio — Jasa Pembuatan Website Custom"
        description="Website custom untuk bisnis kamu. Didesain dengan taste, dibangun untuk kencang di Google. Mulai Rp 5jt, sekali bayar. Konsultasi gratis via WhatsApp."
        path="/id"
        lang="id"
        noindex
        ogTitle="Bikin Website Custom untuk Bisnis Kamu — Splade Studio"
        ogDescription="Bukan template. Didesain dari nol, kencang di Google, mulai Rp 5jt sekali bayar. Konsultasi gratis via WhatsApp."
      />
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
