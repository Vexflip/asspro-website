"use client";

import { FileText, ClipboardList, Download } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Card from "@/components/ui/Card";

const resources = [
  {
    title: "Consentement éclairé",
    description:
      "Formulaires de consentement éclairé par spécialité chirurgicale, conformes aux dernières recommandations.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Fiches d'information patient",
    description:
      "Documents d'information destinés aux patients avant une intervention chirurgicale.",
    icon: <ClipboardList className="w-6 h-6" />,
  },
  {
    title: "Documents pré-opératoires",
    description:
      "Ressources et check-lists pour la préparation pré-opératoire du patient.",
    icon: <Download className="w-6 h-6" />,
  },
];

export default function PatientInfo() {
  return (
    <section className="py-12 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          title="Ressources patient"
          subtitle="Documents et formulaires essentiels pour la prise en charge de vos patients"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.1}>
              <Card
                title={r.title}
                description={r.description}
                icon={r.icon}
                cta="Télécharger"
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
