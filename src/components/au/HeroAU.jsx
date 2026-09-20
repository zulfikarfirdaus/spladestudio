import { useRef, useState, useEffect } from 'react'
import { ShaderBackground, PulsingCircle } from '../ui/shaders-hero-section'
import './lp-au.css'

function HeroContentAU() {
  return (
    <main className="hero-anchor absolute bottom-8 z-20" style={{ left: 'clamp(24px, 4%, 80px)', right: 'clamp(24px, 4%, 80px)', maxWidth: '720px' }}>
      <div className="text-left">
        <div
          className="inline-flex items-center rounded-full bg-white/5 backdrop-blur-sm relative"
          style={{ filter: 'url(#glass-effect)', padding: '8px 18px', marginBottom: '24px' }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="inline-flex items-center text-white/90 text-sm font-light relative z-10" style={{ gap: '8px' }}>
            Custom websites for Australian business
          </span>
        </div>

        <p
          className="hero-wordmark tracking-tight font-light text-white"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <span
            className="font-semibold italic"
            style={{ fontFamily: "'Crete Round', serif" }}
          >Splade</span>{' '}Studio
        </p>

        <h1 className="hero-lede">
          We craft custom websites that help businesses stand out.<br className="hero-br" />
          {' '}Flat pricing in AUD, live in two weeks — no templates, no shortcuts.
        </h1>

        <div className="flex items-center flex-wrap" style={{ gap: '16px' }}>
          <a href="#work" className="shader-btn shader-btn-outline">
            See our projects
          </a>
          <a href="#pricing" className="shader-btn shader-btn-solid">
            See pricing
          </a>
        </div>
      </div>
    </main>
  )
}

export default function HeroAU() {
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
        <HeroContentAU />
        <PulsingCircle playing={isVisible} />
      </ShaderBackground>
    </div>
  )
}
