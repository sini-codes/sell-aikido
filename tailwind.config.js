/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './script.js'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4ecdc4',
        'secondary': '#ff6b6b',
        'accent': '#ffd93d',
        'dark-bg': '#0a0a0a',
      },
      fontFamily: {
        'russo': ['Russo One', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse': 'pulse 2s infinite',
        'bounce': 'bounce 1s infinite',
        'blob': 'blob 7s infinite',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        glow: {
          'from': { textShadow: '0 0 30px rgba(255, 107, 107, 0.5)' },
          'to': { textShadow: '0 0 50px rgba(255, 217, 61, 0.8)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' }
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
          }
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)'
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)'
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)'
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)'
          }
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        shimmer: {
          '0%': {
            'background-position': '-100% 0'
          },
          '100%': {
            'background-position': '200% 0'
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}