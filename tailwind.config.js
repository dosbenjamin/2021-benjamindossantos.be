module.exports = {
  purge: ['./pages/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  mode: 'jit',
  theme: {
    colors: {
      'current': 'currentColor',
      'grey': {
        450: '#E8E8E8',
        900: '#2C2C2C'
      },
      'transparent': 'rgba(0, 0, 0, 0)',
      'white': '#fff'
    },
    fontFamily: {
      'body': 'Space Grotesk, sans-serif'
    },
    fontSize: {
      'sm': '0.75rem',
      'base': 'calc(100% + 1.85vmin)',
      'lg': '1.333rem'
    },
    extend: {},
  },
  variants: {},
  plugins: [],
}
