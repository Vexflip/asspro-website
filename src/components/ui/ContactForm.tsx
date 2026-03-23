"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import Button from "./Button";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(3, "Le sujet est requis"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
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
      <Button type="submit" className="w-full">
        <Send className="w-4 h-4 mr-2" />
        Envoyer le message
      </Button>
    </form>
  );
}
