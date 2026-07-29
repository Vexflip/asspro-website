"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { boardMembers } from "@/data/governance";

const normalize = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export default function GovernanceSection() {
  const [query, setQuery] = useState("");

  const q = normalize(query.trim());
  const filtered = q
    ? boardMembers.filter((m) =>
        normalize(`${m.name} ${m.title} ${m.role ?? ""}`).includes(q)
      )
    : boardMembers;

  return (
    <section className="py-12 md:py-20 bg-surface" id="gouvernance">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          title="La gouvernance"
          subtitle="Le conseil d'administration d'ASSPRO réunit des professionnels de santé engagés dans la prévention des risques opératoires."
        />

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="flex items-center bg-white rounded-lg px-4 py-3 shadow-sm border border-transparent focus-within:border-primary transition-all">
            <Search className="w-5 h-5 text-muted shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un membre..."
              aria-label="Rechercher un membre de la gouvernance"
              className="bg-transparent border-none outline-none ml-3 text-base w-full text-dark placeholder:text-muted"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted py-8">
            Aucun membre trouvé pour «&nbsp;{query}&nbsp;».
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.05}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="relative aspect-square w-full bg-surface">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover object-center"
                      unoptimized
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-dark text-sm leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-muted text-xs mt-1">{member.title}</p>
                    {member.role && (
                      <p className="text-primary text-xs font-semibold mt-1">
                        {member.role}
                      </p>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto pt-3 inline-flex items-center gap-2 text-xs text-primary hover:text-primary-light transition-colors font-medium"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        Voir le profil LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
