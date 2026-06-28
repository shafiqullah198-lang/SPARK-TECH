"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
  accent?: "primary" | "gold";
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Spark rebuilt our storefront in nine weeks. Conversion 3x'd in the first quarter post-launch — the ROI was unambiguous. They felt like our team, not a vendor.",
    name: "Maya Hernandez",
    role: "VP Growth",
    company: "NorthPeak",
    initials: "MH",
    rating: 5,
    accent: "primary",
  },
  {
    quote:
      "The ERP Spark built replaced nine tools. Our ops team finally has one source of truth — and our finance close dropped from 14 days to 3.",
    name: "Daniel Park",
    role: "COO",
    company: "Atlas Retail",
    initials: "DP",
    rating: 5,
    accent: "gold",
  },
  {
    quote:
      "Best product studio we've worked with. Senior pod, no handoffs, weekly demos. They shipped our v1 in six weeks and we raised Series A off the prototype.",
    name: "Aisha Karim",
    role: "Founder & CEO",
    company: "Quantica",
    initials: "AK",
    rating: 5,
    accent: "primary",
  },
  {
    quote:
      "Their design system work alone paid for the engagement. Every screen since has shipped 40% faster — and looks award-winning.",
    name: "Tom Whitfield",
    role: "Head of Design",
    company: "Lumen Labs",
    initials: "TW",
    rating: 5,
    accent: "gold",
  },
  {
    quote:
      "We retained Spark after launch for roadmap. Two years in, they've shipped four major releases and our churn is down 41%.",
    name: "Sofia Rinaldi",
    role: "CPO",
    company: "Helix Bank",
    initials: "SR",
    rating: 5,
    accent: "primary",
  },
  {
    quote:
      "From brand strategy to analytics dashboard, Spark owned the whole stack. The work is genuinely beautiful — and it performs.",
    name: "Marcus Chen",
    role: "CMO",
    company: "Verdant",
    initials: "MC",
    rating: 5,
    accent: "gold",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-spark-secondary py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[55%] -translate-x-1/2 rounded-full bg-spark-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          eyebrow="Client voices"
          title={
            <>
              The teams we ship
              <br />
              <span className="text-gradient-spark">alongside.</span>
            </>
          }
          description="Founders, CPOs and growth leads on what it's like to build with Spark — and the outcomes we've delivered together."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <TestimonialCard t={t} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <motion.figure
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-spark-primary/12 bg-white/55 p-6 backdrop-blur-xl shadow-spark"
    >
      <Quote
        className={
          "absolute right-5 top-5 h-10 w-10 " +
          (t.accent === "gold" ? "text-spark-accent/30" : "text-spark-primary/20")
        }
        strokeWidth={1.4}
      />

      <div className="flex gap-0.5">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star
            key={i}
            className="h-3.5 w-3.5 fill-spark-accent text-spark-accent"
          />
        ))}
      </div>

      <blockquote className="relative mt-4 flex-1 font-serif text-[17px] leading-relaxed text-spark-ink">
        "{t.quote}"
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-spark-primary/10 pt-4">
        <div
          className={
            "grid h-10 w-10 place-items-center rounded-full text-xs font-bold " +
            (t.accent === "gold"
              ? "bg-spark-accent/15 text-spark-accent"
              : "bg-spark-primary/10 text-spark-primary")
          }
        >
          {t.initials}
        </div>
        <div>
          <div className="text-sm font-medium text-spark-ink">{t.name}</div>
          <div className="text-[11px] text-spark-muted">
            {t.role} · {t.company}
          </div>
        </div>
      </figcaption>
    </motion.figure>
  );
}
