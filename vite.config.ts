import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';

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
  }
})