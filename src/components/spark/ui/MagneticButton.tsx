"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button" | "a";
  href?: string;
  variant?: "primary" | "ghost" | "gold" | "outline";
  strength?: number;
  children: React.ReactNode;
}

/**
 * MagneticButton — premium magnetic hover effect.
 * The button gently follows the cursor inside its hit area
 * and snaps back with a spring on leave.
 */
export function MagneticButton({
  as = "button",
  href,
  variant = "primary",
  strength = 18,
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / rect.width) * strength);
    y.set((relY / rect.height) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 will-change-transform select-none";

  const variants: Record<string, string> = {
    primary:
      "bg-spark-primary text-spark-secondary hover:bg-spark-primary-deep shadow-spark",
    gold: "bg-spark-accent text-spark-ink hover:bg-spark-accent-soft shadow-gold",
    outline:
      "border border-spark-primary/30 text-spark-primary hover:border-spark-primary/60 hover:bg-spark-primary/5",
    ghost:
      "text-spark-primary hover:bg-spark-primary/5 backdrop-blur-md border border-transparent",
  };

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className="relative z-10 inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  const Tag: any = as === "a" ? motion.a : motion.button;

  return (
    <Tag
      ref={ref as any}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(base, variants[variant], className)}
      whileTap={{ scale: 0.96 }}
      {...(props as any)}
    >
      {/* sheen */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute -inset-x-2 -top-1 h-[160%] w-1/3 -translate-x-[120%] rotate-12 bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[260%]" />
      </span>
      {inner}
    </Tag>
  );
}
