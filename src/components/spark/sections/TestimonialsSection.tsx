"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";
import { getTestimonials } from "@/lib/api";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
  accent?: "primary" | "gold";
};

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getTestimonials().then((data: any) => {
      // Map API fields if different
      const formatted = data.map((item: any) => ({
        quote: item.quote || item.message,
        name: item.name || item.client_name,
        role: item.role,
        company: item.company,
        initials: item.initials || item.image_path,
        rating: item.rating,
        accent: item.accent || "primary",
      }));
      setTestimonials(formatted);
      setLoading(false);
    });
  }, []);

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

        {loading ? (
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-64 w-full animate-pulse rounded-3xl border border-spark-primary/10 bg-white/30 backdrop-blur-md"
              />
            ))}
          </div>
        ) : (
          <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {testimonials.map((t, idx) => (
              <StaggerItem key={`${t.name}-${idx}`}>
                <TestimonialCard t={t} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
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
          {t.initials || "ST"}
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
