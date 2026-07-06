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
        'primary': '#16A085',
        'secondary': '#1ABC9C',
        'danger': '#E74C3C',
        'warning': '#F39C12',
        'success': '#27AE60',
        'info': '#3498DB',
        'dark': '#2C3E50',
        'light': '#ECF0F1',
        'wqi-good': '#27AE60',
        'wqi-medium': '#F39C12',
        'wqi-bad': '#E74C3C',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
