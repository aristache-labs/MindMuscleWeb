/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-purple': '#8B5CF6',
        'secondary-purple': '#7F56D9',
        'neon-cyan': '#22D3EE',
        'dark-bg': '#0A0A10',
        'dark-surface': '#1A1A23',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-satoshi)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 