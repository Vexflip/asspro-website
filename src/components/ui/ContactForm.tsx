"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
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
        <label className="block text-sm font-medium text-dark mb-1">Nom complet</label>
        <input
          {...register("name")}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          placeholder="Dr. Jean Dupont"
        />
        {errors.name && <p className="text-emergency text-sm mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-dark mb-1">Email</label>
        <input
          {...register("email")}
          type="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          placeholder="jean.dupont@email.fr"
        />
        {errors.email && <p className="text-emergency text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-dark mb-1">Sujet</label>
        <input
          {...register("subject")}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          placeholder="Renseignement sur les formations"
        />
        {errors.subject && <p className="text-emergency text-sm mt-1">{errors.subject.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-dark mb-1">Message</label>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
          placeholder="Votre message..."
        />
        {errors.message && <p className="text-emergency text-sm mt-1">{errors.message.message}</p>}
      </div>
      {error && <p className="text-emergency text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        <Send className="w-4 h-4 mr-2" />
        {isSubmitting ? "Envoi en cours…" : "Envoyer le message"}
      </Button>
    </form>
  );
}
