import { MeshGradient } from "@paper-design/shaders-react"

// Isolated in its own chunk so the WebGL shader lib (@paper-design/shaders-react)
// loads async and never blocks the hero's initial text paint.
export default function ShaderMesh(props) {
  return <MeshGradient className="absolute inset-0 w-full h-full" {...props} />
}
