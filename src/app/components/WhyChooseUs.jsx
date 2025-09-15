"use client";
import {
  MessageSquare,
  IndianRupee,
  ShieldCheck,
  HeartPulse,
} from 'lucide-react';

import { AnimatedHeading, StaggerContainer, StaggerItem } from './animations';

export function WhyChooseUs() {
  const features = [
    {
      icon: <MessageSquare className="h-6 w-6" fill="#282F57" stroke="false" />,
      title: "No Judgemental Listening",
      description: "Safe space for open conversations without any judgement",
    },
    {
      icon: <IndianRupee className="h-6 w-6" stroke="#282F57" />,
      title: "Affordable Support",
      description: "Quality emotional support calls in affordable rates",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Private and Confidential",
      description: "Your conversation remains completely private",
    },
    {
      icon: <HeartPulse className="h-6 w-6" fill="#282F57" stroke="false" />,
      title: "Empathetic Listeners",
      description: "Trained professionals who truly understand",
    },
  ];

  return (
    <section className="md:py-12 py-8">
      <div className="container mx-auto px-6 space-y-12">
        <div>
          <AnimatedHeading as="h2" className="judson mb-12 text-center text-3xl md:text-4xl font-bold text-[var(--foreground)]">
            Why Choose SimplyTalk?
          </AnimatedHeading>
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
                <p className="md:text-[16px] text-sm">{feature.description}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
