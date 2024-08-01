import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
