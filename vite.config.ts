import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: [
        'src/components/**/*.{vue,ts}',
        './auto-imports.d.ts',
        './components.d.ts'
      ]
    }),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        ElementPlusResolver()
      ],
    }),
    Icons({
      autoInstall: true,
    }),
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
