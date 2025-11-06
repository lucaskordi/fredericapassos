/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'neue-montreal': ['var(--font-neue-montreal)', 'sans-serif'],
        'jh-caudemars': ['var(--font-jh-caudemars)', 'serif'],
        'nord': ['var(--font-nord)', 'sans-serif'],
        'chreed': ['var(--font-chreed)', 'sans-serif'],
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}

