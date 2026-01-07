"use client";
import { AnimatedHeading, FadeInUp } from "./animations";

export const AboutUs = () => (
  <section className="md:py-8 py-6">
    <div id="about" className="max-w-6xl mx-auto flex flex-col gap-4 md:gap-6 items-center justify-center px-6 space-y-12">
      <AnimatedHeading as="h2" className="judson md:mb-4 mb-4 text-center text-3xl md:text-4xl font-bold text-[var(--foreground)]">
        Who We Are?
      </AnimatedHeading>
      <FadeInUp>
        <p className="text-gray-700 mb-4 text-justify md:text-center">
          <span className="font-bold">SimplyTalk</span> was founded on one simple truth: sometimes, all you need is someone who truly listens. Our empathetic listeners have no formal therapy credentials—but they do have hearts wide open, ready to hear whatever’s on yours. We’re not therapists or medical professionals, just everyday people trained in active listening. We offer a safe, judgment-free space to talk and be heard in <span className="font-bold"> English, हिंदी, and मराठी</span>. When you need someone to listen with care and understanding, we’re here for you.
        </p>
      </FadeInUp>
    </div>
  </section>
);
