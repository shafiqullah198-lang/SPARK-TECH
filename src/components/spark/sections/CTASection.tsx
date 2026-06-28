"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { ArrowUpRight, Mail, Calendar } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";

/**
 * CTASection — Scene 8 of the scroll storyboard.
 *
 * As the user scrolls into the final section, scattered "shards" reassemble
 * into a single glowing panel — visualizing the "everything converges" beat.
 * Built with Framer Motion scroll-driven transforms; no Three.js needed here.
 */

type Shard = {
  id: number;
  // start position (scattered)
  sx: number; // -50..50 percent offset from center
  sy: number;
  sr: number; // rotation in degrees
  // assembled target
  w: number;
  h: number;
  bg: string;
  borderClass: string;
  zIndex: number;
};

const SHARDS: Shard[] = [
  { id: 1, sx: -38, sy: -28, sr: -18, w: 220, h: 80,  bg: "bg-spark-primary/30",    borderClass: "border-spark-primary/30",    zIndex: 5 },
  { id: 2, sx:  36, sy: -22, sr:  16, w: 180, h: 100, bg: "bg-spark-accent/30",     borderClass: "border-spark-accent/40",     zIndex: 4 },
  { id: 3, sx: -30, sy:  30, sr:  10, w: 240, h: 70,  bg: "bg-spark-primary-soft/30", borderClass: "border-spark-primary/25",  zIndex: 6 },
  { id: 4, sx:  34, sy:  26, sr: -12, w: 160, h: 90,  bg: "bg-spark-accent/25",     borderClass: "border-spark-accent/35",     zIndex: 3 },
  { id: 5, sx:   0, sy: -42, sr:   4, w: 200, h: 60,  bg: "bg-spark-primary/20",    borderClass: "border-spark-primary/20",    zIndex: 7 },
  { id: 6, sx:  -8, sy:  36, sr:  -8, w: 180, h: 70,  bg: "bg-spark-accent/20",     borderClass: "border-spark-accent/30",     zIndex: 2 },
];

export function CTASection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.5,
  });

  // headline rise + opacity
  const headlineY = useTransform(p, [0, 1], [80, 0]);
  const headlineO = useTransform(p, [0, 0.5, 1], [0, 0.6, 1]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-spark-ink py-32 text-spark-secondary sm:py-44"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-gold opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-spark-accent/15 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* shard canvas */}
        <div className="relative mx-auto h-[260px] w-full max-w-3xl sm:h-[340px]">
          {SHARDS.map((s) => (
            <ShardPiece key={s.id} shard={s} progress={p} />
          ))}

          {/* center core */}
          <motion.div
            style={{
              scale: useTransform(p, [0, 0.7, 1], [0.5, 0.85, 1]),
              opacity: useTransform(p, [0, 0.5, 1], [0, 0.4, 1]),
            }}
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-spark-accent to-spark-primary blur-[2px]"
          >
            <div className="absolute inset-2 rounded-full bg-spark-ink/40 backdrop-blur-sm" />
            <div className="absolute inset-0 rounded-full border border-spark-accent/50 animate-pulse" />
          </motion.div>
        </div>

        {/* headline */}
        <motion.div
          style={{ y: headlineY, opacity: headlineO }}
          className="relative mt-8 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-spark-accent/30 bg-spark-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-spark-accent backdrop-blur-md">
            <span className="h-1 w-1 rounded-full bg-spark-accent" />
            Let's build
          </span>

          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] tracking-tight text-spark-secondary text-shadow-spark">
            Your next product,
            <br />
            <span className="text-gradient-gold">engineered to win.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-spark-secondary/70 sm:text-lg">
            Tell us what you're building. We'll bring the senior pod, the design
            system and the roadmap — you bring the ambition.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton href="mailto:hello@sparktechnology.io" variant="gold" strength={18}>
              <Mail className="h-4 w-4" />
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="#process"
              variant="ghost"
              strength={12}
              className="text-spark-secondary hover:bg-white/5"
            >
              <Calendar className="h-4 w-4" />
              Book a 30-min intro
            </MagneticButton>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-spark-secondary/40">
            <span>hello@sparktechnology.io</span>
            <span className="hidden h-3 w-px bg-spark-secondary/20 sm:block" />
            <span>Remote · Worldwide</span>
            <span className="hidden h-3 w-px bg-spark-secondary/20 sm:block" />
            <span>Mon–Fri · 9–6</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ShardPiece({
  shard,
  progress,
}: {
  shard: Shard;
  progress: MotionValue<number>;
}) {
  // assemble from scattered to centered
  const x = useTransform(progress, [0, 1], [`${shard.sx}%`, "0%"]);
  const y = useTransform(progress, [0, 1], [`${shard.sy}%`, "0%"]);
  const rotate = useTransform(progress, [0, 1], [shard.sr, 0]);
  const opacity = useTransform(progress, [0, 0.3, 1], [0, 0.6, 1]);

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        opacity,
        width: shard.w,
        height: shard.h,
        zIndex: shard.zIndex,
      }}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border ${shard.borderClass} ${shard.bg} backdrop-blur-md`}
    >
      <div className="h-full w-full rounded-2xl bg-gradient-to-br from-white/5 to-transparent" />
    </motion.div>
  );
}
