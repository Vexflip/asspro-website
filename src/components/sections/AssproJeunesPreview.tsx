"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Button from "@/components/ui/Button";

const highlights = [
  "Guides pratiques pour les jeunes médecins",
  "Accompagnement pour votre première installation",
  "Conseils en assurance et prévoyance",
  "Communauté de jeunes praticiens du bloc",
  "Événements et rencontres dédiés",
];

export default function AssproJeunesPreview() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop"
                alt="Jeunes médecins"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <SectionHeading
              title="ASSPRO Jeunes"
              subtitle="La première communauté des jeunes médecins du bloc opératoire"
              centered={false}
            />
            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-dark">{item}</span>
                </li>
              ))}
            </ul>
            <Button href="/asspro-jeunes">
              Découvrir ASSPRO Jeunes
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
