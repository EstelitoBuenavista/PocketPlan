import localFont from "next/font/local";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const poppins = localFont({
  src: [
    {
      path: "./fonts/poppins/Poppins-Regular.ttf", // Regular weight
      weight: "400", // Regular weight
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-Black.ttf", // Black weight
      weight: "900", // Black weight
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-BlackItalic.ttf", // Black Italic
      weight: "900", // Black weight
      style: "italic",
    },
    {
      path: "./fonts/poppins/Poppins-Bold.ttf", // Bold weight
      weight: "700", // Bold weight
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-BoldItalic.ttf", // Bold Italic
      weight: "700", // Bold weight
      style: "italic",
    },
    {
      path: "./fonts/poppins/Poppins-ExtraBold.ttf", // ExtraBold weight
      weight: "800", // ExtraBold weight
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-ExtraBoldItalic.ttf", // ExtraBold Italic
      weight: "800", // ExtraBold weight
      style: "italic",
    },
    {
      path: "./fonts/poppins/Poppins-ExtraLight.ttf", // ExtraLight weight
      weight: "200", // ExtraLight weight
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-ExtraLightItalic.ttf", // ExtraLight Italic
      weight: "200", // ExtraLight weight
      style: "italic",
    },
    {
      path: "./fonts/poppins/Poppins-Italic.ttf", // Italic weight
      weight: "400", // Regular weight
      style: "italic",
    },
    {
      path: "./fonts/poppins/Poppins-Light.ttf", // Light weight
      weight: "300", // Light weight
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-LightItalic.ttf", // Light Italic
      weight: "300", // Light weight
      style: "italic",
    },
    {
      path: "./fonts/poppins/Poppins-Medium.ttf", // Medium weight
      weight: "500", // Medium weight
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-MediumItalic.ttf", // Medium Italic
      weight: "500", // Medium weight
      style: "italic",
    },
    {
      path: "./fonts/poppins/Poppins-SemiBold.ttf", // SemiBold weight
      weight: "600", // SemiBold weight
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-SemiBoldItalic.ttf", // SemiBold Italic
      weight: "600", // SemiBold weight
      style: "italic",
    },
    {
      path: "./fonts/poppins/Poppins-Thin.ttf", // Thin weight
      weight: "100", // Thin weight
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-ThinItalic.ttf", // Thin Italic
      weight: "100", // Thin weight
      style: "italic",
    },
  ],
  variable: "--font-poppins", // Use this variable to apply the font globally
});

export const metadata = {
  title: "Pocket Plan",
  description: "Generated by create Next App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={`${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
