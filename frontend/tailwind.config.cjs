/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ECFEFF",
          500: "#06B6D4",
          600: "#0891B2",
          700: "#0E7490",
        },
      },
    },
  },
  plugins: [],
};

