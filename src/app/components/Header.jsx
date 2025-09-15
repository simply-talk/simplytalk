"use client";
import Image from "next/image";
import { FadeInUp } from "./animations/index";

export default function Header() {
  return (
    <FadeInUp delay={0} duration={0.6} y={20}>
      <header className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src="/Logo.png" width={120} height={60} alt="Logo" />
        </div>

        {/* CTA Button */}
        <a
          href="#book"
          className="montserrat font-medium md:text-md text-xs md:text-sm rounded-full border-[1.5px] px-5 md:px-9 md:py-3 py-2 hover:bg-gray-100"
        >
          Book Call
        </a>
      </header>
    </FadeInUp>
  );
}