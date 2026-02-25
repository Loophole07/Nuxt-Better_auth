

export default defineNuxtConfig({
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
    betterAuthSecret: process.env.BETTER_AUTH_SECRET,
    public: {
      betterAuthUrl: process.env.BETTER_AUTH_URL
    }
  }
})