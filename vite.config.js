import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8211,
    open: true,
    hmr: {
      overlay: false  // 禁用 HMR 错误遮罩层
    },
    proxy: {
      // 将 /api 路径代理到 8210 端口
      '/api': {
        target: 'http://gpt.gczdy.cn:8210',
        changeOrigin: true, // 模拟同源请求
        rewrite: (path) => path.replace(/^\/api/, '') // 去掉路径中的 /api 前缀（按需调整）
      }
    }
  }
})
