import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imgAgreement from '../../assets/process-agreement.webp'
import imgDesign from '../../assets/process-design.webp'
import imgApproval from '../../assets/process-approval.webp'
import '../sections/Process.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Agreement',
    desc: 'Kita samakan visi, brand, dan referensinya dulu sebelum baris kode pertama ditulis.',
    image: imgAgreement,
  },
  {
    num: '02',
    title: 'Design & Build',
    desc: 'Desain dan development berjalan bersamaan — iterasi cepat dengan hasil berkualitas.',
    image: imgDesign,
  },
  {
    num: '03',
    title: 'Approval',
    desc: 'Kita review bareng dan revisi sampai benar-benar pas. Kamu approve, website launch.',
    image: imgApproval,
  },
]

export default function ProcessID() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.process-col').forEach((col, i) => {
        gsap.fromTo(col,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="process" ref={sectionRef}>
      <div className="container">
        <h2 className="heading-lg process__heading">Prosesnya simpel.<br />Hasilnya jelas.</h2>
        <div className="process__grid">
          {steps.map((s) => (
            <div className="process-col" key={s.num}>
              <div className="process-col__img">
                <img src={s.image} alt={s.title} />
              </div>
              <div className="process-col__body">
                <span className="process-col__num">{s.num}</span>
                <h3 className="process-col__title">{s.title}</h3>
                <p className="process-col__desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
