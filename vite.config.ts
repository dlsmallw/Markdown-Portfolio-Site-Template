import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: 'default' },
      include: '**/*.svg',
    }),
    nodePolyfills({
      globals: {
        Buffer: true, // Injects the Buffer global polyfill
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