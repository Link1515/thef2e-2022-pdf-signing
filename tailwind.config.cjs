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
        primary: '#0B7D77',
        'primary-selected': '#CEE5E4',
        'primary-hover': '#096561',
        'dark-gray': '#676879',
        gray: '#C5C7D0'
      }
    }
  },
  plugins: []
}
