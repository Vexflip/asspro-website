import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function FormationsPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Nos Formations"
        subtitle="Des programmes de formation innovants pour les professionnels du bloc opératoire"
      />

      {/* Présentation */}
      <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading title="Des formations pour les médecins" />
          <ScrollReveal>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Les formations conçues par ASSPRO sont le résultat d&apos;une
                analyse multifactorielle, intégrant les mises en cause des
                praticiens, la grille ALARM et les informations publiées par les
                sociétés savantes et les recommandations de la HAS (Haute
                Autorité de Santé).
              </p>
              <p>
                Un Comité formations composé de médecins adhérents, représentant
                toutes les spécialités du bloc, se réunit une fois par trimestre.
                Ce comité valide les sujets sur lesquels travailler, qu&apos;il
                s&apos;agisse de sujets techniques propres à une spécialité, ou
                de sujets non techniques comme le travail en équipe et le facteur
                humain.
              </p>
              <p>
                Les formations conçues par ASSPRO s&apos;intègrent dans les
                prérequis du DPC (développement professionnel continu), les
                piliers de l&apos;accréditation et les blocs de la CPP
                (Certification Périodique des Professionnels).
              </p>
              <p>
                Elles sont toutes destinées à améliorer les pratiques dans le
                domaine de la prévention et la gestion du risque opératoire.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Prochaines formations */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <SectionHeading title="Prochaines formations" />
          <ScrollReveal>
            <p className="text-muted leading-relaxed mb-8 max-w-2xl mx-auto">
              Notre partenaire Branchet Solutions organise les formations conçues
              par les membres d&apos;ASSPRO avec des formats adaptés : exercices
              de simulation, e-learning, ainsi qu&apos;au plus près des médecins
              grâce à l&apos;unité mobile de formation, ASSPRO Truck.
            </p>
            <Button
              href="https://branchetsolutions.fr/branchet-training"
              size="lg"
            >
              Retrouvez l&apos;agenda des prochaines formations
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
