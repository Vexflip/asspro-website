/**
 * Identité et coordonnées de l'association, pilotées par l'environnement.
 *
 * ⚠️ Toutes ces variables sont préfixées `NEXT_PUBLIC_` et sont donc **inlinées
 * au moment du build** : elles sont figées dans le bundle produit par
 * `next build`. Modifier une valeur impose de **reconstruire l'image** (relancer
 * le pipeline CI), un changement au runtime n'a aucun effet.
 * Voir `node_modules/next/dist/docs/01-app/02-guides/environment-variables.md`.
 *
 * ⚠️ Chaque accès doit rester littéral (`process.env.NEXT_PUBLIC_X`). Un accès
 * dynamique (`process.env[nom]`, comme `requireEnv()` dans `mail.ts`) n'est
 * **pas** remplacé par le bundler et vaudrait `undefined` côté navigateur —
 * d'où la signature `required(nom, valeur)` ci-dessous : le nom ne sert qu'au
 * message d'erreur, la valeur est lue littéralement.
 */

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Variable d'environnement manquante : ${name}. ` +
        `Renseignez-la avant le build (voir .env.example).`
    );
  }
  return value;
}

// ── Éditeur / association ───────────────────────────────────────────────────
export const ORG_LEGAL_NAME = required(
  "NEXT_PUBLIC_ORG_LEGAL_NAME",
  process.env.NEXT_PUBLIC_ORG_LEGAL_NAME
);
export const ORG_LEGAL_FORM = required(
  "NEXT_PUBLIC_ORG_LEGAL_FORM",
  process.env.NEXT_PUBLIC_ORG_LEGAL_FORM
);
export const ORG_SIREN = required(
  "NEXT_PUBLIC_ORG_SIREN",
  process.env.NEXT_PUBLIC_ORG_SIREN
);
export const ORG_DECLARATION = required(
  "NEXT_PUBLIC_ORG_DECLARATION",
  process.env.NEXT_PUBLIC_ORG_DECLARATION
);
export const ORG_DIRECTOR = required(
  "NEXT_PUBLIC_ORG_DIRECTOR",
  process.env.NEXT_PUBLIC_ORG_DIRECTOR
);

// ── Coordonnées ─────────────────────────────────────────────────────────────
export const CONTACT_EMAIL = required(
  "NEXT_PUBLIC_CONTACT_EMAIL",
  process.env.NEXT_PUBLIC_CONTACT_EMAIL
);
/** Standard téléphonique, au format d'affichage (ex. « 01 55 07 15 15 »). */
export const PHONE_MAIN = required(
  "NEXT_PUBLIC_PHONE_MAIN",
  process.env.NEXT_PUBLIC_PHONE_MAIN
);
/** Assistance 24/7, au format d'affichage. */
export const PHONE_EMERGENCY = required(
  "NEXT_PUBLIC_PHONE_EMERGENCY",
  process.env.NEXT_PUBLIC_PHONE_EMERGENCY
);

// ── Adresse du siège social ─────────────────────────────────────────────────
export const ADDRESS_STREET = required(
  "NEXT_PUBLIC_ADDRESS_STREET",
  process.env.NEXT_PUBLIC_ADDRESS_STREET
);
export const ADDRESS_POSTAL_CODE = required(
  "NEXT_PUBLIC_ADDRESS_POSTAL_CODE",
  process.env.NEXT_PUBLIC_ADDRESS_POSTAL_CODE
);
export const ADDRESS_CITY = required(
  "NEXT_PUBLIC_ADDRESS_CITY",
  process.env.NEXT_PUBLIC_ADDRESS_CITY
);
/** Code pays ISO 3166-1 alpha-2, utilisé par le JSON-LD (ex. « FR »). */
export const ADDRESS_COUNTRY = required(
  "NEXT_PUBLIC_ADDRESS_COUNTRY",
  process.env.NEXT_PUBLIC_ADDRESS_COUNTRY
);

/** « 60 rue de la Chaussée d'Antin – 75009 Paris » */
export const ADDRESS_INLINE = `${ADDRESS_STREET} – ${ADDRESS_POSTAL_CODE} ${ADDRESS_CITY}`;
/** « 60 rue de la Chaussée d'Antin, 75009 Paris » */
export const ADDRESS_COMMA = `${ADDRESS_STREET}, ${ADDRESS_POSTAL_CODE} ${ADDRESS_CITY}`;

// ── Réseaux sociaux ─────────────────────────────────────────────────────────
export const LINKEDIN_URL = required(
  "NEXT_PUBLIC_LINKEDIN_URL",
  process.env.NEXT_PUBLIC_LINKEDIN_URL
);

// ── Hébergeur (obligatoire — LCEN, loi n° 2004-575) ─────────────────────────
export const HOST_NAME = required(
  "NEXT_PUBLIC_HOST_NAME",
  process.env.NEXT_PUBLIC_HOST_NAME
);
export const HOST_ADDRESS = required(
  "NEXT_PUBLIC_HOST_ADDRESS",
  process.env.NEXT_PUBLIC_HOST_ADDRESS
);
export const HOST_PHONE = required(
  "NEXT_PUBLIC_HOST_PHONE",
  process.env.NEXT_PUBLIC_HOST_PHONE
);
export const HOST_URL = required(
  "NEXT_PUBLIC_HOST_URL",
  process.env.NEXT_PUBLIC_HOST_URL
);

// ── Carte (iframe Google Maps de la page contact) ───────────────────────────
export const MAPS_EMBED_URL = required(
  "NEXT_PUBLIC_MAPS_EMBED_URL",
  process.env.NEXT_PUBLIC_MAPS_EMBED_URL
);

// ── Dérivés ─────────────────────────────────────────────────────────────────

/** `tel:` href — retire espaces et séparateurs. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/**
 * Numéro au format E.164 pour le JSON-LD (schema.org attend l'international).
 * Un numéro national commençant par 0 est préfixé par `countryCode`.
 */
export function toE164(phone: string, countryCode = "+33"): string {
  const compact = phone.replace(/[^\d+]/g, "");
  if (compact.startsWith("+")) return compact;
  if (compact.startsWith("0")) return `${countryCode}${compact.slice(1)}`;
  return compact;
}

/** Affichage d'une URL sans le protocole ni le slash final (ex. « www.o2switch.fr »). */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
