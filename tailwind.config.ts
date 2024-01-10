import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          1: '#CFD9E8',
          2: '#B0C0D8',
          3: '#88A0C5',
          4: '#6080B2',
          5: '#39619E',
          main: '#11418B',
          6: '#0E3674',
          7: '#0B2B5D',
          8: '#092146',
          9: '#06162E',
        },
        neutral: {
          1: '#FFFFFF',
          2: '#EBEBEB',
          3: '#B4B4B4',
          4: '#8E8E8E',
          5: '#696969',
          6: '#444444',
          main: '#1E1E1E',
          7: '#191919',
          8: '#0F0F0F',
          9: '#060606',
        },
        error: {
          1: '#F8D3D2',
          2: '#F3B6B3',
          3: '#EC928D',
          4: '#E66E68',
          main: '#DA251C',
          5: '#B61F17',
          6: '#911913',
          7: '#6D130E',
          8: '#490C09',
          9: '#2C0706',
        },
        warning: {
          1: '#FFF1CC',
          2: '#FFE7AA',
          3: '#FFDB80',
          4: '#FFD055',
          5: '#FFC42B',
          main: '#FFB800',
          6: '#D49900',
          7: '#AA7B00',
          8: '#805C00',
          9: '#805C00',
        },
        success: {
          0: '#F5FFF5',
          1: '#C5FDC7',
          2: '#98F99B',
          3: '#70F274',
          4: '#50E955',
          5: '#38DD3E',
          6: '#27CD2C',
          main: '#1BB820',
          8: '#13A017',
          9: '#0E8712',
        },
        information: {
          0: '#F9F5FF',
          1: '#DDC5FD',
          2: '#C298F9',
          3: '#A970F2',
          4: '#9350E9',
          main: '#8038DD',
          6: '#6F27CD',
          7: '#5F1BB8',
          8: '#5013A0',
          9: '#420E87',
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
