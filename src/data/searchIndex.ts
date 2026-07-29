import type { SearchEntry } from "@/lib/search";
import { formations, categoryLabels } from "./formations";
import { guides } from "./guides";
import { boardMembers } from "./governance";
import { partners } from "./partners";

// Curated, site-wide search index.
//
// Structured content (formations, guides, team, partners) is derived from the
// existing data files so it stays in sync automatically. Page entries capture
// the meaningful visible copy of each route by hand — when you add a brand-new
// page, add one entry to `pages` below.

// One entry per route. `keywords` holds the searchable page copy.
const pages: SearchEntry[] = [
  {
    id: "page-accueil",
    type: "page",
    title: "Accueil",
    href: "/",
    description:
      "Une association de médecins, pour les médecins — pour une meilleure prévention des risques au bloc opératoire.",
    keywords:
      "ASSPRO association de médecins pour les médecins prévention des risques au bloc opératoire depuis près de 30 ans aux côtés des professionnels de santé 5000 professionnels formés 150 formations par an assistance médico-légale 24/7 rejoignez ASSPRO devenir adhérent formations de qualité accompagnement médico-légal ressources exclusives Branchet Fondapro",
  },
  {
    id: "page-a-propos",
    type: "page",
    title: "À propos — Qui sommes-nous ?",
    href: "/a-propos",
    description:
      "Découvrez ASSPRO, notre mission, nos valeurs, notre histoire et l'équipe engagée dans la prévention des risques au bloc opératoire.",
    keywords:
      "qui sommes-nous notre mission ASSPRO Association pour la Prévention du Risque Opératoire maîtrise des risques au bloc opératoire nos valeurs prévention formation accompagnement médico-légal notre histoire 1991 création ARRES 2000 plateforme e-learning 2010 ASSPRO Truck camion itinérant 2018 gouvernance conseil d'administration la gestion des risques identification analyse barrières de sécurité protocoles événements indésirables travail collaboratif chirurgien anesthésiste infirmier de bloc sécurité du patient",
  },
  {
    id: "page-formations",
    type: "page",
    title: "Nos Formations",
    href: "/formations",
    description:
      "Des programmes de formation innovants pour les professionnels du bloc opératoire.",
    keywords:
      "formations pour les médecins ARRES simulation e-learning softkills ASSPRO Truck analyse multifactorielle grille ALARM sociétés savantes recommandations HAS Haute Autorité de Santé comité formations spécialités du bloc facteur humain travail en équipe DPC développement professionnel continu accréditation CPP Certification Périodique des Professionnels prévention et gestion du risque opératoire Branchet Solutions unité mobile de formation prochaines formations agenda exercices de simulation",
  },
  {
    id: "page-adhesion",
    type: "page",
    title: "Adhérer à ASSPRO",
    href: "/adhesion",
    description:
      "Rejoignez notre communauté de professionnels engagés dans la prévention des risques opératoires.",
    keywords:
      "adhésion adhérer devenir adhérent membre cotisation les avantages de l'adhésion réseau d'experts ressources exclusives accès aux formations tarifs préférentiels catalogue ARRES modules e-learning accompagnement médico-légal service d'assistance 24h/24 7j/7 ressources documentaires bibliothèque guides protocoles modèles de consentement références scientifiques réseau professionnel national newsletter veille réglementaire bonnes pratiques formulaire d'adhésion adhésion individuelle institutionnelle établissements de santé",
  },
  {
    id: "page-contact",
    type: "page",
    title: "Contactez-nous",
    href: "/contact",
    description:
      "Contactez ASSPRO pour vos questions sur la prévention des risques, les formations ou l'accompagnement médico-légal. Assistance 24/7.",
    keywords:
      "contact contactez-nous envoyez-nous un message nos coordonnées adresse 60 rue de la Chaussée d'Antin 75009 Paris France téléphone 01 55 07 15 15 email contact@asspro.fr localisation carte plan assistance médico-légale 24/7 24 heures sur 24 7 jours sur 7 04 85 85 85 85 renseignements",
  },
  {
    id: "page-partenaires",
    type: "page",
    title: "Nos Partenaires",
    href: "/partenaires",
    description:
      "Découvrez les partenaires d'ASSPRO engagés dans la sécurité et la qualité des soins au bloc opératoire.",
    keywords:
      "partenaires ensemble pour la sécurité et la qualité des soins au bloc opératoire réseau de confiance Branchet Branchet Solutions Fondation Fondapro responsabilité civile professionnelle assistance juridique devenir partenaire prévention des risques",
  },
  {
    id: "page-mentions-legales",
    type: "page",
    title: "Mentions légales",
    href: "/mentions-legales",
    description:
      "Éditeur, hébergeur, propriété intellectuelle et protection des données du site ASSPRO.",
    keywords:
      "mentions légales éditeur du site Association pour la Prévention du Risque Opératoire association loi 1901 siège social SIREN 527 924 658 directeur de la publication Patrick-Georges Yavordios président hébergeur o2switch Clermont-Ferrand propriété intellectuelle crédits photographiques Unsplash données personnelles RGPD responsable du traitement données collectées vos droits accès rectification effacement cookies limitation de responsabilité droit applicable CNIL loi confiance dans l'économie numérique",
  },
  {
    id: "page-politique-de-confidentialite",
    type: "page",
    title: "Politique de confidentialité",
    href: "/politique-de-confidentialite",
    description:
      "Traitement des données personnelles collectées par ASSPRO via les formulaires de contact et d'adhésion.",
    keywords:
      "politique de confidentialité RGPD données personnelles responsable du traitement données collectées formulaire de contact formulaire d'adhésion finalités base légale consentement destinataires durée de conservation sécurité vos droits accès rectification effacement opposition portabilité retrait du consentement CNIL cookies protection des données vie privée",
  },
  {
    id: "page-conditions-generales",
    type: "page",
    title: "Conditions générales d'utilisation",
    href: "/conditions-generales",
    description:
      "Règles d'utilisation du site ASSPRO, propriété intellectuelle et responsabilité.",
    keywords:
      "conditions générales d'utilisation CGU objet propriété intellectuelle accès au site utilisation du site liens hypertextes données personnelles RGPD cookies consentement limitation de responsabilité modification des CGU droit applicable juridiction compétente tribunaux français asspro.fr",
  },
  {
    id: "page-plan-du-site",
    type: "page",
    title: "Plan du site",
    href: "/plan-du-site",
    description:
      "Retrouvez l'ensemble des pages du site ASSPRO pour naviguer facilement.",
    keywords:
      "plan du site pages principales accueil à propos contact formations adhésion partenaires mentions légales conditions générales navigation liste des pages",
  },
];

const formationEntries: SearchEntry[] = formations.map((f) => ({
  id: `formation-${f.id}`,
  type: "formation",
  title: f.title,
  description: f.description,
  href: "/formations",
  keywords: `${categoryLabels[f.category]} ${f.location} ${f.date} ${f.duration}`,
}));

const guideEntries: SearchEntry[] = guides.map((g) => ({
  id: `guide-${g.id}`,
  type: "guide",
  title: g.title,
  description: g.description,
  href: "/adhesion",
}));

const teamEntries: SearchEntry[] = boardMembers.map((m, i) => ({
  id: `team-${i}`,
  type: "team",
  title: m.name,
  description: m.role ? `${m.role} · ${m.title}` : m.title,
  href: "/a-propos#gouvernance",
  keywords: `${m.role ?? ""} ${m.title} gouvernance conseil d'administration`,
}));

const partnerEntries: SearchEntry[] = partners.map((p) => ({
  id: `partner-${p.id}`,
  type: "partner",
  title: p.name,
  description: p.description,
  href: "/partenaires",
}));

export const searchIndex: SearchEntry[] = [
  ...pages,
  ...formationEntries,
  ...guideEntries,
  ...teamEntries,
  ...partnerEntries,
];
