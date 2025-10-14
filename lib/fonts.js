import { Metal_Mania, Frijole } from "next/font/google";

// 🌐 Metal Mania for full website
export const metalMania = Metal_Mania({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-metal-mania",
});

// 🌐 Frijole for Navbar logo
export const frijole = Frijole({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-frijole",
});
