export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        stone: {
          950: '#101010',
        },
        moss: {
          500: '#41d25f',
          600: '#31b44b',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        pixel: '0 0 0 2px #1f1f1f, 0 0 0 4px #3f3f3f',
      },
      backgroundImage: {
        stone: 'radial-gradient(circle at top, #2a2a2a, #0e0e0e 60%)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
