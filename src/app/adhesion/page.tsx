"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, UserPlus } from "lucide-react";
import { useRef, useState } from "react";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { adhesionSchema, type AdhesionInput } from "@/lib/schemas";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white";

const labelClass = "block text-sm font-medium text-dark mb-1";

export default function AdhesionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdhesionInput>({
    resolver: zodResolver(adhesionSchema),
  });

  const onSubmit = async (data: AdhesionInput) => {
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/adhesion", {
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

  return (
    <>
      <PageHero
        title="Adhérer à ASSPRO"
        subtitle="Rejoignez notre communauté de professionnels engagés dans la prévention des risques opératoires."
      />

      {/* Benefits */}
      <section className="py-12 md:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            title="Les avantages de l'adhésion"
            subtitle="En rejoignant ASSPRO, vous bénéficiez d'un réseau d'experts et de ressources exclusives."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Accès aux formations",
                description:
                  "Tarifs préférentiels sur l'ensemble du catalogue de formations ASSPRO, y compris les sessions ARRES et les modules e-learning.",
              },
              {
                title: "Accompagnement médico-légal",
                description:
                  "Accès au service d'assistance médico-légale 24h/24 et 7j/7 pour vous conseiller en cas de difficulté.",
              },
              {
                title: "Ressources documentaires",
                description:
                  "Bibliothèque de guides, protocoles, modèles de consentement et références scientifiques mis à jour régulièrement.",
              },
              {
                title: "Réseau professionnel",
                description:
                  "Intégrez un réseau national de professionnels du bloc opératoire et participez aux événements ASSPRO.",
              },
              {
                title: "Newsletter & veille",
                description:
                  "Recevez la newsletter annuelle et les alertes sur les évolutions réglementaires et les bonnes pratiques.",
              },
            ].map((benefit, i) => (
              <ScrollReveal key={benefit.title} delay={i * 0.08}>
                <div className="bg-white rounded-xl p-6 shadow-sm h-full">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-bold text-dark mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeading
            title="Formulaire d'adhésion"
            subtitle="Remplissez le formulaire ci-dessous. Nous traiterons votre demande et vous contacterons sous 72h."
          />

          {submitted ? (
            <ScrollReveal>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">
                  Demande reçue !
                </h3>
                <p className="text-muted">
                  Merci pour votre intérêt. Nous examinerons votre demande
                  d&apos;adhésion et vous contacterons dans les meilleurs délais.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl shadow-sm p-8 space-y-6"
              >
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
                {/* Identité */}
                <div>
                  <h3 className="font-bold text-dark text-lg mb-4 pb-2 border-b border-gray-100">
                    Identité
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className={labelClass}>Civilité</label>
                      <select {...register("civilite")} className={inputClass}>
                        <option value="">—</option>
                        <option value="M.">M.</option>
                        <option value="Mme">Mme</option>
                        <option value="Dr">Dr</option>
                        <option value="Pr">Pr</option>
                      </select>
                      {errors.civilite && (
                        <p className="text-emergency text-sm mt-1">
                          {errors.civilite.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Prénom</label>
                      <input
                        {...register("prenom")}
                        className={inputClass}
                        placeholder="Jean"
                      />
                      {errors.prenom && (
                        <p className="text-emergency text-sm mt-1">
                          {errors.prenom.message}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Nom</label>
                      <input
                        {...register("nom")}
                        className={inputClass}
                        placeholder="Dupont"
                      />
                      {errors.nom && (
                        <p className="text-emergency text-sm mt-1">
                          {errors.nom.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profession */}
                <div>
                  <h3 className="font-bold text-dark text-lg mb-4 pb-2 border-b border-gray-100">
                    Profession
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Profession</label>
                      <input
                        {...register("profession")}
                        className={inputClass}
                        placeholder="Anesthésiste-Réanimateur"
                      />
                      {errors.profession && (
                        <p className="text-emergency text-sm mt-1">
                          {errors.profession.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>
                        Spécialité{" "}
                        <span className="text-muted font-normal">
                          (optionnel)
                        </span>
                      </label>
                      <input
                        {...register("specialite")}
                        className={inputClass}
                        placeholder="Chirurgie cardiaque"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Établissement</label>
                      <input
                        {...register("etablissement")}
                        className={inputClass}
                        placeholder="CHU de Lyon"
                      />
                      {errors.etablissement && (
                        <p className="text-emergency text-sm mt-1">
                          {errors.etablissement.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Coordonnées */}
                <div>
                  <h3 className="font-bold text-dark text-lg mb-4 pb-2 border-b border-gray-100">
                    Coordonnées
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Email</label>
                      <input
                        {...register("email")}
                        type="email"
                        className={inputClass}
                        placeholder="jean.dupont@chu-lyon.fr"
                      />
                      {errors.email && (
                        <p className="text-emergency text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Téléphone</label>
                      <input
                        {...register("telephone")}
                        type="tel"
                        className={inputClass}
                        placeholder="06 12 34 56 78"
                      />
                      {errors.telephone && (
                        <p className="text-emergency text-sm mt-1">
                          {errors.telephone.message}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelClass}>Adresse postale</label>
                      <input
                        {...register("adresse")}
                        className={inputClass}
                        placeholder="12 rue de la Paix"
                      />
                      {errors.adresse && (
                        <p className="text-emergency text-sm mt-1">
                          {errors.adresse.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Code postal</label>
                      <input
                        {...register("codePostal")}
                        className={inputClass}
                        placeholder="69001"
                      />
                      {errors.codePostal && (
                        <p className="text-emergency text-sm mt-1">
                          {errors.codePostal.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Ville</label>
                      <input
                        {...register("ville")}
                        className={inputClass}
                        placeholder="Lyon"
                      />
                      {errors.ville && (
                        <p className="text-emergency text-sm mt-1">
                          {errors.ville.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Type d'adhésion */}
                <div>
                  <h3 className="font-bold text-dark text-lg mb-4 pb-2 border-b border-gray-100">
                    Type d&apos;adhésion
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        value: "individuel",
                        label: "Adhésion individuelle",
                        description: "Pour les praticiens à titre personnel.",
                      },
                      {
                        value: "institutionnel",
                        label: "Adhésion institutionnelle",
                        description:
                          "Pour les établissements de santé et services.",
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="relative flex items-start gap-3 p-4 rounded-lg border border-gray-200 cursor-pointer hover:border-primary transition has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                      >
                        <input
                          type="radio"
                          {...register("typeAdhesion")}
                          value={option.value}
                          className="mt-1 accent-primary"
                        />
                        <div>
                          <span className="font-medium text-dark">
                            {option.label}
                          </span>
                          <p className="text-sm text-muted mt-0.5">
                            {option.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.typeAdhesion && (
                    <p className="text-emergency text-sm mt-2">
                      {errors.typeAdhesion.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className={labelClass}>
                    Message{" "}
                    <span className="text-muted font-normal">(optionnel)</span>
                  </label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Informations complémentaires, questions..."
                  />
                </div>

                {error && <p className="text-emergency text-sm">{error}</p>}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  {isSubmitting
                    ? "Envoi en cours…"
                    : "Soumettre ma demande d'adhésion"}
                </Button>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
