import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
    },
    extend: {
    },
  },
  plugins: [],
} satisfies Config;
