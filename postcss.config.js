module.exports = {
  plugins: {
    ["@tailwindcss/postcss"]: {},
    autoprefixer: {},
  },
};

// This file is used to configure PostCSS with Tailwind CSS and Autoprefixer.
// It ensures that Tailwind's utility classes are processed correctly and that
// vendor prefixes are added for better browser compatibility.
// Make sure to run PostCSS during your build process to apply these styles.