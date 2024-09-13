/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      spacing: { 
        '140' : '140px',
        '300' : '300px',
        '400' : '400px',
        '500' : '500px',
        '600' : '600px',
        '800' : '800px',
        '100' : "100px",
      },
      fontFamily:{
        'nanum-square' : ['NanumSquare', 'sans-serif'],
      },
    },
    
  },
  plugins: [],
}

