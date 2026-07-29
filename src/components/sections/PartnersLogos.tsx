"use client";

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { partners } from "@/data/partners";

export default function PartnersLogos() {
  return (
    <section className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          title="Nos partenaires"
          subtitle="Ils nous font confiance et nous accompagnent"
        />

        <div className="flex flex-wrap justify-center items-center gap-12">
          {partners.map((partner, i) => (
            <ScrollReveal key={partner.id} delay={i * 0.15}>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                title={partner.name}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={80}
                  className="object-contain"
                />
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
