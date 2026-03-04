import { Playfair_Display, DM_Sans } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});
