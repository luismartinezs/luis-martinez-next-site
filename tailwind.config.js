const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        secondary: colors.emerald
      },
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [],
}
