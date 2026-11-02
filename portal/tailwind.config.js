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
        brand: {
          50: '#fbf7ee',
          100: '#f5ecd6',
          200: '#edd8ad',
          300: '#e3be7e',
          400: '#d9a250',
          500: '#d1892f',
          600: '#b86c25',
          700: '#944f21',
          800: '#794021',
          900: '#64361e',
          950: '#391c0e',
        }
      }
    },
  },
  plugins: [],
}

