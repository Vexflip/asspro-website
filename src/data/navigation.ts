import { NavItem } from "@/types";

export const navigation: NavItem[] = [
  {
    label: "Accueil",
    href: "/",
  },
  {
    label: "À propos",
    href: "/a-propos",
    children: [
      { label: "Qui sommes-nous ?", href: "/a-propos" },
      { label: "Prévention des risques", href: "/a-propos#prevention" },
      { label: "Partenaires", href: "/partenaires" },
    ],
  },
  {
    label: "Formations",
    href: "/formations",
  },
  {
    label: "ASSPRO Jeunes",
    href: "/asspro-jeunes",
  },
  {
    label: "Actualités",
    href: "/actualites",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
