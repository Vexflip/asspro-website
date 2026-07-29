import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Handshake } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { partners } from "@/data/partners";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nos Partenaires",
  alternates: canonical("/partenaires"),
  description:
    "Découvrez les partenaires d'ASSPRO engagés dans la sécurité et la qualité des soins au bloc opératoire.",
};

export default function PartenairesPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Nos Partenaires"
        subtitle="Ensemble pour la sécurité et la qualité des soins au bloc opératoire"
      />

      {/* Partners */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Partenaires"
            subtitle="Notre réseau de confiance au service de la sécurité des soins"
          />
          <div className="grid grid-cols-1 gap-8">
            {partners.map((partner, i) => (
              <ScrollReveal key={partner.id} delay={i * 0.1}>
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="relative w-48 h-24 shrink-0">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="192px"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-dark mb-3">
                      {partner.name}
                    </h3>
                    <p className="text-muted leading-relaxed mb-4">
                      {partner.description}
                    </p>
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                      Visiter le site <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Become a partner CTA */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-12 text-white">
              <Handshake className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold font-serif mb-4">
                Devenir partenaire
              </h2>
              <p className="text-white/80 max-w-xl mx-auto mb-8">
                Vous partagez notre engagement pour la sécurité au bloc
                opératoire ? Rejoignez notre réseau de partenaires et
                contribuez à la prévention des risques.
              </p>
              <Button href="/contact" variant="white" size="lg">
                Nous contacter
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

