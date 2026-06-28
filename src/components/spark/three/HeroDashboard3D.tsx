"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

/**
 * HeroDashboard3D — cinematic floating dashboard cluster.
 *
 * Implements Scene 1 & 2 of the scroll storyboard:
 *  - Floating ERP dashboard, mobile app screens, analytics, social cards
 *  - 3D rotation driven by mouse position
 *  - Parallax on scroll
 *  - "explode" feel: each plane has independent float + spring depth
 *
 * Built with CSS 3D transforms + Framer Motion for surgical control.
 * A subtle Three.js particle layer sits behind (see HeroParticleField).
 */

type Plane = {
  id: string;
  label: string;
  // base position
  x: string;
  y: string;
  z: number;
  rotateY: number;
  rotateX: number;
  rotateZ?: number;
  depth: number; // parallax multiplier on mouse
  width: number;
  height: number;
  content: React.ReactNode;
  accent?: "primary" | "gold" | "neutral";
  floatDelay?: number;
};

export function HeroDashboard3D() {
  const wrapRef = React.useRef<HTMLDivElement>(null);

  // mouse-driven rotation
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });

  // scroll-driven parallax
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -220]);

  const rotX = useTransform(smy, [-0.5, 0.5], [10, -10]);
  const rotY = useTransform(smx, [-0.5, 0.5], [-14, 14]);

  const handleMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const planes: Plane[] = [
    {
      id: "erp",
      label: "ERP Dashboard",
      x: "8%",
      y: "10%",
      z: 80,
      rotateY: -8,
      rotateX: 6,
      depth: 1.4,
      width: 320,
      height: 200,
      accent: "primary",
      floatDelay: 0,
      content: <ERPDashboard />,
    },
    {
      id: "analytics",
      label: "Analytics",
      x: "55%",
      y: "4%",
      z: 40,
      rotateY: 6,
      rotateX: -4,
      depth: 0.9,
      width: 260,
      height: 170,
      accent: "gold",
      floatDelay: 1.2,
      content: <AnalyticsCard />,
    },
    {
      id: "mobile",
      label: "Mobile App",
      x: "62%",
      y: "44%",
      z: 120,
      rotateY: -12,
      rotateX: 8,
      rotateZ: -4,
      depth: 1.7,
      width: 150,
      height: 300,
      accent: "primary",
      floatDelay: 0.6,
      content: <MobileAppCard />,
    },
    {
      id: "website",
      label: "Website",
      x: "2%",
      y: "52%",
      z: 60,
      rotateY: 10,
      rotateX: -6,
      depth: 1.0,
      width: 280,
      height: 175,
      accent: "neutral",
      floatDelay: 1.8,
      content: <WebsiteCard />,
    },
    {
      id: "social",
      label: "Social",
      x: "30%",
      y: "70%",
      z: 100,
      rotateY: -4,
      rotateX: 4,
      rotateZ: 3,
      depth: 1.5,
      width: 220,
      height: 140,
      accent: "gold",
      floatDelay: 0.9,
      content: <SocialCard />,
    },
  ];

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative h-[560px] w-full sm:h-[620px] md:h-[680px] perspective-2400"
    >
      {/* ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-spark-accent/20 blur-3xl animate-spark-aurora" />
        <div
          className="absolute right-1/4 bottom-1/3 h-72 w-72 translate-x-1/2 rounded-full bg-spark-primary/25 blur-3xl animate-spark-aurora"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, y: scrollY }}
        className="relative h-full w-full preserve-3d"
      >
        {planes.map((p) => (
          <Plane3D key={p.id} plane={p} smx={smx} smy={smy} />
        ))}

        {/* floating mini badges */}
        <FloatingBadge
          text="Real-time sync"
          x="42%"
          y="22%"
          z={160}
          depth={2}
          delay={0.4}
          smx={smx}
          smy={smy}
        />
        <FloatingBadge
          text="+38% conversion"
          x="22%"
          y="36%"
          z={150}
          depth={1.8}
          delay={1.4}
          gold
          smx={smx}
          smy={smy}
        />
        <FloatingBadge
          text="99.9% uptime"
          x="80%"
          y="68%"
          z={130}
          depth={1.6}
          delay={2}
          smx={smx}
          smy={smy}
        />
      </motion.div>
    </div>
  );
}

/* ============================================================
   3D Plane wrapper
   ============================================================ */
function Plane3D({
  plane,
  smx,
  smy,
}: {
  plane: Plane;
  smx: any;
  smy: any;
}) {
  const px = useTransform(smx, [-0.5, 0.5], [-40 * plane.depth, 40 * plane.depth]);
  const py = useTransform(smy, [-0.5, 0.5], [-30 * plane.depth, 30 * plane.depth]);

  return (
    <motion.div
      style={{
        left: plane.x,
        top: plane.y,
        width: plane.width,
        height: plane.height,
        x: px,
        y: py,
        z: plane.z,
        rotateX: plane.rotateX,
        rotateY: plane.rotateY,
        rotateZ: plane.rotateZ || 0,
        transformStyle: "preserve-3d",
      }}
      className="absolute"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 6 + (plane.floatDelay || 0),
          repeat: Infinity,
          ease: "easeInOut",
          delay: plane.floatDelay || 0,
        }}
        className={cnPlane(plane.accent)}
        style={{ width: "100%", height: "100%" }}
      >
        {plane.content}
      </motion.div>
    </motion.div>
  );
}

function cnPlane(accent: Plane["accent"]) {
  const base =
    "relative h-full w-full overflow-hidden rounded-2xl border backdrop-blur-xl shadow-spark";
  if (accent === "gold")
    return `${base} border-spark-accent/40 bg-white/55`;
  if (accent === "neutral")
    return `${base} border-spark-primary/15 bg-white/65`;
  return `${base} border-spark-primary/25 bg-white/55`;
}

function FloatingBadge({
  text,
  x,
  y,
  z,
  depth,
  delay,
  gold,
  smx,
  smy,
}: {
  text: string;
  x: string;
  y: string;
  z: number;
  depth: number;
  delay: number;
  gold?: boolean;
  smx: any;
  smy: any;
}) {
  const px = useTransform(smx, [-0.5, 0.5], [-50 * depth, 50 * depth]);
  const py = useTransform(smy, [-0.5, 0.5], [-30 * depth, 30 * depth]);
  return (
    <motion.div
      style={{ left: x, top: y, x: px, y: py, z, transformStyle: "preserve-3d" }}
      className="absolute"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
        className={
          gold
            ? "rounded-full border border-spark-accent/50 bg-spark-accent/15 px-3.5 py-1.5 text-[11px] font-medium text-spark-ink backdrop-blur-md shadow-spark"
            : "rounded-full border border-spark-primary/30 bg-white/70 px-3.5 py-1.5 text-[11px] font-medium text-spark-primary backdrop-blur-md shadow-spark"
        }
      >
        {text}
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   Mini-dashboards content (SVG-based, fully self-contained)
   ============================================================ */

function ERPDashboard() {
  return (
    <div className="flex h-full flex-col p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
          <span className="h-2 w-2 rounded-full bg-green-400/70" />
        </div>
        <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-spark-muted">
          ERP · Spark Cloud
        </span>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {[
          { l: "Revenue", v: "$284K", c: "text-spark-primary" },
          { l: "Orders", v: "1,284", c: "text-spark-ink" },
          { l: "Growth", v: "+38%", c: "text-spark-accent" },
        ].map((k) => (
          <div
            key={k.l}
            className="rounded-lg border border-spark-primary/10 bg-white/55 p-1.5"
          >
            <div className="text-[8px] uppercase tracking-wide text-spark-muted">
              {k.l}
            </div>
            <div className={`font-serif text-sm ${k.c}`}>{k.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex-1 rounded-lg border border-spark-primary/10 bg-white/45 p-2">
        <svg viewBox="0 0 240 70" className="h-full w-full">
          <defs>
            <linearGradient id="erp-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7A1F1F" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7A1F1F" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,55 C20,40 40,50 60,30 C80,12 100,28 120,22 C140,16 160,30 180,18 C200,8 220,20 240,10"
            fill="none"
            stroke="#7A1F1F"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M0,55 C20,40 40,50 60,30 C80,12 100,28 120,22 C140,16 160,30 180,18 C200,8 220,20 240,10 L240,70 L0,70 Z"
            fill="url(#erp-area)"
          />
          {[60, 120, 180].map((x, i) => (
            <circle key={i} cx={x} cy={[30, 22, 18][i]} r="2.4" fill="#D4AF37" />
          ))}
        </svg>
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[8px] text-spark-muted">
        <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span>
      </div>
    </div>
  );
}

function AnalyticsCard() {
  const bars = [38, 62, 45, 78, 55, 88, 70];
  return (
    <div className="flex h-full flex-col p-3">
      <div className="flex items-center justify-between">
        <span className="font-serif text-xs text-spark-ink">Live Analytics</span>
        <span className="rounded-full bg-spark-accent/15 px-2 py-0.5 text-[8px] font-semibold text-spark-accent">
          LIVE
        </span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-spark-accent/20 bg-spark-accent/5 p-1.5">
          <div className="text-[8px] uppercase tracking-wide text-spark-muted">Sessions</div>
          <div className="font-serif text-sm text-spark-ink">48.2K</div>
        </div>
        <div className="rounded-lg border border-spark-accent/20 bg-spark-accent/5 p-1.5">
          <div className="text-[8px] uppercase tracking-wide text-spark-muted">Bounce</div>
          <div className="font-serif text-sm text-spark-ink">21%</div>
        </div>
      </div>
      <div className="mt-2 flex flex-1 items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-spark-primary to-spark-accent"
            style={{
              height: `${h}%`,
              animation: `spark-bar-rise 1.4s ${i * 0.08}s ease-out both`,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MobileAppCard() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center rounded-[28px] border-4 border-spark-ink/85 bg-spark-ink p-1.5">
      <div className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-white/30" />
      <div className="mt-3 flex w-full flex-1 flex-col gap-1.5 rounded-2xl bg-spark-secondary p-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[8px] text-spark-muted">Balance</div>
            <div className="font-serif text-base text-spark-ink">$12,840</div>
          </div>
          <div className="grid h-6 w-6 place-items-center rounded-full bg-spark-accent text-spark-ink">
            <span className="text-[9px]">↑</span>
          </div>
        </div>
        <div className="rounded-lg bg-spark-primary p-2 text-spark-secondary">
          <div className="text-[7px] uppercase tracking-wide opacity-70">Spark Card</div>
          <div className="mt-1 font-mono text-[9px] tracking-widest">•••• 4829</div>
          <div className="mt-1 flex justify-between text-[7px] opacity-80">
            <span>Valid 09/29</span>
            <span>VISA</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {[
            { n: "Figma", v: "−$48" },
            { n: "Salary", v: "+$4.2K" },
            { n: "Apple", v: "−$1.2K" },
          ].map((r) => (
            <div
              key={r.n}
              className="flex items-center justify-between rounded-md bg-white/70 px-1.5 py-1"
            >
              <span className="text-[8px] text-spark-ink">{r.n}</span>
              <span className="font-mono text-[8px] text-spark-primary">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WebsiteCard() {
  return (
    <div className="flex h-full flex-col p-2.5">
      <div className="flex items-center gap-1.5 rounded-t-md border-b border-spark-primary/10 pb-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-green-400/70" />
        <div className="ml-2 flex-1 rounded-md bg-spark-primary/5 px-2 py-0.5 text-[7px] text-spark-muted">
          sparktechnology.io
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 pt-1.5">
        <div className="font-serif text-[11px] leading-tight text-spark-ink">
          Designing the future of digital commerce.
        </div>
        <div className="h-1.5 w-3/4 rounded-full bg-spark-primary/15" />
        <div className="h-1.5 w-1/2 rounded-full bg-spark-primary/10" />
        <div className="mt-auto grid grid-cols-3 gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-md bg-gradient-to-br from-spark-primary/15 to-spark-accent/15"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SocialCard() {
  return (
    <div className="flex h-full flex-col p-2.5">
      <div className="flex items-center gap-1.5">
        <div className="grid h-5 w-5 place-items-center rounded-full bg-spark-primary text-[8px] text-spark-secondary">
          ST
        </div>
        <div className="flex-1">
          <div className="text-[8px] font-semibold text-spark-ink">@spark.tech</div>
          <div className="text-[7px] text-spark-muted">2h · Promoted</div>
        </div>
      </div>
      <div className="mt-1.5 font-serif text-[10px] leading-tight text-spark-ink">
        New drop — our 2026 design system is live. ✨
      </div>
      <div className="mt-1.5 flex gap-1">
        <div className="flex-1 rounded-md bg-gradient-to-br from-spark-primary to-spark-accent p-1 text-center text-[7px] font-semibold text-spark-secondary">
          ❤ 2.4K
        </div>
        <div className="flex-1 rounded-md bg-white/60 p-1 text-center text-[7px] font-semibold text-spark-ink">
          ↻ 482
        </div>
        <div className="flex-1 rounded-md bg-white/60 p-1 text-center text-[7px] font-semibold text-spark-ink">
          ⤴ 318
        </div>
      </div>
    </div>
  );
}
