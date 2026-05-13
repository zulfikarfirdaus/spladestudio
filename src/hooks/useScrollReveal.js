import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(selector, options = {}) {
  useEffect(() => {
    const els = gsap.utils.toArray(selector)
    if (!els.length) return

    const {
      y = 40,
      x = 0,
      scale = 1,
      stagger = 0.12,
      duration = 0.8,
      ease = 'power3.out',
      start = 'top 85%',
    } = options

    const ctx = gsap.context(() => {
      gsap.fromTo(
        els,
        { opacity: 0, y, x, scale },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          ease,
          stagger,
          scrollTrigger: {
            trigger: els[0],
            start,
            once: true,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [selector])
}
