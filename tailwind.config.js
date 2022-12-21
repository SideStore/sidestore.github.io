/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        buttonsok: '355px',
        stoplgtranslation: '1330px',
        // tran,
      },
      colors: {
        side: {
          100: '#f7fafc',
          200: '#edf2f7',

          900: '#1a202c',
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        marquee2: 'marquee2 42s linear infinite',
        'marquee-rev': 'rev-marquee 42s linear infinite',
        'marquee2-rev': 'rev-marquee2 42s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'rev-marquee': {
          '100%': { transform: 'translateX(0%)' },
          '0%': { transform: 'translateX(-100%)' },
        },
        'rev-marquee2': {
          '100%': { transform: 'translateX(100%)' },
          '0%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
