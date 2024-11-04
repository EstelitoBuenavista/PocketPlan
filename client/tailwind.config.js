/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
module.exports = {
  content: ["client/pocketplan/src/App.jsx", "client/pocketplan/src/main.jsx"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}

