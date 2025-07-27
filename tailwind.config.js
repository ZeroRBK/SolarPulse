/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
// This Tailwind CSS configuration file specifies the content paths to scan for class names,
// extends the default theme, and includes no additional plugins.
// Make sure to run the Tailwind CLI or PostCSS to generate the final CSS file with the utility classes.