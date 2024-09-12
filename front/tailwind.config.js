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
        '800' : '800px',
      }
    },
    
  },
  plugins: [],
}

