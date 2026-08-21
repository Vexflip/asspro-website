import { z } from "zod";
import { contactSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { bodyTooLarge } from "@/lib/http";
import { sendMail, buildContactEmails, CONTACT_TO } from "@/lib/mail";

// The rate-limit key is derived from X-Forwarded-For. This is only trustworthy
// because the production reverse proxy strips any client-supplied XFF and sets
// its own (see README / .env.example); do not use this value for anything but
// coarse rate limiting.
function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  if (!rateLimit(getClientIp(request))) {
    return Response.json(
      { ok: false, error: "Trop de requêtes. Réessayez plus tard." },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  if (bodyTooLarge(request)) {
    return Response.json(
      { ok: false, error: "Requête trop volumineuse." },
      { status: 413 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden `website` field. Pretend success, send nothing.
  if (typeof body === "object" && body !== null && (body as { website?: string }).website) {
    return Response.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, errors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 }
    );
  }

  const { notification, confirmation } = buildContactEmails(parsed.data, CONTACT_TO());

  // The notification to ASSPRO is the critical send — fail the request if it
  // doesn't go through so the user knows to retry.
  try {
    await sendMail({
      to: CONTACT_TO(),
      ...notification,
    });
  } catch (err) {
    console.error("Contact notification email failed:", err);
    return Response.json(
      { ok: false, error: "L'envoi a échoué. Réessayez plus tard." },
      { status: 500 }
    );
  }

  // The visitor confirmation is best-effort: ASSPRO has already been notified,
  // so a confirmation failure must NOT 500 the user (that would trigger a
  // resubmit and a duplicate notification).
  try {
    await sendMail({
      to: parsed.data.email,
      ...confirmation,
    });
  } catch (err) {
    console.error("Contact confirmation email failed:", err);
  }

  return Response.json({ ok: true });
}
