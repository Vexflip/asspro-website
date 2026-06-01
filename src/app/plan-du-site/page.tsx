import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import {
  Home,
  Users,
  GraduationCap,
  Newspaper,
  Scale,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Plan du site",
  description:
    "Plan du site ASSPRO — retrouvez l'ensemble des pages du site pour naviguer facilement parmi nos contenus : formations, adhésion, contact et plus.",
};

const siteMap = [
  {
    title: "Pages principales",
    icon: <Home className="w-5 h-5" />,
    pages: [
      {
        label: "Accueil",
        href: "/",
        description:
          "Page d'accueil du site ASSPRO — prévention et maîtrise des risques au bloc opératoire.",
      },
      {
        label: "À propos",
        href: "/a-propos",
        description:
          "Découvrez l'histoire d'ASSPRO, nos valeurs, notre mission et notre gouvernance.",
      },
      {
        label: "Contact",
        href: "/contact",
        description:
          "Contactez notre équipe pour toute question, demande de formation ou d'adhésion.",
      },
    ],
  },
  {
    title: "Formations",
    icon: <GraduationCap className="w-5 h-5" />,
    pages: [
      {
        label: "Nos formations",
        href: "/formations",
        description:
          "Catalogue complet de nos formations : ARRES, e-learning, simulation, Softkills et ASSPRO Truck.",
      },
    ],
  },
  {
    title: "L'association",
    icon: <Users className="w-5 h-5" />,
    pages: [
      {
        label: "ASSPRO Jeunes",
        href: "/asspro-jeunes",
        description:
          "Programme dédié aux jeunes praticiens du bloc opératoire.",
      },
      {
        label: "Partenaires",
        href: "/partenaires",
        description:
          "Nos partenaires institutionnels et professionnels engagés à nos côtés.",
      },
      {
        label: "Adhésion",
        href: "/adhesion",
        description:
          "Rejoignez ASSPRO — les avantages de l'adhésion et le formulaire d'inscription.",
      },
    ],
  },
  {
    title: "Actualités",
    icon: <Newspaper className="w-5 h-5" />,
    pages: [
      {
        label: "Actualités",
        href: "/actualites",
        description:
          "Toutes les dernières nouvelles, événements et publications d'ASSPRO.",
      },
    ],
  },
  {
    title: "Informations légales",
    icon: <Scale className="w-5 h-5" />,
    pages: [
      {
        label: "Mentions légales",
        href: "/mentions-legales",
        description:
          "Informations sur l'éditeur, l'hébergeur, la propriété intellectuelle et la protection des données.",
      },
      {
        label: "Conditions générales d'utilisation",
        href: "/conditions-generales",
        description:
          "Règles d'utilisation du site, responsabilité et droit applicable.",
      },
      {
        label: "Plan du site",
        href: "/plan-du-site",
        description:
          "Page actuelle — liste complète de toutes les pages du site.",
      },
    ],
  },
];

export default function PlanDuSitePage() {
  return (
    <>
      <PageHero
        title="Plan du site"
        subtitle="Retrouvez l'ensemble des pages du site ASSPRO pour naviguer facilement."
      />

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {siteMap.map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold font-serif text-dark">
                    {section.title}
                  </h2>
                </div>

                <div className="ml-0 sm:ml-[52px] space-y-3">
                  {section.pages.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className="group block bg-surface hover:bg-primary/5 border border-transparent hover:border-primary/10 rounded-xl p-4 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-dark group-hover:text-primary transition-colors">
                            {page.label}
                          </h3>
                          <p className="text-xs text-muted mt-1 leading-relaxed">
                            {page.description}
                          </p>
                        </div>
                        <svg
                          className="w-4 h-4 text-muted/40 group-hover:text-primary transition-colors mt-0.5 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
