import type { Metadata } from "next";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recherche",
  alternates: canonical("/recherche"),
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
