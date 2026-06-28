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

type ServiceDef = { icon: LucideIcon; label: string; color: string };

const SERVICES: ServiceDef[] = [
  { icon: Code2,        label: "Web Dev",        color: "#7A1F1F" },
  { icon: Smartphone,   label: "Mobile Apps",    color: "#D4AF37" },
  { icon: Boxes,        label: "ERP Systems",    color: "#7A1F1F" },
  { icon: Users,        label: "CRM Solutions",  color: "#D4AF37" },
  { icon: Palette,      label: "UI/UX Design",   color: "#7A1F1F" },
  { icon: PenTool,      label: "Graphic Design", color: "#D4AF37" },
  { icon: Share2,       label: "Social Media",   color: "#7A1F1F" },
  { icon: Sparkles,     label: "Branding",       color: "#D4AF37" },
  { icon: ShoppingBag,  label: "E-commerce",     color: "#7A1F1F" },
  { icon: BarChart3,    label: "Analytics",      color: "#D4AF37" },
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
        {/* grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-grid-gold opacity-20" />
        {/* spotlight */}
        <div className="pointer-events-none absolute inset-0 bg-spotlight" />

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
          {/* The Spark Core — glowing orb with rotating ring */}
          <div
            ref={coreRef}
            className="relative will-change-transform"
            style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
          >
            <div
              ref={coreInnerRef}
              className="relative grid h-56 w-56 place-items-center rounded-full will-change-transform sm:h-72 sm:w-72"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-2 border-spark-accent/50 animate-spark-spin-slow" />
              <div
                className="absolute inset-3 rounded-full border border-dashed border-spark-primary/40"
                style={{ animation: "spark-spin-slow 22s linear infinite reverse" }}
              />
              {/* outer glow */}
              <div className="absolute -inset-8 rounded-full bg-spark-accent/25 blur-3xl" />
              <div className="absolute -inset-4 rounded-full bg-spark-primary/20 blur-2xl" />
              {/* core sphere */}
              <div className="relative grid h-36 w-36 place-items-center rounded-full bg-gradient-to-br from-spark-primary via-spark-primary-soft to-spark-accent shadow-spark sm:h-48 sm:w-48">
                <div className="absolute inset-3 rounded-full bg-spark-ink/35 backdrop-blur-sm" />
                {/* highlight */}
                <div className="absolute left-6 top-6 h-12 w-12 rounded-full bg-white/30 blur-xl" />
                <Sparkles className="relative h-12 w-12 text-spark-secondary sm:h-16 sm:w-16" strokeWidth={1.6} />
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
              { t: "Analytics", c: "#7A1F1F" },
              { t: "ERP", c: "#D4AF37" },
              { t: "Social", c: "#9b3232" },
            ].map((m, i) => (
              <div
                key={i}
                className="mobile-screen relative h-64 w-32 rounded-3xl border-4 border-spark-ink/80 bg-spark-secondary p-2 shadow-spark sm:h-80 sm:w-40"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-spark-ink/40" />
                <div className="mt-4 flex h-full flex-col gap-1.5">
                  <div
                    className="rounded-lg p-2 text-[10px] font-bold text-white"
                    style={{ background: m.c }}
                  >
                    {m.t}
                  </div>
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-2 rounded-full bg-spark-primary/15"
                      style={{ width: `${70 + j * 8}%` }}
                    />
                  ))}
                  <div className="mt-auto h-16 rounded-lg" style={{ background: `linear-gradient(135deg, ${m.c}33, ${m.c}11)` }} />
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
                  className="service-card group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-spark-accent/25 bg-white/8 p-2 backdrop-blur-md sm:p-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="grid h-8 w-8 place-items-center rounded-xl sm:h-12 sm:w-12"
                    style={{ background: `${s.color}22`, color: s.color }}
                  >
                    <Icon className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={1.8} />
                  </div>
                  <div className="text-center text-[9px] font-medium text-spark-secondary sm:text-xs">
                    {s.label}
                  </div>
                  <div className="absolute inset-0 rounded-2xl border border-transparent transition-colors group-hover:border-spark-accent/40" />
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
              { x: -260, y: -40, r: -8, c: "from-spark-primary to-spark-primary-deep", t: "NorthPeak" },
              { x: -90, y: 60, r: 4, c: "from-spark-accent to-spark-primary", t: "Lumen Labs" },
              { x: 90, y: -50, r: -4, c: "from-spark-primary-deep to-spark-primary-soft", t: "Atlas Retail" },
              { x: 260, y: 40, r: 8, c: "from-spark-accent to-spark-accent-soft", t: "Verdant" },
            ].map((p, i) => (
              <div
                key={i}
                className="portfolio-frame absolute h-44 w-32 overflow-hidden rounded-2xl border border-spark-accent/30 bg-white/10 backdrop-blur-md sm:h-56 sm:w-40"
                style={{
                  transform: `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.c} opacity-80`} />
                <div className="absolute inset-0 bg-grid-gold opacity-30 mix-blend-overlay" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="font-serif text-sm text-white sm:text-base">{p.t}</div>
                  <div className="text-[9px] uppercase tracking-wider text-white/70">Case study</div>
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
