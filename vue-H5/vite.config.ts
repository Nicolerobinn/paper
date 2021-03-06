/*
 * @Desc: 
 * @Autor: cxt
 * @Date: 2021-06-03 17:09:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-06-05 11:21:56
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ],
})
