// Nuxt 3 basic config for a monolith (SSR + API routes)
export default defineNuxtConfig({
  devtools: { enabled: false },
  nitro: {
    preset: 'node-server'
  },
  app: {
    head: {
      title: 'Client Portal',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }
  }
})

