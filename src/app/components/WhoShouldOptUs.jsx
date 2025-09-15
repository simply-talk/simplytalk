"use client";
import Image from "next/image"

import { AnimatedHeading, StaggerContainer, StaggerItem } from "./animations";

export default function Component() {
  const categories = [
    {
      icon: "/anxious-mind.png",
      title: "Anxious Minds",
      description: "When your thoughts won't slow down.",
    },
    {
      icon: "/isolated.png",
      title: "The Isolated Ones",
      description: "You feel alone, even with people around.",
    },
    {
      icon: "/life-transition.png",
      title: "In Life-Transition",
      description: "Life is changing and it's overwhelming.",
    },
    {
      icon: "/first-timers.png",
      title: "First Timers",
      description: "You've never tried support, but you feel.",
    },
    {
      icon: "/quiet-ones.png",
      title: "The Quiet Ones",
      description: "Held back by fear of judgment.",
    },
  ]

  return (
    <section className="w-full py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <AnimatedHeading as="h2" className="judson md:mb-12 mb-8 text-center text-3xl md:text-4xl font-bold text-[var(--foreground)]">
          Who Should Opt SimplyTalk?
        </AnimatedHeading>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row md:items-stretch gap-6 md:gap-12">
          {/* Left Side - Illustration */}
          <div className="md:w-1/2 flex items-center justify-center">
            <Image
              src="/who-illustration.png"
              alt="Person in contemplative pose"
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
                {/* Icon */}
                <Image
                  src={category.icon || "/placeholder.svg"}
                  alt={category.title}
                  width={54}
                  height={54}
                />

                {/* Content */}
                <div>
                  <h3 className="md:text-xl text-xl font-medium">{category.title}</h3>
                  <p className="md:text-[16px] text-sm">{category.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
