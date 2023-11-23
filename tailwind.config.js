// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "t-darkblue": "hsl(233, 26%, 24%)",
        "t-limegreen": "hsl(136, 65%, 51%)",
        "t-white": "hsl(0, 0%, 100%)",
      },
    },
    container: {
      center: true,
      padding: "3rem",
      screens: {
        lg: "1290px",
        xl: "1290px",

        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },

        // "2xl":"1124px",
      },
    },
  },
  plugins: [],
};
