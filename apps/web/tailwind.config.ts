import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#102A43',
          950: '#0B192C',
        },
        brand: {
          navy: '#0F172A',
          dark: '#0B192C',
          slate: '#1E293B',
          accent: '#1D4ED8',
          light: '#F8FAFC',
          border: '#E2E8F0',
        },
        status: {
          present: {
            text: '#15803D',
            bg: '#DCFCE7',
            border: '#BBF7D0',
          },
          absent: {
            text: '#B91C1C',
            bg: '#FEE2E2',
            border: '#FECACA',
          },
          late: {
            text: '#B45309',
            bg: '#FEF3C7',
            border: '#FDE68A',
          },
          paid: {
            text: '#15803D',
            bg: '#DCFCE7',
            border: '#BBF7D0',
          },
          pending: {
            text: '#B45309',
            bg: '#FEF3C7',
            border: '#FDE68A',
          },
          overdue: {
            text: '#B91C1C',
            bg: '#FEE2E2',
            border: '#FECACA',
          },
        }
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      },
      fontSize: {
        '2xs': '0.6875rem',
      },
    },
  },
  plugins: [],
}
export default config
