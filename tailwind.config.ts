import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFF',
        black: '#000',

        gray100: '#E1E1E6',
        gray200: '#A9A9B2',
        gray400: '#7C7C8A',
        gray500: '#505059',
        gray600: '#323238',
        gray700: '#29292E',
        gray800: '#202024',
        gray900: '#121214',

        ignite300: '#00B37E',
        ignite500: '#00875F',
        ignite700: '#015F43',
        ignite900: '#00291D',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
      },
      fontSize: {
        xxs: '0.625rem',
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.25rem',
        '6xl': '3rem',
        '7xl': '4rem',
        '8xl': '4.5rem',
        '9xl': '6rem',
      },
      lineHeight: {
        shorter: '125%',
        short: '140%',
        base: '160%',
        tall: '180%',
      },
      borderRadius: {
        px: '1px',
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '16px',
        full: '99999px',
      },
      fontFamily: {
        roboto: 'var(--font-roboto)',
      },
      maxWidth: {
        'ignite-with': 'calc(100vw - (100vw - 1160px) / 2)',
      },
    },
  },
  plugins: [],
}
export default config
