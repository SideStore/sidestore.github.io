/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        buttonsok: '355px',
        stoplgtranslation: '1330px',
      },
      colors: {
        side: {
          100: '#f7fafc',
          200: '#edf2f7',
          900: '#1a202c',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
