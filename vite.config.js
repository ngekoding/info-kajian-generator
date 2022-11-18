import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/info-kajian-generator/' : '/',
    plugins: [
      vue(),
      Icons({ compiler: 'vue3' }),
      Components({
        resolvers: [IconsResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
})
