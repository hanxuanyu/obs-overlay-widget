import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  // 根据构建环境动态设置base路径
  const base = (() => {
    // 开发模式使用根路径
    if (command === 'serve') {
      return '/'
    }
    
    // 生产模式检查是否有指定的base路径（用于GitHub Pages）
    if (env.VITE_BASE_PATH) {
      return env.VITE_BASE_PATH
    }
    
    // 默认使用相对路径，适用于任何部署场景
    return './'
  })()

  return {
    plugins: [vue()],
    base,
  }
})
