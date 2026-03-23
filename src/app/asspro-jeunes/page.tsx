"use client";

import Image from "next/image";
import {
  Building2,
  Scale,
  RefreshCw,
  Shield,
  Share2,
  Calendar,
  Users,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { guides } from "@/data/guides";

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6" />,
  Scale: <Scale className="w-6 h-6" />,
  RefreshCw: <RefreshCw className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Share2: <Share2 className="w-6 h-6" />,
};

const events = [
  {
    title: "Rencontre ASSPRO Jeunes — Paris",
    date: "12 Avril 2026",
    description:
      "Soirée networking et conférences pour les jeunes praticiens du bloc opératoire.",
  },
  {
    title: "Webinaire — Premiers pas en libéral",
    date: "28 Mai 2026",
    description:
      "Tout ce qu'il faut savoir pour démarrer son activité libérale sereinement.",
  },
  {
    title: "Journée Simulation — Lyon",
    date: "15 Juin 2026",
    description:
      "Journée de simulation dédiée aux internes et jeunes praticiens.",
  },
];

export default function AssproJeunesPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="ASSPRO Jeunes"
        subtitle="La première communauté des jeunes médecins du bloc opératoire. Guides, accompagnement et réseau pour bien démarrer votre carrière."
      />

      {/* About the program */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <SectionHeading
                title="Un programme pour vous"
                subtitle="Accompagner les jeunes praticiens dans leurs premiers pas au bloc opératoire"
                centered={false}
              />
              <p className="text-muted leading-relaxed mb-4">
                Que vous soyez interne, chef de clinique ou jeune praticien,
                ASSPRO Jeunes est votre communauté. Nous avons créé ce programme
                pour répondre aux questions que tout jeune médecin se pose en
                début de carrière.
              </p>
              <p className="text-muted leading-relaxed mb-6">
                Installation, assurances, premiers contentieux, gestion des
                réseaux sociaux... Nos guides pratiques et nos événements vous
                accompagnent à chaque étape.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Users className="w-5 h-5" />
                  Toutes spécialités
                </div>
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Shield className="w-5 h-5" />
                  Accès gratuit adhérents
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop"
                  alt="Jeunes médecins en formation"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Nos guides pratiques"
            subtitle="Des ressources concrètes pour vous accompagner dans vos premiers pas"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, i) => (
              <ScrollReveal key={guide.id} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                  <div className="w-12 h-12 rounded-lg bg-accent-teal/10 flex items-center justify-center text-accent-teal mb-4">
                    {iconMap[guide.icon]}
                  </div>
                  <h3 className="font-bold text-dark mb-2 group-hover:text-accent-teal transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {guide.description}
                  </p>
                  <p className="mt-4 text-accent-teal font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Télécharger le guide <ArrowRight className="w-4 h-4" />
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Événements à venir"
            subtitle="Rencontres, webinaires et journées de formation dédiés aux jeunes praticiens"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <ScrollReveal key={event.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-accent-teal">
                  <div className="flex items-center gap-2 text-accent-teal mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{event.date}</span>
                  </div>
                  <h3 className="font-bold text-dark mb-2">{event.title}</h3>
                  <p className="text-sm text-muted">{event.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 bg-gradient-to-br from-accent-teal to-primary">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Rejoignez ASSPRO Jeunes
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Intégrez la communauté des jeunes praticiens du bloc opératoire et
            bénéficiez de tous nos guides et événements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="white" size="lg">
              Devenir membre
            </Button>
            <Button
              href="/formations"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-accent-teal"
            >
              Voir les formations
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
