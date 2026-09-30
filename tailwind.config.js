/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FFFFFF',
          100: '#FBFBFB',
          200: '#F5F5F5',
          300: '#E5E5E5',
          400: '#CCCCCC',
          500: '#999999',
          600: '#666666',
          700: '#404040',
          800: '#262626',
          900: '#141414',
          950: '#0A0A0A',
        },
        stone: {
          warm: '#FFFFFF',
          muted: '#F5F5F5',
          sand: '#E5E5E5',
          accent: '#888888',
        },
        charcoal: {
          DEFAULT: '#141414',
          light: '#1E1E1E',
          surface: '#222222',
          border: '#2E2E2E',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Outfit', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Architects Daughter"', '"CityBlueprint"', '"City Blueprint"', 'cursive', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        city: ['"Architects Daughter"', '"CityBlueprint"', '"City Blueprint"', 'cursive', 'sans-serif'],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
