/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        tech: ["'Oxanium'", "sans-serif"],
        display: ["'Oxanium'", "'Bricolage Grotesque'", "'Bebas Neue'", "sans-serif"],
        heading: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Courier New'", "monospace"],
      },
      colors: {
        ink: "#000000",
        surface: "#EDEDED",
        card: {
          DEFAULT: "var(--card-bg, #181818)",
          foreground: "var(--card-fg, #ededed)",
        },
        background: "var(--background, #111111)",
        foreground: "var(--foreground, #ededed)",
        muted: {
          DEFAULT: "var(--muted-bg, #1c1c1c)",
          foreground: "var(--muted-fg, #888888)",
        },
        border: "var(--border, rgba(255, 255, 255, 0.12))",
        accent: "#000000",
        accentLime: "#000000",
        accent2: "#1a1a1a",
        ghost: "#444444",
        snow: "#000000",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 15s linear infinite",
        marquee: "marquee 18s linear infinite",
        "marquee-left": "marquee-left var(--marquee-duration) linear var(--marquee-loop-count)",
        "marquee-right": "marquee-right var(--marquee-duration) linear var(--marquee-loop-count)",
        "marquee-left-rtl": "marquee-left-rtl var(--marquee-duration) linear var(--marquee-loop-count)",
        "marquee-right-rtl": "marquee-right-rtl var(--marquee-duration) linear var(--marquee-loop-count)",
        "marquee-up": "marquee-up var(--marquee-duration) linear var(--marquee-loop-count)",
        "marquee-down": "marquee-down var(--marquee-duration) linear var(--marquee-loop-count)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(calc(-100% - var(--marquee-gap)))" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(calc(-100% - var(--marquee-gap)))" },
          "100%": { transform: "translateX(0%)" },
        },
        "marquee-up": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(calc(-100% - var(--marquee-gap)))" },
        },
        "marquee-down": {
          "0%": { transform: "translateY(calc(-100% - var(--marquee-gap)))" },
          "100%": { transform: "translateY(0%)" },
        },
        "marquee-left-rtl": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(calc(100% + var(--marquee-gap)))" },
        },
        "marquee-right-rtl": {
          "0%": { transform: "translateX(calc(100% + var(--marquee-gap)))" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
