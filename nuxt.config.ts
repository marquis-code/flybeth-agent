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
      title: 'Flybeth Agent | Premium Travel Management',
      meta: [
        { name: 'description', content: 'Flybeth Agent Portal — Empowering travel professionals with intelligent tools.' },
        { name: 'author', content: 'Flybeth' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Spectral:wght@400;500;600;700&display=swap' }
      ]
    }
  },
  modules: ['@nuxtjs/tailwindcss'],
  components: [
    {
      path: '~/components/ui',
      pathPrefix: false,
    },
    '~/components',
  ],
  css: ['~/assets/css/main.css'],
})
