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
  metadataBase: new URL("https://asspro.vexflip.fr"),
  title: {
    default: "ASSPRO — Prévention et maîtrise des risques au bloc opératoire",
    template: "%s | ASSPRO",
  },
  description:
    "ASSPRO accompagne les professionnels de santé dans la prévention et la gestion des risques au bloc opératoire. Formations, accompagnement médico-légal et ressources.",
  keywords: [
    "ASSPRO",
    "prévention des risques",
    "bloc opératoire",
    "formation médicale",
    "accompagnement médico-légal",
    "chirurgien",
    "anesthésiste",
    "santé",
  ],
  authors: [{ name: "ASSPRO" }],
  creator: "ASSPRO",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://asspro.vexflip.fr",
    siteName: "ASSPRO",
    title: "ASSPRO — Prévention et maîtrise des risques au bloc opératoire",
    description:
      "ASSPRO accompagne les professionnels de santé dans la prévention et la gestion des risques au bloc opératoire.",
    images: [
      {
        url: "/images/hero-bg.webp",
        width: 1200,
        height: 630,
        alt: "ASSPRO Équipe médicale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASSPRO — Prévention et maîtrise des risques",
    description:
      "Prévention et gestion des risques au bloc opératoire pour les professionnels de santé.",
    images: ["/images/hero-bg.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "ASSPRO",
  url: "https://asspro.vexflip.fr",
  logo: "https://asspro.vexflip.fr/images/logo-dark-bg.webp",
  description: "Association dédiée à la prévention et à la maîtrise des risques au bloc opératoire.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "60 rue de la Chaussée d'Antin",
    addressLocality: "Paris",
    postalCode: "75009",
    addressCountry: "FR"
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+33-1-55-07-15-15",
    contactType: "customer service",
    email: "contact@asspro.fr",
    availableLanguage: "French"
  },
  sameAs: [
    "https://www.linkedin.com/company/asspro/"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
