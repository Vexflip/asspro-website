"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import Link from "next/link";
import Button from "./Button";
import { useRef, useState } from "react";
import { contactSchema, type ContactInput } from "@/lib/schemas";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          website: honeypotRef.current?.value || "",
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      setError(
        "Une erreur est survenue lors de l'envoi. Veuillez réessayer dans un instant."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-accent/10 rounded-xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-dark mb-2">Message envoyé !</h3>
        <p className="text-muted">
          Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot: hidden from users, bots tend to fill it in. */}
      <input
        ref={honeypotRef}
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-dark mb-1">Nom complet</label>
        <input
          id="contact-name"
          {...register("name")}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          placeholder="Dr. Jean Dupont"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name && <p id="contact-name-error" role="alert" className="text-emergency text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-dark mb-1">Email</label>
        <input
          id="contact-email"
          {...register("email")}
          type="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          placeholder="jean.dupont@email.fr"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email && <p id="contact-email-error" role="alert" className="text-emergency text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-medium text-dark mb-1">Sujet</label>
        <input
          id="contact-subject"
          {...register("subject")}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          placeholder="Renseignement sur les formations"
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={errors.subject ? "contact-subject-error" : undefined}
        />
        {errors.subject && <p id="contact-subject-error" role="alert" className="text-emergency text-sm mt-1">{errors.subject.message}</p>}
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-dark mb-1">Message</label>
        <textarea
          id="contact-message"
          {...register("message")}
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
          placeholder="Votre message..."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message && <p id="contact-message-error" role="alert" className="text-emergency text-sm mt-1">{errors.message.message}</p>}
      </div>
      <div>
        <label className="flex items-start gap-2 text-sm text-muted">
          <input
            {...register("consent")}
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-primary focus:ring-primary/20"
          />
          <span>
            J&apos;accepte que mes données soient traitées pour répondre à ma
            demande, conformément à la{" "}
            <Link
              href="/politique-de-confidentialite"
              className="text-primary underline hover:no-underline"
            >
              politique de confidentialité
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="text-emergency text-sm mt-1">{errors.consent.message}</p>
        )}
      </div>
      {error && <p role="alert" className="text-emergency text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        <Send className="w-4 h-4 mr-2" />
        {isSubmitting ? "Envoi en cours…" : "Envoyer le message"}
      </Button>
    </form>
  );
}
