import type { Config } from "tailwindcss";

const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/ui-components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            'theme-blue': '#8DD3BB',
            'theme-black': '#112211',
         },
         fontFamily: {
            montserrat: ["var(--font-montserrat)"]
         }
      },
   },
   plugins: [],
};
export default config;
