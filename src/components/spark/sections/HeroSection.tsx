"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play, Star } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { HeroDashboard3D } from "../three/HeroDashboard3D";

export function HeroSection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scene 3 foreshadow: as user scrolls down, hero content drifts and fades.
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-spark-secondary noise"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-spotlight" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      {/* deep burgundy wash from top-left for brand presence */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-spark-primary/15 via-transparent to-spark-accent/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-spark-secondary via-spark-secondary/80 to-transparent" />

      {/* Floating accent shapes */}
      <div className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-spark-primary/20 blur-3xl animate-spark-aurora" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-80 w-80 rounded-full bg-spark-accent/25 blur-3xl animate-spark-aurora" style={{ animationDelay: "-8s" }} />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-spark-primary-soft/15 blur-3xl animate-spark-aurora" style={{ animationDelay: "-4s" }} />

      {/* Hero content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-24 pt-32 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:pt-40"
      >
        {/* LEFT — copy */}
        <div className="lg:col-span-6">
          {/* Announcement pill */}
          <motion.a
            href="#services"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-spark-primary px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-spark-secondary shadow-spark"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spark-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-spark-accent" />
            </span>
            <span className="text-spark-accent">New</span>
            <span className="h-3 w-px bg-spark-secondary/30" />
            <span className="normal-case tracking-normal font-medium text-spark-secondary">Spark 2026 Design System</span>
            <ArrowUpRight className="h-3 w-3 text-spark-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-serif text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.98] tracking-tight text-spark-ink text-shadow-spark"
          >
            Digital products
            <br />
            that <em className="text-gradient-spark not-italic">spark</em>{" "}
            <span className="relative inline-block">
              <span className="relative z-10">growth.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 bottom-1.5 z-0 h-3 origin-left bg-spark-accent/30 -skew-x-6"
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-spark-muted sm:text-lg"
          >
            We are Spark Technology — a software house engineering websites, mobile apps,
            ERP & CRM systems, brand identities and analytics platforms for ambitious
            startups, SMEs, enterprises and e-commerce brands.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton href="#contact" variant="primary" strength={18}>
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#portfolio" variant="outline" strength={12}>
              <Play className="h-3.5 w-3.5 fill-spark-primary" />
              View our work
            </MagneticButton>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex flex-col">
              <span className="font-serif text-2xl text-spark-ink">120+</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-spark-muted">
                Products shipped
              </span>
            </div>
            <div className="h-8 w-px bg-spark-primary/15" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl text-spark-ink">14</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-spark-muted">
                Industries served
              </span>
            </div>
            <div className="h-8 w-px bg-spark-primary/15" />
            <div className="flex flex-col">
              <span className="font-serif text-2xl text-spark-ink">4.9/5</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-spark-muted">
                Client rating
              </span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — 3D dashboard cluster */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <HeroDashboard3D />
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        style={{ opacity: heroOpacity }}
        className="absolute inset-x-0 bottom-6 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-spark-muted">
          Scroll to explore
        </span>
        <div className="relative h-9 w-5 rounded-full border border-spark-primary/30">
          <motion.span
            animate={{ y: [3, 12, 3], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-spark-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
