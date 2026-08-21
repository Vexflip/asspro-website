import crypto from "node:crypto";
import { requireEnv } from "./env";

/**
 * Transport vers RCS (« Raven Notification Service »), le service de
 * notifications interne de Branchet — l'unique canal d'envoi des formulaires
 * contact & adhésion (il remplace l'ancien transport SMTP direct).
 *
 * Protocole en deux temps (Swagger : `${RCS_BASE_URL}/api/docs/`) :
 *   1. `POST /api/v1/key-exchange/` — échange Diffie-Hellman. On envoie notre
 *      clé publique, le service renvoie la sienne et un identifiant de session.
 *   2. `POST /api/v1/notify-encrypted/` — la notification, chiffrée avec le
 *      secret partagé. La réponse, elle, est en clair.
 *
 * ⚠️ L'échange de clés dépose un cookie `rcs_sessionid` (HttpOnly, 1 h) : le
 * secret partagé est rangé dans une session serveur qui n'est retrouvée que par
 * ce cookie. Il **doit** être rejoué sur `notify-encrypted`, sinon le service
 * répond 419 « Session expired or not initialized » — quel que soit le contenu
 * de `session_id`. Le Swagger ne le mentionne pas (« No parameters ») ; c'est
 * l'en-tête `Set-Cookie` de la réponse qui fait foi. `fetch` ne conservant pas
 * les cookies, on les transporte explicitement dans `Session`.
 *
 * La session est mise en cache pour la durée du process et renégociée sur un
 * HTTP 419 (session expirée).
 *
 * ⚠️ RCS n'est joignable que depuis le réseau interne Branchet : déployée
 * ailleurs, l'application ne peut plus envoyer d'e-mail.
 */

// ── Chiffrement ─────────────────────────────────────────────────────────────
// Le Swagger documente les endpoints mais **pas** la suite cryptographique.
// Celle-ci est reprise des bibliothèques de référence Branchet
// (`br_key_exchange` / `br_secure_notification`) et vérifiée contre le service :
//
//   X25519 → HKDF-SHA256(salt vide, info "handshake data") → ChaCha20-Poly1305,
//   transmis en base64(nonce ‖ chiffré ‖ tag).
//
// ⚠️ `info` est la chaîne littérale « handshake data », **pas** l'identifiant de
// session : c'est la valeur d'exemple de la doc `cryptography`, reprise telle
// quelle côté serveur. C'est ici — et uniquement ici — qu'il faut ajuster si le
// service se met à refuser les payloads.

/** En-tête SPKI DER d'une clé X25519 ; précède les 32 octets de clé brute. */
const SPKI_PREFIX = Buffer.from("302a300506032b656e032100", "hex");
/** Contexte HKDF attendu par le service ; littéral, ne pas dériver du contexte. */
const HKDF_INFO = Buffer.from("handshake data");
const NONCE_BYTES = 12;
const TAG_BYTES = 16;

/**
 * Version de protocole que cette suite implémente. Le service l'annonce à
 * l'échange de clés ; un écart signale que la suite crypto ci-dessus a
 * probablement changé côté serveur — première piste à suivre si les envois
 * commencent à être refusés.
 */
const ENCRYPTION_VERSION = "1.0";

/** Plafond d'un appel HTTP isolé. */
const TIMEOUT_MS = 10_000;
/**
 * Budget total d'un envoi, échange de clés et retry compris. Sans lui, un RCS
 * injoignable coûterait 4 × TIMEOUT_MS par message — et une soumission en envoie
 * deux (notification puis confirmation), soit plus d'une minute d'attente avant
 * que le visiteur ne voie quoi que ce soit.
 */
const BUDGET_MS = 15_000;

function deriveKey(sharedSecret: Buffer): Buffer {
  return Buffer.from(
    crypto.hkdfSync("sha256", sharedSecret, Buffer.alloc(0), HKDF_INFO, 32)
  );
}

function encrypt(key: Buffer, plaintext: string): string {
  const nonce = crypto.randomBytes(NONCE_BYTES);
  const cipher = crypto.createCipheriv("chacha20-poly1305", key, nonce, {
    authTagLength: TAG_BYTES,
  });
  const ciphertext = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  return Buffer.concat([nonce, ciphertext, cipher.getAuthTag()]).toString("base64");
}

// ── Appels HTTP ─────────────────────────────────────────────────────────────

interface KeyExchangeResponse {
  server_public_key: string;
  session_id: string;
  encryption_version: string;
}

interface NotifyResponse {
  status?: string;
  message?: string;
  summary?: { failed?: number };
}

function post(
  path: string,
  body: unknown,
  headers: Record<string, string> = {},
  budget?: AbortSignal
): Promise<Response> {
  const base = requireEnv("RCS_BASE_URL").replace(/\/$/, "");
  const perCall = AbortSignal.timeout(TIMEOUT_MS);
  return fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Schéma exact attendu par le service : `ApiKey <clé>` (casse comprise).
      Authorization: `ApiKey ${requireEnv("RCS_API_KEY")}`,
      ...headers,
    },
    body: JSON.stringify(body),
    cache: "no-store",
    // Le premier des deux qui expire coupe l'appel.
    signal: budget ? AbortSignal.any([budget, perCall]) : perCall,
  });
}

/**
 * Résumé non sensible d'un corps d'erreur.
 *
 * Une erreur de validation DRF est indexée par champ (`{"mail": [...]}`) et peut
 * donc contenir les valeurs soumises : on n'en garde que les noms de champs.
 * `detail`, lui, porte les messages hors-champ du service (clé invalide,
 * permissions, session expirée) — utile au diagnostic et sans données du
 * formulaire, donc conservé.
 */
function describeError(text: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    // Corps non-JSON (page d'erreur d'un proxy, par exemple) : rien à en tirer.
    return "";
  }
  if (!parsed || typeof parsed !== "object") return "";

  // `error_code` est une énumération de protocole (SESSION_EXPIRED,
  // DECRYPTION_ERROR…) : sans données du formulaire, et c'est justement ce
  // qu'on veut lire dans les logs.
  const { detail, error_code: code } = parsed as { detail?: unknown; error_code?: unknown };
  if (typeof code === "string") return ` — ${code}`;
  if (typeof detail === "string") return ` — ${detail.slice(0, 200)}`;

  const keys = Object.keys(parsed);
  return keys.length ? ` — champs en erreur : ${keys.join(", ")}` : "";
}

/**
 * Lit une réponse RCS, en erreur si le statut n'est pas 2xx.
 *
 * ⚠️ Ne jamais journaliser la clé d'API, le payload déchiffré, ni le corps brut
 * de la réponse : les formulaires transportent des données personnelles et une
 * erreur de validation peut renvoyer les champs fautifs. Le statut et le résumé
 * filtré par `describeError` suffisent au diagnostic.
 */
async function readJson<T>(response: Response, step: string): Promise<T> {
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`RCS — ${step} : HTTP ${response.status}${describeError(text)}`);
  }
  return JSON.parse(text) as T;
}

// ── Session ─────────────────────────────────────────────────────────────────

interface Session {
  id: string;
  key: Buffer;
  /** Cookie `rcs_sessionid` déposé par l'échange, à rejouer tel quel. */
  cookie: string;
}

let session: Session | null = null;
/** Échange en cours : évite qu'un pic de soumissions ne rejoue N échanges. */
let pending: Promise<Session> | null = null;

async function openSession(): Promise<Session> {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("x25519");
  const clientPublic = publicKey
    .export({ format: "der", type: "spki" })
    .subarray(SPKI_PREFIX.length);

  const response = await post("/api/v1/key-exchange/", {
    public_key: clientPublic.toString("base64"),
  });
  // Ne garder que les paires `nom=valeur` : les attributs (Path, HttpOnly…) ne
  // se renvoient pas dans un en-tête `Cookie`.
  const cookie = response.headers
    .getSetCookie()
    .map((c) => c.split(";")[0])
    .join("; ");
  const body = await readJson<KeyExchangeResponse>(response, "échange de clés");

  if (body.encryption_version !== ENCRYPTION_VERSION) {
    // Averti plutôt que bloquant : une version plus récente reste peut-être
    // compatible, et refuser net couperait tous les envois sur un simple bump.
    console.warn(
      `RCS — version de chiffrement annoncée : ${body.encryption_version} ` +
        `(client : ${ENCRYPTION_VERSION}). Si les envois sont refusés, la suite ` +
        "cryptographique du service a changé — voir l'en-tête de ce fichier."
    );
  }

  const serverPublic = crypto.createPublicKey({
    key: Buffer.concat([SPKI_PREFIX, Buffer.from(body.server_public_key, "base64")]),
    format: "der",
    type: "spki",
  });
  const shared = crypto.diffieHellman({ privateKey, publicKey: serverPublic });

  session = { id: body.session_id, key: deriveKey(shared), cookie };
  return session;
}

/** Ne se résout jamais ; rejette dès que le budget est épuisé. */
function rejectOnAbort(signal: AbortSignal): Promise<never> {
  return new Promise((_, reject) => {
    if (signal.aborted) return reject(signal.reason);
    signal.addEventListener("abort", () => reject(signal.reason), { once: true });
  });
}

function getSession(budget: AbortSignal): Promise<Session> {
  if (session) return Promise.resolve(session);
  // En cas d'échec, `pending` est libéré pour que la requête suivante retente.
  pending ??= openSession().finally(() => {
    pending = null;
  });
  // L'échange est mutualisé : on cesse de l'attendre quand le budget expire,
  // sans l'annuler — une requête concurrente peut encore en bénéficier.
  return Promise.race([pending, rejectOnAbort(budget)]);
}

// ── Envoi ───────────────────────────────────────────────────────────────────

export interface RcsMail {
  to: string[];
  subject: string;
  /** Corps en texte brut. */
  body: string;
  /** Corps HTML, rendu tel quel par le service. */
  body_html: string;
}

/**
 * Envoie une notification e-mail via RCS.
 *
 * Le service impose son propre expéditeur (`noreply@branchet.fr`) et n'expose
 * pas de `replyTo` : les adresses utiles doivent figurer dans le corps du
 * message (voir les gabarits dans `mail.ts`).
 */
export async function sendViaRcs(mail: RcsMail): Promise<void> {
  const payload = JSON.stringify({
    calling_user: requireEnv("RCS_CALLING_USER"),
    // Champ obligatoire : son absence fait échouer la validation côté serveur
    // (HTTP 500) alors même que le déchiffrement a réussi. `false` = envoi réel.
    // L'application appelante, elle, n'est pas transmise : le service la déduit
    // de la clé d'API (elle est renvoyée dans la réponse).
    mock_send: false,
    mail,
  });

  // Un seul budget pour tout l'envoi : échange de clés, notification et retry.
  const budget = AbortSignal.timeout(BUDGET_MS);

  const send = async () => {
    const current = await getSession(budget);
    return post(
      "/api/v1/notify-encrypted/",
      { encrypted_data: encrypt(current.key, payload) },
      // Le cookie est ce qui rattache réellement la requête à sa session ;
      // `X-Session-ID` est conservé par cohérence avec l'identifiant renvoyé.
      { "X-Session-ID": current.id, Cookie: current.cookie },
      budget
    );
  };

  let response = await send();

  // 419 = session expirée : on la jette, on renégocie et on retente une fois.
  if (response.status === 419) {
    session = null;
    response = await send();
  }

  const result = await readJson<NotifyResponse>(response, "envoi de la notification");

  // Un 200 détaille l'issue de chaque canal : un canal en échec doit remonter
  // comme un envoi raté, sinon le message serait perdu silencieusement.
  if (result.status !== "success" || (result.summary?.failed ?? 0) > 0) {
    throw new Error(`RCS — envoi refusé : ${result.message ?? JSON.stringify(result)}`);
  }
}
