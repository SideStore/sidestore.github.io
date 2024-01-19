const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    extend: {
      fontFamily: {
        sans: ['SatoshiVariable', ...defaultTheme.fontFamily.sans],
        title: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: '475px',
        buttonsok: '355px',
        stoplgtranslation: '1330px',
        gridok: '896px',
        nextprevok: '1096px',
        grid35ok: '1268px',
        grid12ok: '1422px',
        dualbuttonok: '540px',
        bardualok: '430px',
      },
      colors: {
        side: {
          100: '#f7fafc',
          200: '#edf2f7',
          900: '#1a202c',
        },
        'side-purple': {
          100: '#d2c2f6',
          200: '#b499f0',
          300: '#a584ec',
          400: '#9670e9',
          border: '#7447d4',
          600: '#6932e0',
          700: '#5428b3',
        },
        material: 'rgb(31,32,35)',
      },
    },
  },

	plugins: [
		function ({ addComponents, theme }) {
      addComponents({
        '.bg-material': {"backdropBlur":"blur(40px)","background":"rgba(31,32,35,.8)"},
        '.marquee-card': {"display":"flex","paddingTop":"1rem","paddingBottom":"1rem","paddingLeft":"1rem","paddingRight":"1rem","marginLeft":"0.5rem","marginRight":"0.5rem","alignItems":"center","borderRadius":"1rem","borderWidth":"1px","width":"max-content","height":"auto","boxShadow":"0 1px 2px 0 rgba(0, 0, 0, 0.05)","maxWidth":"324px"}
      });
    },
	],
}
