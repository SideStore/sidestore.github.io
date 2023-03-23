/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        buttonsok: '355px',
        stoplgtranslation: '1330px',
        dualbuttonok: '540px'
      },
      colors: {
        side: {
          100: '#f7fafc',
          200: '#edf2f7',
          900: '#1a202c',
        },
        "side-purple": {
          100: "#d2c2f6",
          200: "#b499f0",
          300: "#a584ec",
          400: "#9670e9",
          "border": "#7447d4",
          600: "#6932e0",
          700: "#5428b3",
        }
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
