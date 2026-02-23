import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
      colors: {
        pink: {
          soft: '#FFB6C1',
          hero: '#FF8FAB',
        },
        blue: {
          soft: '#87CEEB',
          hero: '#5BA4D4',
        },
        yellow: {
          card: '#FFD966',
        },
        green: {
          card: '#90EE90',
        },
      },
    },
  },
  plugins: [],
}
export default config
