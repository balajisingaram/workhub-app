import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#f5f3ee',
          2: '#ece9e3',
          3: '#e0ddd6',
        },
        ink: {
          DEFAULT: '#14120e',
          2: '#3a3630',
          3: '#7a756c',
          4: '#b0a99e',
        },
        accent: {
          DEFAULT: '#1a6b3c',
          2: '#2d9c5e',
          light: '#e8f5ee',
        },
        amber: {
          brand: '#c2620a',
          light: '#fdf0e0',
        },
        coral: {
          brand: '#c94040',
          light: '#fde8e8',
        },
        blue: {
          brand: '#1a5a8a',
          light: '#e5f0fa',
        },
        purple: {
          brand: '#5c44c2',
          light: '#edeafa',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 16px rgba(20,18,14,.08)',
        medium: '0 8px 40px rgba(20,18,14,.12)',
        large: '0 24px 80px rgba(20,18,14,.16)',
      },
      animation: {
        'float-up': 'floatUp 0.8s ease both',
        'fade-in': 'fadeIn 0.4s ease both',
        'slide-in': 'slideIn 0.3s cubic-bezier(.16,1,.3,1)',
      },
      keyframes: {
        floatUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
