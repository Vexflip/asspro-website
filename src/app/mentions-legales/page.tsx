import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site ASSPRO — Association pour la Prévention du Risque Opératoire. Informations sur l'éditeur, l'hébergeur, la propriété intellectuelle et la protection des données.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero
        title="Mentions légales"
        subtitle="Informations légales conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique."
      />

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            {/* Éditeur du site */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Éditeur du site
                </h2>
              </div>
              <div className="bg-surface rounded-2xl p-6 md:p-8 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-y-3 gap-x-4 text-sm">
                  <span className="font-semibold text-dark">
                    Raison sociale
                  </span>
                  <span className="text-muted">
                    Association pour la Prévention du Risque Opératoire (ASSPRO)
                  </span>

                  <span className="font-semibold text-dark">
                    Forme juridique
                  </span>
                  <span className="text-muted">
                    Association loi 1901
                  </span>

                  <span className="font-semibold text-dark">
                    Siège social
                  </span>
                  <span className="text-muted">
                    60 rue de la Chaussée d&apos;Antin – 75009 Paris
                  </span>

                  <span className="font-semibold text-dark">
                    Déclaration
                  </span>
                  <span className="text-muted">
                    Déclarée à la Préfecture de l&apos;Isère le 5 septembre 1997
                    — n° 0381025802
                  </span>

                  <span className="font-semibold text-dark">
                    SIREN
                  </span>
                  <span className="text-muted">527 924 658</span>

                  <span className="font-semibold text-dark">
                    Téléphone
                  </span>
                  <span className="text-muted">
                    <a
                      href="tel:0155071515"
                      className="text-primary hover:text-primary-light transition-colors"
                    >
                      01 55 07 15 15
                    </a>
                  </span>

                  <span className="font-semibold text-dark">E-mail</span>
                  <span className="text-muted">
                    <a
                      href="mailto:contact@asspro.fr"
                      className="text-primary hover:text-primary-light transition-colors"
                    >
                      contact@asspro.fr
                    </a>
                  </span>

                  <span className="font-semibold text-dark">
                    Directeur de la publication
                  </span>
                  <span className="text-muted">
                    Monsieur Patrick-Georges YAVORDIOS, en qualité de Président
                    de l&apos;Association
                  </span>
                </div>
              </div>
            </article>

            {/* Hébergeur */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Hébergeur
                </h2>
              </div>
              <div className="bg-surface rounded-2xl p-6 md:p-8 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-y-3 gap-x-4 text-sm">
                  <span className="font-semibold text-dark">Nom</span>
                  <span className="text-muted">o2switch</span>

                  <span className="font-semibold text-dark">Adresse</span>
                  <span className="text-muted">
                    Chem. des Pardiaux, 63000 Clermont-Ferrand, France
                  </span>

                  <span className="font-semibold text-dark">Téléphone</span>
                  <span className="text-muted">
                    <a
                      href="tel:0444446040"
                      className="text-primary hover:text-primary-light transition-colors"
                    >
                      04 44 44 60 40
                    </a>
                  </span>

                  <span className="font-semibold text-dark">Site web</span>
                  <span className="text-muted">
                    <a
                      href="https://www.o2switch.fr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-light transition-colors"
                    >
                      www.o2switch.fr
                    </a>
                  </span>
                </div>
              </div>
            </article>

            {/* Propriété intellectuelle */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Propriété intellectuelle
                </h2>
              </div>
              <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-4">
                <p>
                  Le présent site web, ci-après le &laquo;&nbsp;Site&nbsp;&raquo;, sa structure
                  générale, ainsi que les textes, sons, savoir-faire, dessins,
                  graphismes et tout autre élément composant le Site, sont la
                  propriété de l&apos;Association pour la Prévention du Risque
                  Opératoire (ASSPRO), à l&apos;exception des éléments
                  mentionnés ci-dessous.
                </p>
                <p>
                  <strong className="text-dark">Crédits photographiques :</strong>{" "}
                  certaines photographies illustrant le Site proviennent de la
                  plateforme{" "}
                  <a
                    href="https://unsplash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-light transition-colors"
                  >
                    Unsplash
                  </a>{" "}
                  et sont utilisées conformément à la{" "}
                  <a
                    href="https://unsplash.com/license"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-light transition-colors"
                  >
                    licence Unsplash
                  </a>
                  . Ces images restent la propriété de leurs auteurs respectifs
                  et ne sont pas la propriété de l&apos;Association.
                </p>
                <p>
                  Toute utilisation ou reproduction, totale ou partielle, du
                  Site, des éléments qui le composent et/ou des informations qui
                  y figurent, par quelque procédé que ce soit, y compris
                  notamment par l&apos;impression, le téléchargement ou
                  l&apos;utilisation d&apos;un hyperlien, est strictement
                  interdite et constitue une contrefaçon sanctionnée par le Code
                  de la propriété intellectuelle, sauf accord préalable et écrit
                  de l&apos;Association.
                </p>
                <p>
                  Pour obtenir une autorisation, veuillez envoyer un courrier
                  électronique à{" "}
                  <a
                    href="mailto:contact@asspro.fr"
                    className="text-primary hover:text-primary-light transition-colors"
                  >
                    contact@asspro.fr
                  </a>{" "}
                  ou un courrier postal au siège social de l&apos;Association,
                  en précisant : (a) votre nom ou le nom du contact technique ;
                  (b) le nom de votre société ; (c) vos coordonnées ; et (d)
                  l&apos;adresse des sites sur lesquels les liens figureront.
                </p>
              </div>
            </article>

            {/* Données personnelles – RGPD */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Données personnelles &amp; RGPD
                </h2>
              </div>
              <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-4">
                <p>
                  Conformément au Règlement Général sur la Protection des
                  Données (RGPD – Règlement UE 2016/679) et à la loi
                  n°&nbsp;78-17 du 6 janvier 1978 modifiée relative à
                  l&apos;informatique, aux fichiers et aux libertés,
                  l&apos;Association s&apos;engage à protéger les données
                  personnelles des utilisateurs du Site.
                </p>

                <h3 className="text-dark font-semibold text-base mt-6">
                  Responsable du traitement
                </h3>
                <p>
                  Le responsable du traitement des données personnelles est
                  l&apos;Association pour la Prévention du Risque Opératoire
                  (ASSPRO), dont le siège social est situé au 60 rue de la
                  Chaussée d&apos;Antin, 75009 Paris.
                </p>

                <h3 className="text-dark font-semibold text-base mt-6">
                  Données collectées
                </h3>
                <p>
                  Les données personnelles collectées sur le Site le sont
                  uniquement dans le cadre des formulaires de contact,
                  d&apos;inscription aux formations ou d&apos;adhésion. Ces
                  données sont destinées à l&apos;Association et ne sont en
                  aucun cas cédées à des tiers sans votre consentement.
                </p>

                <h3 className="text-dark font-semibold text-base mt-6">
                  Vos droits
                </h3>
                <p>
                  Conformément à la réglementation en vigueur, vous disposez
                  des droits suivants sur vos données personnelles :
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Droit d&apos;accès</li>
                  <li>Droit de rectification</li>
                  <li>Droit d&apos;effacement</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité des données</li>
                  <li>Droit d&apos;opposition</li>
                </ul>
                <p>
                  Pour exercer ces droits, vous pouvez contacter
                  l&apos;Association par e-mail à{" "}
                  <a
                    href="mailto:contact@asspro.fr"
                    className="text-primary hover:text-primary-light transition-colors"
                  >
                    contact@asspro.fr
                  </a>{" "}
                  ou par courrier à l&apos;adresse du siège social.
                </p>
                <p>
                  En cas de litige, vous pouvez introduire une réclamation
                  auprès de la Commission Nationale de l&apos;Informatique et
                  des Libertés (CNIL) –{" "}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-light transition-colors"
                  >
                    www.cnil.fr
                  </a>
                  .
                </p>
              </div>
            </article>

            {/* Cookies */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Cookies
                </h2>
              </div>
              <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-4">
                <p>
                  Lors de votre visite sur le Site, des cookies peuvent être
                  déposés sur votre terminal (ordinateur, tablette,
                  smartphone). Un cookie est un petit fichier texte qui permet
                  d&apos;enregistrer des informations relatives à votre
                  navigation.
                </p>

                <h3 className="text-dark font-semibold text-base mt-6">
                  Types de cookies utilisés
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Cookies essentiels :</strong> nécessaires au
                    fonctionnement du Site (session, préférences).
                  </li>
                  <li>
                    <strong>Cookies analytiques :</strong> permettent de
                    mesurer l&apos;audience du Site et d&apos;analyser la
                    navigation (ex. : Google Analytics).
                  </li>
                </ul>

                <h3 className="text-dark font-semibold text-base mt-6">
                  Gestion des cookies
                </h3>
                <p>
                  Vous pouvez à tout moment gérer vos préférences en matière
                  de cookies via les paramètres de votre navigateur. La
                  suppression ou le refus de certains cookies peut entraîner
                  une dégradation de l&apos;expérience de navigation.
                </p>
                <p>
                  Pour en savoir plus sur la gestion des cookies, consultez le
                  site de la CNIL :{" "}
                  <a
                    href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-light transition-colors"
                  >
                    www.cnil.fr
                  </a>
                  .
                </p>
              </div>
            </article>

            {/* Limitation de responsabilité */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Limitation de responsabilité
                </h2>
              </div>
              <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-4">
                <p>
                  Les informations communiquées sur ce Site sont présentées à
                  titre indicatif et général. Malgré les mises à jour
                  régulières, l&apos;Association ne peut être tenue responsable
                  de la modification de dispositions légales et/ou
                  réglementaires survenant après la publication.
                </p>
                <p>
                  L&apos;Association ne saurait en aucun cas être tenue
                  responsable du contenu des sites tiers vers lesquels le Site
                  renverrait, ni des dommages directs ou indirects résultant de
                  la consultation ou de l&apos;utilisation du Site.
                </p>
              </div>
            </article>

            {/* Droit applicable */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Droit applicable
                </h2>
              </div>
              <div className="prose prose-sm max-w-none text-muted leading-relaxed">
                <p>
                  Les présentes mentions légales et le contenu du Site sont
                  régis par la loi française. Les tribunaux français ont
                  compétence exclusive dans le règlement de tout litige.
                </p>
              </div>
            </article>

            {/* Contact */}
            <article className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold font-serif text-dark mb-4">
                Une question ?
              </h2>
              <p className="text-muted text-sm mb-4">
                Pour toute question relative aux présentes mentions légales,
                vous pouvez nous contacter :
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
                >
                  Formulaire de contact
                </Link>
                <a
                  href="mailto:contact@asspro.fr"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary/5 transition-colors"
                >
                  contact@asspro.fr
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
