/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        accent:"#2D9596",
        pearlWhite: "#EAE7DC",
        headbg:"#2D9596",
        hover:"#9AD0C2",
        headbgsm:"#265073",
        footerbg:"#2D9596"
      }
    },
  },
  plugins: [],
};
