import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { CategoryCards } from "@/components/CategoryCards";
import { TrustpilotSection } from "@/components/TrustpilotSection";
import { BestDealsSection } from "@/components/BestDealsSection";
import { SelectionSection } from "@/components/SelectionSection";
import { BrandsSection } from "@/components/BrandsSection";
import { PressSection } from "@/components/PressSection";
import { BlogSection } from "@/components/BlogSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SEOLinksSection } from "@/components/SEOLinksSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: "1360px", margin: "0 auto", width: "100%" }}>
        <HeroBanner />
        <CategoryCards />
        <TrustpilotSection />
        <BestDealsSection />
        <SelectionSection />
        <BrandsSection />
        <PressSection />
        <BlogSection />
        <NewsletterSection />
        <SEOLinksSection />
      </main>
      <Footer />
    </>
  );
}
