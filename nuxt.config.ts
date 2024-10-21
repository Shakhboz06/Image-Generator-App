// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig: {
    API_KEY: process.env.API_KEY
  },

  modules: ['@nuxt/ui'],
})