"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Gauge, ShieldCheck, Zap, Layers, Compass, Infinity as Inf } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";

const REASONS = [
  {
    icon: Zap,
    title: "Speed without compromise",
    desc: "We ship MVPs in 6 weeks and full platforms in 12 — without cutting design, security or performance.",
    stat: "6 wks",
    statLabel: "Avg. MVP",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade by default",
    desc: "SOC2-ready architecture, role-based access, audit logs and 99.9% uptime SLAs on every product we ship.",
    stat: "99.9%",
    statLabel: "Uptime SLA",
  },
  {
    icon: Layers,
    title: "One team, ten disciplines",
    desc: "Strategy, design, engineering, brand and growth — orchestrated by a single senior pod, no handoffs.",
    stat: "10",
    statLabel: "Disciplines",
  },
  {
    icon: Gauge,
    title: "Obsessed with performance",
    desc: "Every product ships with Core Web Vitals in the green, sub-200ms TTFB and 60fps motion on mobile.",
    stat: "<200ms",
    statLabel: "TTFB",
  },
  {
    icon: Compass,
    title: "Strategy before pixels",
    desc: "We start with discovery — market, user, business — so the work we ship moves a metric, not just a moodboard.",
    stat: "100%",
    statLabel: "Discovery-led",
  },
  {
    icon: Inf,
    title: "Long-term partners",
    desc: "70% of clients retain us beyond launch — for roadmap, optimization and the next product cycle.",
    stat: "70%",
    statLabel: "Retention",
  },
];

export function WhyChooseUs() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="why"
      ref={ref}
      className="relative overflow-hidden bg-spark-ink py-24 text-spark-secondary sm:py-32"
    >
      {/* parallax glow */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-spark-accent/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-spark-primary/40 blur-3xl" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-grid-gold opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          eyebrow="Why Spark"
          title={
            <>
              Built different.
              <br />
              <span className="text-gradient-gold">Built to last.</span>
            </>
          }
          description="We are not a body shop. We are a senior product studio that takes ownership of outcomes — and ships work that holds up at scale."
          className="text-spark-secondary [&_h2]:text-spark-secondary [&_p]:text-spark-secondary/70 [&_span]:text-spark-accent"
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {REASONS.map((r) => {
            const Icon = r.icon;
            return (
              <StaggerItem key={r.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-spark-accent/15 bg-white/[0.03] p-6 backdrop-blur-md"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-spark-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />

                  <div className="flex items-start justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-spark-accent/30 bg-spark-accent/10 text-spark-accent">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-2xl text-spark-accent">
                        {r.stat}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-spark-secondary/50">
                        {r.statLabel}
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-5 font-serif text-xl text-spark-secondary">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-spark-secondary/65">
                    {r.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
