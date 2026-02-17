import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'react-frontend',
      'localhost',
      '.twc1.net',
      '6106779-ee569251.twc1.net'
    ],
    strictPort: true,
    hmr: {
      host: '6106779-ee569251.twc1.net',
      protocol: 'ws',
      clientPort: 80
    },
    cors: true
  },
  preview: {
    port: 5173,
    host: true,
    allowedHosts: [
      'react-frontend',
      'localhost',
      '.twc1.net',
      '6106779-ee569251.twc1.net'
    ]
  }
})