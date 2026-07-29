"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  searchEntries,
  buildSnippet,
  entrySnippet,
  type SearchType,
  type SearchEntry,
  type HighlightSegment,
} from "@/lib/search";
import { searchIndex } from "@/data/searchIndex";

// Display order + labels for each result group.
const GROUPS: { type: SearchType; label: string }[] = [
  { type: "page", label: "Pages" },
  { type: "formation", label: "Formations" },
  { type: "guide", label: "Guides" },
  { type: "team", label: "Équipe & gouvernance" },
  { type: "partner", label: "Partenaires" },
];

// Render text segments, bolding the parts that matched the query (Ctrl+F style).
function Highlight({ segments }: { segments: HighlightSegment[] }) {
  return (
    <>
      {segments.map((seg, i) =>
        seg.match ? (
          <mark
            key={i}
            className="bg-primary/15 text-dark font-bold rounded px-0.5"
          >
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </>
  );
}

function ResultCard({ entry, query }: { entry: SearchEntry; query: string }) {
  return (
    <Link
      href={entry.href}
      className="block h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 p-6 group"
    >
      <h3 className="text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors">
        <Highlight segments={buildSnippet(entry.title, query)} />
      </h3>
      <p className="text-muted text-sm leading-relaxed">
        <Highlight segments={entrySnippet(entry, query)} />
      </p>
      <p className="mt-4 text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
        Voir →
      </p>
    </Link>
  );
}

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const results = q ? searchEntries(q, searchIndex) : [];

  return (
    <>
      <PageHero
        title="Recherche"
        subtitle={q ? `Résultats pour "${q}"` : "Effectuez une recherche"}
      />

      <section className="py-12 md:py-20 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4">
          {!q ? (
            <div className="text-center text-muted">
              Veuillez entrer un terme de recherche.
            </div>
          ) : results.length === 0 ? (
            <div className="text-center text-muted">
              Aucun résultat trouvé pour &quot;{q}&quot;.
            </div>
          ) : (
            <div className="space-y-12">
              {GROUPS.map((group) => {
                const items = results.filter((r) => r.type === group.type);
                if (items.length === 0) return null;
                return (
                  <div key={group.type}>
                    <h2 className="text-2xl font-bold font-serif mb-6 text-dark">
                      {group.label} ({items.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((item, i) => (
                        <ScrollReveal key={item.id} delay={i * 0.05}>
                          <ResultCard entry={item} query={q} />
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Chargement...
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
