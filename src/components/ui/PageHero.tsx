import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.webp"
          alt="Page Hero Background"
          fill
          priority
          fetchPriority="high"
          className="object-cover"
        />
      </div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark/85 via-primary/75 to-dark/85" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
