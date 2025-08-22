/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,jsx,ts,tsx}",   // include JS if you keep classes in scripts
  ],
  theme: { extend: {} },
  plugins: [],
};
