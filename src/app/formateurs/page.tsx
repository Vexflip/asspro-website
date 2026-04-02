import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { formateurs } from "@/data/formateurs";

export default function FormateursPage() {
  return (
    <>
      <PageHero
        title="Nos formateurs"
        subtitle="Des experts reconnus qui transmettent leur savoir-faire pour renforcer la sécurité au bloc opératoire."
      />

      {/* Trainers grid */}
      <section className="py-12 md:py-20 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Notre équipe pédagogique"
            subtitle="Tous nos formateurs ont donné leur accord pour apparaître sur ce site."
          />
          <ScrollReveal>
            <p className="text-muted leading-relaxed text-lg text-center max-w-3xl mx-auto mb-10">
              ASSPRO s&apos;appuie sur une équipe de formateurs issus du terrain
              — anesthésistes-réanimateurs, chirurgiens, experts médico-légaux et
              infirmiers de bloc opératoire. Chaque formateur apporte une
              expertise complémentaire au service d&apos;une pédagogie exigeante
              et ancrée dans la pratique clinique réelle.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {formateurs.map((formateur, i) => (
              <ScrollReveal key={formateur.name} delay={i * 0.07}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="relative h-56 w-full">
                    <Image
                      src={formateur.photo}
                      alt={formateur.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-dark">{formateur.name}</h3>
                    <p className="text-primary text-sm font-medium mt-1">
                      {formateur.title}
                    </p>
                    <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full w-fit">
                      {formateur.specialty}
                    </span>
                    <p className="text-muted text-sm mt-3 leading-relaxed flex-1">
                      {formateur.bio}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4">
              Vous souhaitez devenir formateur ASSPRO ?
            </h2>
            <p className="text-white/80 mb-8">
              Vous êtes professionnel de santé et souhaitez contribuer à la
              formation de vos pairs ? Contactez-nous pour rejoindre notre équipe
              pédagogique.
            </p>
            <Button href="/contact" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Nous contacter
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
