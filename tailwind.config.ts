import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        darkBlue: "#002859",
        placeholder: "#647184",
        lightBlue: "#035AC5",
        lightGray: "#F9FAFC",
      },
      fontFamily: {
        sans: ["Mulish", "sans-serif"],
      },
      fontSize: {
        title: ["30px", { lineHeight: "38px", letterSpacing: "0%" }],
        subtitle: ["14px", { lineHeight: "20px", letterSpacing: "1%" }],
        placeholder: ["14px", { lineHeight: "20px", letterSpacing: "1%" }],
      },
      fontWeight: {
        bold: "700",
        normal: "400",
      },
    },
  },
  plugins: [],
} satisfies Config;
