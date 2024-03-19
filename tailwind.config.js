/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "red-cst": "#D93446",
        "blue-cst": "#24A3B6",
        "yellow-cst": "#F7C140",
      },
    },
  },
  plugins: [],
};
