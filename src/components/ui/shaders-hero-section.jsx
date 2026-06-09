import { PulsingBorder, MeshGradient } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useRef } from "react"
import './shaders-hero-section.css'

export function ShaderBackground({ children, playing = true }) {
  const containerRef = useRef(null)

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full relative overflow-hidden"
      style={{ contain: 'layout style', background: '#000' }}
    >
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#000000", "#0a2e10", "#B9E600", "#041808", "#1a5020"]}
        speed={0.12}
        backgroundColor="#000000"
        playing={playing}
      />

      {children}
    </div>
  )
}

export function PulsingCircle({ playing = true }) {
  const CONTAINER_SIZE  = 140
  const BORDER_SIZE     = 100
  const SVG_SCALE       = 1.5
  const TEXT_RADIUS     = 38
  const TEXT_SIZE       = 7
  const SPIN_DURATION   = 22
  const CIRCUMFERENCE   = +(2 * Math.PI * TEXT_RADIUS).toFixed(2)

  return (
    <div className="pulsing-circle absolute bottom-8 right-8 z-30">
      <div className="relative flex items-center justify-center"
        style={{ width: `${CONTAINER_SIZE}px`, height: `${CONTAINER_SIZE}px` }}
      >
        <PulsingBorder
          colors={["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700", "#FF6B35", "#8A2BE2"]}
          colorBack="#00000000"
          speed={1}
          roundness={1}
          thickness={0.1}
          softness={0.2}
          intensity={3}
          spotsPerColor={3}
          spotSize={0.1}
          pulse={0.1}
          smoke={0.2}
          smokeSize={2}
          scale={0.65}
          rotation={0}
          frame={9161408.251009725}
          playing={playing}
          style={{ width: `${BORDER_SIZE}px`, height: `${BORDER_SIZE}px`, borderRadius: "50%" }}
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
          <Link to="/work" className="shader-btn shader-btn-outline">
            See our projects
          </Link>
          <Link to="/contact" className="shader-btn shader-btn-solid">
            Get in touch
          </Link>
        </div>
      </div>
    </main>
  )
}
