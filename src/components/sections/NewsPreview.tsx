"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Badge from "@/components/ui/Badge";
import { newsArticles } from "@/data/news";

export default function NewsPreview() {
  const latest = newsArticles.slice(0, 3);

  return (
    <section className="py-12 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          title="Actualités"
          subtitle="Restez informé des dernières nouvelles de la prévention des risques"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((article, i) => (
            <ScrollReveal key={article.id} delay={i * 0.1}>
              <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="teal">{article.category}</Badge>
                    <span className="text-xs text-muted">{article.date}</span>
                  </div>
                  <h3 className="font-bold text-dark mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-3">{article.excerpt}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Voir toutes les actualités
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
