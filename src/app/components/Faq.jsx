"use client";

import { ArrowBigDown, ArrowBigUp, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

import { AnimatedHeading } from "./animations";

const faqs = [
  
  {
    question: "Whom I will talk with?",
    answer: "You’ll speak with trained empathetic listeners.",
  },
  {
    question: "What if I miss my call?",
    answer: "We can reschedule your session once.",
  },
  {
    question: "Is my information and call is private?",
    answer: "Yes, all sessions are fully confidential.",
  },
  {
    question: "Do I need to pay extra fees?",
    answer: "No hidden charges. You only pay for the time used.",
  },
];


export function FaqSection() {
  return (
    <section className=" py-16">
      <div className="container mx-auto px-4">
        <AnimatedHeading as="h2" className="judson md:mb-12 mb-12 text-center text-3xl md:text-4xl font-bold text-[var(--foreground)]">  
          Frequently Asked Questions
        </AnimatedHeading>
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" border-b-[0.5px] border-[#282f572d]  overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-slate-800">{question}</h3>
        <span
          className="transform transition-all duration-300 "
        >
          {isOpen ? (
            <ChevronUp />
          ) : (
            <ChevronDown />
            
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-90"
        }`}
      >
        <div className="p-4 pt-0 text-slate-600">{answer}</div>
      </div>
    </div>
  );
}
