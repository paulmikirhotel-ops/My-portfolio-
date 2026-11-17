import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    // Three.js lives in its own lazy-loaded chunk (see App.jsx), so the
    // initial page stays small. Raise the warning limit just above it.
    chunkSizeWarningLimit: 650,
  },
})
