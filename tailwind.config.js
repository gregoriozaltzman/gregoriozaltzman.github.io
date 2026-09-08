// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#000000",
        panel: "rgba(10, 10, 10, 0.75)",
        card: "rgba(15, 15, 15, 0.95)",
        muted: "#888888",
        borderCustom: "rgba(255, 255, 255, 0.12)",
        borderGlow: "rgba(255, 255, 255, 0.35)",
        telemetry: "#38bdf8",
        telemetryGreen: "#22c55e",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        header: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Courier Prime"', "monospace"],
      },
    },
  },
  plugins: [],
}