// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    devServer: {
    port: 3003,
    host: 'localhost' // or '0.0.0.0' to allow external access
  },

    nitro: {
    prerender: {
      routes: ['/', '/404.html'],  // Changed: Added '/' to generate index.html
      ignore: ['/dynamic-routes', '/api'],
      failOnError: false
    }
  },

  app: {
    head: {
      title: 'Flybeth - Premium B2B Travel Solutions & Flight Booking',
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Empowering travel agencies with exclusive wholesale inventory, seamless flight booking wizards, and global travel technology. Experience the future of travel with Flybeth TAAP." },
        { name: "format-detection", content: "telephone=no" },
        { name: "keywords", content: "Flybeth, B2B travel, travel agency portal, group flight booking, wholesale flights, travel technology, TAAP, flight wizard" },
        { name: "robots", content: "index, follow" },

        // Open Graph Meta Tags
        { property: "og:title", content: "Flybeth - Premium B2B Travel Solutions" },
        { property: "og:description", content: "Empowering travel agencies with exclusive wholesale inventory and seamless booking technology." },
        { property: "og:image", content: "/logo.png" },
        { property: "og:url", content: "https://agent.flybeth.com" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Flybeth" },

        // Twitter Cards
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Flybeth - Premium B2B Travel Solutions" },
        { name: "twitter:description", content: "Empowering travel agencies with exclusive wholesale inventory and seamless booking technology." },
        { name: "twitter:image", content: "/logo.png" },
        { name: "twitter:site", content: "@flybeth" },
      ],
      link: [
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
        { rel: "icon", type: "image/png", href: "/logo.png" },

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
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.VITE_GOOGLE_API_KEY || process.env.GOOGLE_API_KEY,
      apiBase: process.env.VITE_BASE_URL || 'http://localhost:3000/api/v1'
    }
  }
})
