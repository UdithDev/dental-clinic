/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        accent:"#e63946",
        pearlWhite: "#EAE7DC",
      }
    },
  },
  plugins: [],
};
