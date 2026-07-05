import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formations",
  description:
    "Les formations conçues par ASSPRO et organisées par notre partenaire Branchet Solutions pour améliorer la prévention et la gestion du risque opératoire.",
};

export default function FormationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
