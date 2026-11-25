/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        heritage: {
          bg: '#141412',
          surface: '#1e1e1a',
          elevated: '#0e0e0c',
          border: '#39321f',
          gold: '#d49520',
          goldLight: '#f0b542',
          goldMuted: '#b8aa85',
          redDark: '#710008',
          redLight: '#91131c',
          redHover: '#a31923',
          cream: '#e9e5da',
        }
      }
    },
  },
  plugins: [],
}
