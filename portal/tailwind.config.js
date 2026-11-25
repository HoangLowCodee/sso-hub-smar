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
        serif: ['Playfair Display', 'Merriweather', 'serif'],
      },
      colors: {
        hef: {
          jade: '#0D4838',
          jadeDark: '#073327',
          jadeLight: '#16654F',
          gold: '#C29B57',
          goldLight: '#D8B06C',
          crimson: '#76232D',
          ivory: '#F5EFE5',
          bg: '#061E17',
          card: '#0A2920',
          border: '#184538',
          charcoal: '#292929',
        },
        heritage: {
          bg: '#061E17',
          surface: '#0A2920',
          elevated: '#041510',
          border: '#184538',
          gold: '#C29B57',
          goldLight: '#D8B06C',
          goldMuted: '#A38143',
          redDark: '#76232D',
          redLight: '#91131C',
          jade: '#0D4838',
          jadeDark: '#073327',
          cream: '#F5EFE5',
        }
      }
    },
  },
  plugins: [],
}
