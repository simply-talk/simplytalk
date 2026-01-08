"use client";
import { AnimatedHeading, FadeInUp } from "./animations";

export const AboutUs = () => (
  <section className="md:py-8 py-6">
    <div
      id="about"
      className="max-w-6xl mx-auto flex flex-col gap-4 md:gap-6 items-center justify-center px-6 space-y-12"
    >
      <AnimatedHeading
        as="h2"
        className="judson md:mb-4 mb-4 text-center text-3xl md:text-4xl font-bold text-[var(--foreground)]"
      >
        Who We Are
      </AnimatedHeading>

      <FadeInUp>
        <p className="text-gray-700 mb-4 text-justify md:text-center leading-relaxed">
          <span className="font-bold">SimplyTalk</span> provides guided emotional clarity sessions supported by practical, Vastu-based home guidance.
        </p>

        <p className="text-gray-700 mb-4 text-justify md:text-center leading-relaxed">
          We help individuals—especially women—reduce mental overwhelm, gain perspective, and feel more settled by combining calm, confidential conversations with simple, visible Vastu tips that can be applied immediately at home.
        </p>

        <p className="text-gray-700 text-justify md:text-center leading-relaxed">
          Sessions are private, non-judgmental, and available in{" "}
          <span className="font-bold">English, हिंदी, and मराठी</span>.
        </p>
      </FadeInUp>
    </div>
  </section>
);
