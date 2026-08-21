import type { ContactInput, AdhesionInput } from "./schemas";
import { requireEnv } from "./env";
import { sendViaRcs } from "./rcs";

/**
 * Envoi d'e-mails des formulaires contact & adhésion.
 *
 * Le transport est RCS, le service de notifications interne de Branchet (voir
 * `rcs.ts`) ; sa configuration vient de variables d'environnement serveur (voir
 * .env.example).
 */

interface MailInput {
  to: string;
  subject: string;
  /** Variante texte brut, transmise dans `body`. */
  text: string;
  /** Variante HTML, transmise dans `body_html` et rendue telle quelle. */
  html: string;
}

export async function sendMail({ to, subject, text, html }: MailInput) {
  await sendViaRcs({ to: [to], subject, body: text, body_html: html });
}

/** Destination inboxes (ADHESION_TO falls back to CONTACT_TO). */
export const CONTACT_TO = () => requireEnv("CONTACT_TO");
export const ADHESION_TO = () => process.env.ADHESION_TO || requireEnv("CONTACT_TO");

// --- Templates -------------------------------------------------------------

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderRows(fields: [string, string | undefined][]): {
  text: string;
  html: string;
} {
  const rows = fields.filter(([, v]) => v && v.trim() !== "");
  const text = rows.map(([label, v]) => `${label} : ${v}`).join("\n");
  const html = rows
    .map(
      ([label, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top;">${escapeHtml(
          label
        )}</td><td style="padding:4px 0;white-space:pre-wrap;">${escapeHtml(
          v as string
        )}</td></tr>`
    )
    .join("");
  return { text, html: `<table>${html}</table>` };
}

type EmailContent = { subject: string; text: string; html: string };

/**
 * Notification sent to ASSPRO + confirmation sent to the visitor.
 *
 * `replyAddress` (the ASSPRO inbox) is rendered into the confirmation body:
 * RCS sends from its own `noreply@` address and has no `replyTo`, so without it
 * the visitor would have no way to answer. In the other direction the visitor's
 * own address already appears in the notification's `Email` row.
 */
export function buildContactEmails(
  data: ContactInput,
  replyAddress: string
): {
  notification: EmailContent;
  confirmation: EmailContent;
} {
  const rows = renderRows([
    ["Nom", data.name],
    ["Email", data.email],
    ["Sujet", data.subject],
    ["Message", data.message],
  ]);

  const notification: EmailContent = {
    subject: `[Contact ASSPRO] ${data.subject}`,
    text: `Nouveau message reçu via le formulaire de contact :\n\n${rows.text}`,
    html: `<p>Nouveau message reçu via le formulaire de contact :</p>${rows.html}`,
  };

  const confirmation: EmailContent = {
    subject: "Nous avons bien reçu votre message – ASSPRO",
    text: `Bonjour ${data.name},\n\nNous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.\n\nRécapitulatif :\nSujet : ${data.subject}\nMessage : ${data.message}\n\nPour toute question, écrivez-nous à ${replyAddress}.\n\nCordialement,\nL'équipe ASSPRO`,
    html: `<p>Bonjour ${escapeHtml(
      data.name
    )},</p><p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p><p><strong>Récapitulatif :</strong></p>${
      rows.html
    }<p>Pour toute question, écrivez-nous à <a href="mailto:${escapeHtml(
      replyAddress
    )}">${escapeHtml(replyAddress)}</a>.</p><p>Cordialement,<br/>L'équipe ASSPRO</p>`,
  };

  return { notification, confirmation };
}

/**
 * Notification sent to ASSPRO + confirmation sent to the applicant.
 * `replyAddress` serves the same purpose as in `buildContactEmails`.
 */
export function buildAdhesionEmails(
  data: AdhesionInput,
  replyAddress: string
): {
  notification: EmailContent;
  confirmation: EmailContent;
} {
  const rows = renderRows([
    ["Civilité", data.civilite],
    ["Prénom", data.prenom],
    ["Nom", data.nom],
    ["Profession", data.profession],
    ["Spécialité", data.specialite],
    ["Établissement", data.etablissement],
    ["Email", data.email],
    ["Téléphone", data.telephone],
    ["Adresse", data.adresse],
    ["Code postal", data.codePostal],
    ["Ville", data.ville],
    ["Type d'adhésion", data.typeAdhesion],
    ["Message", data.message],
  ]);

  const fullName = `${data.civilite} ${data.prenom} ${data.nom}`;

  const notification: EmailContent = {
    subject: `[Adhésion ASSPRO] ${data.prenom} ${data.nom}`,
    text: `Nouvelle demande d'adhésion :\n\n${rows.text}`,
    html: `<p>Nouvelle demande d'adhésion :</p>${rows.html}`,
  };

  const confirmation: EmailContent = {
    subject: "Nous avons bien reçu votre demande d'adhésion – ASSPRO",
    text: `Bonjour ${fullName},\n\nNous avons bien reçu votre demande d'adhésion. Nous l'examinerons et vous contacterons dans les meilleurs délais (sous 72h).\n\nPour toute question, écrivez-nous à ${replyAddress}.\n\nCordialement,\nL'équipe ASSPRO`,
    html: `<p>Bonjour ${escapeHtml(
      fullName
    )},</p><p>Nous avons bien reçu votre demande d'adhésion. Nous l'examinerons et vous contacterons dans les meilleurs délais (sous 72h).</p><p>Pour toute question, écrivez-nous à <a href="mailto:${escapeHtml(
      replyAddress
    )}">${escapeHtml(replyAddress)}</a>.</p><p>Cordialement,<br/>L'équipe ASSPRO</p>`,
  };

  return { notification, confirmation };
}
