/**
 * Fail-fast validation of the server-only environment the contact & adhésion
 * mailer depends on. `register()` runs once when a server instance boots, so a
 * misconfigured deployment surfaces at startup instead of on the first form
 * submission (which would otherwise return a 500 to the visitor).
 */
export async function register() {
  // Only the Node.js runtime sends mail, and never validate during `next build`
  // — the RCS credentials aren't present at build time and must not fail it.
  if (
    process.env.NEXT_RUNTIME !== "nodejs" ||
    process.env.NEXT_PHASE === "phase-production-build"
  ) {
    return;
  }

  const required = [
    "RCS_BASE_URL",
    "RCS_API_KEY",
    "RCS_CALLING_USER",
    "CONTACT_TO",
  ];
  const missing = required.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    const message =
      `Variables d'environnement manquantes : ${missing.join(", ")}. ` +
      "Les formulaires de contact et d'adhésion ne pourront pas envoyer d'e-mail.";

    // In production a missing RCS config is a deploy error — fail fast so it is
    // caught at boot. In development, just warn so `next dev` still runs.
    if (process.env.NODE_ENV === "production") {
      throw new Error(message);
    }
    console.warn(`[instrumentation] ${message}`);
  }
}
