import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import AssproJeunesPreview from "@/components/sections/AssproJeunesPreview";

const PartnersLogos = dynamic(
  () => import("@/components/sections/PartnersLogos")
);
const CTABanner = dynamic(() => import("@/components/sections/CTABanner"));

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
