/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // ⚠️ CRITICAL - MUST BE 'class' NOT 'media'
  theme: {
    extend: {
      colors: {
        primary: '#9333ea', // purple-600
        secondary: '#2563eb', // blue-600
      },
    },
  },
  plugins: [],
};
