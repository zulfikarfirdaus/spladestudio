import Seo from '../components/Seo'
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
      <Seo
        title="Splade Studio — Custom Websites, Designed and Built From Scratch"
        description="We design and build custom websites. No templates, no shortcuts — built for 90+ PageSpeed and clean technical SEO, with a custom CMS if you need it."
        path="/"
        ogTitle="Splade Studio — Custom Websites. Delivered Fast."
        ogDescription="We design and build custom websites. No templates. No shortcuts. Built to load fast and rank."
      />
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
