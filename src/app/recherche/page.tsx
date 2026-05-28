"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import { formations } from "@/data/formations";
import { newsArticles } from "@/data/news";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";

function getLevenshteinDistance(a: string, b: string): number {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const arr = [];
  for (let i = 0; i <= b.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= a.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (a[j - 1] === b[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[b.length][a.length];
}

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const normalize = (str: string) => 
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const queryWords = normalize(q).trim().split(/\s+/).filter(w => w.length > 1);

  const isFuzzyMatch = (word: string, text: string) => {
    if (text.includes(word)) return true;
    let maxDist = 1;
    if (word.length >= 7) maxDist = 3;
    else if (word.length >= 4) maxDist = 2;

    const textWords = text.split(/[\s,.'"-]+/);
    return textWords.some(tw => {
      if (Math.abs(tw.length - word.length) > maxDist) return false;
      return getLevenshteinDistance(word, tw) <= maxDist;
    });
  };

  let matchedFormations = q ? formations.filter(f => {
    const text = normalize(`${f.title} ${f.description} ${f.category}`);
    return queryWords.every(word => isFuzzyMatch(word, text));
  }) : [];

  if (matchedFormations.length === 0 && queryWords.length > 1) {
    matchedFormations = formations.filter(f => {
      const text = normalize(`${f.title} ${f.description} ${f.category}`);
      return queryWords.some(word => isFuzzyMatch(word, text));
    });
  }

  let matchedNews = q ? newsArticles.filter(n => {
    const text = normalize(`${n.title} ${n.excerpt} ${n.category}`);
    return queryWords.every(word => isFuzzyMatch(word, text));
  }) : [];

  if (matchedNews.length === 0 && queryWords.length > 1) {
    matchedNews = newsArticles.filter(n => {
      const text = normalize(`${n.title} ${n.excerpt} ${n.category}`);
      return queryWords.some(word => isFuzzyMatch(word, text));
    });
  }

  return (
    <>
      <PageHero 
        title="Recherche" 
        subtitle={q ? `Résultats pour "${q}"` : "Effectuez une recherche"}
      />
      
      <section className="py-12 md:py-20 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4">
          {!q ? (
            <div className="text-center text-muted">Veuillez entrer un terme de recherche.</div>
          ) : matchedFormations.length === 0 && matchedNews.length === 0 ? (
            <div className="text-center text-muted">Aucun résultat trouvé pour "{q}".</div>
          ) : (
            <div className="space-y-12">
              {matchedFormations.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold font-serif mb-6 text-dark">Formations ({matchedFormations.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matchedFormations.map((f, i) => (
                      <ScrollReveal key={f.id} delay={i * 0.05}>
                        <Card 
                          title={f.title} 
                          description={f.description} 
                          href="/formations"
                          cta="Voir la formation"
                        />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}

              {matchedNews.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold font-serif mb-6 text-dark">Actualités ({matchedNews.length})</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matchedNews.map((n, i) => (
                      <ScrollReveal key={n.id} delay={i * 0.05}>
                        <Card 
                          title={n.title} 
                          description={n.excerpt} 
                          href={`/actualites/${n.slug}`}
                          cta="Lire l'article"
                        />
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <SearchResults />
    </Suspense>
  );
}
