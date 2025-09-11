/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'islamic': {
          'primary': '#065f46', // Deep emerald green
          'secondary': '#d97706', // Golden yellow
          'accent': '#0d9488', // Soft teal
          'background': '#fefdfb', // Cream white
          'text': '#1f2937', // Dark charcoal
        }
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'arabic': ['Amiri', 'serif'],
      },
      backgroundImage: {
        'islamic-pattern': "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\":%3E%3Cg fill=\"none\" fill-rule=\"evenodd\":%3E%3Cg fill=\"%23065f46\" fill-opacity=\"0.1\":%3E%3Cpath d=\"M30 30c0-16.569 13.431-30 30-30v30H30zM0 30c0-16.569 13.431-30 30-30v30H0z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
        'crescent-pattern': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\":%3E%3Cg fill=\"%23d97706\" fill-opacity=\"0.05\":%3E%3Cpath d=\"M20 20c0-11.046 8.954-20 20-20v20H20z\"/%3E%3C/g%3E%3C/svg%3E')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

