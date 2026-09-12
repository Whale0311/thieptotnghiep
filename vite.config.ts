import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    // GitHub Actions sets this to /<repository>/; Vercel and local builds use /.
    base: env.VITE_BASE_PATH || '/',
    plugins: [react()],
  }
})
