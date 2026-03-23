"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";

export default function Testimonials() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          title="Témoignages"
          subtitle="Ce que disent les professionnels qui ont suivi nos formations"
        />
        <TestimonialCarousel />
      </div>
    </section>
  );
}
