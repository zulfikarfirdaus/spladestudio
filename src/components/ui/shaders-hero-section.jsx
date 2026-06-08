import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import './shaders-hero-section.css'

export function ShaderBackground({ children }) {
  return (
    <div className="hero-bg min-h-screen w-full relative overflow-hidden">
      {/* SVG filter used by the badge blur */}
      <svg className="absolute inset-0 w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02  0 1 0 0 0.02  0 0 1 0 0.05  0 0 0 0.9 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Animated secondary glow */}
      <div className="hero-glow" aria-hidden="true" />

      {children}
    </div>
  )
}

export function PulsingCircle() {
  const CONTAINER_SIZE = 140
  const BORDER_SIZE    = 100
  const SVG_SCALE      = 1.5
  const TEXT_RADIUS    = 38
  const TEXT_SIZE      = 7
  const SPIN_DURATION  = 22
  const CIRCUMFERENCE  = +(2 * Math.PI * TEXT_RADIUS).toFixed(2)

  return (
    <div className="pulsing-circle absolute bottom-8 right-8 z-30">
      <div className="relative flex items-center justify-center"
        style={{ width: `${CONTAINER_SIZE}px`, height: `${CONTAINER_SIZE}px` }}
      >
        {/* CSS orb replaces PulsingBorder */}
        <div
          className="orb-pulse"
          style={{ width: `${BORDER_SIZE}px`, height: `${BORDER_SIZE}px`, borderRadius: '50%' }}
        />

        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: SPIN_DURATION, repeat: Infinity, ease: "linear" }}
          style={{ transform: `scale(${SVG_SCALE})` }}
        >
          <defs>
            <path
              id="topo-circle"
              d={`M 50,50 m -${TEXT_RADIUS},0 a ${TEXT_RADIUS},${TEXT_RADIUS} 0 1,1 ${TEXT_RADIUS * 2},0 a ${TEXT_RADIUS},${TEXT_RADIUS} 0 1,1 -${TEXT_RADIUS * 2},0`}
            />
          </defs>
          <text fontSize={TEXT_SIZE} fill="rgba(255,255,255,0.75)"
            textLength={CIRCUMFERENCE} lengthAdjust="spacing">
            <textPath href="#topo-circle" startOffset="0%">
              CUSTOM DESIGN • 2-WEEK DELIVERY • CUSTOM FEATURE •
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  )
}

export function HeroContent() {
  return (
    <main className="absolute bottom-8 z-20" style={{ left: 'clamp(24px, 4%, 80px)', maxWidth: '620px' }}>
      <div className="text-left">
        <div
          className="inline-flex items-center rounded-full bg-white/5 backdrop-blur-sm relative"
          style={{ filter: "url(#glass-effect)", padding: '8px 18px', marginBottom: '24px' }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-sm font-light relative z-10">
            ✨ Custom websites for business
          </span>
        </div>

        <h1
          className="text-7xl tracking-tight font-light text-white"
          style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.05, marginBottom: '20px' }}
        >
          <span
            className="font-semibold italic"
            style={{ fontFamily: "'Crete Round', serif" }}
          >Splade</span>{' '}Studio
        </h1>

        <p className="text-sm font-light text-white/70 leading-relaxed"
          style={{ marginBottom: '32px' }}
        >
          We craft custom websites that help businesses grow and stand out.<br className="hero-br" />
          {' '}No templates. No shortcuts. Quality delivered in 2 weeks.
        </p>

        <div className="flex items-center flex-wrap" style={{ gap: '16px' }}>
          <button
            className="shader-btn shader-btn-outline"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See our projects
          </button>
          <Link to="/contact" className="shader-btn shader-btn-solid">
            Get in touch
          </Link>
        </div>
      </div>
    </main>
  )
}
