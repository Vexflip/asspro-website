"use client";

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
import { boardMembers } from "@/data/governance";

const values = [
  {
    title: "Prévention",
    description:
      "Anticiper et réduire les risques pour garantir la sécurité des patients et des équipes.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "Formation",
    description:
      "Transmettre les connaissances et développer les compétences des professionnels de santé.",
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
    year: "1991",
    title: "Création d'ASSPRO",
    description:
      "Fondation de l'association par des anesthésistes-réanimateurs engagés dans la prévention des risques.",
  },
  {
    year: "2000",
    title: "Lancement des formations ARRES",
    description:
      "Mise en place du programme phare d'Analyse et Réduction des Risques en Établissements de Santé.",
  },
  {
    year: "2010",
    title: "Plateforme E-learning",
    description:
      "Lancement de la plateforme de formation en ligne pour toucher un public plus large.",
  },
  {
    year: "2015",
    title: "ASSPRO Jeunes",
    description:
      "Création du programme dédié aux jeunes praticiens du bloc opératoire.",
  },
  {
    year: "2018",
    title: "ASSPRO Truck",
    description:
      "Lancement du camion itinérant de formation avec simulateurs embarqués.",
  },
  {
    year: "2024",
    title: "30+ ans d'engagement",
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
        subtitle="Depuis plus de 30 ans, ASSPRO accompagne les professionnels du bloc opératoire dans la prévention et la gestion des risques."
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
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <h2 className="text-3xl font-bold font-serif text-dark mb-6">
                Notre mission
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                ASSPRO (Association des Anesthésistes-Réanimateurs pour la
                Prévention des Risques Opératoires) est une association dédiée à
                la prévention et à la maîtrise des risques au bloc opératoire.
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
            subtitle="Plus de trois décennies d'engagement pour la sécurité au bloc opératoire"
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
      <section className="py-12 md:py-20 bg-surface" id="gouvernance">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="La gouvernance"
            subtitle="Le conseil d'administration d'ASSPRO réunit des professionnels de santé engagés dans la prévention des risques opératoires."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.08}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="relative aspect-square w-full bg-surface">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover object-center"
                      unoptimized
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-dark text-base leading-snug">{member.name}</h3>
                    <p className="text-muted text-sm mt-1">{member.title}</p>
                    {member.role && (
                      <p className="text-primary text-sm font-semibold mt-1">{member.role}</p>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto pt-4 inline-flex items-center gap-2 text-xs text-primary hover:text-primary-light transition-colors font-medium"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        Voir le profil LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

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
