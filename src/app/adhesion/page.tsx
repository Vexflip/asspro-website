"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, UserPlus } from "lucide-react";
import Link from "next/link";
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
                  "Accès à l’ensemble des formations conçues par ASSPRO.",
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
            subtitle="Remplissez le formulaire ci-dessous. Nous traiterons votre demande dans les meilleurs délais."
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
                      <label htmlFor="adh-civilite" className={labelClass}>Civilité</label>
                      <select
                        id="adh-civilite"
                        {...register("civilite")}
                        className={inputClass}
                        aria-invalid={errors.civilite ? true : undefined}
                        aria-describedby={errors.civilite ? "adh-civilite-error" : undefined}
                      >
                        <option value="">—</option>
                        <option value="M.">M.</option>
                        <option value="Mme">Mme</option>
                        <option value="Dr">Dr</option>
                        <option value="Pr">Pr</option>
                      </select>
                      {errors.civilite && (
                        <p id="adh-civilite-error" role="alert" className="text-emergency text-sm mt-1">
                          {errors.civilite.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="adh-prenom" className={labelClass}>Prénom</label>
                      <input
                        id="adh-prenom"
                        {...register("prenom")}
                        className={inputClass}
                        placeholder="Jean"
                        aria-invalid={errors.prenom ? true : undefined}
                        aria-describedby={errors.prenom ? "adh-prenom-error" : undefined}
                      />
                      {errors.prenom && (
                        <p id="adh-prenom-error" role="alert" className="text-emergency text-sm mt-1">
                          {errors.prenom.message}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="adh-nom" className={labelClass}>Nom</label>
                      <input
                        id="adh-nom"
                        {...register("nom")}
                        className={inputClass}
                        placeholder="Dupont"
                        aria-invalid={errors.nom ? true : undefined}
                        aria-describedby={errors.nom ? "adh-nom-error" : undefined}
                      />
                      {errors.nom && (
                        <p id="adh-nom-error" role="alert" className="text-emergency text-sm mt-1">
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
                      <label htmlFor="adh-profession" className={labelClass}>Profession</label>
                      <input
                        id="adh-profession"
                        {...register("profession")}
                        className={inputClass}
                        placeholder="Anesthésiste-Réanimateur"
                        aria-invalid={errors.profession ? true : undefined}
                        aria-describedby={errors.profession ? "adh-profession-error" : undefined}
                      />
                      {errors.profession && (
                        <p id="adh-profession-error" role="alert" className="text-emergency text-sm mt-1">
                          {errors.profession.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="adh-specialite" className={labelClass}>
                        Spécialité{" "}
                        <span className="text-muted font-normal">
                          (optionnel)
                        </span>
                      </label>
                      <input
                        id="adh-specialite"
                        {...register("specialite")}
                        className={inputClass}
                        placeholder="Chirurgie cardiaque"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="adh-etablissement" className={labelClass}>Établissement</label>
                      <input
                        id="adh-etablissement"
                        {...register("etablissement")}
                        className={inputClass}
                        placeholder="CHU de Lyon"
                        aria-invalid={errors.etablissement ? true : undefined}
                        aria-describedby={errors.etablissement ? "adh-etablissement-error" : undefined}
                      />
                      {errors.etablissement && (
                        <p id="adh-etablissement-error" role="alert" className="text-emergency text-sm mt-1">
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
                      <label htmlFor="adh-email" className={labelClass}>Email</label>
                      <input
                        id="adh-email"
                        {...register("email")}
                        type="email"
                        className={inputClass}
                        placeholder="jean.dupont@chu-lyon.fr"
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? "adh-email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="adh-email-error" role="alert" className="text-emergency text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="adh-telephone" className={labelClass}>Téléphone</label>
                      <input
                        id="adh-telephone"
                        {...register("telephone")}
                        type="tel"
                        className={inputClass}
                        placeholder="06 12 34 56 78"
                        aria-invalid={errors.telephone ? true : undefined}
                        aria-describedby={errors.telephone ? "adh-telephone-error" : undefined}
                      />
                      {errors.telephone && (
                        <p id="adh-telephone-error" role="alert" className="text-emergency text-sm mt-1">
                          {errors.telephone.message}
                        </p>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="adh-adresse" className={labelClass}>Adresse postale</label>
                      <input
                        id="adh-adresse"
                        {...register("adresse")}
                        className={inputClass}
                        placeholder="12 rue de la Paix"
                        aria-invalid={errors.adresse ? true : undefined}
                        aria-describedby={errors.adresse ? "adh-adresse-error" : undefined}
                      />
                      {errors.adresse && (
                        <p id="adh-adresse-error" role="alert" className="text-emergency text-sm mt-1">
                          {errors.adresse.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="adh-codePostal" className={labelClass}>Code postal</label>
                      <input
                        id="adh-codePostal"
                        {...register("codePostal")}
                        className={inputClass}
                        placeholder="69001"
                        aria-invalid={errors.codePostal ? true : undefined}
                        aria-describedby={errors.codePostal ? "adh-codePostal-error" : undefined}
                      />
                      {errors.codePostal && (
                        <p id="adh-codePostal-error" role="alert" className="text-emergency text-sm mt-1">
                          {errors.codePostal.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="adh-ville" className={labelClass}>Ville</label>
                      <input
                        id="adh-ville"
                        {...register("ville")}
                        className={inputClass}
                        placeholder="Lyon"
                        aria-invalid={errors.ville ? true : undefined}
                        aria-describedby={errors.ville ? "adh-ville-error" : undefined}
                      />
                      {errors.ville && (
                        <p id="adh-ville-error" role="alert" className="text-emergency text-sm mt-1">
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
                    <p role="alert" className="text-emergency text-sm mt-2">
                      {errors.typeAdhesion.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="adh-message" className={labelClass}>
                    Message{" "}
                    <span className="text-muted font-normal">(optionnel)</span>
                  </label>
                  <textarea
                    id="adh-message"
                    {...register("message")}
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Informations complémentaires, questions..."
                  />
                </div>

                {/* Consentement RGPD */}
                <div>
                  <label className="flex items-start gap-2 text-sm text-muted">
                    <input
                      {...register("consent")}
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-primary focus:ring-primary/20"
                    />
                    <span>
                      J&apos;accepte que les données transmises soient utilisées
                      pour traiter ma demande d&apos;adhésion, conformément à la{" "}
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
                    <p role="alert" className="text-emergency text-sm mt-1">
                      {errors.consent.message}
                    </p>
                  )}
                </div>

                {error && (
                  <p role="alert" className="text-emergency text-sm">
                    {error}
                  </p>
                )}
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
