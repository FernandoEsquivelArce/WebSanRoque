import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parroquia: {
          burgundy: {
            50: "#fdf3f3",
            100: "#fae5e5",
            200: "#f6cfcf",
            300: "#eea8a8",
            400: "#e07575",
            500: "#cc4646",
            600: "#af3232",
            700: "#8f2525",
            800: "#752222",
            900: "#602121",
            950: "#360c0c",
          },
          gold: {
            50: "#fcf9ee",
            100: "#f7f0d4",
            200: "#eee0a9",
            300: "#e3cb76",
            400: "#d7b247",
            500: "#c49a2b",
            600: "#a97c21",
            700: "#865c1d",
            800: "#6f491d",
            900: "#5d3e1d",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
