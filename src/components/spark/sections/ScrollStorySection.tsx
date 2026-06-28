"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2, Smartphone, Boxes, Users, Palette, PenTool,
  Share2, Sparkles, ShoppingBag, BarChart3, type LucideIcon
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============================================================
   SCROLL STORY — Cinematic GSAP ScrollTrigger sequence
   ============================================================
   Matches reference video style:
   - Section is pinned for ~600vh of scroll
   - One persistent central object (the "Spark Core") transforms
     through 8 scenes as the user scrolls
   - Background color shifts between scenes
   - Everything is scrubbed to scroll position (1s lag for smoothness)
   ============================================================ */

type ServiceDef = { icon: LucideIcon; label: string; desc: string; color: string };

const SERVICES: ServiceDef[] = [
  { icon: Code2,        label: "Web Dev",        desc: "Next.js + Edge",     color: "#7A1F1F" },
  { icon: Smartphone,   label: "Mobile Apps",    desc: "iOS + Android",      color: "#D4AF37" },
  { icon: Boxes,        label: "ERP Systems",    desc: "Unified ops",        color: "#7A1F1F" },
  { icon: Users,        label: "CRM Solutions",  desc: "Pipelines + AI",     color: "#D4AF37" },
  { icon: Palette,      label: "UI/UX Design",   desc: "Design systems",     color: "#7A1F1F" },
  { icon: PenTool,      label: "Graphic Design", desc: "Decks + motion",     color: "#D4AF37" },
  { icon: Share2,       label: "Social Media",   desc: "Paid + community",   color: "#7A1F1F" },
  { icon: Sparkles,     label: "Branding",       desc: "Identity + voice",   color: "#D4AF37" },
  { icon: ShoppingBag,  label: "E-commerce",     desc: "Shopify + headless", color: "#7A1F1F" },
  { icon: BarChart3,    label: "Analytics",      desc: "BI + dashboards",    color: "#D4AF37" },
];

// background color per scene
const SCENE_BGS = [
  "#F5F0E8", // 1 — hero (cream)
  "#F5F0E8", // 2 — rotate
  "#9b3232", // 3 — explode (deep burgundy)
  "#4a0f0f", // 4 — mobile screens
  "#1a0e0e", // 5 — service cards (ink)
  "#1a0e0e", // 6 — parallax
  "#1a0e0e", // 7 — portfolio depth
  "#4a0f0f", // 8 — converge to CTA
];

export function ScrollStorySection() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const pinRef = React.useRef<HTMLDivElement>(null);
  const bgRef = React.useRef<HTMLDivElement>(null);
  const coreRef = React.useRef<HTMLDivElement>(null);
  const coreInnerRef = React.useRef<HTMLDivElement>(null);

  // scene text refs
  const sceneLabelsRef = React.useRef<HTMLDivElement>(null);
  const headlineRef = React.useRef<HTMLHeadingElement>(null);
  const subRef = React.useRef<HTMLParagraphElement>(null);

  // pieces refs
  const shardsRef = React.useRef<HTMLDivElement>(null);
  const mobileScreensRef = React.useRef<HTMLDivElement>(null);
  const serviceCardsRef = React.useRef<HTMLDivElement>(null);
  const portfolioRef = React.useRef<HTMLDivElement>(null);
  const heroBgRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!rootRef.current || !pinRef.current) return;
    const ctx = gsap.context(() => {
      const total = 8; // 8 scenes
      const seg = 1 / total;

      // Master timeline scrubbed to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (total - 1)}`,
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* ----- Background color shifts ----- */
      SCENE_BGS.forEach((bg, i) => {
        tl.to(bgRef.current, {
          backgroundColor: bg,
          duration: seg * 0.6,
          ease: "power2.inOut",
        }, i * seg);
      });

      /* ----- Hero background image fades out as story progresses ----- */
      if (heroBgRef.current) {
        gsap.set(heroBgRef.current, { opacity: 0.22 });
        tl.to(heroBgRef.current, {
          opacity: 0,
          duration: seg * 0.5,
          ease: "power2.out",
        }, seg * 0.8);
      }

      /* ----- Scene 1 (0 - 1/8): Hero ----- */
      // Set initial VISIBLE state for hero elements (so scroll=0 shows content)
      gsap.set(coreRef.current, { scale: 1, opacity: 1, rotationY: 0 });
      gsap.set(coreInnerRef.current, { rotationY: 0, rotationX: 0 });
      gsap.set(headlineRef.current, { y: 0, opacity: 1 });
      gsap.set(subRef.current, { y: 0, opacity: 1 });

      // Scene 1 just holds the hero visible — no transform needed (it's the start state)
      // Add a subtle floating pulse for cinematic feel
      tl.to(coreRef.current, {
        scale: 1.05,
        duration: seg * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      }, 0);
      setSceneLabel(tl, 0, "01 · The Spark Core", seg);

      /* ----- Scene 2 (1/8 - 2/8): Rotate in 3D ----- */
      tl.to(coreInnerRef.current, {
        rotationY: 360,
        rotationX: 25,
        duration: seg,
        ease: "power1.inOut",
      }, seg);
      tl.to(headlineRef.current, {
        y: -40, opacity: 0, duration: seg * 0.3, ease: "power2.in"
      }, seg);
      tl.to(subRef.current, {
        y: -20, opacity: 0, duration: seg * 0.3, ease: "power2.in"
      }, seg);
      setSceneLabel(tl, 1, "02 · Rotate", seg);

      /* ----- Scene 3 (2/8 - 3/8): Explode into shards ----- */
      // show shards
      tl.set(shardsRef.current, { display: "block" }, seg * 2);
      tl.to(coreRef.current, {
        scale: 0.3, opacity: 0, duration: seg * 0.3, ease: "power2.in"
      }, seg * 2);
      // animate shards outward (children)
      const shards = shardsRef.current?.querySelectorAll(".shard") || [];
      shards.forEach((shard, i) => {
        const angle = (i / shards.length) * Math.PI * 2;
        const dist = 280 + Math.random() * 120;
        tl.fromTo(shard,
          { x: 0, y: 0, scale: 0, opacity: 0, rotation: 0 },
          {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            scale: 1,
            opacity: 1,
            rotation: (Math.random() - 0.5) * 360,
            duration: seg * 0.7,
            ease: "power3.out",
          },
          seg * 2 + 0.02
        );
      });
      setSceneLabel(tl, 2, "03 · Explode", seg);

      /* ----- Scene 4 (3/8 - 4/8): Transform shards → mobile screens ----- */
      // shards converge to top-center as phone screens
      tl.set(mobileScreensRef.current, { display: "block" }, seg * 3);
      const mobiles = mobileScreensRef.current?.querySelectorAll(".mobile-screen") || [];
      mobiles.forEach((m, i) => {
        tl.fromTo(m,
          { y: 100, opacity: 0, rotationY: -30, scale: 0.6 },
          {
            y: 0, opacity: 1, rotationY: 0, scale: 1,
            duration: seg * 0.6, ease: "back.out(1.4)",
          },
          seg * 3 + i * 0.02
        );
      });
      // fade out shards
      tl.to(shardsRef.current, {
        opacity: 0, scale: 0.4, duration: seg * 0.3, ease: "power2.in"
      }, seg * 3);
      setSceneLabel(tl, 3, "04 · Mobile Screens", seg);

      /* ----- Scene 5 (4/8 - 5/8): Assemble into service cards ----- */
      tl.set(serviceCardsRef.current, { display: "block" }, seg * 4);
      // fade out mobile screens
      tl.to(mobileScreensRef.current, {
        opacity: 0, y: -80, duration: seg * 0.3, ease: "power2.in"
      }, seg * 4);
      // service cards stagger in
      const cards = serviceCardsRef.current?.querySelectorAll(".service-card") || [];
      cards.forEach((card, i) => {
        tl.fromTo(card,
          { y: 80, opacity: 0, scale: 0.7, rotationY: -20 },
          {
            y: 0, opacity: 1, scale: 1, rotationY: 0,
            duration: seg * 0.5, ease: "back.out(1.2)",
          },
          seg * 4 + i * 0.015
        );
      });
      setSceneLabel(tl, 4, "05 · Service Cards", seg);

      /* ----- Scene 6 (5/8 - 6/8): Parallax drift ----- */
      // cards drift in different directions (parallax)
      cards.forEach((card, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        const dy = (i % 3) * 12 * dir;
        const dx = dir * 30;
        tl.to(card, {
          x: dx, y: dy, duration: seg * 0.8, ease: "power1.inOut"
        }, seg * 5);
      });
      setSceneLabel(tl, 5, "06 · Parallax", seg);

      /* ----- Scene 7 (6/8 - 7/8): Portfolio depth (cards rearrange) ----- */
      tl.set(portfolioRef.current, { display: "block" }, seg * 6);
      // service cards fade out
      tl.to(serviceCardsRef.current, {
        opacity: 0, scale: 0.6, y: -60, duration: seg * 0.3, ease: "power2.in"
      }, seg * 6);
      // portfolio frames zoom in with depth
      const frames = portfolioRef.current?.querySelectorAll(".portfolio-frame") || [];
      frames.forEach((f, i) => {
        tl.fromTo(f,
          { z: -400, opacity: 0, scale: 0.4 },
          {
            z: 0, opacity: 1, scale: 1,
            duration: seg * 0.5, ease: "back.out(1.3)",
          },
          seg * 6 + i * 0.025
        );
      });
      setSceneLabel(tl, 6, "07 · Portfolio Depth", seg);

      /* ----- Scene 8 (7/8 - 1): Converge to CTA ----- */
      // portfolio collapses into center → CTA headline appears
      tl.to(portfolioRef.current, {
        opacity: 0, scale: 0.3, duration: seg * 0.4, ease: "power2.in"
      }, seg * 7);
      tl.to(coreRef.current, {
        scale: 1.6, opacity: 1, rotationY: 720, duration: seg * 0.8, ease: "power2.inOut"
      }, seg * 7);
      // show final CTA overlay text
      const ctaOverlay = rootRef.current?.querySelector(".cta-overlay");
      tl.fromTo(ctaOverlay,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: seg * 0.6, ease: "power3.out" },
        seg * 7 + 0.1
      );
      setSceneLabel(tl, 7, "08 · Converge", seg);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative"
      style={{ height: "800vh" }}
    >
      <style>{`
        @keyframes core-breathe {
          0%, 100% { transform: scale(0.95); opacity: 0.95; filter: drop-shadow(0 0 15px rgba(212,175,55,0.25)); }
          50% { transform: scale(1.05); opacity: 1; filter: drop-shadow(0 0 35px rgba(212,175,55,0.55)); }
        }
        @keyframes spark-core-pulse-1 {
          0% { transform: scale(0.85); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes spark-core-pulse-2 {
          0% { transform: scale(0.85); opacity: 0.5; }
          100% { transform: scale(1.75); opacity: 0; }
        }
        @keyframes logo-slow-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        ${Array.from({ length: 18 }).map((_, i) => {
          const radius = 35 + (i % 3) * 15;
          const direction = i % 2 === 0 ? 1 : -1;
          return `
            @keyframes spark-particle-orbit-${i} {
              0% { transform: rotate(0deg) translate(${radius}px) rotate(0deg); }
              100% { transform: rotate(${360 * direction}deg) translate(${radius}px) rotate(${-360 * direction}deg); }
            }
          `;
        }).join("\n")}
      `}</style>
      {/* Pinned stage */}
      <div
        ref={pinRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Animated background */}
        <div
          ref={bgRef}
          className="absolute inset-0 transition-colors"
          style={{ backgroundColor: SCENE_BGS[0] }}
        />
        {/* hero dashboard image — visible in Scene 1, fades out as story progresses */}
        <div ref={heroBgRef} className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
          <img
            src="/assets/hero/hero-dashboard.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        {/* grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-grid-gold opacity-20" />
        {/* spotlight */}
        <div className="pointer-events-none absolute inset-0 bg-spotlight" />

        {/* ============ AMBIENT FLOATING SHAPES (always visible, adds depth to empty bg) ============ */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* floating diamond/crystal shapes */}
          <div className="absolute left-[10%] top-[18%] h-16 w-16 rotate-45 rounded-lg border border-spark-accent/30 bg-spark-accent/8 backdrop-blur-sm animate-spark-float" />
          <div className="absolute right-[12%] top-[24%] h-10 w-10 rotate-12 rounded-full border border-spark-primary/25 bg-spark-primary/8 backdrop-blur-sm animate-spark-float-slow" />
          <div className="absolute left-[18%] bottom-[22%] h-12 w-12 rotate-45 rounded-md border border-spark-accent/20 bg-spark-accent/5 backdrop-blur-sm animate-spark-float" style={{ animationDelay: "-3s" }} />
          <div className="absolute right-[20%] bottom-[18%] h-20 w-20 -rotate-12 rounded-2xl border border-spark-primary/20 bg-spark-primary/8 backdrop-blur-sm animate-spark-float-slow" style={{ animationDelay: "-5s" }} />
          <div className="absolute left-[45%] top-[12%] h-8 w-8 rotate-45 rounded border border-spark-accent/40 bg-spark-accent/10 backdrop-blur-sm animate-spark-float" style={{ animationDelay: "-2s" }} />
          <div className="absolute right-[40%] bottom-[14%] h-14 w-14 rotate-12 rounded-full border border-spark-primary/20 bg-spark-primary/5 backdrop-blur-sm animate-spark-float-slow" style={{ animationDelay: "-7s" }} />

          {/* floating particle dots */}
          {Array.from({ length: 20 }).map((_, i) => {
            const left = (i * 37) % 100;
            const top = (i * 53) % 100;
            const size = 2 + (i % 3);
            const delay = -(i * 0.7);
            const isGold = i % 3 === 0;
            return (
              <div
                key={i}
                className="absolute rounded-full animate-spark-float"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: isGold ? "#D4AF37" : "#7A1F1F",
                  opacity: 0.4,
                  animationDelay: `${delay}s`,
                  boxShadow: `0 0 ${size * 3}px ${isGold ? "rgba(212,175,55,0.6)" : "rgba(122,31,31,0.4)"}`,
                }}
              />
            );
          })}

          {/* ambient gradient orbs for depth */}
          <div className="absolute left-[5%] top-[40%] h-64 w-64 rounded-full bg-spark-accent/10 blur-3xl animate-spark-aurora" />
          <div className="absolute right-[5%] bottom-[30%] h-72 w-72 rounded-full bg-spark-primary/15 blur-3xl animate-spark-aurora" style={{ animationDelay: "-6s" }} />
        </div>

        {/* Scene label (top-left chip) */}
        <div
          ref={sceneLabelsRef}
          className="absolute left-6 top-28 z-30 sm:left-10 sm:top-32"
        >
          <div className="rounded-full border border-current/20 bg-white/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-spark-ink backdrop-blur-md dark:text-spark-secondary">
            <span className="font-serif text-spark-accent">●</span> Scroll Story
          </div>
        </div>

        {/* Scroll progress hint (bottom) */}
        <div className="absolute inset-x-0 bottom-6 z-30 flex justify-center">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-spark-ink/60 dark:text-spark-secondary/60">
            <span>Scroll to play</span>
            <span className="relative block h-8 w-px overflow-hidden bg-current/20">
              <span className="absolute inset-0 animate-pulse bg-gradient-to-b from-transparent via-current to-transparent" />
            </span>
          </div>
        </div>

        {/* ============ CENTRAL OBJECT ============ */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* The Spark Core — glowing orb with rotating ring + inner dashboard preview */}
          <div
            ref={coreRef}
            className="relative will-change-transform"
            style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
          >
            <div
              ref={coreInnerRef}
              className="relative grid h-72 w-72 place-items-center rounded-full will-change-transform sm:h-96 sm:w-96"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* outer rotating ring with icons */}
              <div className="absolute inset-0 animate-spark-spin-slow">
                <div className="absolute inset-0 rounded-full border-2 border-spark-accent/50" />
                {/* orbiting tech dots */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `rotate(${deg}deg) translateY(-${144}px) rotate(-${deg}deg)`,
                    }}
                  >
                    <div className="h-3 w-3 rounded-full bg-spark-accent shadow-[0_0_12px_rgba(212,175,55,0.8)]" />
                  </div>
                ))}
              </div>
              {/* dashed middle ring */}
              <div
                className="absolute inset-4 rounded-full border border-dashed border-spark-primary/40"
                style={{ animation: "spark-spin-slow 22s linear infinite reverse" }}
              />
              {/* outer glow halos */}
              <div className="absolute -inset-12 rounded-full bg-spark-accent/30 blur-3xl animate-pulse" />
              <div className="absolute -inset-8 rounded-full bg-spark-primary/25 blur-2xl" />
              <div className="absolute -inset-4 rounded-full bg-spark-accent/15 blur-xl" />

              {/* core sphere with Spark Technology Logo (Option 1) */}
              <div className="relative grid h-52 w-52 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-spark-primary via-spark-primary-soft to-spark-accent shadow-spark sm:h-64 sm:w-64 animate-[core-breathe_4s_ease-in-out_infinite]">
                {/* dark inner backdrop */}
                <div className="absolute inset-3 rounded-full bg-spark-ink/75 backdrop-blur-md" />

                {/* highlight */}
                <div className="absolute left-8 top-8 h-16 w-16 rounded-full bg-white/20 blur-xl" />

                {/* Concentric pulsing glow rings */}
                <div className="absolute inset-4 rounded-full border border-spark-accent/30 animate-[spark-core-pulse-1_3s_ease-in-out_infinite]" />
                <div className="absolute inset-4 rounded-full border border-spark-accent/15 animate-[spark-core-pulse-2_4s_ease-in-out_infinite]" />

                {/* Orbiting gold particles */}
                {Array.from({ length: 18 }).map((_, i) => {
                  const size = 2 + (i % 3);
                  const delay = -(i * 0.4);
                  const isAccent = i % 3 === 0;
                  return (
                    <div
                      key={i}
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: "50%",
                        top: "50%",
                        background: isAccent ? "#D4AF37" : "#F5F0E8",
                        opacity: 0.8,
                        boxShadow: `0 0 ${size * 3}px ${isAccent ? "rgba(212,175,55,0.8)" : "rgba(245,240,232,0.6)"}`,
                        animation: `spark-particle-orbit-${i} ${8 + (i % 4) * 3}s linear infinite`,
                        animationDelay: `${delay}s`,
                      }}
                    />
                  );
                })}

                {/* SPARK TECHNOLOGY LOGO inside the circle, slowly rotating with soft breathing */}
                <div className="relative z-10 flex h-36 w-36 items-center justify-center rounded-full sm:h-44 sm:w-44 animate-[logo-slow-rotate_40s_linear_infinite]">
                  <img
                    src="/logo-symbol.png"
                    alt="Spark Technology logo symbol"
                    className="h-20 w-20 object-contain drop-shadow-[0_0_15px_rgba(0,162,255,0.7)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ============ SHARDS (Scene 3) ============ */}
          <div
            ref={shardsRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ display: "none" }}
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const colors = ["#7A1F1F", "#D4AF37", "#9b3232", "#e6c869"];
              return (
                <div
                  key={i}
                  className="shard absolute h-12 w-12 rounded-lg border border-white/30"
                  style={{
                    background: `linear-gradient(135deg, ${colors[i % 4]}88, ${colors[(i + 1) % 4]}44)`,
                    backdropFilter: "blur(8px)",
                  }}
                />
              );
            })}
          </div>

          {/* ============ MOBILE SCREENS (Scene 4) ============ */}
          <div
            ref={mobileScreensRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center gap-6"
            style={{ display: "none" }}
          >
            {[
              { t: "Analytics", c: "#7A1F1F", accent: "#D4AF37", type: "analytics" },
              { t: "ERP", c: "#D4AF37", accent: "#7A1F1F", type: "erp" },
              { t: "Social", c: "#9b3232", accent: "#D4AF37", type: "social" },
            ].map((m, i) => (
              <div
                key={i}
                className="mobile-screen relative h-72 w-36 rounded-[28px] border-4 border-spark-ink/85 bg-spark-secondary p-2 shadow-spark sm:h-96 sm:w-48"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* notch */}
                <div className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-spark-ink/50" />
                <div className="mt-4 flex h-full flex-col gap-1.5 overflow-hidden">
                  {/* status bar */}
                  <div className="flex items-center justify-between text-[7px] text-spark-muted">
                    <span>9:41</span>
                    <span className="flex gap-0.5">
                      <span className="h-1 w-1 rounded-full bg-spark-primary" />
                      <span className="h-1 w-1 rounded-full bg-spark-primary" />
                      <span className="h-1 w-1 rounded-full bg-spark-primary/40" />
                    </span>
                  </div>

                  {/* app header */}
                  <div className="flex items-center justify-between rounded-lg p-2" style={{ background: m.c }}>
                    <span className="text-[10px] font-bold text-spark-secondary">{m.t}</span>
                    <div className="h-4 w-4 rounded-full bg-spark-secondary/30" />
                  </div>

                  {m.type === "analytics" && (
                    <>
                      {/* KPI cards */}
                      <div className="grid grid-cols-2 gap-1">
                        <div className="rounded-md bg-spark-primary/10 p-1">
                          <div className="text-[6px] uppercase text-spark-muted">Revenue</div>
                          <div className="font-serif text-[10px] text-spark-ink">$48K</div>
                        </div>
                        <div className="rounded-md bg-spark-accent/15 p-1">
                          <div className="text-[6px] uppercase text-spark-muted">Growth</div>
                          <div className="font-serif text-[10px]" style={{ color: m.accent }}>+38%</div>
                        </div>
                      </div>
                      {/* chart */}
                      <div className="flex-1 rounded-md bg-spark-primary/5 p-1">
                        <svg viewBox="0 0 100 50" className="h-full w-full">
                          <path d="M0,40 C15,30 25,35 40,20 C55,8 70,22 85,12 C92,8 100,14 100,10" fill="none" stroke={m.accent} strokeWidth="1.5" />
                          <path d="M0,40 C15,30 25,35 40,20 C55,8 70,22 85,12 C92,8 100,14 100,10 L100,50 L0,50 Z" fill={m.accent} fillOpacity="0.2" />
                        </svg>
                      </div>
                      {/* bar chart */}
                      <div className="flex items-end gap-0.5 h-6">
                        {[40, 65, 50, 80, 60, 90, 70].map((h, j) => (
                          <div key={j} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: j % 2 === 0 ? m.c : m.accent }} />
                        ))}
                      </div>
                    </>
                  )}

                  {m.type === "erp" && (
                    <>
                      {/* module cards */}
                      <div className="grid grid-cols-3 gap-1">
                        {["INV", "FIN", "HR"].map((mod) => (
                          <div key={mod} className="rounded-md bg-spark-ink/80 p-1 text-center">
                            <div className="text-[6px] text-spark-accent">{mod}</div>
                            <div className="text-[8px] font-bold text-spark-secondary">12</div>
                          </div>
                        ))}
                      </div>
                      {/* inventory list */}
                      <div className="flex-1 flex flex-col gap-1">
                        {[
                          { n: "Widget A", q: "234", v: "↑" },
                          { n: "Widget B", q: "1,204", v: "↓" },
                          { n: "Widget C", q: "89", v: "↑" },
                        ].map((row) => (
                          <div key={row.n} className="flex items-center justify-between rounded-md bg-spark-primary/8 px-1.5 py-1">
                            <span className="text-[7px] text-spark-ink">{row.n}</span>
                            <div className="flex items-center gap-1">
                              <span className="font-mono text-[7px] text-spark-muted">{row.q}</span>
                              <span className="text-[8px]" style={{ color: row.v === "↑" ? "#10b981" : "#ef4444" }}>{row.v}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* total bar */}
                      <div className="rounded-md p-1" style={{ background: m.c }}>
                        <div className="flex items-center justify-between text-[7px] text-spark-secondary">
                          <span>Total</span>
                          <span className="font-serif">$284K</span>
                        </div>
                      </div>
                    </>
                  )}

                  {m.type === "social" && (
                    <>
                      {/* post card */}
                      <div className="rounded-md bg-white p-1.5 shadow-sm">
                        <div className="flex items-center gap-1">
                          <div className="h-4 w-4 rounded-full" style={{ background: m.c }} />
                          <div className="flex-1">
                            <div className="text-[7px] font-bold text-spark-ink">@spark</div>
                            <div className="text-[6px] text-spark-muted">2h ago</div>
                          </div>
                        </div>
                        <div className="mt-1 h-12 rounded" style={{ background: `linear-gradient(135deg, ${m.c}, ${m.accent})` }} />
                        <div className="mt-1 flex gap-2 text-[7px] text-spark-muted">
                          <span>❤ 2.4K</span>
                          <span>↻ 482</span>
                          <span>⤴ 318</span>
                        </div>
                      </div>
                      {/* engagement chart */}
                      <div className="mt-auto flex items-end gap-0.5 h-8">
                        {[30, 55, 40, 70, 85, 60, 95].map((h, j) => (
                          <div key={j} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: `linear-gradient(to top, ${m.c}, ${m.accent})` }} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ============ SERVICE CARDS (Scene 5-6) ============ */}
          <div
            ref={serviceCardsRef}
            className="pointer-events-none absolute inset-0 grid grid-cols-5 gap-3 p-8 sm:gap-4 sm:p-16"
            style={{ display: "none" }}
          >
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="service-card group relative flex aspect-square flex-col overflow-hidden rounded-2xl border border-spark-accent/30 bg-spark-ink/40 backdrop-blur-md"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* service image background */}
                  <img
                    src={s.image}
                    alt={s.label}
                    className="absolute inset-0 h-full w-full object-cover opacity-60"
                  />
                  {/* dark gradient overlay for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-spark-ink via-spark-ink/60 to-spark-ink/20" />
                  {/* colored tint */}
                  <div
                    className="absolute inset-0 opacity-40 mix-blend-overlay"
                    style={{ background: `linear-gradient(135deg, ${s.color}, transparent)` }}
                  />

                  {/* top row: icon + number */}
                  <div className="relative flex w-full items-center justify-between p-2 sm:p-3">
                    <div
                      className="grid h-7 w-7 place-items-center rounded-lg border backdrop-blur-md sm:h-9 sm:w-9"
                      style={{ background: `${s.color}66`, color: "#fff", borderColor: `${s.color}` }}
                    >
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.8} />
                    </div>
                    <span className="rounded-full bg-spark-ink/60 px-1.5 py-0.5 font-serif text-[8px] text-spark-accent backdrop-blur-md sm:text-[10px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* title + desc — at bottom */}
                  <div className="relative mt-auto w-full p-2 sm:p-3">
                    <div className="text-[10px] font-semibold text-spark-secondary sm:text-sm">
                      {s.label}
                    </div>
                    <div className="mt-0.5 text-[7px] uppercase tracking-wider text-spark-accent/90 sm:text-[9px]">
                      {s.desc}
                    </div>
                    {/* accent line */}
                    <div
                      className="mt-1.5 h-0.5 w-full rounded-full"
                      style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ============ PORTFOLIO FRAMES (Scene 7) ============ */}
          <div
            ref={portfolioRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ display: "none", transformStyle: "preserve-3d", perspective: "1200px" }}
          >
            {[
              { x: -300, y: -60, r: -8, c: "from-spark-primary to-spark-primary-deep", t: "NorthPeak", img: "/assets/portfolio/northpeak.png", cat: "E-commerce" },
              { x: -100, y: 80, r: 4, c: "from-spark-accent to-spark-primary", t: "Lumen Labs", img: "/assets/portfolio/lumen.png", cat: "SaaS" },
              { x: 100, y: -70, r: -4, c: "from-spark-primary-deep to-spark-primary-soft", t: "Atlas Retail", img: "/assets/portfolio/atlas.png", cat: "ERP" },
              { x: 300, y: 60, r: 8, c: "from-spark-accent to-spark-accent-soft", t: "Verdant", img: "/assets/portfolio/verdant.png", cat: "Mobile" },
            ].map((p, i) => (
              <div
                key={i}
                className="portfolio-frame absolute h-52 w-36 overflow-hidden rounded-2xl border border-spark-accent/40 bg-spark-ink shadow-spark sm:h-64 sm:w-48"
                style={{
                  transform: `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* real project image */}
                <img src={p.img} alt={p.t} className="absolute inset-0 h-full w-full object-cover" />
                {/* brand tint */}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.c} opacity-40 mix-blend-multiply`} />
                {/* dark gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-spark-ink via-spark-ink/30 to-transparent" />
                {/* glass top bar with client name */}
                <div className="absolute inset-x-2 top-2 flex items-center justify-between rounded-full bg-spark-ink/50 px-2 py-1 backdrop-blur-md">
                  <span className="text-[8px] font-semibold text-white sm:text-[10px]">{p.t}</span>
                  <span className="text-[6px] uppercase tracking-wider text-spark-accent sm:text-[8px]">{p.cat}</span>
                </div>
                {/* bottom metric */}
                <div className="absolute inset-x-2 bottom-2 rounded-lg bg-spark-ink/60 px-2 py-1.5 backdrop-blur-md">
                  <div className="font-serif text-sm text-spark-accent sm:text-base">
                    {["3.1×", "4B", "9→1", "250K"][i]}
                  </div>
                  <div className="text-[7px] uppercase tracking-wider text-white/70 sm:text-[8px]">
                    {["Conversion", "Events/day", "Tools unified", "Monthly users"][i]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============ HEADLINE (Scenes 1-2) — positioned BELOW the orb ============ */}
        <div className="absolute inset-x-0 bottom-[14%] flex flex-col items-center px-6 text-center">
          <h2
            ref={headlineRef}
            className="font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[0.98] tracking-tight text-spark-ink text-shadow-spark"
          >
            Digital products
            <br />
            that <em className="text-gradient-spark not-italic">spark</em> growth.
          </h2>
          <p
            ref={subRef}
            className="mt-5 max-w-xl text-sm leading-relaxed text-spark-muted sm:text-base"
          >
            Watch the Spark Core transform through every discipline we master —
            from dashboards to mobile apps to brand systems.
          </p>
        </div>

        {/* ============ CTA OVERLAY (Scene 8) ============ */}
        <div className="cta-overlay pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: 0 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-spark-accent/40 bg-spark-accent/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-spark-accent backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-spark-accent" />
            Let's build
          </span>
          <h2 className="mt-5 font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[0.98] tracking-tight text-spark-secondary text-shadow-spark">
            Your next product,
            <br />
            <span className="text-gradient-gold">engineered to win.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-spark-secondary/70 sm:text-base">
            Tell us what you're building. We'll bring the senior pod, the design
            system and the roadmap — you bring the ambition.
          </p>
          <a
            href="#contact"
            className="pointer-events-auto mt-8 inline-flex items-center gap-2 rounded-full bg-spark-accent px-7 py-3.5 text-sm font-semibold text-spark-ink shadow-gold transition-transform hover:scale-105"
          >
            Start a project →
          </a>
        </div>
      </div>
    </section>
  );
}

/* Helper: animate scene label text per scene */
function setSceneLabel(tl: gsap.core.Timeline, sceneIndex: number, text: string, seg: number) {
  // We don't dynamically change text (would need a ref) — instead we rely on a
  // simple opacity pulse for each scene to indicate progression.
  // The actual scene labels are visible via the chip at the top.
}
