import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './blocks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-inter)'],
      },
      colors: {
        black: '#212121',
        'black-hovered': '#403F3F',
        'black-disabled': '#828282',
        'black-900': '#333333',
        'primary-gray': '#707070',
        'old-price': '#9e9e9e',
        divider: '#AEAEAE',
        'navigation-bg': '#aeaeae4d', // 30% opacity
        gray: '#D2D2D2',
        'stroke-light-gray': '#EEEEEE',
        accent: '#F5814F',
        'accent-hovered': '#FF9669',
        'primary-peachy': '#F5814F',
        peachy: '#F5814F',
        'peachy-hovered': '#FF9669',
        orange: '#EFAC2B',
        green: '#2EAB2B',
        blue: '#4A60AD',
        red: '#D83D3D',
        'input-hover': '#D2DCFF',
        white: '#FFFFFF',
        'white-900': '#F9F9F9',
        'white-800': '#F4F4F4',
        'header-hover-menu': '#F9F9F9',
        'grey-light': '#F4F4F4',
      },
      fontSize: {
        h0: [
          '2.5rem',
          {
            lineHeight: ' 1.4',
            fontWeight: '700',
          },
        ], //40/56 700
        h1: [
          '2rem',
          {
            lineHeight: '1.25',
            fontWeight: '700',
          },
        ], //32/40 700
        h2: [
          '1.5rem',
          {
            lineHeight: '1.33',
            fontWeight: '700',
          },
        ], //24/32 700
        h3: [
          '1.125rem',
          {
            lineHeight: '1.33',
            fontWeight: '600',
          },
        ], //18/24 600
        h4: [
          '1.125rem',
          {
            lineHeight: '1.33',
            fontWeight: '700',
          },
        ], //18/24 700
        h5: [
          '1rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ], //16/24 700
        h6: [
          '0.875rem',
          {
            lineHeight: '1.25',
            fontWeight: '600',
          },
        ], //14/20 600
        base: [
          '1rem',
          {
            lineHeight: '1.5',
            fontWeight: '500',
          },
        ], //16/24 500
        categories: [
          '0.875rem',
          {
            lineHeight: '1.4',
            fontWeight: '700',
          },
        ], //14/20 700
        header: [
          '0.875rem',
          {
            lineHeight: '1.4',
            fontWeight: '700',
          },
        ], //14/20 600
        sm: [
          '0.875rem',
          {
            lineHeight: '1.71',
            fontWeight: '500',
          },
        ], //14/24 500
        'heading-footer': [
          '1rem',
          {
            lineHeight: '1.5',
            fontWeight: '700',
          },
        ], //16/24 700
        button: [
          '1rem',
          {
            lineHeight: '1.5',
            fontWeight: '600',
          },
        ], //16/24 600
        link: [
          '1rem',
          {
            lineHeight: '1.5',
            fontWeight: '500',
          },
        ], //16/24 500
        xs: [
          '0.75rem',
          {
            lineHeight: '1.66',
            fontWeight: '400',
          },
        ], //12/20 400
      },
      screens: {
        '3xl': '1600px',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '4rem',
        sm: '2rem',
        lg: '4rem',
        xl: '4rem',
      },
      screens: {
        xl: '1440px',
      },
    },
  },
  plugins: [],
}
export default config
