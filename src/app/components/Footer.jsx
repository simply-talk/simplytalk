"use client";
import Image from "next/image";
import { LogoFloatPulse } from "./animations";
export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-4 mt-6">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center mb-2">
          <LogoFloatPulse>
            <Image src='/Logo.png' width={120} height={60} alt="Logo"/>
          </LogoFloatPulse>
        </div>
        <p className="text-gray-600">Your Calm Conversation Call Line</p>
      </div>
    </footer>
  )
}