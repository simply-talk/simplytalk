"use client";
import Image from "next/image";
import { FadeInUp, AnimatedHeading, AnimatedButton } from "./animations";

export default function Hero() {
  return (
    <section className="pt-4 text-center w-full">
      <div className="container mx-auto px-10">
        {/* Header */}
        <FadeInUp>
          <AnimatedHeading
            as="h1"
            className="judson text-4xl md:text-6xl font-bold mb-3"
          >
            Feel Lighter After One Call
          </AnimatedHeading>
        </FadeInUp>

        {/* Description */}
        <FadeInUp delay={0.2}>
          <p className="montserrat text-lg md:text-xl md:mb-16 mb-8 max-w-2xl mx-auto">
            Confidential emotional support with simple Vastu-based practical guidance.
            <br />
            Available in English | हिंदी | मराठी
          </p>
        </FadeInUp>

        {/* CTA Button */}
        <FadeInUp delay={0.35}>
          <AnimatedButton
            as="a"
            href="#book"
            className="montserrat inline-block bg-[var(--foreground)] text-white md:px-9 md:py-3 px-6 py-3 text-xs md:text-sm rounded-full font-normal"
          >
            Book ₹199 Session →
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
