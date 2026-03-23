"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {testimonials.map((t) => (
          <div key={t.id} className="flex-[0_0_100%] min-w-0 px-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
            <div className="bg-white rounded-xl shadow-sm p-8 h-full flex flex-col">
              <Quote className="w-8 h-8 text-primary-light/30 mb-4" />
              <blockquote className="text-dark leading-relaxed flex-1 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 pt-4 border-t border-surface">
                <p className="font-bold text-dark">{t.author}</p>
                <p className="text-sm text-muted">
                  {t.role} — {t.specialty}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
