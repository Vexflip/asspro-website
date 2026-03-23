"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { newsArticles } from "@/data/news";

export default function ActualitesPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Actualités"
        subtitle="Les dernières nouvelles de la prévention des risques au bloc opératoire"
      />

      {/* News grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Featured article */}
          <ScrollReveal>
            <article className="mb-12 bg-white rounded-2xl shadow-sm overflow-hidden group hover:shadow-md transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <Image
                    src={newsArticles[0].image}
                    alt={newsArticles[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="teal">{newsArticles[0].category}</Badge>
                    <span className="text-sm text-muted">
                      {newsArticles[0].date}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
                    {newsArticles[0].title}
                  </h2>
                  <p className="text-muted leading-relaxed mb-6">
                    {newsArticles[0].excerpt}
                  </p>
                  <p className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Lire l&apos;article <ArrowRight className="w-4 h-4" />
                  </p>
                </div>
              </div>
            </article>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.slice(1).map((article, i) => (
              <ScrollReveal key={article.id} delay={i * 0.1}>
                <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden group h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="teal">{article.category}</Badge>
                      <span className="text-xs text-muted">{article.date}</span>
                    </div>
                    <h3 className="font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <p className="mt-4 text-primary font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Lire la suite <ArrowRight className="w-4 h-4" />
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
