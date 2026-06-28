"use client";

import * as React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#portfolio" },
  { label: "Tech", href: "#technologies" },
  { label: "Voices", href: "#testimonials" },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  React.useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 24));
    return () => unsub();
  }, [scrollY]);

  const pad = useTransform(
    scrollY,
    [0, 80],
    ["1.4rem", "0.85rem"]
  );

  return (
    <motion.header
      style={{ paddingTop: pad, paddingBottom: pad }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={false}
          animate={{
            backgroundColor: scrolled
              ? "rgba(245, 240, 232, 0.72)"
              : "rgba(245, 240, 232, 0.0)",
            borderColor: scrolled
              ? "rgba(122, 31, 31, 0.10)"
              : "rgba(122, 31, 31, 0.0)",
            boxShadow: scrolled
              ? "0 24px 60px -36px rgba(74,15,15,0.35)"
              : "0 0 0 0 rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between rounded-full border px-4 py-2.5 backdrop-blur-xl sm:px-5"
        >
          {/* Logo */}
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-spark-primary text-spark-secondary shadow-spark">
              <Sparkles className="h-4 w-4" strokeWidth={2.2} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-spark-accent animate-pulse" />
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-[15px] tracking-wide text-spark-ink">
                Spark
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-spark-muted">
                Technology
              </span>
            </div>
          </a>

          {/* Center nav */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-spark-ink/80 transition-colors hover:text-spark-primary"
              >
                {item.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-spark-primary to-spark-accent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#contact"
              className="text-sm font-medium text-spark-ink/80 transition-colors hover:text-spark-primary"
            >
              Sign in
            </a>
            <MagneticButton href="#contact" variant="primary" strength={14}>
              Start a project
              <span className="ml-0.5">→</span>
            </MagneticButton>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-spark-primary/15 bg-white/40 text-spark-primary backdrop-blur-md md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 overflow-hidden rounded-3xl border border-spark-primary/10 bg-spark-secondary/85 p-3 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col">
                {NAV.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-sm font-medium text-spark-ink/85 hover:bg-white/60"
                  >
                    {item.label}
                  </a>
                ))}
                <MagneticButton
                  href="#contact"
                  variant="primary"
                  strength={10}
                  className="mt-2 w-full"
                >
                  Start a project →
                </MagneticButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
