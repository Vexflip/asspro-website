export interface BoardMember {
  name: string;
  title: string;
  photo: string;
  bio: string;
}

export const boardMembers: BoardMember[] = [
  {
    name: "Dr Patrick-Georges Yavordios",
    title: "Président",
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    bio: "Anesthésiste-réanimateur, fondateur et président d'ASSPRO depuis plus de 20 ans. Pionnier de la formation à la prévention des risques opératoires en France.",
  },
  {
    name: "Dr Marie-Claire Dubois",
    title: "Vice-présidente",
    photo:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    bio: "Médecin anesthésiste-réanimatrice, responsable du programme ARRES et coordinatrice des formations en simulation.",
  },
  {
    name: "Dr François Lecomte",
    title: "Secrétaire général",
    photo:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
    bio: "Spécialiste en médecine légale et expert judiciaire, il supervise l'accompagnement médico-légal des adhérents.",
  },
  {
    name: "Dr Sophie Marchand",
    title: "Trésorière",
    photo:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    bio: "Anesthésiste hospitalière et formatrice certifiée, elle gère les ressources de l'association et le suivi des partenariats.",
  },
  {
    name: "Dr Alain Ferreira",
    title: "Administrateur – Formations",
    photo:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    bio: "Responsable de l'ingénierie pédagogique, il coordonne l'élaboration des modules de formation et la mise à jour des référentiels.",
  },
  {
    name: "Dr Isabelle Renaud",
    title: "Administratrice – ASSPRO Jeunes",
    photo:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop",
    bio: "Coordinatrice du programme ASSPRO Jeunes, elle accompagne les internes et jeunes praticiens dans leur intégration professionnelle.",
  },
];
