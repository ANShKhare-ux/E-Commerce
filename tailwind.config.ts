import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: "#FDFBF7",
          subtle: "#F6F2EA",
          border: "#E7DFD3",
        },
        noir: {
          900: "#0D0D0D",
          800: "#18181A",
          700: "#27272A",
          600: "#3F3F46",
          500: "#71717A",
          400: "#A1A1AA",
          300: "#D4D4D8",
          200: "#E4E4E7",
          100: "#F4F4F5",
        },
        gold: {
          50: "#FBF8F2",
          100: "#F5EEDB",
          200: "#EBDBB6",
          300: "#DFC58E",
          400: "#D2AE68",
          500: "#C59B48",
          600: "#A67C33",
          700: "#835E26",
          800: "#63451E",
          900: "#452F17",
        },
        emerald: {
          accent: "#1A4437",
          light: "#EAF2EE",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px rgba(0, 0, 0, 0.06)",
        hover: "0 10px 30px rgba(0, 0, 0, 0.10)",
        modal: "0 20px 50px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        luxury: "0.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
