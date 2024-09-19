/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      spacing: { 
        '140' : '140px',
        '300' : '300px',
        '400' : '400px',
        '500' : '500px',
        '600' : '600px',
        '700' : '700px',
        '800' : '800px',
        '100' : "100px",
      },
      fontFamily:{
        'nanum-squareB' : ['NanumSquareB', 'sans-serif'],
        'nanum-squareL' : ['NanumSquareL', 'sans-serif'],
      },
    },
    
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.thead-border': {
          '&::before': {
            content: "''",
            position: 'absolute',
            left: '0',
            right: '0',
            top: '0',
            height: '0.5px',
            backgroundColor: '#d1d5db',
            zIndex: '30',
          },
          '&::after': {
            content: "''",
            position: 'absolute',
            left: '0',
            right: '0',
            bottom: '0',
            height: '0.5px',
            backgroundColor: '#d1d5db',
            zIndex: '30',
          },
        },
        '.th-border': {
          '&::before': {
            content: "''",
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            width: '0.5px',
            backgroundColor: '#d1d5db',
            zIndex: '30',
          },
          '&:last-child::after': {
            content: "''",
            position: 'absolute',
            top: '0',
            bottom: '0',
            right: '0',
            width: '0.5px',
            backgroundColor: '#d1d5db',
            zIndex: '30',
          },
        },
      })
    },
  ],
}

