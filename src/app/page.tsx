import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import TrainingAgenda from "@/components/sections/TrainingAgenda";
import TrainingCatalogue from "@/components/sections/TrainingCatalogue";
import AssproJeunesPreview from "@/components/sections/AssproJeunesPreview";
import PatientInfo from "@/components/sections/PatientInfo";
import Testimonials from "@/components/sections/Testimonials";
import NewsPreview from "@/components/sections/NewsPreview";
import PartnersLogos from "@/components/sections/PartnersLogos";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <TrainingAgenda />
      <TrainingCatalogue />
      <AssproJeunesPreview />
      <PatientInfo />
      <Testimonials />
      <NewsPreview />
      <PartnersLogos />
      <CTABanner />
    </>
  );
}
