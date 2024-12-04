/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

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
        'custom-gray': '#ABABAB',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#0C68FF",
          "secondary": "#89BAFD",
          "accent": "#DED9D8",
          "neutral": "#161515",
          "base-100": "#FFF9F8",
          "info": "#FF75A1",
          "success": "#7AD47A",
          "warning": "#F0B44E",
          "error": "#DD601F",
        },
      },
      // {
      //   dark: {
      //     "primary": "#0C68FF",
      //     "secondary": "#89BAFD",
      //     "accent": "#DED9D8",
      //     "neutral": "#F5F5F5",
      //     "base-100": "#0F172A",
      //     "info": "#FF75A1",
      //     "success": "#7AD47A",
      //     "warning": "#F0B44E",
      //     "error": "#DD601F",
      //   },
      // },
    ],
  },
};
