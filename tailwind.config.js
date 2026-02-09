/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        strava: {
          orange: '#FC4C02',
          'orange-hover': '#e04400',
          dark: '#2D2D2D',
          medium: '#6D6D6D',
          light: '#F7F7F7',
          border: '#E0E0E0',
        },
      },
    },
  },
  plugins: [],
}
