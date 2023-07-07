/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sandy-beach': '#FEE3BC',
        'customGray': '#9A938C'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
