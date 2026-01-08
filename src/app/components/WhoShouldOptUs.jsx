"use client";
import Image from "next/image";
import { AnimatedHeading, StaggerContainer, StaggerItem } from "./animations";
import { Heart, Brain, Home, Sparkles } from "lucide-react";

export default function WhoShouldOpt() {
  const categories = [
    {
      icon: <Heart className="w-6 h-6 text-[#8bdbcb]" />,
      title: "Emotionally Drained Women",
      description:
        "Feeling mentally overwhelmed, emotionally exhausted, or unsettled at home.",
    },
    {
      icon: <Brain className="w-6 h-6 text-[#8bdbcb]" />,
      title: "Restless or Overthinking Minds",
      description:
        "Experiencing restlessness or lack of clarity despite everything seeming fine.",
    },
    {
      icon: <Home className="w-6 h-6 text-[#8bdbcb]" />,
      title: "Calm Guidance Seekers",
      description:
        "Want emotional support along with simple, practical Vastu-based home guidance.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#8bdbcb]" />,
      title: "Non-Therapy Relief Seekers",
      description:
        "Looking for perspective and relief without therapy, medication, or heavy remedies.",
    },
  ];

  return (
    <section className="w-full py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedHeading
          as="h2"
          className="judson md:mb-12 mb-8 text-center text-3xl md:text-4xl font-bold text-[var(--foreground)]"
        >
          Who Should Opt SimplyTalk?
        </AnimatedHeading>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-12">
          {/* Left Side - Illustration */}
          <div className="md:w-1/2 flex items-center justify-center">
            <Image
              src="/who-illustration.png"
              alt="Calm person in contemplative pose"
              width={612}
              height={474}
              className="w-full h-auto rounded-2xl"
              priority
            />
          </div>

          {/* Right Side - Categories */}
          <StaggerContainer className="md:w-1/2 flex flex-col justify-between space-y-4">
            {categories.map((category, index) => (
              <StaggerItem key={index} className="flex items-center gap-3">
                {/* Icon Box */}
                <div className="flex items-center justify-center w-[68px] h-[54px] rounded-md bg-[#1B2629]">
                  {category.icon}
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="md:text-xl text-xl font-medium text-[var(--foreground)]">
                    {category.title}
                  </h3>
                  <p className="md:text-[16px] text-sm text-gray-700">
                    {category.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
