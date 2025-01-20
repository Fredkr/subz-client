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
        background: "var(--background-color)",
        cardPrimary: "var(--card-primary-color)",
        cardSecondary: "var(--card-secondary-color)",
        actionPrimary: "var(--action-primary-color)",
        shadowPrimary: "var(--shadow-primary-color)",
        textPrimary: "var(--text-primary-color)",
        error: "var(--error-color)",
        warning: "var(--warning-color)",
      },
      textColor: {
        actionPrimary: "var(--action-text-primary-color)",
      },
      dropShadow: {
        sm: "4px 4px 0 rgba(0, 0, 0)",
        md: "8px 8px 0 rgba(0, 0, 0)",
      },
      borderWidth: {
        1: "1px",
        sm: "3px",
        md: "4px",
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
