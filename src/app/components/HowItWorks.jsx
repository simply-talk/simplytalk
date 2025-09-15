"use client";
import { AnimatedHeading, FadeInUp, StaggerContainer, StaggerItem } from "./animations";

export function HowItWorks() {
  const steps = [
    {
      number: "01.",
      title: "Choose a Time Slot",
      description: "Select your preferred time to talk with our listeners.",
    },
    {
      number: "02.",
      title: "Make Payment",
      description: "Make secure payment either via UPI or any of your cards.",
    },
    {
      number: "03.",
      title: "Receive Call from Expert",
      description: "Receive call from our expert listeners at your booked time slot.",
    },
  ];

  return (
    <section className="md:py-4 py-4 bg-[var(--color-mint)]">
      <div className="container mx-auto">
        {/* Heading */}
        <AnimatedHeading as="h2" className="judson md:my-12 my-5 text-center text-3xl md:text-4xl font-bold text-[var(--foreground)]">
          How it works?
        </AnimatedHeading>

        {/* Steps with stagger */}
        <StaggerContainer className="grid md:gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <StaggerItem
              key={index}
              className="rounded-lg px-6 md:px-6 py-3 text-[var(--foreground)]"
            >
              <FadeInUp delay={index * 0.15}>
                <h3 className="font-bold mr-2 md:text-3xl text-2xl">{step.number}</h3>
                <h4 className="montserrat md:text-xl text-xl font-medium">{step.title}</h4>
                <p className="montserrat md:text-[16px] text-sm">{step.description}</p>
              </FadeInUp>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
