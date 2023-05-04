/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f7f4f2",
        section: "#2c8b4a",
        paper: "#f7db66",
        btnText: "#171717",
        white: "#FEFFFE",
        gray: "#e2dddc",
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};
