"use client";
import Image from "next/image";
import { AnimatedHeading, FadeInUp, AnimatedButton } from "./animations";

export function PricingSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <AnimatedHeading
          as="h2"
          className="judson mb-12 text-center text-3xl md:text-4xl font-bold text-[var(--foreground)]"
        >
          Pricing & Plans
        </AnimatedHeading>

        <FadeInUp>
          {/* Cards Wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* 15-min Plan */}
            <div className="relative overflow-hidden rounded-2xl bg-[#e6f5f0] py-10 px-7 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-4 flex justify-center">
                <Image
                  src="/pricecard-img.png"
                  width={130}
                  height={150}
                  alt="15-Min Call at ₹199"
                />
              </div>

              <div className="mb-2 text-4xl font-bold text-[#1a1a1a]">₹199</div>
              <div className="mb-4 text-slate-600 text-base font-medium">
                15-minute session
              </div>

              <ul className="montserrat text-base md:text-lg text-gray-700 text-left inline-block mb-8 leading-relaxed space-y-2">
                <li>• Safe space to share your concerns</li>
                <li>• Emotional listening + one simple home tip</li>
                <li>• One practical remedy explained</li>
              </ul>

              <AnimatedButton
                as="a"
                href="#book"
                className="montserrat inline-block bg-[#3DC9A2] text-[#E1F0ED] px-9 py-3 text-sm rounded-full font-medium"
              >
                Book 15-min Call
              </AnimatedButton>
            </div>

            {/* 30-min Plan (Most Popular) */}
            <div className="relative overflow-hidden rounded-2xl bg-[#e6f5f0] py-10 px-7 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              {/* Tag */}
              <div className="absolute top-4 left-[-45px] rotate-[-40deg] bg-[#3DC9A2] text-white text-xs font-semibold px-12 py-1 shadow-md">
                Most Popular
              </div>

              <div className="mb-4 flex justify-center">
                <Image
                  src="/pricecard-img.png"
                  width={130}
                  height={150}
                  alt="30-Min Call"
                />
              </div>

              <div className="mb-2 text-4xl font-bold text-[#1a1a1a]">₹299</div>
              <div className="mb-4 text-slate-600 text-base font-medium">
                30-minute session
              </div>

              <ul className="montserrat text-base md:text-lg text-gray-700 text-left inline-block mb-8 leading-relaxed space-y-2">
                <li>• Longer listening time for deeper relief</li>
                <li>• Customized practical home tips</li>
                <li>• 3 specific remedies sent via WhatsApp</li>
                <li>• 3-day follow-up message included</li>
              </ul>

              <AnimatedButton
                as="a"
                href="#book"
                className="montserrat inline-block bg-[#3DC9A2] text-[#E1F0ED] px-9 py-3 text-sm rounded-full font-medium"
              >
                Book 30-min Call
              </AnimatedButton>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
