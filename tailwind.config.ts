import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        urbanist: ["var(--font-urbanist)", "sans-serif"],
      },
      colors: {
        brand: {
          red: "#B22234",
          navy: "#3C3B6E",
          dark: "#050505",
        },
      },
      backgroundImage: {
        'glass-gradient': "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      },
    },
  },
  plugins: [],
};

export default config;