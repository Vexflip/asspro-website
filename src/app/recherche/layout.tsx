import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recherche",
  description:
    "Recherchez dans l'ensemble du site ASSPRO — pages, formations, guides, gouvernance et partenaires pour la prévention des risques au bloc opératoire.",
};

export default function RechercheLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
