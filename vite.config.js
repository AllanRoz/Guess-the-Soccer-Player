import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev: serve at http://localhost:5173/
// Prod: relative asset paths so GitHub Pages / any subfolder works.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : './',
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 4173,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
}));
