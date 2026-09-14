/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lpu: {
          orange: '#F26522',
          amber: '#FFD54F',
          red: '#FF6B6B',
          warmWhite: '#FFF8F0',
        }
      }
    },
  },
  plugins: [],
}
