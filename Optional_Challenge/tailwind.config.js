/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: {
          '9A938C': '#9A938C',
          '303345': '#303345',
        },
        blue: {
          '0077FF': '#0077FF',
          '70B7FF': '#70B7FF',
          'B1E2FF': '#B1E2FF',
        },
        purple: {
          '1C0E2B': '#1C0E2B',
          '0E2354': '#0E2354',
          '343B6B': '#343B6B'
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        '8xl': ['5.2rem']
      }
    }
  },
  plugins: [],
}
