"use client";
import Image from "next/image";
import { AnimatedHeading, FadeInUp, AnimatedButton } from "./animations";

export function PricingSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <AnimatedHeading
          as="h2"
          className="judson mb-12 text-center text-3xl md:text-4xl font-bold text-[var(--foreground)]"
        >
          Pricing & Plans
        </AnimatedHeading>

        <FadeInUp>
          {/* Cards Wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            <div className="relative overflow-hidden rounded-2xl bg-[#e6f5f0] py-10 px-7 text-center">
              {/* Corner Tag */}
              <div className="absolute top-4 left-[-40px] rotate-[-40deg] bg-[#3DC9A2] text-white text-xs font-semibold px-10 py-1 shadow-md">
                New User
              </div>

              <div className="mb-4 flex justify-center">
                <Image
                  src="/trail.png"
                width={130}
                  height={150}
                  alt="Trial Call"
                />
              </div>

              <div className="mb-2 text-3xl md:text-4xl font-bold text-[#1a1a1a]">₹49</div>
              <div className="mb-6 text-slate-600">First 5 mins trial call</div>
              <div className="mb-6 text-base md:text-lg font-medium text-[--foreground]">
                Experience SimplyTalk with your first 5 min call at a special trial price.
              </div>

              {/* Outline Button (like your reference) */}
              <AnimatedButton
                as="a"
                href="#book"
                className="montserrat inline-block bg-[#3DC9A2] text-[#E1F0ED] px-9 py-3 text-sm rounded-full font-medium"
              >
                Book Trial
              </AnimatedButton>
            </div>

            {/* Premium Plan */}
            <div className="overflow-hidden rounded-2xl bg-[#e6f5f0] py-10 px-7 text-center">
              <div className="mb-4 flex justify-center">
                <Image
                  src="/pricecard-img.png"
                  width={120}
                  height={140}
                  alt="Premium Call"
                />
              </div>
              <div className="mb-2 text-3xl md:text-4xl font-bold text-[#1a1a1a]">
                ₹199
              </div>
              <div className="mb-6 text-slate-600">Per 15 mins</div>
              <div className="mb-6 text-base md:text-lg font-medium text-[--foreground]">
                Get heard and talk your heart to someone who truly listens.
              </div>
              <AnimatedButton
                as="a"
                href="#book"
                className="montserrat inline-block bg-[#3DC9A2] text-[#E1F0ED] px-9 py-3 text-sm rounded-full font-medium"
              >
                Book Premium Call
              </AnimatedButton>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
