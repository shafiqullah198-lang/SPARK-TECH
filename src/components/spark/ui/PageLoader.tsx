"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [progress, setProgress] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 500);
          return 100;
        }
        const diff = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + diff, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100vh", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F7F3ED] text-[#2D2520]"
        >
          <div className="flex flex-col items-center max-w-xs w-full px-6">
            {/* Spark Logo Symbol pulsing */}
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-24 w-24 mb-10 flex items-center justify-center rounded-2xl bg-[#FFFDF9] border border-[#7A1F1F]/10 shadow-spark"
            >
              <img
                src="/logo-symbol.png"
                alt="Spark Technology Logo"
                className="h-14 w-14 object-contain drop-shadow-[0_0_12px_rgba(0,162,255,0.4)]"
              />
            </motion.div>

            {/* Percentage counter */}
            <div className="font-serif text-3xl font-medium tracking-tight text-gradient-spark mb-4">
              {progress}%
            </div>

            {/* Loading progress bar */}
            <div className="relative h-[2px] w-48 overflow-hidden rounded-full bg-[#7A1F1F]/10">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7A1F1F] to-[#D4AF37]"
              />
            </div>
            
            <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#7c6a63]">
              Sparking Growth...
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
