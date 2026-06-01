import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adhésion",
  description:
    "Rejoignez ASSPRO et bénéficiez de formations, d'un accompagnement médico-légal 24/7 et de ressources exclusives pour votre pratique.",
};

export default function AdhesionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
