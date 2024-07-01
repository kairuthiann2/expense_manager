/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'aqua-haze': '#EAF4F4', // Main color
        'green': {
          300: '#cce3de', // Left side color
          400: '#A4C3B2', // Right side color
          500: '#6b9080', // Form background color
          900: '#2a3732', // Add expence button
        'black': '#000000', // Sidbar text
        'white': '#f6fff8', // Loading indicator
        'red': 'e5383b', // Error message
        },        
      },
    },
  },
  plugins: [],
}

