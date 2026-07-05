import type { Metadata } from "next";

import {
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez ASSPRO pour vos questions sur la prévention des risques, les formations ou l'accompagnement médico-légal. Assistance 24/7.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Contactez-nous"
        subtitle="Besoin de renseignements sur nos actions ? Notre équipe est à votre écoute."
      />

      {/* Contact section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">

          {/* Two columns: form | coordonnées */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
            {/* Form */}
            <ScrollReveal direction="left" className="h-full">
              <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8 h-full">
                <h2 className="text-2xl font-bold font-serif text-dark mb-6">
                  Envoyez-nous un message
                </h2>
                <ContactForm />
              </div>
            </ScrollReveal>

            {/* Coordonnées + Map */}
            <ScrollReveal direction="right" className="h-full">
              <div className="flex flex-col gap-6 h-full">
                <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8 shrink-0">
                  <h2 className="text-2xl font-bold font-serif text-dark mb-6">
                    Nos coordonnées
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-dark">Adresse</p>
                        <p className="text-sm text-muted">
                          60 rue de la Chaussée d&apos;Antin
                          <br />
                          75009 Paris, France
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-dark">Téléphone</p>
                        <a
                          href="tel:0155071515"
                          className="text-sm text-muted hover:text-primary transition-colors"
                        >
                          01.55.07.15.15
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-dark">Email</p>
                        <a
                          href="mailto:contact@asspro.fr"
                          className="text-sm text-muted hover:text-primary transition-colors"
                        >
                          contact@asspro.fr
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-surface rounded-2xl overflow-hidden flex-1 min-h-48">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2158371393206!2d2.3352349!3d48.8755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e3eed81e7c5%3A0x0!2s60+Rue+de+la+Chauss%C3%A9e+d&#39;Antin%2C+75009+Paris!5e0!3m2!1sfr!2sfr!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localisation ASSPRO"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Emergency banner — full width */}
          <ScrollReveal>
            <div className="mt-8 bg-emergency/5 border-2 border-emergency/20 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-emergency/10 flex items-center justify-center text-emergency shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-emergency text-lg">
                  Assistance médico-légale 24/7
                </p>
                <p className="text-sm text-muted">
                  En cas de besoin, notre équipe d&apos;assistance médico-légale
                  est disponible 24 heures sur 24, 7 jours sur 7.
                </p>
              </div>
              <a
                href="tel:0485858585"
                className="text-xl font-bold text-emergency hover:text-emergency/80 transition-colors shrink-0"
              >
                04 85 85 85 85
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </>
  );
}
