import { useRef, useState, useEffect } from 'react'
import { ShaderBackground, HeroContent, PulsingCircle } from '../ui/shaders-hero-section'

export default function Hero() {
  const heroRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={heroRef}>
      <ShaderBackground playing={isVisible}>
        <HeroContent />
        <PulsingCircle playing={isVisible} />
      </ShaderBackground>
    </div>
  )
}
