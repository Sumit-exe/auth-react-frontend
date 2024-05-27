/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'main-blue': '#396ee5',
        'light-blue': '#e6ecfe',
        'main-green': '#169158',
        'light-green': '#e6feed',
        
      }
    },
  },
  plugins: [],
}

