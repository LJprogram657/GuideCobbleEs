import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/cobblemon-proxy': {
        target: 'https://cobblemon.tools',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/cobblemon-proxy/, ''),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept': '*/*',
        },
      },
    },
  },
  preview: {
    proxy: {
      '/cobblemon-proxy': {
        target: 'https://cobblemon.tools',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/cobblemon-proxy/, ''),
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'Accept': '*/*',
        },
      },
    },
  },
});
