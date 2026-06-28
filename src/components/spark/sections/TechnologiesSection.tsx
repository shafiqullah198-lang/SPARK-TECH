"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "../ui/Stagger";

type TechGroup = {
  label: string;
  items: { name: string; tag: string }[];
};

const GROUPS: TechGroup[] = [
  {
    label: "Frontend",
    items: [
      { name: "Next.js", tag: "App Router" },
      { name: "React", tag: "19" },
      { name: "TypeScript", tag: "5.x" },
      { name: "Tailwind CSS", tag: "4" },
      { name: "Framer Motion", tag: "Motion" },
      { name: "GSAP", tag: "ScrollTrigger" },
    ],
  },
  {
    label: "3D & Motion",
    items: [
      { name: "Three.js", tag: "WebGL" },
      { name: "React Three Fiber", tag: "R3F" },
      { name: "Drei", tag: "Helpers" },
      { name: "Lottie", tag: "After Effects" },
      { name: "Spline", tag: "3D scenes" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", tag: "Bun" },
      { name: "PostgreSQL", tag: "Primary DB" },
      { name: "Prisma", tag: "ORM" },
      { name: "Redis", tag: "Cache" },
      { name: "GraphQL", tag: "tRPC" },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "React Native", tag: "Expo" },
      { name: "Flutter", tag: "Dart" },
      { name: "Swift", tag: "iOS native" },
      { name: "Kotlin", tag: "Android" },
    ],
  },
  {
    label: "Infra & DevOps",
    items: [
      { name: "Vercel", tag: "Edge" },
      { name: "AWS", tag: "Cloud" },
      { name: "Docker", tag: "Containers" },
      { name: "Terraform", tag: "IaC" },
      { name: "GitHub Actions", tag: "CI/CD" },
    ],
  },
  {
    label: "Data & AI",
    items: [
      { name: "BigQuery", tag: "Warehouse" },
      { name: "dbt", tag: "Modeling" },
      { name: "OpenAI", tag: "LLMs" },
      { name: "Pinecone", tag: "Vector DB" },
      { name: "Segment", tag: "CDP" },
    ],
  },
  {
    label: "Design",
    items: [
      { name: "Figma", tag: "Design ops" },
      { name: "Spline", tag: "3D" },
      { name: "Cinema 4D", tag: "Render" },
      { name: "After Effects", tag: "Motion" },
    ],
  },
  {
    label: "Marketing",
    items: [
      { name: "HubSpot", tag: "CRM" },
      { name: "Klaviyo", tag: "Email" },
      { name: "Meta Ads", tag: "Paid social" },
      { name: "Google Ads", tag: "SEM" },
      { name: "GA4", tag: "Analytics" },
    ],
  },
];

export function TechnologiesSection() {
  return (
    <section
      id="technologies"
      className="relative overflow-hidden bg-spark-ink py-24 text-spark-secondary sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-gold opacity-30" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-spark-primary/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-spark-accent/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          eyebrow="Our stack"
          title={
            <>
              The tools behind
              <br />
              <span className="text-gradient-gold">the work.</span>
            </>
          }
          description="A modern, opinionated stack — chosen for performance, longevity and the ability to ship fast without accumulating debt."
          className="text-spark-secondary [&_h2]:text-spark-secondary [&_p]:text-spark-secondary/70 [&_span]:text-spark-accent"
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {GROUPS.map((g) => (
            <StaggerItem key={g.label}>
              <div className="group h-full rounded-3xl border border-spark-accent/15 bg-white/[0.03] p-5 backdrop-blur-md transition-colors hover:border-spark-accent/40 hover:bg-white/[0.05]">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg text-spark-secondary">
                    {g.label}
                  </h3>
                  <span className="font-serif text-xs text-spark-accent">
                    {String(g.items.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span
                      key={item.name}
                      className="group/chip inline-flex items-center gap-1.5 rounded-full border border-spark-accent/20 bg-spark-accent/5 px-2.5 py-1 text-[11px] font-medium text-spark-secondary/85 transition-colors hover:border-spark-accent/50 hover:bg-spark-accent/15 hover:text-spark-secondary"
                    >
                      {item.name}
                      <span className="text-[9px] uppercase tracking-wide text-spark-accent/80">
                        {item.tag}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
