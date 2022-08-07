/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#100c08'
      }
    },
  },
  plugins: [],
}
