/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
      },
      colors: {
        "primary-green": "#E3F2FD",
        customGreen: "#09B480",
        "light-grey": "#F5F5F5",
        lavender: "#E6E6FA",
        "custom-white": "#ffffff",
        "custom-green": "#dfffe2",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
