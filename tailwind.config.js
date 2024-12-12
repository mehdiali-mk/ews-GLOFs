/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./views/*.ejs"],
  theme: {
    extend: {
      colors: {
        primary: "#282E33",
        secondary: "#fff",
      }
    },
  },
  plugins: [require("flowbite/plugin")],
  content: ["./node_modules/flowbite/**/*.js"],
};
