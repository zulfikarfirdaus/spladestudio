import { Zap, Layers, Settings } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './ValueProps.css'

const props = [
  {
    icon: <Layers size={20} />,
    title: 'Crafted, not templated',
    desc: 'Custom-designed and built for your brand. Not a template with a logo swap.',
  },
  {
    icon: <Settings size={20} />,
    title: 'Flexible',
    desc: "Need a custom feature or CMS? We'll discuss it and build exactly what you need.",
  },
  {
    icon: <Zap size={20} />,
    title: 'Fast where it counts',
    desc: 'Built for 90+ PageSpeed and clean technical SEO. A beautiful site that loads slowly loses the visitor anyway.',
  },
]

export default function ValueProps() {
  useScrollReveal('.value-card', { stagger: 0.15, y: 30 })

  return (
    <section className="values">
      <div className="container">
        <h2 className="heading-lg values__heading">Built different.<br />Made to last.</h2>
        <div className="values__grid">
          {props.map((p) => (
            <div className="value-card reveal" key={p.title}>
              <div className="value-card__icon-box">{p.icon}</div>
              <h3 className="value-card__title">{p.title}</h3>
              <p className="value-card__desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
