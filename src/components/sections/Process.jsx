import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imgAgreement from '../../assets/process-agreement.png'
import imgDesign from '../../assets/process-design.png'
import imgApproval from '../../assets/process-approval.png'
import './Process.css'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Agreement',
    desc: 'We align on your brand, vision, and references before a single line of code is written.',
    image: imgAgreement,
  },
  {
    num: '02',
    title: 'Design & Build',
    desc: 'I design and build simultaneously using vibe coding — fast iterations with quality output.',
    image: imgDesign,
  },
  {
    num: '03',
    title: 'Approval',
    desc: "We review together and refine until it's exactly right. Your sign-off, your site.",
    image: imgApproval,
  },
]

export default function Process() {
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
        <h2 className="heading-lg process__heading">Simple process.<br />Clear outcomes.</h2>
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
