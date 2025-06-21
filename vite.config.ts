import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // Vite 配置中用于处理 CSS 相关设置的选项
  css: {
    // 用于配置 CSS 预处理器（如 Less、Sass、Stylus 等）。这里指定了 Less 的配置
    preprocessorOptions: {
      // 表示要对 Less 文件进行特殊处理
      less: {
        // Ant Design 提供的主题变量覆盖方式
        modifyVars: {
          'primary-color': '#1890ff', // 修改主色调（默认是 #1890ff）
          'link-color': '#1DA57A', // 修改链接颜色
          'border-radius-base': '2px' // 修改基础边框圆角（默认是 2px，这里保持原样）
        },
        // 启用 JavaScript 支持，以便在 Less 中使用 JavaScript 表达式
        // 这对于 Ant Design 的主题定制是必要的
        javascriptEnabled: true
      }
    }
  },
  // 让 Vite 使用 Vue 插件来支持 .vue 文件的编译和热更新
  // Vite 默认是一个通用构建工具，它本身不直接支持 Vue。通过 vue() 插件
  plugins: [vue()] // 启用 Vue 支持 如有其他插件，vue()必须放在前面
})
