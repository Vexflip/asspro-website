import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { SITE_URL, canonical } from "@/lib/site";
import { ADDRESS_COMMA, ORG_LEGAL_NAME, displayUrl } from "@/lib/org";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  alternates: canonical("/conditions-generales"),
  description:
    "Conditions générales d'utilisation du site ASSPRO — Association pour la Prévention du Risque Opératoire. Règles d'usage, propriété intellectuelle et responsabilité.",
};

const cguSections = [
  {
    number: "1",
    title: "Objet",
    content: `Les présentes conditions générales d'utilisation (ci-après « CGU ») ont pour objet de définir les règles d'utilisation du site internet ${SITE_URL} (ci-après « le Site »), édité par l'${ORG_LEGAL_NAME}, dont le siège social est situé au ${ADDRESS_COMMA}.\n\nEn accédant au Site, l'utilisateur accepte sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Site.`,
  },
  {
    number: "2",
    title: "Propriété intellectuelle",
    content: `Le Site, sa structure générale, ainsi que les textes, sons, savoir-faire, dessins, graphismes et tout autre élément composant le Site, sont la propriété exclusive de l'Association ASSPRO, à l'exception des éléments provenant de partenaires ou de banques d'images soumis à des licences spécifiques.\n\nToute utilisation ou reproduction, totale ou partielle, du Site, des éléments qui le composent et/ou des informations qui y figurent, par quelque procédé que ce soit — y compris l'impression, le téléchargement ou l'utilisation d'un hyperlien — est strictement interdite sans l'accord préalable et écrit de l'Association.`,
  },
  {
    number: "3",
    title: "Accès au Site",
    content: `L'Association met tout en œuvre pour assurer l'accès au Site 24 heures sur 24, 7 jours sur 7. Toutefois, l'accès peut être interrompu à tout moment, sans préavis, notamment pour des raisons de maintenance, de mise à jour ou de force majeure.\n\nL'Association se réserve le droit de modifier, suspendre ou cesser de manière permanente tout ou partie du Site sans notification préalable.\n\nIl vous appartient de vous assurer que vous disposez de la compétence et des moyens techniques nécessaires pour accéder au Site et que votre configuration informatique est exempte de virus.`,
  },
  {
    number: "4",
    title: "Utilisation du Site",
    content: `L'utilisateur s'engage à utiliser le Site conformément à la législation en vigueur et aux présentes CGU. Il s'interdit notamment :\n\n• De collecter ou utiliser de manière détournée les informations nominatives accessibles sur le Site ;\n• D'envoyer des supports promotionnels ou publicitaires non sollicités (spam) ;\n• De tenter de porter atteinte au fonctionnement du Site ;\n• D'utiliser le nom de l'Association sans autorisation préalable ;\n• De tout acte susceptible de porter atteinte à la vie privée ou à la réputation des personnes.`,
  },
  {
    number: "5",
    title: "Liens hypertextes",
    content: `Le Site peut contenir des liens hypertextes vers d'autres sites internet. L'Association ne contrôle pas ces sites tiers et décline toute responsabilité quant à leur contenu, leur exactitude ou leur sécurité.\n\nL'utilisation de ces liens se fait sous votre entière responsabilité. L'Association doit être informée préalablement à la mise en place d'un lien hypertexte en direction du Site et se réserve la possibilité de faire supprimer ce lien à tout moment.`,
  },
  {
    number: "6",
    title: "Données personnelles",
    content: `L'Association s'engage à protéger les données personnelles de ses utilisateurs conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.\n\nLes informations collectées via les formulaires du Site (contact, inscription, adhésion) sont destinées exclusivement à l'Association et ne sont pas cédées à des tiers sans consentement.\n\nPour plus de détails sur le traitement de vos données et l'exercice de vos droits, consultez la section « Données personnelles & RGPD » de nos Mentions légales.`,
  },
  {
    number: "7",
    title: "Cookies",
    content: `Le Site utilise uniquement des cookies strictement nécessaires à son fonctionnement (cookies essentiels). Aucun cookie de mesure d'audience ou de suivi publicitaire n'étant déposé, aucun bandeau de consentement n'est requis.\n\nVous pouvez à tout moment gérer vos préférences en matière de cookies via les paramètres de votre navigateur. Pour plus de détails, consultez la section « Cookies » de nos Mentions légales.`,
  },
  {
    number: "8",
    title: "Limitation de responsabilité",
    content: `Les informations communiquées sur le Site sont présentées à titre indicatif et général. L'Association ne garantit ni l'exactitude, ni l'exhaustivité, ni la disponibilité des informations et ne saurait être tenue responsable d'éventuelles erreurs ou omissions.\n\nL'Association ne peut être tenue responsable des dommages directs ou indirects, matériels ou immatériels résultant de la consultation, de l'utilisation du Site ou de l'impossibilité d'y accéder, y compris tout préjudice financier ou commercial, ou de pertes de programmes ou de données.`,
  },
  {
    number: "9",
    title: "Modification des CGU",
    content: `L'Association se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification par la mise à jour de la date de dernière révision en bas de cette page. L'utilisation du Site après modification emporte acceptation des nouvelles conditions.`,
  },
  {
    number: "10",
    title: "Droit applicable et juridiction compétente",
    content: `Les présentes CGU sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents, sous réserve des dispositions légales impératives applicables.`,
  },
];

export default function ConditionsGeneralesPage() {
  return (
    <>
      <PageHero
        title="Conditions générales d'utilisation"
        subtitle="Veuillez lire attentivement les conditions suivantes avant d'utiliser notre site."
      />

      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Intro */}
          <div className="bg-surface rounded-2xl p-6 md:p-8 mb-12">
            <p className="text-muted text-sm leading-relaxed">
              Les présentes conditions générales d&apos;utilisation régissent
              l&apos;accès et l&apos;utilisation du site{" "}
              <a
                href={SITE_URL}
                className="text-primary hover:text-primary-light transition-colors font-medium"
              >
                {displayUrl(SITE_URL)}
              </a>
              , édité par l&apos;{ORG_LEGAL_NAME}. En naviguant sur ce site, vous acceptez
              l&apos;intégralité des conditions ci-dessous.
            </p>
          </div>

          {/* CGU Sections */}
          <div className="space-y-10">
            {cguSections.map((section) => (
              <article key={section.number}>
                <div className="flex items-start gap-4 mb-4">
                  <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-lg flex items-center justify-center">
                    {section.number}
                  </span>
                  <h2 className="text-xl font-bold font-serif text-dark pt-1.5">
                    {section.title}
                  </h2>
                </div>
                <div className="ml-14 prose prose-sm max-w-none text-muted leading-relaxed">
                  {section.content.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="mb-3">
                      {paragraph.split("\n").map((line, j) => (
                        <span key={j}>
                          {line}
                          {j < paragraph.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Last update */}
          <div className="mt-12 pt-8 border-t border-surface text-sm text-muted/60 text-center">
            Dernière mise à jour : juin 2025
          </div>

          {/* CTA */}
          <div className="mt-12 bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold font-serif text-dark mb-4">
              Besoin de précisions ?
            </h2>
            <p className="text-muted text-sm mb-4">
              Pour toute question relative aux présentes conditions générales
              d&apos;utilisation, n&apos;hésitez pas à nous contacter.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-light transition-colors"
              >
                Nous contacter
              </Link>
              <Link
                href="/mentions-legales"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary text-primary text-sm font-medium rounded-lg hover:bg-primary/5 transition-colors"
              >
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
