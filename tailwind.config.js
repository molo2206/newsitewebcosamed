/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#002349",
        menu: "#00000",
        principal: "#0266C6",
        hover:"#EF4135",
        rido:"#2C87F3"
        // secondary: {
        //   DEFAULT: "#000000",
        // }, 
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        montserrat:["Montserrat", "sans-serif"]
      },
    },
    container: {
      center: true,
      padding: {
        Default: "20px",
        md: "40px",
      }
    }
  },
  plugins: [],
}

