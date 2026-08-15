/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#111111',
          yellow: '#FFC107',
          white: '#FFFFFF',
        },
        ink: {
          50: '#F7F7F8',
          100: '#EDEDF0',
          200: '#D9D9DF',
          300: '#B9B9C3',
          400: '#8A8A98',
          500: '#63636F',
          600: '#45454F',
          700: '#2E2E36',
          800: '#1D1D22',
          900: '#111111',
        },
        gold: {
          50: '#FFF9E6',
          100: '#FFEFBF',
          200: '#FFE494',
          300: '#FFD666',
          400: '#FFCB3D',
          500: '#FFC107',
          600: '#E0A800',
          700: '#B98900',
          800: '#8A6600',
          900: '#5C4400',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(17,17,17,0.08), 0 8px 24px -12px rgba(17,17,17,0.12)',
        card: '0 1px 2px rgba(17,17,17,0.04), 0 12px 32px -16px rgba(17,17,17,0.18)',
        glow: '0 8px 30px -8px rgba(255,193,7,0.55)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(100%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.28s ease-out both',
        'slide-up': 'slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.2s ease-out both',
      },
    },
  },
  plugins: [],
};
