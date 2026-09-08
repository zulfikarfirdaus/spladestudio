import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(selector, options = {}) {
  // Destructured out here so the effect depends on primitives. Every caller
  // passes an object literal, so depending on `options` itself would tear down
  // and rebuild the ScrollTrigger on every single render.
  const {
    y = 40,
    x = 0,
    scale = 1,
    stagger = 0.12,
    duration = 0.8,
    ease = 'power3.out',
    start = 'top 85%',
  } = options

  useEffect(() => {
    const els = gsap.utils.toArray(selector)
    if (!els.length) return

    // Reveal-on-scroll starts at opacity 0. If the visitor has asked for less
    // motion, skip straight to the resting state rather than leaving content
    // invisible until an animation they never see would have run.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(els, { opacity: 1, y: 0, x: 0, scale: 1 })
      return
    }

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
  }, [selector, y, x, scale, stagger, duration, ease, start])
}
