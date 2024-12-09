/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./views/*.ejs"],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
  content: ["./node_modules/flowbite/**/*.js"],
};
