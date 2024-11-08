/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    daisyui,
  ],

  daisyui: {
    themes: [
        {
          light: {          
            "primary": "#0060FC",                  
            "secondary": "#76B0FF",                  
            "accent": "#DED9D8",
            "neutral": "#161515",       
            "base-100": "#FFF9F8",                  
            "info": "#FF4B84",                  
            "success": "#20B320",                  
            "warning": "#F19800",                  
            "error": "#E14D00",
            },
          },
        {
          dark: {
            "primary": "#0C68FF",          
            "secondary": "#89BAFD",                      
            "accent": "#B9B9BF",                     
            "neutral": "#F5F5F5",                      
            "base-100": "#0F172A",                      
            "info": "#FF75A1",                      
            "success": "#7AD47A",                      
            "warning": "#F0B44E",                      
            "error": "#DD601F",
          }
        }
      ],
    },
};
