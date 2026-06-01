import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formations",
  description:
    "Découvrez les formations ASSPRO : ARRES, e-learning, simulation, softkills et ASSPRO Truck pour les professionnels du bloc opératoire.",
};

export default function FormationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
