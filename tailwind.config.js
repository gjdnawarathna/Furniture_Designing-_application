/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f5f0',
          100: '#f1e6d6',
          200: '#e6cfb0',
          300: '#d6af80',
          400: '#c18c4e',
          500: '#ab7339',
          600: '#8B4513', // Primary wood tone
          700: '#7a3d14',
          800: '#663417',
          900: '#582e18',
        },
        accent: {
          50: '#fbf9e6',
          100: '#f7f3cd',
          200: '#f1e89b',
          300: '#ead869',
          400: '#e3c845',
          500: '#D4AF37', // Gold accent
          600: '#b38c26',
          700: '#926c20',
          800: '#755020',
          900: '#62441f',
        },
        neutral: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#5a5a5a',
          900: '#4e4e4e',
        },
        success: {
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        fadeInSlow: 'fadeIn 0.8s ease-in-out forwards',
        fadeInDelayed: 'fadeIn 0.5s ease-in-out 0.3s forwards',
      },
    },
  },
  plugins: [],
}