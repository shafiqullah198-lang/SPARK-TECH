"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Code2, Smartphone, Boxes, Users, Palette, PenTool,
  Share2, Sparkles, ShoppingBag, BarChart3, ArrowUpRight, type LucideIcon
} from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";
import { cn } from "@/lib/utils";

type Service = {
  icon: LucideIcon;
  title: string;
  desc: string;
  bullets: string[];
  accent: "primary" | "gold";
  image: string;
  span?: boolean;
};

const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "Website Development",
    desc: "Cinematic marketing sites, headless commerce and high-performance platforms engineered for speed and scale.",
    bullets: ["Next.js / React", "Headless CMS", "Edge rendering"],
    accent: "primary",
    image: "/assets/services/web-dev.png",
    span: true,
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Native-feel iOS & Android apps with offline-first architecture and 60fps motion.",
    bullets: ["React Native", "Flutter", "Push & deep links"],
    accent: "gold",
    image: "/assets/services/mobile-apps.png",
  },
  {
    icon: Boxes,
    title: "ERP Systems",
    desc: "Unified ERP backbones that connect inventory, finance, HR and operations into one source of truth.",
    bullets: ["Custom modules", "Real-time sync", "Role-based access"],
    accent: "primary",
    image: "/assets/services/erp.png",
  },
  {
    icon: Users,
    title: "CRM Solutions",
    desc: "Customer platforms that turn pipelines into revenue — automations, dashboards and AI insights.",
    bullets: ["Sales pipelines", "Automations", "Analytics"],
    accent: "gold",
    image: "/assets/services/crm.png",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Research-led product design — flows, prototypes and design systems that ship in weeks, not months.",
    bullets: ["Discovery", "Design systems", "Prototyping"],
    accent: "primary",
    image: "/assets/services/uiux.png",
  },
  {
    icon: PenTool,
    title: "Graphic Design",
    desc: "Editorial-grade visual assets — from pitch decks to social kits and motion graphics.",
    bullets: ["Pitch decks", "Social kits", "Motion"],
    accent: "gold",
    image: "/assets/services/graphic.png",
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    desc: "Performance creative + community ops that compound reach and convert attention into revenue.",
    bullets: ["Content calendars", "Paid social", "Community"],
    accent: "primary",
    image: "/assets/services/social.png",
  },
  {
    icon: Sparkles,
    title: "Branding",
    desc: "Strategic brand systems — naming, identity, voice and guidelines built to scale across surfaces.",
    bullets: ["Identity", "Voice", "Guidelines"],
    accent: "gold",
    image: "/assets/services/branding.png",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Development",
    desc: "Conversion-engineered storefronts on Shopify, custom or headless — built to scale to 8 figures.",
    bullets: ["Shopify / Headless", "Subscriptions", "A/B testing"],
    accent: "primary",
    image: "/assets/services/ecommerce.png",
    span: true,
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    desc: "Unified dashboards that connect every channel into one source of truth — and the insights to act on it.",
    bullets: ["BI dashboards", "ETL pipelines", "AI insights"],
    accent: "gold",
    image: "/assets/services/analytics.png",
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-spark-secondary py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[60%] -translate-x-1/2 rounded-full bg-spark-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="01"
          eyebrow="What we craft"
          title={
            <>
              Ten disciplines.
              <br />
              <span className="text-gradient-spark">One studio.</span>
            </>
          }
          description="From the first wireframe to the final dashboard, Spark ships end-to-end digital products — design, engineering, brand and growth under one roof."
        />

        <StaggerGroup
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.07}
        >
          {SERVICES.map((s, i) => (
            <StaggerItem
              key={s.title}
              className={cn(s.span && "sm:col-span-2 lg:col-span-1")}
            >
              <ServiceCard service={s} index={i} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const [hover, setHover] = React.useState(false);

  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-spark-primary/12 bg-white/55 backdrop-blur-xl shadow-spark"
    >
      {/* visual top — real generated image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-spark-ink/75 via-spark-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-spark-primary/25 to-spark-accent/15 mix-blend-overlay" />

        {/* top row: icon + index, overlaid on image */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
          <motion.div
            whileHover={{ rotate: -6, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-2xl border backdrop-blur-md",
              service.accent === "gold"
                ? "border-spark-accent/50 bg-spark-accent/25 text-spark-secondary"
                : "border-spark-primary/50 bg-spark-primary/30 text-spark-secondary"
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </motion.div>
          <span className="rounded-full border border-white/30 bg-spark-ink/40 px-2.5 py-0.5 font-serif text-xs text-white backdrop-blur-md">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* title overlaid on image bottom */}
        <h3 className="absolute inset-x-0 bottom-0 p-4 font-serif text-2xl text-spark-secondary drop-shadow-lg">
          {service.title}
        </h3>
      </div>

      {/* body */}
      <div className="relative flex flex-1 flex-col p-5">
        <p className="text-sm leading-relaxed text-spark-muted">
          {service.desc}
        </p>

        {/* bullets */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {service.bullets.map((b) => (
            <span
              key={b}
              className="rounded-full border border-spark-primary/12 bg-white/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-spark-ink/70"
            >
              {b}
            </span>
          ))}
        </div>

        {/* footer CTA */}
        <div className="mt-auto flex items-center justify-between border-t border-spark-primary/10 pt-4">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-spark-muted">
            Explore
          </span>
          <motion.span
            animate={hover ? { x: 4, y: -4 } : { x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className={cn(
              "grid h-8 w-8 place-items-center rounded-full border",
              service.accent === "gold"
                ? "border-spark-accent/40 bg-spark-accent/10 text-spark-accent"
                : "border-spark-primary/30 bg-spark-primary/10 text-spark-primary"
            )}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
