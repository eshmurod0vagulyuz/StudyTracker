/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2E7D32',
          light: '#4CAF50',
          dark: '#1B5E20',
        },
        accent: {
          orange: '#FF6B35',
          yellow: '#FFB800',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F5F7F5',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    }
  },
  plugins: []
}
