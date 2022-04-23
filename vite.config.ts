import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import yaml from '@rollup/plugin-yaml'
import Unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/map_detachments/",
  plugins: [
    vue(),
    yaml(),  
    Unocss(),
  ]
})
