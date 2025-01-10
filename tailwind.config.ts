import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        main: "var(--main)",
        mainDark: "var(--main-dark)",
        mainLight: "var(--main-light)",
        border: "var(--color-border)",
        text: "var(--color-text)",
        textHighlight: "var(--color-text-highlight)",
      },
    },
  },
};
