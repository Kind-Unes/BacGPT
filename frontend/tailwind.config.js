/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Urbanist", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        'green-lightest': '#E5EAD7',
        'brown-dark': '#4B3425',
        'pink-light': '#E8DDD9',
        'gray-lightest': '#F7F4F2',
        'green-mid': '#9BB068',
        'brown-mid': '#926247',
        'green-dark':'#3D4A26'
      },
    },

  },
  plugins: [require("daisyui")],
};
