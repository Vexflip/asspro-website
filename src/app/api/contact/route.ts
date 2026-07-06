import { z } from "zod";
import { contactSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { sendMail, buildContactEmails, CONTACT_TO } from "@/lib/mail";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  if (!rateLimit(getClientIp(request))) {
    return Response.json(
      { ok: false, error: "Trop de requêtes. Réessayez plus tard." },
      { status: 429 }
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

  const { notification, confirmation } = buildContactEmails(parsed.data);

  try {
    await sendMail({
      to: CONTACT_TO(),
      replyTo: parsed.data.email,
      ...notification,
    });
    await sendMail({
      to: parsed.data.email,
      replyTo: CONTACT_TO(),
      ...confirmation,
    });
  } catch (err) {
    console.error("Contact email send failed:", err);
    return Response.json(
      { ok: false, error: "L'envoi a échoué. Réessayez plus tard." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
