/*
 * @Desc: 
 * @Autor: cxt
 * @Date: 2021-06-03 17:09:58
 * @LastEditors: cxt
 * @LastEditTime: 2021-06-03 17:21:45
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: 'vant',
          style(name) {
            if (/CompWithoutStyleFile/i.test(name)) {
              // This will not import any style file 
              return false
            }
            return `vant/es/${name}/index.css`
          }
        },
      ]
    })
  ]
})
