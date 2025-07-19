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
        'lightning': 'lightning 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse': 'pulse 2s infinite',
      },
      keyframes: {
        glow: {
          'from': { textShadow: '0 0 30px rgba(255, 107, 107, 0.5)' },
          'to': { textShadow: '0 0 50px rgba(255, 217, 61, 0.8)' }
        },
        lightning: {
          '0%, 95%': { opacity: '0' },
          '96%, 100%': { opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        }
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      }
    },
  },
  plugins: [],
}