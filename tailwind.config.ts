import type { Config } from "tailwindcss";
// const plugin = require('tailwindcss/plugin');

const config: Config = {
   darkMode: ['class'],
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
            'theme-black': '#112211'
         },
         fontFamily: {
            montserrat: ["var(--font-montserrat)"]
         },
         borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)'
         },
         zIndex: {
            '1040': '1040',
            '1050': '1050'
         }
      }
   },
   plugins: [
      require("tailwindcss-animate")
   ],
};
export default config;
