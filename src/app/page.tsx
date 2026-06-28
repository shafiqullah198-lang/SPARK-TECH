"use client";

import * as React from "react";
import { Navbar } from "@/components/spark/sections/Navbar";
import { HeroSection } from "@/components/spark/sections/HeroSection";
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
        {/* Scene 1–3 — Hero appears with floating ERP dashboard that drifts on scroll */}
        <HeroSection />

        {/* Trust strip — partner logos marquee */}
        <TrustedBySection />

        {/* Scene 4–5 — Dashboard shards converge into 10 service cards */}
        <ServicesSection />

        {/* Why Choose Us — premium dark section with parallax glow */}
        <WhyChooseUs />

        {/* Scene 6 — Process timeline with scroll-drawn progress line */}
        <ProcessSection />

        {/* Scene 7 — Portfolio cards with depth, perspective and tilt */}
        <PortfolioSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Technologies we use */}
        <TechnologiesSection />

        {/* Scene 8 — Everything converges into final CTA */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
