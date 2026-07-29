import { Training } from "@/types";

export const formations: Training[] = [
  {
    id: "1",
    title: "Formation ARRES – Gestion des risques au bloc opératoire",
    description:
      "Formation complète sur l'analyse et la réduction des risques en environnement chirurgical. Approche pratique et interactive.",
    category: "arres",
    date: "15-16 Avril 2026",
    location: "Paris",
    image: "/images/formations/arres-gestion-risques.webp",
    duration: "2 jours",
  },
  {
    id: "2",
    title: "Simulation haute-fidélité – Gestion de crise",
    description:
      "Mise en situation réaliste pour développer les compétences en gestion de crise au bloc opératoire.",
    category: "simulation",
    date: "22-23 Mai 2026",
    location: "Lyon",
    image: "/images/formations/equipe-medicale.webp",
    duration: "2 jours",
  },
  {
    id: "3",
    title: "E-learning – Sécurité du patient",
    description:
      "Module en ligne sur les bonnes pratiques de sécurité patient au bloc opératoire. À votre rythme.",
    category: "elearning",
    date: "Disponible en ligne",
    location: "En ligne",
    image: "/images/formations/elearning-securite-patient.webp",
    duration: "8 heures",
  },
  {
    id: "4",
    title: "Softkills – Communication en équipe",
    description:
      "Améliorer la communication interprofessionnelle au bloc opératoire pour réduire les erreurs.",
    category: "softkills",
    date: "10-11 Juin 2026",
    location: "Marseille",
    image: "/images/formations/softskills-communication.webp",
    duration: "2 jours",
  },
  {
    id: "5",
    title: "Formation ARRES – Analyse des événements indésirables",
    description:
      "Méthodologie d'analyse des événements indésirables et mise en place d'actions correctives.",
    category: "arres",
    date: "3-4 Juillet 2026",
    location: "Bordeaux",
    image: "/images/formations/gestion-risques-bloc.webp",
    duration: "2 jours",
  },
  {
    id: "6",
    title: "ASSPRO Truck – Formation itinérante",
    description:
      "Le camion ASSPRO vient à vous ! Formation de proximité avec simulateurs embarqués.",
    category: "autres",
    date: "Septembre 2026",
    location: "Tournée nationale",
    image: "/images/formations/truck-itinerant.webp",
    duration: "1 jour",
  },
  {
    id: "7",
    title: "E-learning – Responsabilité médico-légale",
    description:
      "Comprendre le cadre juridique et les responsabilités médico-légales du praticien au bloc.",
    category: "elearning",
    date: "Disponible en ligne",
    location: "En ligne",
    image: "/images/formations/elearning-medico-legal.webp",
    duration: "6 heures",
  },
  {
    id: "8",
    title: "Simulation – Arrêt cardiaque peropératoire",
    description:
      "Scénario de simulation pour la prise en charge d'un arrêt cardiaque au bloc opératoire.",
    category: "simulation",
    date: "18-19 Octobre 2026",
    location: "Strasbourg",
    image: "/images/formations/simulation-arret-cardiaque.webp",
    duration: "2 jours",
  },
];

export const categoryLabels: Record<Training["category"], string> = {
  arres: "ARRES",
  elearning: "E-learning",
  simulation: "Simulation",
  softkills: "Softkills",
  autres: "Autres",
};
