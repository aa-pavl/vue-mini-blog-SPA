import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://91.220.155.234:8080', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/FrontTestingService-back') // /api/user → /backend-api/user
      },
      '/auth': {
        target: 'http://91.220.155.234:8080', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, '/FrontTestingService-auth') // /api/user → /backend-api/user
      },
    }
  }
})
