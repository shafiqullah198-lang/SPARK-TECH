"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";

type Project = {
  client: string;
  category: string;
  title: string;
  result: string;
  metric: string;
  metricLabel: string;
  image: string;
  palette: string; // tailwind gradient classes
  size: "lg" | "md" | "sm";
};

const PROJECTS: Project[] = [
  {
    client: "NorthPeak",
    category: "E-commerce Platform",
    title: "Headless commerce rebuild that 3x'd conversion",
    result: "Migrated a legacy Shopify storefront to a custom headless build with edge personalization.",
    metric: "3.1×",
    metricLabel: "Conversion",
    image: "/assets/portfolio/northpeak.png",
    palette: "from-spark-primary to-spark-primary-deep",
    size: "lg",
  },
  {
    client: "Lumen Labs",
    category: "SaaS Dashboard",
    title: "AI analytics suite for fintech ops",
    result: "Designed and engineered a real-time risk dashboard processing 4B events/day.",
    metric: "4B",
    metricLabel: "Events/day",
    image: "/assets/portfolio/lumen.png",
    palette: "from-spark-accent to-spark-primary",
    size: "md",
  },
  {
    client: "Atlas Retail",
    category: "ERP System",
    title: "Unified ERP for a 200-store retail group",
    result: "Replaced 9 disconnected tools with a single custom ERP — inventory, finance, HR.",
    metric: "9→1",
    metricLabel: "Tools unified",
    image: "/assets/portfolio/atlas.png",
    palette: "from-spark-primary-deep to-spark-primary-soft",
    size: "md",
  },
  {
    client: "Verdant",
    category: "Mobile App",
    title: "Sustainability app with 250K MAU",
    result: "Cross-platform app with offline-first sync and gamified carbon tracking.",
    metric: "250K",
    metricLabel: "Monthly users",
    image: "/assets/portfolio/verdant.png",
    palette: "from-spark-accent to-spark-accent-soft",
    size: "sm",
  },
  {
    client: "Quantica",
    category: "Branding",
    title: "Identity system for a quantum startup",
    result: "End-to-end rebrand — naming, logo, voice, guidelines and investor deck.",
    metric: "$28M",
    metricLabel: "Series A raised",
    image: "/assets/portfolio/quantica.png",
    palette: "from-spark-primary-soft to-spark-accent",
    size: "sm",
  },
  {
    client: "Helix Bank",
    category: "CRM + Analytics",
    title: "CRM rebuild that cut churn by 41%",
    result: "Customer platform with predictive churn scoring and automated retention plays.",
    metric: "−41%",
    metricLabel: "Churn",
    image: "/assets/portfolio/helix.png",
    palette: "from-spark-primary to-spark-accent",
    size: "md",
  },
];

export function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-spark-secondary py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-spark-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/3 h-72 w-72 rounded-full bg-spark-accent/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            index="04"
            eyebrow="Selected work"
            title={
              <>
                Receipts,
                <br />
                <span className="text-gradient-spark">not promises.</span>
              </>
            }
            description="A snapshot of recent products we've shipped across e-commerce, fintech, SaaS and retail. Each one tied to a measurable business outcome."
          />
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group inline-flex items-center gap-2 rounded-full border border-spark-primary/20 bg-white/50 px-5 py-2.5 text-sm font-medium text-spark-primary backdrop-blur-md"
          >
            Start your case study
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        <StaggerGroup
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {PROJECTS.map((p, i) => (
            <StaggerItem
              key={p.client}
              className={
                p.size === "lg"
                  ? "sm:col-span-2 lg:col-span-2"
                  : ""
              }
            >
              <ProjectCard project={p} index={i} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({
      ry: (px - 0.5) * 8,
      rx: -(py - 0.5) * 8,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{
        rotateX: tilt.rx,
        rotateY: tilt.ry,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative h-full overflow-hidden rounded-3xl border border-spark-primary/12 bg-white/55 backdrop-blur-xl shadow-spark"
    >
      {/* visual — real project screenshot */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.client} — ${project.category}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* brand tint overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.palette} opacity-40 mix-blend-multiply`} />
        <div className="absolute inset-0 bg-gradient-to-t from-spark-ink/75 via-spark-ink/15 to-transparent" />

        {/* metric chip — depth on hover */}
        <motion.div
          style={{ transform: "translateZ(40px)" }}
          className="absolute right-4 top-4 rounded-2xl border border-white/30 bg-spark-ink/50 px-3 py-2 text-right backdrop-blur-md"
        >
          <div className="font-serif text-2xl text-white drop-shadow">{project.metric}</div>
          <div className="text-[9px] uppercase tracking-[0.16em] text-white/85">
            {project.metricLabel}
          </div>
        </motion.div>

        {/* client tag */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span className="rounded-full border border-white/30 bg-spark-ink/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-md">
            {project.client}
          </span>
          <span className="text-[10px] text-white/80">{project.category}</span>
        </div>
      </div>

      {/* text */}
      <div className="relative p-5">
        <h3 className="font-serif text-xl leading-snug text-spark-ink">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-spark-muted">
          {project.result}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-spark-primary/10 pt-3">
          <span className="text-[10px] uppercase tracking-[0.18em] text-spark-muted">
            Case study
          </span>
          <motion.span
            whileHover={{ x: 3, y: -3 }}
            className="grid h-7 w-7 place-items-center rounded-full border border-spark-primary/25 bg-spark-primary/10 text-spark-primary"
          >
            <ArrowUpRight className="h-3 w-3" />
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
