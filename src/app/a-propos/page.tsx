import type { Metadata } from "next";
import Image from "next/image";
import {
  Shield,
  GraduationCap,
  HeartHandshake,
  Target,
  Users,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import GovernanceSection from "@/components/sections/GovernanceSection";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez ASSPRO, notre mission, nos valeurs, notre histoire et l'équipe engagée dans la prévention des risques au bloc opératoire.",
};

const values = [
  {
    title: "Prévention",
    description:
      "Anticiper et réduire les risques pour garantir la sécurité des patients et des équipes.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "Formation continue",
    description:
      "Transmettre les connaissances et développer les compétences des professionnels de santé en matière de prévention du risque.",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    title: "Accompagnement",
    description:
      "Soutenir les praticiens dans leur exercice quotidien et face aux situations médico-légales.",
    icon: <HeartHandshake className="w-6 h-6" />,
  },
];

const timeline = [
  {
    year: "1997",
    title: "Création d'ASSPRO",
    description:
      "Fondation de l'association par des anesthésistes-réanimateurs engagés dans la prévention des risques.",
  },
  {
    year: "2001",
    title: "Lancement des formations ARRES",
    description:
      "Mise en place du programme phare d'Analyse et Réduction des Risques en Établissements de Santé.",
  },
  {
    year: "2005",
    title: "Journées ARRES",
    description:
      "Première édition des Journées ARRES, réunissant les professionnels de santé autour de la prévention et de la gestion des risques.",
  },
  {
    year: "2024",
    title: "Journée ASSPRO Multidisciplinaire",
    description:
      "Organisation de la Journée ASSPRO Multidisciplinaire, rassemblant l'ensemble des spécialités autour de la sécurité au bloc opératoire.",
  },
  {
    year: "2026",
    title: "Près de 30 ans d'engagement",
    description:
      "Plus de 5000 professionnels formés et un réseau national de partenaires.",
  },
];

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Qui sommes-nous ?"
        subtitle="Depuis près de 30 ans, ASSPRO accompagne les professionnels du bloc opératoire dans la prévention et la gestion des risques."
      />

      {/* Mission */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop"
                  alt="Équipe médicale"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <h2 className="text-3xl font-bold font-serif text-dark mb-6">
                Notre mission
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                ASSPRO (Association Spéciale de Prévention du Risque Opératoire)
                est une association dédiée à la prévention et à la maîtrise
                des risques au bloc opératoire.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                Notre engagement repose sur trois piliers fondamentaux : la
                formation des professionnels de santé, l&apos;accompagnement
                médico-légal et la mise à disposition de ressources pour une
                pratique plus sûre.
              </p>
              <p className="text-muted leading-relaxed">
                Nous travaillons chaque jour pour que la sécurité au bloc
                opératoire soit au cœur des préoccupations de chaque praticien,
                du chirurgien à l&apos;infirmier de bloc.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Nos valeurs"
            subtitle="Les principes qui guident notre action au quotidien"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <Card title={v.title} description={v.description} icon={v.icon} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20" id="prevention">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            title="Notre histoire"
            subtitle="Près de trois décennies d'engagement pour la sécurité au bloc opératoire"
          />
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />
            {timeline.map((item, i) => (
              <ScrollReveal
                key={item.year}
                direction={i % 2 === 0 ? "left" : "right"}
                delay={i * 0.1}
              >
                <div
                  className={`relative flex items-start gap-6 mb-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 mt-1.5 ring-4 ring-white" />
                  <div className="ml-10 md:ml-0 md:w-1/2 bg-white p-6 rounded-xl shadow-sm">
                    <span className="text-primary font-bold text-lg">
                      {item.year}
                    </span>
                    <h3 className="font-bold text-dark mt-1">{item.title}</h3>
                    <p className="text-sm text-muted mt-2">{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <GovernanceSection />

      {/* Risk Management */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ScrollReveal>
              <SectionHeading
                title="La gestion des risques"
                subtitle="Une approche globale pour un bloc opératoire plus sûr"
                centered={false}
              />
              <div className="space-y-4">
                {[
                  {
                    icon: <Target className="w-5 h-5" />,
                    text: "Identification et analyse des risques spécifiques au bloc opératoire",
                  },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    text: "Mise en place de barrières de sécurité et de protocoles adaptés",
                  },
                  {
                    icon: <Users className="w-5 h-5" />,
                    text: "Formation des équipes à la communication et au travail collaboratif",
                  },
                  {
                    icon: <HeartHandshake className="w-5 h-5" />,
                    text: "Accompagnement dans la gestion des événements indésirables",
                  },
                ].map((item) => (
                  <div
                    key={item.text}
                    className="flex items-start gap-3 p-4 bg-surface rounded-lg"
                  >
                    <div className="text-primary mt-0.5">{item.icon}</div>
                    <p className="text-dark text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
              <Button href="/formations" className="mt-8">
                Découvrir nos formations
              </Button>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop"
                  alt="Gestion des risques au bloc opératoire"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
