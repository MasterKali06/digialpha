module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      colors: {
        dark: {
          'main': '#20242b',
          'first': '#1c2026',
          'second': '#181b20'
        },
        light: {
          'main': '#ECEFF4',
          'first': '#E5E9F0',
          'second': '#D8DEE9'
        },
        gray: {
          'light': '#D3D3D3',
          'dark': '#899499'
        }
      }, // end of colors
      
    },
  },
  plugins: [],
}
