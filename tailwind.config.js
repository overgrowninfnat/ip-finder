const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-1':'-1',
        '-2':'-2'
      },
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        darkGray: '#969696',
        veryDarkGray: '	#2b2b2b'
      },
      letterSpacing: {
        extra: '0.25em'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
