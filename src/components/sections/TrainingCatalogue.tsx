"use client";

import {
  GraduationCap,
  Monitor,
  Truck,
  Users,
  Activity,
  BookOpen,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Card from "@/components/ui/Card";

const categories = [
  {
    title: "Formations ARRES",
    description: "Analyse et réduction des risques en environnement chirurgical",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    title: "E-learning",
    description: "Modules en ligne accessibles à tout moment, à votre rythme",
    icon: <Monitor className="w-6 h-6" />,
  },
  {
    title: "ASSPRO Truck",
    description: "Formation itinérante avec simulateurs embarqués de dernière génération",
    icon: <Truck className="w-6 h-6" />,
  },
  {
    title: "Softkills",
    description: "Communication, leadership et travail en équipe au bloc opératoire",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Simulation",
    description: "Mises en situation haute-fidélité pour la gestion de crise",
    icon: <Activity className="w-6 h-6" />,
  },
  {
    title: "Autres formations",
    description: "Formations spécialisées et sur mesure selon vos besoins",
    icon: <BookOpen className="w-6 h-6" />,
  },
];

export default function TrainingCatalogue() {
  return (
    <section className="py-12 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          title="Notre catalogue de formations"
          subtitle="Des programmes adaptés à tous les professionnels du bloc opératoire"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.title} delay={i * 0.1}>
              <Card
                title={cat.title}
                description={cat.description}
                icon={cat.icon}
                href="/formations"
                cta="Découvrir"
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
