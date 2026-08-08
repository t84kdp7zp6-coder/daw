/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      colors: {
        ink: "#171412",
        sand: "#F7F4EF",
      },
    },
  },
  plugins: [],
};
