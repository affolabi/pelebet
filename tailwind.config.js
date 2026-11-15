/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pocket: {
          purple: '#6226FF',
          purpleDark: '#4B18D1',
          purpleDeep: '#2D0C8A',
          green: '#00A859',
          greenDark: '#008F4C',
          amber: '#F59E0B',
          orange: '#FF6B2C',
          coral: '#EF4444',
          onyx: '#080612',
          onyxCard: '#120E24',
          offwhite: '#F5F5F8',
        },
        pele: {
          cyan: '#5ce1e6',
          navy: '#0a1128',
        }
      },
      fontFamily: {
        display: ['"Syne"', '"Plus Jakarta Sans"', 'sans-serif'],
        condensed: ['"Anton"', '"Impact"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', '"Inter"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'pocket': '0 24px 60px -15px rgba(98, 38, 255, 0.28)',
        'card': '0 16px 40px -12px rgba(8, 6, 18, 0.08)',
      }
    },
  },
  plugins: [],
};
