# ASSPRO — site web

Site institutionnel de l'**Association pour la Prévention du Risque Opératoire (ASSPRO)**.
Construit avec **Next.js 16** (App Router, sortie `standalone`), **React 19**, **Tailwind CSS 4**
et **TypeScript**. Les formulaires de contact et d'adhésion sont traités côté serveur et
envoyés par e-mail via **Nodemailer**.

## Prérequis

- **Node.js ≥ 20.9.0** (voir `engines` dans `package.json`)
- npm (le dépôt versionne un `package-lock.json`)

## Développement

```bash
npm install
cp .env.example .env.local   # puis renseignez les valeurs
npm run dev                  # http://localhost:3000
```

Sans configuration SMTP, l'appli démarre quand même en développement (les envois d'e-mail
échouent avec un avertissement). En **production**, les variables SMTP manquantes font
échouer le démarrage volontairement (voir `src/instrumentation.ts`).

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

| Variable | Requise | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | build | URL canonique (métadonnées, `robots.txt`, `sitemap`). **Inlinée au build** — en Docker, passez-la en `--build-arg`. |
| `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` | oui | Identifiants SMTP pour l'envoi des e-mails. |
| `SMTP_PORT` | non | Port SMTP (défaut `587`). |
| `SMTP_SECURE` | non | `true` pour le port 465 (SSL), sinon STARTTLS. |
| `MAIL_FROM` | oui | Adresse d'expédition des e-mails. |
| `CONTACT_TO` | oui | Destinataire des messages de contact. |
| `ADHESION_TO` | non | Destinataire des adhésions (défaut : `CONTACT_TO`). |

## Build & déploiement (Docker standalone)

L'image se construit en trois étapes et produit un serveur `standalone` exécuté par un
utilisateur non-root. Le conteneur écoute sur `0.0.0.0:3000` et expose un `HEALTHCHECK`
sur `/api/health`.

> ⚠️ En production, le conteneur **refuse de démarrer** sans configuration SMTP valide
> (fail-fast, voir `src/instrumentation.ts`). La configuration des variables SMTP est
> donc obligatoire.

### Docker Compose (recommandé)

Le plus simple : une seule commande. Renseignez les identifiants une fois dans un
fichier `.env`, puis lancez.

```bash
cp .env.docker.example .env   # puis renseignez les valeurs SMTP_*
docker compose up -d --build  # build de l'image + démarrage sur http://localhost:3000
```

`NEXT_PUBLIC_SITE_URL` (URL canonique, inlinée au build) et les variables SMTP au
runtime sont toutes lues depuis ce même `.env`. Le fichier `.env` n'est ni commité ni
inclus dans l'image (`.dockerignore` exclut `.env*`).

### Docker (build + run manuels)

```bash
# Construire l'image (fournir l'URL canonique de l'environnement cible)
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://asspro.fr -t asspro-website .

# Lancer le conteneur avec la configuration SMTP au runtime
docker run --rm -p 3000:3000 \
  -e SMTP_HOST=... -e SMTP_USER=... -e SMTP_PASS=... \
  -e MAIL_FROM="ASSPRO <no-reply@asspro.fr>" \
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
- `src/lib/` — `mail.ts` (Nodemailer), `schemas.ts` (validation Zod partagée client/serveur),
  `rate-limit.ts`, `http.ts` (garde de taille de requête), `site.ts` (URL canonique).
- `src/data/` — données de contenu (partenaires, formations, index de recherche).
- `src/instrumentation.ts` — validation « fail-fast » des variables d'environnement au démarrage.
