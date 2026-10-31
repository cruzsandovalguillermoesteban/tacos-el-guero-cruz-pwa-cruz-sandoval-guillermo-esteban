module.exports = {
  globDirectory: ".",
  globPatterns: [
    "**/*.{html,css,js,json,jpg,jpeg,png,webp,svg,ico}"
  ],
  globIgnores: [
    "docs/**",
    "servidor-ssr*/**",
    "**/*lighthouse*.*",
    "workbox-config.js",
    "node_modules/**"
  ],
  swDest: "sw.js",
  skipWaiting: true,
  clientsClaim: true,
  navigateFallback: "index.html",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/(cdnjs\.cloudflare\.com|unpkg\.com)\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'librerias-mapas'
      }
    }
  ]
};