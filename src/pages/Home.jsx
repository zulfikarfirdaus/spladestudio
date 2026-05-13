import Hero from '../components/sections/Hero'
import Statement from '../components/sections/Statement'
import ValueProps from '../components/sections/ValueProps'
import Process from '../components/sections/Process'
import WorkPreview from '../components/sections/WorkPreview'
import Testimonials from '../components/sections/Testimonials'
import CTA from '../components/sections/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <ValueProps />
      <Process />
      <WorkPreview />
      <Testimonials />
      <CTA />
    </>
  )
}
