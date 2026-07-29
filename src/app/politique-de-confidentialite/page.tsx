import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: canonical("/politique-de-confidentialite"),
  description:
    "Politique de confidentialité du site ASSPRO — traitement des données personnelles collectées via les formulaires de contact et d'adhésion, finalités, durée de conservation et droits RGPD.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHero
        title="Politique de confidentialité"
        subtitle="Comment ASSPRO collecte, utilise et protège vos données personnelles, conformément au RGPD (Règlement UE 2016/679) et à la loi Informatique et Libertés."
      />

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            {/* Responsable du traitement */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Responsable du traitement
                </h2>
              </div>
              <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-4">
                <p>
                  Le responsable du traitement des données personnelles est
                  l&apos;Association pour la Prévention du Risque Opératoire
                  (ASSPRO), association loi 1901 dont le siège social est situé
                  au 60 rue de la Chaussée d&apos;Antin, 75009 Paris.
                </p>
                <p>
                  Pour toute question relative au traitement de vos données,
                  vous pouvez écrire à{" "}
                  <a
                    href="mailto:contact@asspro.fr"
                    className="text-primary hover:text-primary-light transition-colors underline underline-offset-2"
                  >
                    contact@asspro.fr
                  </a>{" "}
                  ou par courrier à l&apos;adresse du siège social.
                </p>
              </div>
            </article>

            {/* Données collectées */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Données collectées
                </h2>
              </div>
              <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-4">
                <p>
                  Nous ne collectons que les données que vous nous transmettez
                  volontairement via nos formulaires. Aucune donnée n&apos;est
                  collectée à votre insu.
                </p>
                <h3 className="text-dark font-semibold text-base mt-6">
                  Formulaire de contact
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Nom complet</li>
                  <li>Adresse e-mail</li>
                  <li>Sujet et contenu de votre message</li>
                </ul>
                <h3 className="text-dark font-semibold text-base mt-6">
                  Formulaire d&apos;adhésion
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Civilité, prénom et nom</li>
                  <li>Profession, spécialité et établissement</li>
                  <li>
                    Coordonnées : adresse e-mail, téléphone, adresse postale,
                    code postal et ville
                  </li>
                  <li>Type d&apos;adhésion souhaité et message éventuel</li>
                </ul>
              </div>
            </article>

            {/* Finalités & base légale */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Finalités et base légale
                </h2>
              </div>
              <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-4">
                <p>Vos données sont traitées pour les finalités suivantes :</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    répondre à vos demandes transmises via le formulaire de
                    contact ;
                  </li>
                  <li>
                    instruire et gérer votre demande d&apos;adhésion à
                    l&apos;Association.
                  </li>
                </ul>
                <p>
                  La base légale du traitement est votre{" "}
                  <strong>consentement</strong>, recueilli au moment de
                  l&apos;envoi du formulaire (case à cocher dédiée), ainsi que
                  l&apos;exécution de mesures précontractuelles pour la gestion
                  des adhésions. Vous pouvez retirer votre consentement à tout
                  moment.
                </p>
              </div>
            </article>

            {/* Destinataires & absence de cession */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Destinataires des données
                </h2>
              </div>
              <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-4">
                <p>
                  Les données transmises via les formulaires sont adressées
                  exclusivement aux services internes de l&apos;Association,
                  sous la forme d&apos;un e-mail envoyé à nos boîtes de
                  réception dédiées. Elles ne sont{" "}
                  <strong>
                    en aucun cas cédées, louées ou vendues à des tiers
                  </strong>{" "}
                  sans votre consentement, en dehors des prestataires
                  techniques strictement nécessaires à l&apos;acheminement des
                  e-mails et à l&apos;hébergement du Site, tenus aux mêmes
                  obligations de confidentialité.
                </p>
              </div>
            </article>

            {/* Durée de conservation */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Durée de conservation
                </h2>
              </div>
              <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-4">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>Demandes de contact :</strong> conservées le temps
                    nécessaire au traitement de votre demande, puis archivées ou
                    supprimées dans un délai maximal de 12 mois.
                  </li>
                  <li>
                    <strong>Demandes d&apos;adhésion :</strong> conservées
                    pendant la durée de la relation associative, puis
                    conformément aux obligations légales applicables.
                  </li>
                </ul>
              </div>
            </article>

            {/* Sécurité */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Sécurité
                </h2>
              </div>
              <div className="prose prose-sm max-w-none text-muted leading-relaxed">
                <p>
                  L&apos;Association met en œuvre des mesures techniques et
                  organisationnelles appropriées pour protéger vos données
                  contre la perte, l&apos;accès non autorisé, la divulgation ou
                  l&apos;altération (transmission chiffrée des formulaires,
                  accès restreint aux boîtes de réception).
                </p>
              </div>
            </article>

            {/* Vos droits */}
            <article>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-1 rounded-full bg-primary" />
                <h2 className="text-2xl font-bold font-serif text-dark">
                  Vos droits
                </h2>
              </div>
              <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-4">
                <p>
                  Conformément à la réglementation en vigueur, vous disposez des
                  droits suivants sur vos données personnelles :
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Droit d&apos;accès</li>
                  <li>Droit de rectification</li>
                  <li>Droit d&apos;effacement</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité des données</li>
                  <li>Droit d&apos;opposition</li>
                  <li>Droit de retirer votre consentement à tout moment</li>
                </ul>
                <p>
                  Pour exercer ces droits, contactez l&apos;Association par
                  e-mail à{" "}
                  <a
                    href="mailto:contact@asspro.fr"
                    className="text-primary hover:text-primary-light transition-colors underline underline-offset-2"
                  >
                    contact@asspro.fr
                  </a>{" "}
                  ou par courrier au siège social. En cas de litige, vous pouvez
                  introduire une réclamation auprès de la Commission Nationale
                  de l&apos;Informatique et des Libertés (CNIL) –{" "}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-light transition-colors underline underline-offset-2"
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
              <div className="prose prose-sm max-w-none text-muted leading-relaxed">
                <p>
                  Pour le détail des cookies utilisés sur le Site et la manière
                  de les gérer, veuillez consulter la section dédiée de nos{" "}
                  <Link
                    href="/mentions-legales"
                    className="text-primary hover:text-primary-light transition-colors underline underline-offset-2"
                  >
                    mentions légales
                  </Link>
                  .
                </p>
              </div>
            </article>

            {/* Contact */}
            <article className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8">
              <h2 className="text-xl font-bold font-serif text-dark mb-4">
                Une question sur vos données ?
              </h2>
              <p className="text-muted text-sm mb-4">
                Pour toute question relative à la présente politique de
                confidentialité ou pour exercer vos droits, contactez-nous :
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
