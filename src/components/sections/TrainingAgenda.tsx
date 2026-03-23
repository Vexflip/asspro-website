"use client";

import { Calendar, MapPin, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formations } from "@/data/formations";
import { categoryLabels } from "@/data/formations";

export default function TrainingAgenda() {
  const upcoming = formations.filter((f) => f.location !== "En ligne").slice(0, 4);

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          title="Prochaines formations"
          subtitle="Découvrez nos formations à venir et inscrivez-vous dès maintenant"
        />

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {upcoming.map((formation, i) => (
            <ScrollReveal key={formation.id} delay={i * 0.1} className="snap-start">
              <div className="w-72 sm:w-80 flex-shrink-0 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${formation.image})` }}
                />
                <div className="p-5">
                  <Badge variant="primary">{categoryLabels[formation.category]}</Badge>
                  <h3 className="text-base font-bold text-dark mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {formation.title}
                  </h3>
                  <div className="space-y-1 text-sm text-muted">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formation.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {formation.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formation.duration}
                    </p>
                  </div>
                  <Button href="/formations" size="sm" className="mt-4 w-full">
                    S&apos;inscrire
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button href="/formations" variant="outline">
            Voir toutes les formations
          </Button>
        </div>
      </div>
    </section>
  );
}
