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
        hover:"#2b8fff",
        rido:"#2C87F3",
        stripe:"#635BFF"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"]
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out infinite",
        wave: "wave 1s ease-in-out",
        beat: "beat 1s ease-in-out infinite",
        glow: "glow 1.5s ease-in-out infinite",
        'spin-slow': "spin 2s linear infinite"
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" }
        },
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "15%": { transform: "rotate(-15deg)" },
          "30%": { transform: "rotate(15deg)" },
          "45%": { transform: "rotate(-10deg)" },
          "60%": { transform: "rotate(10deg)" },
          "75%": { transform: "rotate(-5deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        beat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(255,255,255,0.5)" },
          "50%": { boxShadow: "0 0 15px rgba(255,255,255,1)" },
        }
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        md: "40px",
      }
    }
  },
  plugins: [],
}
