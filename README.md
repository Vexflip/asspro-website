# ASSPRO — site web

Site institutionnel de l'**Association pour la Prévention du Risque Opératoire (ASSPRO)**.
Construit avec **Next.js 16** (App Router, sortie `standalone`), **React 19**, **Tailwind CSS 4**
et **TypeScript**. Les formulaires de contact et d'adhésion sont traités côté serveur et
envoyés par e-mail via **RCS** (« Raven Notification Service »), le service de notifications
interne de Branchet.

> ⚠️ RCS n'est joignable que depuis le réseau interne Branchet : hors de ce réseau,
> l'application ne peut pas envoyer d'e-mail.

## Prérequis

- **Node.js ≥ 20.9.0** (voir `engines` dans `package.json`)
- npm (le dépôt versionne un `package-lock.json`)

## Développement

```bash
npm install
cp .env.example .env.local   # puis renseignez les valeurs
npm run dev                  # http://localhost:3000
```

Sans configuration RCS, l'appli démarre quand même en développement (les envois d'e-mail
échouent avec un avertissement). En **production**, les variables RCS manquantes font
échouer le démarrage volontairement (voir `src/instrumentation.ts`).

En recette, les messages envoyés sont consultables dans **Maildev** :
<http://tb-07.branchet.local:8025/>.

Scripts utiles :

| Script | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Sert le build de production |
| `npm run lint` | ESLint |
| `npm run typecheck` | Vérification TypeScript (`tsc --noEmit`) |

## Variables d'environnement

Toutes les valeurs sont documentées dans [`.env.example`](./.env.example).

Les variables se répartissent en deux familles :

- **`NEXT_PUBLIC_*` — lues au *build***. Elles sont inlinées dans le bundle par
  `next build` et **toutes obligatoires** : le build échoue immédiatement si
  l'une manque (`src/lib/org.ts`). Les modifier impose de **reconstruire
  l'image** — une valeur fournie au runtime est ignorée. En Docker, elles sont
  passées en `--build-arg` (voir `Dockerfile` / `docker-compose.yml`).
- **Les autres — lues au *runtime*** par le serveur. Modifiables sans rebuild,
  mais le conteneur refuse de démarrer si elles manquent
  (`src/instrumentation.ts`).

### Build (`NEXT_PUBLIC_*`, toutes obligatoires)

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canonique (métadonnées, `robots.txt`, `sitemap`). |
| `NEXT_PUBLIC_ORG_LEGAL_NAME` | Raison sociale (mentions légales, CGU). |
| `NEXT_PUBLIC_ORG_LEGAL_FORM` | Forme juridique. |
| `NEXT_PUBLIC_ORG_SIREN` | Numéro SIREN. |
| `NEXT_PUBLIC_ORG_DECLARATION` | Mention de déclaration en préfecture. |
| `NEXT_PUBLIC_ORG_DIRECTOR` | Directeur de la publication. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | E-mail affiché (pied de page, contact, mentions). |
| `NEXT_PUBLIC_PHONE_MAIN` | Standard. Le lien `tel:` et le format international du JSON-LD en sont dérivés. |
| `NEXT_PUBLIC_PHONE_EMERGENCY` | Assistance 24/7. |
| `NEXT_PUBLIC_ADDRESS_STREET` / `_POSTAL_CODE` / `_CITY` | Adresse du siège social. |
| `NEXT_PUBLIC_ADDRESS_COUNTRY` | Code pays ISO 3166-1 alpha-2 (JSON-LD). |
| `NEXT_PUBLIC_LINKEDIN_URL` | Lien LinkedIn (barre de navigation, pied de page, `sameAs`). |
| `NEXT_PUBLIC_HOST_NAME` / `_ADDRESS` / `_PHONE` / `_URL` | Hébergeur — mention obligatoire (LCEN). |
| `NEXT_PUBLIC_MAPS_EMBED_URL` | Carte Google Maps de la page contact (encode les coordonnées GPS). |

### Runtime

| Variable | Requise | Description |
| --- | --- | --- |
| `RCS_BASE_URL` | oui | URL du service RCS (Swagger sur `/api/docs/`). |
| `RCS_API_KEY` | oui | Clé d'API RCS (porte les permissions de canal). |
| `RCS_CALLING_USER` | oui | Utilisateur appelant déclaré à chaque notification. |
| `CONTACT_TO` | oui | Destinataire des messages de contact. |
| `ADHESION_TO` | non | Destinataire des adhésions (défaut : `CONTACT_TO`). |

> RCS impose son propre expéditeur (`noreply@branchet.fr`) et n'expose pas de « répondre à » :
> `CONTACT_TO` / `ADHESION_TO` sont donc aussi affichés dans le corps des e-mails de
> confirmation, seul moyen pour le visiteur de nous répondre.

## Build & déploiement (Docker standalone)

L'image se construit en trois étapes et produit un serveur `standalone` exécuté par un
utilisateur non-root. Le conteneur écoute sur `0.0.0.0:3000` et expose un `HEALTHCHECK`
sur `/api/health`.

> ⚠️ En production, le conteneur **refuse de démarrer** sans configuration RCS valide
> (fail-fast, voir `src/instrumentation.ts`). La configuration des variables RCS est
> donc obligatoire, et le conteneur doit pouvoir joindre `RCS_BASE_URL`.

### Docker Compose (recommandé)

Le plus simple : une seule commande. Renseignez les identifiants une fois dans un
fichier `.env`, puis lancez.

```bash
cp .env.example .env          # puis renseignez RCS_API_KEY
docker compose up -d --build  # build de l'image + démarrage sur http://localhost:3000
```

`NEXT_PUBLIC_SITE_URL` (URL canonique, inlinée au build) et les variables RCS au
runtime sont toutes lues depuis ce même `.env`. Le fichier `.env` n'est ni commité ni
inclus dans l'image (`.dockerignore` exclut `.env*`).

### Docker (build + run manuels)

> ⚠️ Le build exige **toutes** les variables `NEXT_PUBLIC_*` (tableau ci-dessus).
> Il échoue sinon, en nommant celle qui manque. `docker compose` les transmet
> automatiquement depuis `.env` ; en build manuel il faut les passer une à une.

```bash
# Construire l'image — chaque NEXT_PUBLIC_* doit être fourni en --build-arg.
# Le plus simple est de les lire depuis un .env déjà rempli :
docker build $(grep -E '^NEXT_PUBLIC_' .env | sed 's/^/--build-arg /' | tr '\n' ' ') \
  -t asspro-website .

# Lancer le conteneur avec la configuration RCS au runtime
docker run --rm -p 3000:3000 \
  -e RCS_BASE_URL=http://tb-07.branchet.local:8097 \
  -e RCS_API_KEY=... \
  -e RCS_CALLING_USER=website \
  -e CONTACT_TO=contact@asspro.fr \
  asspro-website
```

### À prévoir en production

- **Reverse proxy HTTPS.** L'application est conçue pour tourner derrière un proxy qui
  termine le TLS. HSTS est activé (`next.config.ts`) — assurez-vous que tout le trafic
  arrive bien en HTTPS.
- **X-Forwarded-For.** Le limiteur de débit des formulaires utilise l'IP client tirée de
  `X-Forwarded-For`. Le proxy **doit écraser** tout en-tête `X-Forwarded-For` fourni par le
  client (voir `.env.example`), sinon la limite par IP est contournable.

## Structure

- `src/app/` — routes (App Router), incl. `api/contact` et `api/adhesion` (handlers de route).
- `src/components/` — composants UI et de layout.
- `src/lib/` — `mail.ts` (gabarits d'e-mails), `rcs.ts` (transport RCS : échange de clés,
  chiffrement, session), `schemas.ts` (validation Zod partagée client/serveur),
  `rate-limit.ts`, `http.ts` (garde de taille de requête), `site.ts` (URL canonique),
  `env.ts` (lecture des variables serveur), `org.ts` (identité et coordonnées de
  l'association, pilotées par l'environnement).
- `src/data/` — données de contenu (partenaires, formations, index de recherche).
- `src/instrumentation.ts` — validation « fail-fast » des variables d'environnement au démarrage.
