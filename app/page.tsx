import { HeroSlider } from "@/components/HeroSlider";
import { BestSellersSection } from "@/components/BestSellersSection";
import { PromoBanner } from "@/components/PromoBanner";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { SecondPromo } from "@/components/SecondPromo";
import { CustomerReviews } from "@/components/CustomerReviews";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section Slider */}
      <HeroSlider />

      {/* 2. Best Sellers */}
      <BestSellersSection />

      {/* 4. Promotional Banner */}
      <PromoBanner />

      {/* 5. Why Choose Super Safety Cover */}
      <WhyChooseUs />

      {/* 6. Second Promotional Section */}
      <SecondPromo />

      {/* 8. Customer Reviews */}
      <CustomerReviews />

      {/* 9. FAQ Section */}
      <div id="faqs">
        <FAQSection />
      </div>

      {/* 10. Final CTA */}
      <FinalCTA />
    </>
  );
}
