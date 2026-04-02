export interface Formateur {
  name: string;
  title: string;
  specialty: string;
  photo: string;
  bio: string;
}

export const formateurs: Formateur[] = [
  {
    name: "Dr Patrick-Georges Yavordios",
    title: "Anesthésiste-Réanimateur",
    specialty: "Gestion des risques, ARRES",
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    bio: "Expert en prévention des risques opératoires et formateur principal du programme ARRES. Auteur de nombreuses publications sur la sécurité au bloc opératoire.",
  },
  {
    name: "Dr Marie-Claire Dubois",
    title: "Médecin Anesthésiste-Réanimatrice",
    specialty: "Simulation, ARRES",
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    bio: "Formatrice certifiée en simulation médicale haute-fidélité. Spécialiste de la formation par scénarios et des situations de crise.",
  },
  {
    name: "Dr François Lecomte",
    title: "Médecin Légiste – Expert Judiciaire",
    specialty: "Médico-légal, Consentement",
    photo:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
    bio: "Expert en droit médical et responsabilité du praticien. Intervenant régulier sur les thématiques du consentement éclairé et de la gestion des contentieux.",
  },
  {
    name: "Dr Alain Ferreira",
    title: "Anesthésiste-Réanimateur",
    specialty: "Pédagogie, E-learning",
    photo:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    bio: "Concepteur pédagogique et responsable de la plateforme e-learning ASSPRO. Spécialisé dans les formats de formation à distance et les outils numériques.",
  },
  {
    name: "Dr Sophie Marchand",
    title: "Anesthésiste Hospitalière",
    specialty: "Softkills, Communication",
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    bio: "Formatrice en facteurs humains et communication d'équipe. Experte des techniques de leadership et de gestion du stress en situation opératoire.",
  },
  {
    name: "Dr Isabelle Renaud",
    title: "Anesthésiste – Praticien Hospitalier",
    specialty: "ASSPRO Jeunes, Simulation",
    photo:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop",
    bio: "Coordinatrice des formations pour jeunes praticiens. Spécialisée dans l'accompagnement des internes et des chefs de clinique au bloc opératoire.",
  },
  {
    name: "Dr Jean-Luc Bernard",
    title: "Chirurgien Orthopédiste",
    specialty: "Chirurgie, Prévention",
    photo:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    bio: "Chirurgien formateur, spécialisé dans la prévention des événements indésirables liés aux actes chirurgicaux et au travail d'équipe pluridisciplinaire.",
  },
  {
    name: "Mme Laurence Petit",
    title: "Infirmière de Bloc Opératoire (IBODE)",
    specialty: "IBODE, Protocoles",
    photo:
      "https://images.unsplash.com/photo-1580281657702-257584239a55?w=400&h=400&fit=crop",
    bio: "IBODE et formatrice, elle dispense les modules dédiés aux équipes paramédicales du bloc opératoire. Experte en check-lists et protocoles de sécurité.",
  },
];
