import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, AlertTriangle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/logo-dark-bg.webp"
                alt="ASSPRO"
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
                priority
                loading="eager"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Association dédiée à la prévention et la maîtrise des risques au
              bloc opératoire depuis près de 30 ans.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold mb-4 text-white/90">Navigation</h3>
            <ul className="space-y-2">
              {[
                ["À propos", "/a-propos"],
                ["Formations", "/formations"],
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

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 text-white/90">Contact</h3>
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
                  href="tel:0485858585"
                  className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm font-medium"
                >
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Assistance 24/7 : 04 85 85 85 85
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
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} ASSPRO. Tous droits réservés.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
            <a
              href="https://www.linkedin.com/company/asspro/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/conditions-generales" className="hover:text-white transition-colors">
              Conditions générales
            </Link>
            <Link href="/plan-du-site" className="hover:text-white transition-colors">
              Plan du site
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
