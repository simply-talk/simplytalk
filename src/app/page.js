import Hero from '@/app/components/Hero';
import { HowItWorks } from "./components/HowItWorks";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { TestimonialsSection } from "./components/Testimonials";
import { PricingSection } from "./components/Pricings";
import { FaqSection } from "./components/Faq";
import { CtaForm } from "./components/CTAForm";
import { AboutUs } from "./components/AboutUs";
import WhoShouldOpt from "./components/WhoShouldOptUs";


export default function Home() {
  return (
    <div >
      <main>
        <Hero />
        <div className="md:rounded-t-[100px] rounded-t-[50px] bg-[var(--color-mint)]  py-8 md:px-8">
          <AboutUs />
          <WhyChooseUs />
        </div>
        <WhoShouldOpt />
        <HowItWorks />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaForm />
      </main>
  </div >
  );
}
 