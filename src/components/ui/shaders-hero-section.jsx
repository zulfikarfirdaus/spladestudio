import { Link } from "react-router-dom"
import { Suspense, lazy, useRef, useSyncExternalStore } from "react"
import './shaders-hero-section.css'

// Both pull in @paper-design/shaders-react (WebGL) and/or framer-motion.
// Lazy-loading keeps those out of the critical bundle so the hero's text
// (the actual LCP element) paints before the shader libs even download.
const ShaderMesh = lazy(() => import('./ShaderMesh'))
const PulsingCircleVisual = lazy(() => import('./PulsingCircleVisual'))

function subscribeToDesktopViewport(callback) {
  const mq = window.matchMedia('(min-width: 769px)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}
function getIsDesktopViewport() {
  return window.matchMedia('(min-width: 769px)').matches
}
function getIsDesktopViewportServer() {
  return false
}

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

      <Suspense fallback={<div className="absolute inset-0 w-full h-full shader-mesh-fallback" />}>
        <ShaderMesh
          colors={["#000000", "#0a2e10", "#B9E600", "#041808", "#1a5020"]}
          speed={0.12}
          backgroundColor="#000000"
          playing={playing}
        />
      </Suspense>

      {children}
    </div>
  )
}

export function PulsingCircle({ playing = true }) {
  const CONTAINER_SIZE = 140
  // shaders-hero-section.css hides .pulsing-circle below 768px — skip
  // fetching the shader/framer-motion chunk on mobile entirely.
  const showOnDesktop = useSyncExternalStore(
    subscribeToDesktopViewport,
    getIsDesktopViewport,
    getIsDesktopViewportServer
  )

  if (!showOnDesktop) return null

  return (
    <div className="pulsing-circle absolute bottom-8 right-8 z-30">
      <div className="relative flex items-center justify-center"
        style={{ width: `${CONTAINER_SIZE}px`, height: `${CONTAINER_SIZE}px` }}
      >
        <Suspense fallback={null}>
          <PulsingCircleVisual playing={playing} />
        </Suspense>
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
          <span className="inline-flex items-center text-white/90 text-sm font-light relative z-10" style={{ gap: '8px' }}>
            Custom websites for business
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
          We craft custom websites that help businesses stand out.<br className="hero-br" />
          {' '}Designed with taste, built to last — no templates, no shortcuts.
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
