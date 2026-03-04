import type { Metadata } from "next";
import { playfair, dmSans } from "@/lib/fonts";
import { LocaleProvider } from "@/lib/locale-context";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rozkvetlá restaurace | Česko-ukrajinská kuchyně v Praze",
    template: "%s | Rozkvetlá restaurace",
  },
  description:
    "Rozkvetlá restaurace v Praze 10 – spojení české a ukrajinské kuchyně v útulném prostředí plném květin. Rezervace, obědové menu, oslavy na klíč.",
  keywords: [
    "restaurace Praha 10",
    "česko-ukrajinská kuchyně",
    "Záběhlice",
    "rozkvetlá restaurace",
    "obědové menu",
    "oslavy",
    "svatby Praha",
    "ukrajinská kuchyně",
  ],
  authors: [{ name: "Rozkvetlá restaurace" }],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    alternateLocale: "uk_UA",
    siteName: "Rozkvetlá restaurace",
    title: "Rozkvetlá restaurace | Česko-ukrajinská kuchyně v Praze",
    description:
      "Spojení české a ukrajinské kuchyně v útulném prostředí plném květin a zeleně. Topolová 2916/14, Praha 10.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <LocaleProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CookieBanner />
          <Toaster richColors position="top-center" />
        </LocaleProvider>
      </body>
    </html>
  );
}
