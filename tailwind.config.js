module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand:  { teal: "#0E5A5F", dark: "#0A4245", light: "#EAF4F4" },
        accent: { orange: "#F28C28", dark: "#D9731A" },
      },
      fontFamily: { sans: ["Poppins", "system-ui", "sans-serif"] },
      keyframes: {
        fadeUp: { "0%": { opacity: "0", transform: "translateY(24px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
      animation: { fadeUp: "fadeUp .7s ease both", float: "float 4s ease-in-out infinite" },
    },
  },
};