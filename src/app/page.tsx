"use client";

import * as React from "react";
import { Navbar } from "@/components/spark/sections/Navbar";
import { ScrollStorySection } from "@/components/spark/sections/ScrollStorySection";
import { TrustedBySection } from "@/components/spark/sections/TrustedBySection";
import { ServicesSection } from "@/components/spark/sections/ServicesSection";
import { WhyChooseUs } from "@/components/spark/sections/WhyChooseUs";
import { ProcessSection } from "@/components/spark/sections/ProcessSection";
import { PortfolioSection } from "@/components/spark/sections/PortfolioSection";
import { TestimonialsSection } from "@/components/spark/sections/TestimonialsSection";
import { TechnologiesSection } from "@/components/spark/sections/TechnologiesSection";
import { CTASection } from "@/components/spark/sections/CTASection";
import { Footer } from "@/components/spark/sections/Footer";
import { ScrollProgress } from "@/components/spark/ui/ScrollProgress";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-spark-secondary">
      <ScrollProgress />
      <Navbar />

      <main className="flex-1">
        {/*
          CINEMATIC SCROLL STORY (replaces static hero)
          - GSAP ScrollTrigger-pinned for 800vh
          - One persistent "Spark Core" object transforms through 8 scenes:
            1. Hero with floating core
            2. Core rotates in 3D
            3. Core explodes into 12 shards
            4. Shards transform into mobile app screens
            5. Screens assemble into 10 service cards
            6. Cards drift in parallax
            7. Portfolio frames zoom in with depth
            8. Everything converges into final CTA
          - Background color shifts per scene (cream → burgundy → ink → CTA)
          - Matches the scroll-pinned cinematic reference style
        */}
        <ScrollStorySection />

        {/* Trust strip — partner logos marquee */}
        <TrustedBySection />

        {/* Detailed services grid */}
        <ServicesSection />

        {/* Why Choose Us — premium dark section */}
        <WhyChooseUs />

        {/* Process timeline with scroll-drawn progress line */}
        <ProcessSection />

        {/* Portfolio cards with depth, perspective and tilt */}
        <PortfolioSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Technologies we use */}
        <TechnologiesSection />

        {/* Final CTA */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
