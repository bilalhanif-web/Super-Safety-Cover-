import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: "#66743A",
          hover: "#566230",
          light: "#778744",
          soft: "#F1F4EB",
        },
        brand: {
          white: "#FFFFFF",
          ivory: "#F4F3ED",
          neutral: "#E7E2D7",
          offwhite: "#F4F3ED", // Updated from pale grey to Warm Ivory
          black: "#121212",
          grey: "#5A5A55",
          border: "#D8D2C5",
          lightgrey: "#DCD7CC",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
