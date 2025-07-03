import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Set base path for deployment (adjust based on your deployment platform)
  base: './',
  
  plugins: [
    react(),
    tailwindcss(),
  ],
  
  // Asset handling configuration
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/logo.png'
      }
    }
  }
})
