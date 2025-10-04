"use client";
import Image from "next/image";
import Link from "next/link";
import { LogoFloatPulse } from "./animations";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[var(--color-mint)] text-gray-700 mt-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand + Tagline */}
        <div className="flex flex-col items-center md:items-start">
          <LogoFloatPulse>
            <Image src="/Logo.png" width={120} height={60} alt="SimplyTalk Logo" />
          </LogoFloatPulse>
          <p className="text-gray-600 mt-2 text-sm">
            Your Calm Conversation Call Line
          </p>

          {/* Social Media */}
          <div className="mt-4 flex space-x-3">
            <Link
              href="https://www.instagram.com/simplytalk.in?igsh=OG9oMDBnbHEwcWg1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/instagram.svg"
                width={25}
                height={25}
                alt="Instagram"
                className="hover:opacity-80 transition"
              />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-teal-700">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#about" className="hover:text-teal-600">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/#how-it-works" className="hover:text-teal-600">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="hover:text-teal-600">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-teal-600">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies & Support */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-teal-700">Policies & Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-teal-600">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-teal-600">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-teal-600">
                Refund & Reschedule Policy
              </Link>
            </li>
            <li>
              <a
                href="mailto:support@simplytalk.in"
                className="hover:text-teal-600"
              >
                Contact Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 text-center text-sm py-4 bg-[#d8ece9]">
        <p>© {new Date().getFullYear()} SimplyTalk. All rights reserved.</p>
        <p className="text-xs mt-1 text-gray-600">
          Not a therapy or medical service. If in crisis, please call your local emergency helpline.
        </p>
      </div>
    </footer>
  );
}
