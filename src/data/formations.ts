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
    image: "https://images.unsplash.com/photo-1640876777002-badf6aee5bcc?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=600&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=400&fit=crop",
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
