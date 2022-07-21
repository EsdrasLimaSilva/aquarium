/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#151623",
        darkBlue: "#05060F",
        white: "#F5F5F5",
        transparent: "#00000030",
      },
      borderRadius: {
        super: "100px",
      },
    },
  },
  plugins: [],
};
