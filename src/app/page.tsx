import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import AssproJeunesPreview from "@/components/sections/AssproJeunesPreview";
import Testimonials from "@/components/sections/Testimonials";
import PartnersLogos from "@/components/sections/PartnersLogos";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AssproJeunesPreview />
      <PartnersLogos />
      <CTABanner />
    </>
  );
}
