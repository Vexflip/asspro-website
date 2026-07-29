import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WelcomeScreen from "@/components/ui/WelcomeScreen";
import GlobalScrollbar from "@/components/ui/GlobalScrollbar";
import { SITE_URL, canonical } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  alternates: canonical("/"),
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
    url: SITE_URL,
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
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-dark-bg.webp`,
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
      <body className="min-h-screen flex flex-col overflow-x-hidden" data-overlayscrollbars-initialize>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Aller au contenu principal
        </a>
        <GlobalScrollbar />
        <WelcomeScreen />
        <Navbar />
        <main id="main-content" className="flex-1 w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
