import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, AlertTriangle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo-dark-bg.png"
                alt="ASSPRO"
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Association dédiée à la prévention et la maîtrise des risques au
              bloc opératoire depuis plus de 30 ans.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-4 text-white/90">Navigation</h4>
            <ul className="space-y-2">
              {[
                ["À propos", "/a-propos"],
                ["Formations", "/formations"],
                ["ASSPRO Jeunes", "/asspro-jeunes"],
                ["Actualités", "/actualites"],
                ["Partenaires", "/partenaires"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Formations */}
          <div>
            <h4 className="font-bold mb-4 text-white/90">Formations</h4>
            <ul className="space-y-2">
              {[
                "Formations ARRES",
                "E-learning",
                "Simulation",
                "Softkills",
                "ASSPRO Truck",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/formations"
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-white/90">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                60 rue de la Chaussée d&apos;Antin, 75009 Paris
              </li>
              <li>
                <a
                  href="tel:0155071515"
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  01.55.07.15.15
                </a>
              </li>
              <li>
                <a
                  href="tel:0476181307"
                  className="flex items-center gap-2 text-emergency hover:text-emergency/80 transition-colors text-sm font-medium"
                >
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Urgence 24/7 : 04.76.18.13.07
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@asspro.fr"
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  contact@asspro.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} ASSPRO. Tous droits réservés.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Conditions générales
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Plan du site
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
