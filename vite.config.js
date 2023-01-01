import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5000
  },
  plugins: [
    vue(),
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      // compositionOnly: false,

      // you need to set i18n resource including paths !
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/lang/**')
    }),
    Icons({ compiler: 'vue3' })
    // legacy({
    //   targets: ['defaults', 'not IE 11']
    // })
  ],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`
    }
  }
})
