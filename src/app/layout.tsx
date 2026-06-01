import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WelcomeScreen from "@/components/ui/WelcomeScreen";
import GlobalScrollbar from "@/components/ui/GlobalScrollbar";
import "overlayscrollbars/overlayscrollbars.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ASSPRO — Prévention et maîtrise des risques au bloc opératoire",
    template: "%s | ASSPRO",
  },
  description:
    "ASSPRO accompagne les professionnels de santé dans la prévention et la gestion des risques au bloc opératoire. Formations, accompagnement médico-légal et ressources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen flex flex-col" data-overlayscrollbars-initialize>
        <GlobalScrollbar />
        <WelcomeScreen />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
