/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGrey: "#0e0c16",
        darkBlue: "#140e2d",
        primaryBlue: "#217bfe",
        primaryRed: "#e55571",
      },
      animation: {
        rotate: "60s linear infinite rotation",
        slide: "8s ease-in-out infinite alternate slide",
        scale: "5s ease-in-out infinite scale",
      },
      keyframes: {
        rotation: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(60deg)" },
        },
        slide: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scale: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "100%": { transform: "scale(1.1) rotate(-5deg)" },
        },
      },
    },
  },
  plugins: [],
};
