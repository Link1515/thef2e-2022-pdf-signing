/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      colors: {
        'dark-gray': '#676879',
        gray: '#C5C7D0'
      }
    }
  },
  plugins: []
}
