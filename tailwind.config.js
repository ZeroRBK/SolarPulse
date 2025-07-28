/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enable dark mode via class strategy
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",  // Adjust to your source file locations
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f59e0b",      // warm solar yellow
        secondary: "#1e40af",    // deep celestial blue
        accent: "#ec4899",       // pinkish accent
        background: "#fef3c7",   // soft solar background
        foreground: "#111827",   // dark text
      },
      fontFamily: {
        sans: ["Geist Sans", "ui-sans-serif", "system-ui"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
