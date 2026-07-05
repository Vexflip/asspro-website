import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recherche",
  description:
    "Recherchez dans les formations et ressources d'ASSPRO pour la prévention des risques au bloc opératoire.",
};

export default function RechercheLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
