import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 部署到线上时由平台注入 PORT，本地开发回落到默认端口
const PORT = Number(process.env.PORT) || 5173

export default defineConfig({
  base: './',
  plugins: [react()],
  // 开发/预览服务：监听 0.0.0.0 并允许反向代理域名访问
  server: {
    host: '0.0.0.0',
    port: PORT,
    strictPort: false,
    allowedHosts: true
  },
  preview: {
    host: '0.0.0.0',
    port: PORT,
    strictPort: false,
    allowedHosts: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
