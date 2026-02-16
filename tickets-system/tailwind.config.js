/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryPurple: "#7C3AED",
        accentPink: "#EC4899",
        softRed: "#F43F5E",
        touchBlue: "#3B82F6",
      },
    },
  },
  plugins: [],
};
