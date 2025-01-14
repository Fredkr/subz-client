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
      borderWidth: {
        1: "1px",
      },
      fontSize: {
        "body-sm": ["0.75rem", { lineHeight: "1rem", fontWeight: 400 }],
        "body-md": ["0.875rem", { lineHeight: "1.25rem", fontWeight: 400 }],
        "body-lg": ["1rem", { lineHeight: "1.5rem", fontWeight: 400 }],
        "label-sm": ["0.6875rem", { lineHeight: "1rem", fontWeight: 700 }],
        "label-md": ["0.75rem", { lineHeight: "1rem", fontWeight: 700 }],
        "label-lg": ["0.875rem", { lineHeight: "1.25rem", fontWeight: 600 }],
        "title-sm": ["0.875rem", { lineHeight: "1.25rem", fontWeight: 500 }],
        "title-md": ["1rem", { lineHeight: "1.5rem", fontWeight: 700 }],
        "title-lg": ["1.25rem", { lineHeight: "1.75rem", fontWeight: 700 }],
        "headline-sm": ["1.5rem", { lineHeight: "2rem", fontWeight: 700 }],
        "headline-md": ["1.75rem", { lineHeight: "2.25rem", fontWeight: 700 }],
        "headline-lg": ["2rem", { lineHeight: "2.5rem", fontWeight: 700 }],
      },
    },
  },
};
