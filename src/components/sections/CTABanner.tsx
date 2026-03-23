"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary via-primary-light to-accent-teal">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">
            Rejoignez ASSPRO
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Bénéficiez de formations de qualité, d&apos;un accompagnement
            médico-légal 24/7 et de ressources exclusives pour votre pratique au
            bloc opératoire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="white" size="lg">
              Devenir adhérent
            </Button>
            <Button
              href="/a-propos"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              En savoir plus
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
