/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'mongol-blue': '#0088CC',
          'mongol-green': '#2E8B57',
          'mongol-gold': '#FFB300',
        },
      },
    },
    plugins: [],
  }