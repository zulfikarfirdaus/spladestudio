import { PulsingBorder } from "@paper-design/shaders-react"
import { motion } from "framer-motion"

const BORDER_SIZE = 100
const SVG_SCALE = 1.5
const TEXT_RADIUS = 38
const TEXT_SIZE = 7
const SPIN_DURATION = 22
const CIRCUMFERENCE = +(2 * Math.PI * TEXT_RADIUS).toFixed(2)

// Isolated in its own chunk so @paper-design/shaders-react + framer-motion
// only load on devices that actually render this decoration (desktop —
// shaders-hero-section.css hides it on mobile).
export default function PulsingCircleVisual({ speed = 1 }) {
  return (
    <>
      <PulsingBorder
        colors={["#BEECFF", "#E77EDC", "#FF4C3E", "#00FF88", "#FFD700", "#FF6B35", "#8A2BE2"]}
        colorBack="#00000000"
        speed={speed}
        roundness={1}
        thickness={0.1}
        softness={0.2}
        intensity={3}
        spots={3}
        spotSize={0.1}
        pulse={0.1}
        smoke={0.2}
        smokeSize={2}
        scale={0.65}
        rotation={0}
        frame={9161408.251009725}
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
    </>
  )
}
