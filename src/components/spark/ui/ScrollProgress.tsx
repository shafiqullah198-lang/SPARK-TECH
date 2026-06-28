"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — premium gradient progress bar pinned to the top.
 * Doubles as a scroll-position indicator for the cinematic storyboard.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-spark-primary via-spark-accent to-spark-primary"
    >
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-r from-transparent to-spark-accent blur-[2px]" />
    </motion.div>
  );
}
