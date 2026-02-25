import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  extends: [
    './layers/base',
    './layers/blog',
    './layers/github',
    './layers/auth',
  ],
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4,
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
})