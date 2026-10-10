import path from 'path';
import { fileURLToPath } from 'url';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills';

import { markdownPreprocess } from './plugins/MarkdownPreprocessing.ts';

export default defineConfig({
  plugins: [
    markdownPreprocess(path.join(import.meta.dirname, '/markdown')),
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
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@routes': fileURLToPath(new URL('./src/routes', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@typing': fileURLToPath(new URL('./src/typing', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
});