import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import {
  Home,
  Users,
  GraduationCap,
  Scale,
} from "lucide-react";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan du site",
  alternates: canonical("/plan-du-site"),
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
          "Les formations conçues par ASSPRO et organisées par notre partenaire Branchet Solutions.",
      },
    ],
  },
  {
    title: "L'association",
    icon: <Users className="w-5 h-5" />,
    pages: [
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
        label: "Politique de confidentialité",
        href: "/politique-de-confidentialite",
        description:
          "Traitement des données personnelles collectées via les formulaires, finalités, conservation et droits RGPD.",
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
