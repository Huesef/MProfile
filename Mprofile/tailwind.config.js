/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sourGummy: ['"Sour Gummy"', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' }, // Start and end at the same position
          '50%': { transform: 'translateY(-20px)' }, // Float up at the midpoint
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in forwards',
        slideInFromRight: 'slideInFromRight 1s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}