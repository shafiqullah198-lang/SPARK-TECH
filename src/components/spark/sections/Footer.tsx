"use client";

import * as React from "react";
import { Sparkles, Github, Twitter, Linkedin, Dribbble, ArrowUpRight } from "lucide-react";

const FOOTER_NAV: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Website Development", href: "#services" },
      { label: "Mobile Apps", href: "#services" },
      { label: "ERP Systems", href: "#services" },
      { label: "CRM Solutions", href: "#services" },
      { label: "UI/UX Design", href: "#services" },
      { label: "Branding", href: "#services" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About", href: "#" },
      { label: "Process", href: "#process" },
      { label: "Work", href: "#portfolio" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Spark Journal", href: "#" },
      { label: "Case studies", href: "#portfolio" },
      { label: "Design system", href: "#" },
      { label: "Open source", href: "#" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "hello@sparktechnology.io", href: "mailto:hello@sparktechnology.io" },
      { label: "Book a call", href: "#contact" },
      { label: "Press kit", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

const SOCIALS = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Dribbble, label: "Dribbble", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-spark-primary/15 bg-spark-secondary pt-20">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-30" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* top — brand + nav */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* brand block */}
          <div className="lg:col-span-4">
            <a href="#top" className="inline-flex items-center gap-2.5">
              <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-spark-primary text-spark-secondary shadow-spark">
                <Sparkles className="h-4 w-4" strokeWidth={2.2} />
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-spark-accent" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-base tracking-wide text-spark-ink">
                  Spark
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-spark-muted">
                  Technology
                </span>
              </div>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-spark-muted">
              A premium software house crafting digital products for ambitious
              brands — websites, mobile apps, ERP, CRM, brand systems and
              analytics under one roof.
            </p>

            <div className="mt-6 flex gap-2">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-spark-primary/15 bg-white/50 text-spark-primary backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-spark-primary/35 hover:bg-spark-primary hover:text-spark-secondary"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* nav grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_NAV.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-spark-ink/70">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group inline-flex items-center gap-1 text-sm text-spark-muted transition-colors hover:text-spark-primary"
                      >
                        {l.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* newsletter strip */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-3xl border border-spark-primary/12 bg-white/40 p-6 backdrop-blur-md sm:flex-row sm:items-center">
          <div>
            <h4 className="font-serif text-xl text-spark-ink">
              The Spark Journal
            </h4>
            <p className="text-sm text-spark-muted">
              Monthly notes on product, design and growth. No fluff.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md items-center gap-2"
          >
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 rounded-full border border-spark-primary/15 bg-white/60 px-4 py-2.5 text-sm text-spark-ink placeholder:text-spark-muted focus:border-spark-primary/40 focus:outline-none focus:ring-2 focus:ring-spark-accent/30"
            />
            <button
              type="submit"
              className="rounded-full bg-spark-primary px-5 py-2.5 text-sm font-medium text-spark-secondary transition-colors hover:bg-spark-primary-deep"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* bottom row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-spark-primary/10 py-6 sm:flex-row">
          <p className="text-xs text-spark-muted">
            © {new Date().getFullYear()} Spark Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-spark-muted">
            <a href="#" className="hover:text-spark-primary">Privacy</a>
            <a href="#" className="hover:text-spark-primary">Terms</a>
            <a href="#" className="hover:text-spark-primary">Cookies</a>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              All systems operational
            </span>
          </div>
        </div>
      </div>

      {/* giant brand wordmark */}
      <div
        aria-hidden
        className="pointer-events-none mt-8 select-none overflow-hidden"
      >
        <div className="-mb-6 whitespace-nowrap text-center font-serif text-[clamp(4rem,18vw,16rem)] leading-none text-spark-primary/10 sm:-mb-10">
          Spark Technology
        </div>
      </div>
    </footer>
  );
}
