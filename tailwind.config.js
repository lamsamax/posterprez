/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0a192f',
        'midnight-light': '#0d2040',
        electric: '#0ea5e9',
        'electric-light': '#38bdf8',
        'accent-cyan': '#06b6d4',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'wave': 'wave 3s ease-in-out infinite',
        'count-up': 'countUp 1s ease-out forwards',
        'ring-expand': 'ringExpand 1.5s ease-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 8px rgba(14,165,233,0.3), 0 0 0 rgba(6,182,212,0)' },
          '100%': { boxShadow: '0 0 24px rgba(14,165,233,0.7), 0 0 48px rgba(6,182,212,0.3)' },
        },
        ringExpand: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
