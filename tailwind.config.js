/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      ...defaultTheme.screens
    },
    extend: {
      fontFamily: {
        Roboto: ['Roboto', 'sans-serif']
      },
      keyframes: {
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 }
        },
        'fade-out': {
          from: { opacity: 1 },
          to: { opacity: 0 }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-out': 'fade-out 0.5s ease-in-out'
      }
    }
  },
  plugins: []
}
