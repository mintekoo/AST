/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class", // important for next-themes
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      transitionTimingFunction: {
        standard: "cubic-bezier(.2,.6,.2,1)",
      },
      transitionDuration: {
        DEFAULT: "0.3s",
      },
    },
  },
};
