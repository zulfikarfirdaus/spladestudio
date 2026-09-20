import { Link } from "react-router-dom"
import { Suspense, lazy, useRef, useSyncExternalStore } from "react"
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
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

// @paper-design/shaders has no boolean play/pause prop — speed 0 is how you
// freeze a shader. Anything else (`playing`, `backgroundColor`) is not a known
// param, so the library spreads it onto the underlying <div> as an invalid DOM
// attribute and the animation never actually stops.
const MESH_SPEED = 0.12

export function ShaderBackground({ children, playing = true }) {
  const containerRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const speed = playing && !prefersReducedMotion ? MESH_SPEED : 0

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
          speed={speed}
        />
      </Suspense>

      {children}
    </div>
  )
}

export function PulsingCircle({ playing = true }) {
  const CONTAINER_SIZE = 140
  const prefersReducedMotion = usePrefersReducedMotion()
  // shaders-hero-section.css hides .pulsing-circle below 768px — skip
  // fetching the shader/framer-motion chunk on mobile entirely.
  const showOnDesktop = useSyncExternalStore(
    subscribeToDesktopViewport,
    getIsDesktopViewport,
    getIsDesktopViewportServer
  )

  // Purely decorative: not worth the shader + framer-motion chunks for someone
  // who has asked for reduced motion.
  if (!showOnDesktop || prefersReducedMotion) return null

  return (
    <div className="pulsing-circle hero-anchor absolute bottom-8 right-8 z-30">
      <div className="relative flex items-center justify-center"
        style={{ width: `${CONTAINER_SIZE}px`, height: `${CONTAINER_SIZE}px` }}
      >
        <Suspense fallback={null}>
          <PulsingCircleVisual speed={playing ? 1 : 0} />
        </Suspense>
      </div>
    </div>
  )
}

export function HeroContent() {
  return (
    <main className="hero-anchor absolute bottom-8 z-20" style={{ left: 'clamp(24px, 4%, 80px)', right: 'clamp(24px, 4%, 80px)', maxWidth: '720px' }}>
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
          {' '}Designed with taste, built to last — no templates, no shortcuts.
        </h1>

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
