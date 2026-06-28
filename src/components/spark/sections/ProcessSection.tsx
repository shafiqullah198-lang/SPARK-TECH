"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, PenTool, Code, Rocket, TrendingUp } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

const STEPS = [
  {
    n: "01",
    icon: Search,
    title: "Discover",
    desc: "We dive into your market, users and business model. Workshops, interviews and competitive teardowns turn ambiguity into a sharp product brief.",
    duration: "Week 1–2",
    deliverables: ["Product brief", "User personas", "Competitive map"],
  },
  {
    n: "02",
    icon: PenTool,
    title: "Design",
    desc: "Information architecture, wireframes, high-fidelity UI and a living design system. Every screen prototype-tested before a single line of code.",
    duration: "Week 3–5",
    deliverables: ["Design system", "Hi-fi UI", "Clickable prototype"],
  },
  {
    n: "03",
    icon: Code,
    title: "Build",
    desc: "Senior engineers ship in weekly increments. Edge-rendered, tested, observable code — deployed continuously from day one.",
    duration: "Week 6–11",
    deliverables: ["Production code", "CI/CD", "Test coverage"],
  },
  {
    n: "04",
    icon: Rocket,
    title: "Launch",
    desc: "Performance audits, security review, analytics instrumentation and a coordinated launch plan. Then we monitor everything.",
    duration: "Week 12",
    deliverables: ["Launch plan", "Analytics", "Runbook"],
  },
  {
    n: "05",
    icon: TrendingUp,
    title: "Grow",
    desc: "Post-launch we run A/B tests, expand the roadmap and ship the next product cycle. Most clients retain us here for years.",
    duration: "Ongoing",
    deliverables: ["A/B program", "Roadmap", "Retainer"],
  },
];

export function ProcessSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-spark-secondary py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="03"
          eyebrow="How we work"
          title={
            <>
              From spark
              <br />
              <span className="text-gradient-spark">to scale.</span>
            </>
          }
          description="A transparent, five-step engagement that turns an idea into a product, and a product into a platform. No black boxes, no surprises."
        />

        <div ref={ref} className="relative mt-20 pl-4 sm:pl-8">
          {/* vertical track */}
          <div className="absolute left-[14px] top-0 h-full w-px bg-spark-primary/12 sm:left-[22px]">
            <motion.div
              style={{ height: lineHeight }}
              className="w-px bg-gradient-to-b from-spark-primary via-spark-accent to-spark-primary"
            />
          </div>

          <div className="flex flex-col gap-12">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative grid grid-cols-1 gap-4 pl-10 sm:grid-cols-12 sm:gap-8 sm:pl-16"
                >
                  {/* node */}
                  <div className="absolute left-0 top-1.5 grid h-7 w-7 place-items-center rounded-full border border-spark-primary/30 bg-spark-secondary text-[10px] font-bold text-spark-primary sm:h-11 sm:w-11 sm:text-sm">
                    <span className="font-serif">{s.n}</span>
                    <span className="absolute -inset-1 -z-10 rounded-full border border-spark-accent/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* content */}
                  <div className="sm:col-span-5">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl border border-spark-primary/15 bg-white/50 text-spark-primary">
                        <Icon className="h-4 w-4" strokeWidth={1.8} />
                      </div>
                      <h3 className="font-serif text-2xl text-spark-ink sm:text-3xl">
                        {s.title}
                      </h3>
                    </div>
                    <span className="mt-2 inline-block rounded-full border border-spark-primary/12 bg-white/40 px-3 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-spark-muted">
                      {s.duration}
                    </span>
                  </div>

                  <div className="sm:col-span-7">
                    <p className="text-sm leading-relaxed text-spark-muted sm:text-base">
                      {s.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.deliverables.map((d) => (
                        <span
                          key={d}
                          className="rounded-full border border-spark-accent/30 bg-spark-accent/10 px-3 py-1 text-[10px] font-medium text-spark-ink/80"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
