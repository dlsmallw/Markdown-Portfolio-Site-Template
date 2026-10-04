import path from 'path';
import { fileURLToPath } from 'url';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills';

import { markdownPreprocess } from './plugins';

export default defineConfig({
  plugins: [
    markdownPreprocess(path.join(__dirname, '/src/static/markdown')),
    react(),
    svgr(),
    nodePolyfills({
      globals: {
        Buffer: true,
      },
    }),
  ],
  server: {
    open: true 
  },
  resolve: {
    alias: {
      '@static': fileURLToPath(new URL('./src/static', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@typing': fileURLToPath(new URL('./src/typing', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
});