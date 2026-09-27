/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        smit: {
          blue: '#1e4886',      // SMIT Portal Blue
          blueHover: '#163766',
          inputBg: '#edf3fc',   // Input field light blue
          green: '#74b928',
          textMuted: '#6b7280',
        }
      }
    },
  },
  plugins: [],
}