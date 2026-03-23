"use client";

import { useState } from "react";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import {
  Calendar,
  MapPin,
  Clock,
  Filter,
  Truck,
  Monitor,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formations, categoryLabels } from "@/data/formations";
import type { Training } from "@/types";

const tabs: { key: Training["category"] | "all"; label: string }[] = [
  { key: "all", label: "Toutes" },
  { key: "arres", label: "ARRES" },
  { key: "elearning", label: "E-learning" },
  { key: "simulation", label: "Simulation" },
  { key: "softkills", label: "Softkills" },
  { key: "autres", label: "Autres" },
];

export default function FormationsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered =
    activeTab === "all"
      ? formations
      : formations.filter((f) => f.category === activeTab);

  return (
    <>
      {/* Hero */}
      <PageHero
        title="Nos Formations"
        subtitle="Des programmes de formation innovants pour les professionnels du bloc opératoire"
      />

      {/* Filter tabs + Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <Filter className="w-5 h-5 text-muted self-center mr-2" />
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-primary text-white shadow-md"
                    : "bg-surface text-muted hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((formation, i) => (
              <ScrollReveal key={formation.id} delay={i * 0.05}>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={formation.image}
                      alt={formation.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge>{categoryLabels[formation.category]}</Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-dark mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {formation.title}
                    </h3>
                    <p className="text-sm text-muted mb-4 line-clamp-2">
                      {formation.description}
                    </p>
                    <div className="space-y-2 text-sm text-muted mb-4">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 shrink-0" />
                        {formation.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 shrink-0" />
                        {formation.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4 shrink-0" />
                        {formation.duration}
                      </p>
                    </div>
                    <Button size="sm" className="w-full">
                      En savoir plus
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted">
              Aucune formation dans cette catégorie pour le moment.
            </div>
          )}
        </div>
      </section>

      {/* ASSPRO Truck Banner */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative h-56 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=800&h=600&fit=crop"
                  alt="ASSPRO Truck"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold font-serif text-dark">
                  ASSPRO Truck
                </h2>
              </div>
              <p className="text-muted leading-relaxed mb-6">
                Notre camion itinérant parcourt la France pour vous proposer des
                formations de proximité. Équipé de simulateurs de dernière
                génération, il permet de se former dans des conditions réalistes
                directement sur votre lieu d&apos;exercice.
              </p>
              <Button href="/contact">Réserver une session</Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* E-learning CTA */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-12 text-center text-white">
            <Monitor className="w-12 h-12 mx-auto mb-4 text-white/80" />
            <h2 className="text-3xl font-bold font-serif mb-4">
              Plateforme E-learning
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Formez-vous à votre rythme grâce à notre plateforme de formation en
              ligne. Modules interactifs, quiz et attestations de formation.
            </p>
            <Button variant="white" size="lg">
              Accéder à la plateforme
            </Button>
          </div>
        </div>
      </section>

      {/* Registration Steps */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            title="Comment s'inscrire ?"
            subtitle="Un processus simple en 3 étapes"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choisissez",
                description: "Sélectionnez la formation qui correspond à vos besoins",
              },
              {
                step: "2",
                title: "Inscrivez-vous",
                description: "Remplissez le formulaire d'inscription en ligne",
              },
              {
                step: "3",
                title: "Confirmez",
                description: "Recevez votre confirmation et préparez-vous",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.15}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
                  {i < 2 && (
                    <ArrowRight className="w-5 h-5 text-primary/30 mx-auto mt-4 hidden md:block rotate-0" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
