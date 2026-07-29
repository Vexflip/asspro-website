import { z } from "zod";

/**
 * Shared validation schemas used by both the client forms (react-hook-form)
 * and the server-side route handlers, so validation stays in sync.
 *
 * The honeypot field (`website`) is intentionally NOT part of these schemas —
 * it is a spam trap handled directly in the route handlers.
 */

/**
 * RGPD consent: the user must actively check a box agreeing to the processing
 * of their personal data. Enforced on both the client form and the server route
 * so a request without `consent: true` is rejected by the API too.
 */
const consent = z.literal(true, {
  error: "Vous devez accepter la politique de confidentialité pour continuer",
});

export const contactSchema = z.object({
  name: z.string().min(2, "Le nom est requis").max(100, "Le nom est trop long"),
  email: z.email("Email invalide").max(254, "Email trop long"),
  subject: z
    .string()
    .min(3, "Le sujet est requis")
    .max(150, "Le sujet est trop long"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(5000, "Le message est trop long (5000 caractères maximum)"),
  consent,
});

export type ContactInput = z.infer<typeof contactSchema>;

export const adhesionSchema = z.object({
  civilite: z.enum(["M.", "Mme", "Dr", "Pr"], {
    error: "Veuillez sélectionner une civilité",
  }),
  prenom: z.string().min(2, "Le prénom est requis").max(80, "Le prénom est trop long"),
  nom: z.string().min(2, "Le nom est requis").max(80, "Le nom est trop long"),
  profession: z
    .string()
    .min(2, "La profession est requise")
    .max(120, "La profession est trop longue"),
  specialite: z.string().max(120, "La spécialité est trop longue").optional(),
  etablissement: z
    .string()
    .min(2, "L'établissement est requis")
    .max(160, "L'établissement est trop long"),
  email: z.email("Email invalide").max(254, "Email trop long"),
  telephone: z
    .string()
    .regex(/^[0-9+\s().]{7,20}$/, "Numéro de téléphone invalide"),
  adresse: z.string().min(5, "L'adresse est requise").max(200, "L'adresse est trop longue"),
  codePostal: z.string().regex(/^\d{5}$/, "Code postal invalide (5 chiffres)"),
  ville: z.string().min(2, "La ville est requise").max(100, "La ville est trop longue"),
  typeAdhesion: z.enum(["individuel", "institutionnel"], {
    error: "Veuillez sélectionner un type d'adhésion",
  }),
  message: z.string().max(5000, "Le message est trop long (5000 caractères maximum)").optional(),
  consent,
});

export type AdhesionInput = z.infer<typeof adhesionSchema>;
