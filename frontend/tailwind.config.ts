import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/nextstepjs/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontSize: {
        xs: "12px",
        sm: "13px",
        md: "16px",
        lg: "19px",
        xl: "24px",
      },
      colors: {
        primary: {
          '50': '#ebf6ff',
          '100': '#d5e9f9',
          '200': '#a6d1f6',
          '300': '#75b8f4',
          '400': '#51a3f3',
          '500': '#3f96f2',
          '600': '#3490f3',
          '700': '#2a7dd8',
          '800': '#1e6fc2',
          '900': '#025fab',
        },
        secondary: {},
      },
      container: {
        padding: '1rem',
        screens: {
          xs: '412px',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      screens: {
        xs: '412px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      borderWidth: {
        1: '0.6px',
      },
    },
  },
  plugins: [],
};
export default config;
