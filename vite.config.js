import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ★ 여기가 포인트!
  plugins: [react()],
})