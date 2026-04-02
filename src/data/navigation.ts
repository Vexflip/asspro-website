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
      { label: "La gouvernance", href: "/a-propos#gouvernance" },
      { label: "Partenaires", href: "/partenaires" },
    ],
  },
  {
    label: "Formations",
    href: "/formations",
  },
  {
    label: "Nos formateurs",
    href: "/formateurs",
  },
  {
    label: "Adhésion",
    href: "/adhesion",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];
