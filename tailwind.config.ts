import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "toast-in": "toast-in 0.3s forwards",
        "toast-out": "toast-out 0.3s forwards",
      },
      keyframes: {
        "toast-in": {
          "0%": { opacity: "0", transform: "translate(-50%, -20px)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0)" },
        },
        "toast-out": {
          "0%": { opacity: "1", transform: "translate(-50%, 0)" },
          "100%": { opacity: "0", transform: "translateY(50%, -20px)" },
        },
      },
      colors: {
        "01": "#7C5DFA",
        "05": "#DFE3FA",
        "06": "#888EB0",
        "07": "#7E88C3",
        "08": "#0C0E16",
      },
    },
  },
  plugins: [],
};
export default config;
