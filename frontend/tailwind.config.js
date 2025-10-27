/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-carolina-blue': '#DBEBF6',
        'carolina-blue': '#4B9CD3',
        'secondary-maroon': '#B14C59',
        'secondary-light-maroon': '#BE897E',
        'primary-athletics-navy': '#13294B',
        'warm-grey-4': '#B5ADA5',
      },
      fontFamily: {
        primary: ['var(--font-primary)', 'serif'],
        secondary: ['var(--font-secondary)', 'sans-serif'],
        tertiary: ['var(--font-tertiary)', 'serif'],
      },
    },
  },
  plugins: [],
}
