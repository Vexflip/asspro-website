/**
 * Accès aux variables d'environnement lues au **runtime** par le serveur.
 *
 * ⚠️ Réservé aux variables serveur (sans préfixe `NEXT_PUBLIC_`). L'accès
 * dynamique `process.env[nom]` n'est pas remplacé par le bundler : pour une
 * variable `NEXT_PUBLIC_*`, utilisez `required()` dans `org.ts`.
 */
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variable d'environnement manquante : ${name}`);
  }
  return value;
}
