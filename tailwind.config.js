/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#F7931E',
        accent: '#3B5998',
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        info: '#2196F3'
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
        'gradient-accent': 'linear-gradient(135deg, #3B5998 0%, #5B7BD5 100%)'
      }
    },
  },
  plugins: [],
}