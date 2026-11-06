import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa-192x192.png', 'pwa-512x512.png'],
      workbox: {
        navigateFallbackDenylist: [/^\/api\//, /^\/\.netlify\//],
      },
      manifest: {
        name: 'Walow Browser',
        short_name: 'WalowBrowser',
        description: 'متصفح أندرويد الذكي | mohammad walow © 2026',
        lang: 'ar',
        dir: 'rtl',
        theme_color: '#1e1b4b',
        background_color: '#0b0f1d',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
});
