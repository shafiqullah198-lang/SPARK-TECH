"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const COMPANIES = [
  "NorthPeak",
  "Lumen Labs",
  "Atlas Retail",
  "Verdant",
  "Quantica",
  "Marble & Co",
  "Helix Bank",
  "Orbit Health",
  "Pixel Forge",
  "Strata",
];

/**
 * TrustedBy — infinite marquee of partner brands.
 * Two rows scroll opposite directions for parallax feel.
 */
export function TrustedBySection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-3%", "-22%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["3%", "22%"]);

  return (
    <section
      ref={ref}
      className="relative border-y border-spark-primary/10 bg-spark-secondary/70 py-14 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center text-[11px] font-medium uppercase tracking-[0.32em] text-spark-muted"
        >
          Trusted by category-defining teams worldwide
        </motion.p>
      </div>

      <div className="relative mt-10 overflow-hidden">
        {/* gradient mask edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-spark-secondary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-spark-secondary to-transparent" />

        <motion.div style={{ x: x1 }} className="flex gap-4">
          {[...COMPANIES, ...COMPANIES].map((c, i) => (
            <BrandPill key={`a-${i}`} name={c} />
          ))}
        </motion.div>

        <motion.div style={{ x: x2 }} className="mt-4 flex gap-4">
          {[...COMPANIES, ...COMPANIES].reverse().map((c, i) => (
            <BrandPill key={`b-${i}`} name={c} muted />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BrandPill({ name, muted }: { name: string; muted?: boolean }) {
  return (
    <div
      className={
        "flex shrink-0 items-center gap-2.5 rounded-full border px-5 py-2.5 backdrop-blur-md transition-colors " +
        (muted
          ? "border-spark-primary/10 bg-white/30 text-spark-ink/60"
          : "border-spark-primary/15 bg-white/50 text-spark-ink/80")
      }
    >
      <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-br from-spark-primary to-spark-accent text-[10px] font-bold text-spark-secondary">
        {name[0]}
      </span>
      <span className="font-serif text-lg tracking-wide">{name}</span>
    </div>
  );
}
