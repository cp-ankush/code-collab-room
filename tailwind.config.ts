import type { Config } from "tailwindcss";

// module.exports = {
//   theme: {
//     extend: {
//       backgroundColor: {
//         "warm-gradient": "linear-gradient(270deg, #FB6564 0%, #A03CEA 100%)",
//       },
//     },
//   },
//   variants: {},
//   plugins: [],
// };
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // backgroundColor: {
      //   "warm-gradient": "linear-gradient(270deg, #FB6564 0%, #A03CEA 100%)",
      // },
    },
  },
  plugins: [],
};
export default config;
