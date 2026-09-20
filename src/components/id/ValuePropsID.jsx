import { Zap, Layers, Settings } from 'lucide-react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import '../sections/ValueProps.css'

const props = [
  {
    icon: <Layers size={20} />,
    title: 'Custom, bukan template',
    desc: 'Didesain dan dibangun khusus untuk brand kamu. Bukan template yang cuma ganti logo.',
  },
  {
    icon: <Settings size={20} />,
    title: 'Fleksibel',
    desc: 'Butuh fitur custom atau CMS? Kita diskusikan, lalu kami bangun persis sesuai kebutuhan kamu.',
  },
  {
    icon: <Zap size={20} />,
    title: 'No lemot',
    desc: 'Dibangun untuk skor PageSpeed 90+ dengan struktur SEO yang rapi. Websitenya cantik, speednya juga oke.',
  },
]

export default function ValuePropsID() {
  useScrollReveal('.value-card', { stagger: 0.15, y: 30 })

  return (
    <section className="values">
      <div className="container">
        <h2 className="heading-lg values__heading">Didesain dengan unik.<br />Untuk brand yang solid.</h2>
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
