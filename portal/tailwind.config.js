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
        dark: {
          950: '#09090b', // True deep dark
          900: '#121215',
          850: '#18181b',
          800: '#27272a',
          700: '#3f3f46',
        }
      }
    },
  },
  plugins: [],
}
