/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#5B5481',
          DEFAULT: '#4A4677',
          dark: '#281332'
        },
        accent: '#F8AFB6'
      },
      fontFamily: {
        philosopher: ['Philosopher', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
