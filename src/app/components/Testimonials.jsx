"use client";
import Image from "next/image";
import { AnimatedHeading, TestimonialsContainer, TestimonialItem } from "./animations";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: '"The support I received was exactly what I needed"',
      name: "User",
    },
    {
      quote: '"The listeners are professional and understanding"',
      name: "User",
    },
    {
      quote:
        '"I felt so much relief after talking with the listener. They are amazing. Thank you"',
      name: "User",
    },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <AnimatedHeading as="h2" className="judson md:mb-12 mb-12 text-center text-3xl md:text-4xl font-bold text-[var(--foreground)]">
          What Our Users Say?
        </AnimatedHeading>

        {/* Testimonials */}
        <TestimonialsContainer className="grid gap-5 md:grid-cols-3 font-montserrat">
          {testimonials.map((testimonial, index) => (
            <TestimonialItem key={index}>
              <div className="flex items-center gap-3 rounded-lg bg-[var(--color-mint)] p-6 shadow-sm">
                <Image src="/avatar.png" width={40} height={40} alt="avatar" />
                <p className="font-medium">{testimonial.quote}</p>
              </div>
            </TestimonialItem>
          ))}
        </TestimonialsContainer>
      </div>
    </section>
  );
}
