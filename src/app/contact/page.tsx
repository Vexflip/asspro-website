"use client";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertTriangle,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ContactForm from "@/components/ui/ContactForm";

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Contactez-nous"
        subtitle="Une question sur nos formations ou notre accompagnement ? Notre équipe est à votre écoute."
      />

      {/* Contact section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Form */}
            <ScrollReveal direction="left">
              <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8">
                <h2 className="text-2xl font-bold font-serif text-dark mb-6">
                  Envoyez-nous un message
                </h2>
                <ContactForm />
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal direction="right">
              <div className="space-y-6">
                {/* Contact details */}
                <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8">
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
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-dark">Horaires</p>
                        <p className="text-sm text-muted">
                          Lundi - Vendredi : 9h00 - 18h00
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency banner */}
                <div className="bg-emergency/5 border-2 border-emergency/20 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-emergency/10 flex items-center justify-center text-emergency shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-emergency text-lg">
                        Urgence médico-légale 24/7
                      </p>
                      <p className="text-sm text-muted mb-2">
                        En cas d&apos;urgence médico-légale, notre équipe est
                        disponible 24 heures sur 24, 7 jours sur 7.
                      </p>
                      <a
                        href="tel:0476181307"
                        className="text-xl font-bold text-emergency hover:text-emergency/80 transition-colors"
                      >
                        04.76.18.13.07
                      </a>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-surface rounded-2xl overflow-hidden h-48 md:h-64 lg:h-80">
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
        </div>
      </section>
    </>
  );
}
