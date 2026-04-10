import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/mermaid')) return 'mermaid';
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom')
          )
            return 'react';
          if (id.includes('node_modules/recharts')) return 'recharts';
          if (id.includes('node_modules/firebase')) return 'firebase';
          if (
            id.includes('node_modules/framer-motion') ||
            id.includes('node_modules/motion')
          )
            return 'motion';
          if (id.includes('node_modules/axios')) return 'axios';
          if (id.includes('node_modules/tailwindcss')) return 'tailwind';
        },
      },
    },
  },
})
