"use client";
import Image from "next/image";

// Reusable animation components
import { FadeInUp, AnimatedHeading, AnimatedButton } from "./animations";

export default function Hero() {
  return (
    <section className="pt-4 text-center w-full">
      <div className="container mx-auto px-10">
        {/* Header */}
        <FadeInUp>
          <AnimatedHeading as="h1" className="judson text-4xl md:text-6xl font-bold mb-3">
            Find a Compassionate Listener
          </AnimatedHeading>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <p className="montserrat text-lg md:text-xl md:mb-16 mb-8 max-w-2xl mx-auto">
            No Judgments, Just Understanding—ready to listen, support, and help
            you unburden your mind in English, हिंदी, or मराठी.
          </p>
        </FadeInUp>

        {/* CTA Button */}
        <FadeInUp delay={0.35}>
          <AnimatedButton
            as="a"
            href="#book"
            className="montserrat inline-block bg-[var(--foreground)] text-white md:px-9 md:py-3 px-6 py-3 text-xs md:text-sm rounded-full font-normal"
          >
            Book Call
          </AnimatedButton>
        </FadeInUp>

        {/* Illustration */}
        <FadeInUp delay={0.5}>
          <Image
            src="/hero-img.png"
            alt="Woman talking on the phone"
            width={900}
            height={400}
            className="mx-auto"
            priority={true}
          />
        </FadeInUp>
      </div>
    </section>
  );
}
