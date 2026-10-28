import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F6', // Off-white luxury parchment
        surface: '#FFFFFF', // Pure white card surface
        'surface-subtle': '#F4F3EF',
        primary: {
          DEFAULT: '#141414', // Deep obsidian charcoal
          light: '#2A2A2A',
          hover: '#000000',
        },
        accent: {
          DEFAULT: '#B8860B', // Restrained luxury antique gold / dark goldenrod
          light: '#D4AF37',
          muted: '#C5A880',
          hover: '#996F07',
        },
        border: {
          subtle: '#EAE8E2',
          DEFAULT: '#D8D5CC',
          strong: '#A8A49A',
        },
        muted: {
          DEFAULT: '#6B6862',
          foreground: '#8C887F',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 30px rgba(0, 0, 0, 0.06)',
      },
      letterSpacing: {
        widest: '0.2em',
        editorial: '0.08em',
      },
    },
  },
  plugins: [],
};

export default config;
