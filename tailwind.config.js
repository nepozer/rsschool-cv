/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {

        colors:{
          "main-bg": "#F4F5FC",
          "sign-up-color":"#5A61ED",

        },

        fontFamily:{
          'sans': ['Work Sans', 'Arial, sans-serif'],
          'pt-sans': ['PT Sans', 'sans-serif ']
        }
      },
    },
    plugins: [],
  }