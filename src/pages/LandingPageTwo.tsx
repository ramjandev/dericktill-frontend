import HeroSection from "@/components/hero/HeroSection";
import AnalyzeConfidenceGrid from "@/components/features/AnalyzeConfidenceGrid";
import Analyzer from "@/components/analyzer/Analyzer";
import Section8 from "@/components/section8/Section8";
import Section82 from "@/components/section8/Section82";
import CTA from "@/components/cta/CTA";
import Footer from "@/components/footer/Footer";

function LandingPageTwo() {
  return (
    <div className="w-full bg-transparent">
      <HeroSection heroImageSrc="images/hero.png" />
      <AnalyzeConfidenceGrid gridBgSrc="images/grid-bg.png" />
      <Analyzer />
      <Section8 />
      <Section82 />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPageTwo;
