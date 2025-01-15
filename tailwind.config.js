/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/Components/**/*.{js,jsx,ts,tsx}",
    "./src/Pages/**/*.{js,jsx,ts,tsx}",],
    theme: {
      extend: {
        screens: {
          'max-lg': { 'max': '1024px' },
          'max-md': { 'max': '768px' },
          'max-bs': { 'max': '672px' },
          'max-sm': { 'max': '480px' },
          'max-xs': { 'max': '320px' },
          
        },
      },
    },
  plugins: [],
}

