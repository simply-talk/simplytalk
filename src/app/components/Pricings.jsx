"use client";
import Image from "next/image";
import { AnimatedHeading, FadeInUp, AnimatedButton } from "./animations";

export function PricingSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <AnimatedHeading as="h2" className="judson mb-12 text-center text-3xl md:text-4xl font-bold text-[var(--foreground)]">
          Pricing & Plans
        </AnimatedHeading>
        <FadeInUp>
          <div className="mx-auto max-w-md montserrat ">
            <div className="overflow-hidden rounded-lg bg-[#e6f5f0] py-12 px-9 text-center">
              <div className="mb-6 flex justify-center">
                <Image src="/pricecard-img.png" width={140} height={160} alt="person on call" />
              </div>
              <div className="mb-2 md:text-4xl text-3xl font-bold ">₹299</div>
              <div className="mb-6 text-slate-600">per 25 min.</div>
              <div className="mb-2 text-lg font-medium text-slate-400">
                First 6 mins totally free
              </div>
              <div className="mb-6 md:text-lg text-[16px] font-medium text-[--foreground]">
                Get heard and talk your heart to someone who listens you.
              </div>
              <AnimatedButton
                as="a"
                href="#book"
                className="montserrat inline-block bg-[#3DC9A2] text-[#E1F0ED] px-9 py-3 text-sm rounded-full font-normal"
              >
                Book Call
              </AnimatedButton>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}