import { z } from "zod";

/**
 * Shared validation schemas used by both the client forms (react-hook-form)
 * and the server-side route handlers, so validation stays in sync.
 *
 * The honeypot field (`website`) is intentionally NOT part of these schemas —
 * it is a spam trap handled directly in the route handlers.
 */

export const contactSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(3, "Le sujet est requis"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const adhesionSchema = z.object({
  civilite: z.enum(["M.", "Mme", "Dr", "Pr"], {
    error: "Veuillez sélectionner une civilité",
  }),
  prenom: z.string().min(2, "Le prénom est requis"),
  nom: z.string().min(2, "Le nom est requis"),
  profession: z.string().min(2, "La profession est requise"),
  specialite: z.string().optional(),
  etablissement: z.string().min(2, "L'établissement est requis"),
  email: z.string().email("Email invalide"),
  telephone: z
    .string()
    .regex(/^[0-9+\s().]{7,20}$/, "Numéro de téléphone invalide"),
  adresse: z.string().min(5, "L'adresse est requise"),
  codePostal: z.string().regex(/^\d{5}$/, "Code postal invalide (5 chiffres)"),
  ville: z.string().min(2, "La ville est requise"),
  typeAdhesion: z.enum(["individuel", "institutionnel"], {
    error: "Veuillez sélectionner un type d'adhésion",
  }),
  message: z.string().optional(),
});

export type AdhesionInput = z.infer<typeof adhesionSchema>;
