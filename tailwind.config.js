/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D1DAD', // Brand Blue
          light: '#2B3BC4',
          dark: '#0A178A',
        },
        secondary: {
          DEFAULT: '#32B404', // Brand Green
          light: '#42D906',
          dark: '#268A03',
        },
        neutral: {
          DEFAULT: '#606062', // Brand Gray
          light: '#808082',
          dark: '#404042',
        }
      },
      fontFamily: {
        serif: ['Spectral', 'serif'],
        sans: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

