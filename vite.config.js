import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174,
  },
  build: {
    modulePreload: {
      // Don't preload PulsingCircleVisual (desktop-only decoration) or
      // BlurText (below-the-fold, scroll-triggered) — both are genuinely
      // deferred and shouldn't compete with the critical render path.
      // ShaderMesh is excluded from this filter: it mounts immediately as
      // the hero background, so it still benefits from preloading.
      resolveDependencies: (_filename, deps) =>
        deps.filter((dep) => !/PulsingCircleVisual|BlurText/.test(dep)),
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('react-router')) {
            return 'vendor-react'
          }
          if (id.includes('gsap')) {
            return 'vendor-gsap'
          }
        },
      },
    },
  },
})
