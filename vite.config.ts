import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/components/**/*.{vue,ts}'],
    })
  ],
  build: {
    outDir: "dist",
    lib: {
      entry: "./src/components/index.ts",
      name: "ZLPipeline",
      fileName: "ZLPipeline-ts",
    },
    rollupOptions: {
      external: ["vue", 'elementPlus'],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        }
      }
    }
  },
  server: {				
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
