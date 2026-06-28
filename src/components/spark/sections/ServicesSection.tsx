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
import { getServices } from "@/lib/api";

type Service = {
  id?: number;
  title: string;
  slug: string;
  desc: string;
  bullets: string[];
  accent: "primary" | "gold";
  image: string;
  span?: boolean;
};

const ICON_MAP: Record<string, LucideIcon> = {
  "website-development": Code2,
  "mobile-app-development": Smartphone,
  "erp-systems": Boxes,
  "crm-solutions": Users,
  "ui-ux-design": Palette,
  "graphic-design": PenTool,
  "social-media-marketing": Share2,
  "branding": Sparkles,
  "e-commerce-development": ShoppingBag,
  "analytics-reporting": BarChart3,
};

export function ServicesSection() {
  const [services, setServices] = React.useState<Service[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getServices().then((data: any) => {
      // Map API fields if they are different
      const formatted = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        desc: item.desc || item.short_description,
        bullets: Array.isArray(item.bullets) ? item.bullets : (item.bullets ? item.bullets.split(",") : []),
        accent: item.accent || "primary",
        image: item.image || item.image_path,
        span: item.span || false,
      }));
      setServices(formatted);
      setLoading(false);
    });
  }, []);

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

        {loading ? (
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-96 w-full animate-pulse rounded-3xl border border-spark-primary/10 bg-white/30 backdrop-blur-md"
              />
            ))}
          </div>
        ) : (
          <StaggerGroup
            className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.07}
          >
            {services.map((s, i) => (
              <StaggerItem
                key={s.slug || s.title}
                className={cn(s.span && "sm:col-span-2 lg:col-span-1")}
              >
                <ServiceCard service={s} index={i} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = ICON_MAP[service.slug] || Code2;
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
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-spark-ink flex items-center justify-center">
            <Icon className="h-10 w-10 text-spark-accent" />
          </div>
        )}
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
            <a href="#contact">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
