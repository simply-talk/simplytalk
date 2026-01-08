"use client";
import {
  MessageSquare,
  Home,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { AnimatedHeading, StaggerContainer, StaggerItem } from "./animations";

export function WhyChooseUs() {
  const features = [
    {
      icon: <MessageSquare className="h-6 w-6" fill="#282F57" stroke="false" />,
      title: "Guided Emotional Support",
      description:
        "Calm, focused conversations to reduce mental overload and bring clarity.",
    },
    {
      icon: <Home className="h-6 w-6" stroke="#282F57" />,
      title: "Vastu-Based Home Guidance",
      description:
        "Simple, practical Vastu tips for home balance (no demolition or heavy remedies).",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Private & Judgment-Free",
      description:
        "A safe space to speak openly, without pressure or labels.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6" fill="#282F57" stroke="false" />,
      title: "Affordable, Focused Sessions",
      description:
        "Short sessions designed for immediate emotional relief and clarity.",
    },
  ];

  return (
    <section className="md:py-12 py-8">
      <div className="container mx-auto px-6 space-y-12">
        <div>
          <AnimatedHeading
            as="h2"
            className="judson mb-4 text-center text-3xl md:text-4xl font-bold text-[var(--foreground)]"
          >
            Why Choose SimplyTalk?
          </AnimatedHeading>

          {/* Tagline below heading */}
          <p className="text-center text-gray-600 montserrat mb-10">
            Most clients report feeling calmer and more emotionally settled after a single session.
          </p>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {features.map((feature, index) => (
              <StaggerItem
                key={index}
                className="rounded-lg bg-[#282F571A] p-6 montserrat"
              >
                <div className="mb-2 flex h-6 w-6 items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="mb-2 md:text-xl text-xl font-medium">
                  {feature.title}
                </h3>
                <p className="md:text-[16px] text-sm text-gray-700">
                  {feature.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
