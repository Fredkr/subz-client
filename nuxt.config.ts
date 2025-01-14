import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@pinia/nuxt",
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.BACKEND_URL || "http://localhost:8080", // Your backend URL
    },
    authSecret: process.env.NUXT_API_SECRET,
    authOrigin: process.env.NUXT_API_ORIGIN,
  },
  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/theme.css",
    "~/assets/css/main.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
});
