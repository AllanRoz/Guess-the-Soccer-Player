/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pitch: {
          950: '#06130b',
          900: '#0a1d12',
          800: '#0f2c1c',
          700: '#143d27',
          600: '#1a5435',
          500: '#22c55e',
          400: '#4ade80',
          300: '#86efac',
        },
        stadium: {
          950: '#090d16',
          900: '#0f172a',
          850: '#131e36',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        },
        gold: {
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          glow: '#ffd700',
        },
        electric: {
          cyan: '#00f0ff',
          lime: '#39ff14',
          magenta: '#ff007f',
          gold: '#ffb700',
          purple: '#8b5cf6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Teko', 'Rajdhani', 'Impact', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
        'bounce-short': 'bounceShort 0.5s ease-in-out',
        'card-flip': 'cardFlip 0.6s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 15px rgba(34, 197, 94, 0.4), 0 0 30px rgba(0, 240, 255, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(34, 197, 94, 0.8), 0 0 50px rgba(0, 240, 255, 0.5)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        bounceShort: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      backgroundImage: {
        'pitch-pattern': "radial-gradient(ellipse at top, #143d27 0%, #0a1d12 45%, #06130b 100%)",
        'stadium-gradient': "radial-gradient(circle at 50% 20%, #1a2c4e 0%, #0c1424 50%, #060911 100%)",
        'gold-card': "linear-gradient(135deg, #ca8a04 0%, #eab308 25%, #fef08a 50%, #eab308 75%, #ca8a04 100%)",
        'fut-card': "linear-gradient(145deg, #1e293b 0%, #0f172a 100%)",
        'fut-card-gold': "linear-gradient(145deg, #2a200a 0%, #171204 100%)",
      }
    },
  },
  plugins: [],
}
