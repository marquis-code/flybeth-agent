// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    devServer: {
    port: 3003,
    host: 'localhost' // or '0.0.0.0' to allow external access
  },

  app: {
    head: {
      title: 'Grocart - Fresh Groceries Delivered to Your Doorstep',
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Shop from multiple supermarkets and local stores. Get fresh produce, household essentials, and more delivered in as little as 30 minutes with Grocart." },
        { name: "format-detection", content: "telephone=no" },
        { name: "keywords", content: "Grocart, grocery delivery, fresh groceries, supermarket delivery, food delivery, household essentials, online grocery shopping" },
        { name: "robots", content: "index, follow" },

        // Open Graph Meta Tags
        { property: "og:title", content: "Grocart - Fresh Groceries Delivered to Your Doorstep" },
        { property: "og:description", content: "Shop from multiple supermarkets and local stores. Get fresh produce, household essentials, and more delivered in as little as 30 minutes." },
        { property: "og:image", content: "/images/grocart-og-image.jpg" },
        { property: "og:url", content: "https://www.grocart.com" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Grocart" },

        // Twitter Cards
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Grocart - Fresh Groceries Delivered to Your Doorstep" },
        { name: "twitter:description", content: "Shop from multiple supermarkets and local stores. Get fresh produce, household essentials, and more delivered in as little as 30 minutes." },
        { name: "twitter:image", content: "/images/grocart-twitter-image.jpg" },
        { name: "twitter:site", content: "@grocart" },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "anonymous" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap" }
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js",
          type: "text/javascript",
        },
      ],
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  components: [
    {
      path: '~/components/ui',
      pathPrefix: false,
    },
    '~/components',
  ],
    googleFonts: {
    families: {
      "Inter": [400, 500, 600, 700],
      "Poppins": [400, 500, 600, 700],
      "Onest": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: "swap",
    preload: true,
  },
  css: ['~/assets/css/main.css', '~/assets/font/stylesheet.css'],
})
