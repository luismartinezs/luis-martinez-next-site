const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./blocks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.fuchsia,
        gray: colors.slate,
      },
      fontFamily: {
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
        'display': ['DM Serif Display', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
