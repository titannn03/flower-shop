/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8D3B61', // Rose / Burgundy
          dark: '#6F2B4B',
          light: '#AB4F79',
          hover: '#7A3253',
        },
        accent: {
          DEFAULT: '#F6D9E5', // Soft Pink
          hover: '#EDC3D5',
          light: '#FDF4F8',
        },
        background: {
          DEFAULT: '#FFF9F5', // Ivory
          alt: '#FAF2F6',     // Section alternate
          card: 'rgba(255, 255, 255, 0.85)',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          glass: 'rgba(255, 255, 255, 0.75)',
          'glass-dark': 'rgba(36, 29, 33, 0.85)',
          border: 'rgba(141, 59, 97, 0.12)',
        },
        textColor: {
          primary: '#241D21',
          secondary: '#6E6268',
          muted: '#9E9298',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'pill': '9999px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(141, 59, 97, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(141, 59, 97, 0.15)',
        'soft': '0 10px 25px -5px rgba(36, 29, 33, 0.06), 0 8px 10px -6px rgba(36, 29, 33, 0.04)',
        'glow': '0 0 25px rgba(246, 217, 229, 0.6)',
      },
      backdropBlur: {
        'glass': '16px',
      }
    },
  },
  plugins: [],
}
