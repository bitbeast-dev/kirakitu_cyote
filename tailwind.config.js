/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FD802E',
        secondary: '#2872A1', 
        dark: '#730000',
        'dark-red': '#9D0208',
        'accent-purple': '#5F4A8B',
        'accent-green': '#00A86B',
        light: '#FEFACD',
        background: '#E5E4E2',
        'text-dark': '#233D4C',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'content': '1200px',
      },
      boxShadow: {
        'card': '0px 6px 18px rgba(0,0,0,0.18)',
        'main': '0px 10px 30px rgba(0,0,0,0.25)',
      }
    },
  },
  plugins: [],
}
