import { useRef, useState, useEffect } from 'react'
import { ShaderBackground, PulsingCircle } from '../ui/shaders-hero-section'
import { waHref, trackWaContact } from '../../lib/wa'
import WaIcon from './WaIcon'
import './lp-id.css'

function HeroContentID() {
  return (
    <main className="hero-anchor absolute bottom-8 z-20" style={{ left: 'clamp(24px, 4%, 80px)', maxWidth: '720px' }}>
      <div className="text-left">
        <div
          className="inline-flex items-center rounded-full bg-white/5 backdrop-blur-sm relative"
          style={{ filter: 'url(#glass-effect)', padding: '8px 18px', marginBottom: '24px' }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="inline-flex items-center text-white/90 text-sm font-light relative z-10" style={{ gap: '8px' }}>
            Website custom untuk bisnismu
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
          Website custom yang bikin bisnis kamu naik kelas.<br className="hero-br" />
          {' '}Didesain dengan taste, didevelop dengan kualitas. Bukan template yang gitu-gitu aja.
        </h1>

        <div className="flex items-center flex-wrap" style={{ gap: '16px' }}>
          <a href="#work" className="shader-btn shader-btn-outline">
            Lihat hasil karya
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWaContact}
            className="shader-btn shader-btn-solid shader-btn-wa"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <WaIcon size={16} />
            Chat via WhatsApp
          </a>
        </div>
      </div>
    </main>
  )
}

export default function HeroID() {
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
        <HeroContentID />
        <PulsingCircle playing={isVisible} />
      </ShaderBackground>
    </div>
  )
}
