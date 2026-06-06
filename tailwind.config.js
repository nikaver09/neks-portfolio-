/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        heading: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: "#0a0a0f",      /* Main background - keeping the dark base */
        surface: "#111118",  /* Section backgrounds */
        card: "#16161f",     /* Card backgrounds */
        accent: "#EDEFDF",   /* Charcoal - Your new primary accent color */
        accent2: "#e5e7eb",  /* Light Gray - Secondary highlight */
        muted: "#374151",    /* Dark Gray - Great for subtle borders or inactive states */
        ghost: "#6b7280",    /* Medium-Dark Gray - Perfect for secondary, less important text */
        snow: "#ffffff",     /* Pure White - For your brightest, most important text/headings */
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        marquee: "marquee 25s linear infinite",
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
      },
    },
  },
  plugins: [],
};