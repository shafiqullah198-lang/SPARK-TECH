"use client";

import * as React from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/** Container that staggers its children when scrolled into view. */
export const StaggerGroup = ({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Item used inside <StaggerGroup>. */
export const StaggerItem = ({
  children,
  className,
  y = 28,
  x = 0,
  duration = 0.7,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  x?: number;
  duration?: number;
}) => {
  const item: Variants = {
    hidden: { opacity: 0, y, x },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div variants={item} className={cn(className)}>
      {children}
    </motion.div>
  );
};
