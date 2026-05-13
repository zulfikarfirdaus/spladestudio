import { Zap, Layers, Settings } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './ValueProps.css'

const props = [
  {
    icon: <Zap size={20} />,
    title: 'Fast',
    desc: '2-week delivery from agreement to launch. No endless back-and-forth.',
  },
  {
    icon: <Layers size={20} />,
    title: 'Quality',
    desc: 'Custom-designed and built for your brand. Not a template with a logo swap.',
  },
  {
    icon: <Settings size={20} />,
    title: 'Flexible',
    desc: "Need a custom feature or CMS? We'll discuss it and build exactly what you need.",
  },
]

export default function ValueProps() {
  useScrollReveal('.value-card', { stagger: 0.15, y: 30 })

  return (
    <section className="values">
      <div className="container">
        <h2 className="heading-lg values__heading">Built different.<br />Delivered fast.</h2>
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
