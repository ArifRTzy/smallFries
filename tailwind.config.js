/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mx: "1444px",
        vm: "322px"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"]
      },
    },
  },
  darkMode:  'class',
  plugins: [],
}

