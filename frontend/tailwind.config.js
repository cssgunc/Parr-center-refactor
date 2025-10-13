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

