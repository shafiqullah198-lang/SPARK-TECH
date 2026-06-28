"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { ArrowUpRight, Mail, Calendar, Sparkles } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import { useToast } from "@/hooks/use-toast";
import { submitInquiry } from "@/lib/api";

type Shard = {
  id: number;
  sx: number;
  sy: number;
  sr: number;
  w: number;
  h: number;
  bg: string;
  borderClass: string;
  zIndex: number;
};

const SHARDS: Shard[] = [
  { id: 1, sx: -38, sy: -28, sr: -18, w: 220, h: 80,  bg: "bg-spark-primary/30",    borderClass: "border-spark-primary/30",    zIndex: 5 },
  { id: 2, sx:  36, sy: -22, sr:  16, w: 180, h: 100, bg: "bg-spark-accent/30",     borderClass: "border-spark-accent/40",     zIndex: 4 },
  { id: 3, sx: -30, sy:  30, sr:  10, w: 240, h: 70,  bg: "bg-spark-primary-soft/30", borderClass: "border-spark-primary/25",  zIndex: 6 },
  { id: 4, sx:  34, sy:  26, sr: -12, w: 160, h: 90,  bg: "bg-spark-accent/25",     borderClass: "border-spark-accent/35",     zIndex: 3 },
  { id: 5, sx:   0, sy: -42, sr:   4, w: 200, h: 60,  bg: "bg-spark-primary/20",    borderClass: "border-spark-primary/20",    zIndex: 7 },
  { id: 6, sx:  -8, sy:  36, sr:  -8, w: 180, h: 70,  bg: "bg-spark-accent/20",     borderClass: "border-spark-accent/30",     zIndex: 2 },
];

const SERVICES_LIST = [
  "Website Development",
  "Mobile App Development",
  "ERP Systems",
  "CRM Solutions",
  "UI/UX Design",
  "Graphic Design",
  "Social Media Marketing",
  "Branding",
  "E-commerce Development",
  "Analytics & Reporting"
];

const BUDGET_OPTIONS = [
  "<$10k",
  "$10k - $30k",
  "$30k - $50k",
  "$50k+"
];

export function CTASection() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    selected_service: SERVICES_LIST[0],
    budget: BUDGET_OPTIONS[1],
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.5,
  });

  const headlineY = useTransform(p, [0, 1], [80, 0]);
  const headlineO = useTransform(p, [0, 0.5, 1], [0, 0.6, 1]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitInquiry(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Inquiry Sent!",
        description: "Thank you for reaching out. We will get in touch shortly.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        selected_service: SERVICES_LIST[0],
        budget: BUDGET_OPTIONS[1],
        message: "",
      });
      // reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      setIsSubmitting(false);
      toast({
        title: "Submission Failed",
        description: error.message || "There was a problem submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-spark-ink py-32 text-spark-secondary sm:py-44"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-gold opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-spark-accent/15 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* shard canvas */}
        <div className="relative mx-auto h-[260px] w-full max-w-3xl sm:h-[340px]">
          {SHARDS.map((s) => (
            <ShardPiece key={s.id} shard={s} progress={p} />
          ))}

          {/* center core */}
          <motion.div
            style={{
              scale: useTransform(p, [0, 0.7, 1], [0.5, 0.85, 1]),
              opacity: useTransform(p, [0, 0.5, 1], [0, 0.4, 1]),
            }}
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-spark-accent to-spark-primary blur-[2px]"
          >
            <div className="absolute inset-2 rounded-full bg-spark-ink/40 backdrop-blur-sm" />
            <div className="absolute inset-0 rounded-full border border-spark-accent/50 animate-pulse" />
          </motion.div>
        </div>

        {/* headline */}
        <motion.div
          style={{ y: headlineY, opacity: headlineO }}
          className="relative mt-8 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-spark-accent/30 bg-spark-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-spark-accent backdrop-blur-md">
            <span className="h-1 w-1 rounded-full bg-spark-accent" />
            Let's build
          </span>

          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-[clamp(2.6rem,6vw,5rem)] leading-[0.98] tracking-tight text-spark-secondary text-shadow-spark">
            Your next product,
            <br />
            <span className="text-gradient-gold">engineered to win.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-spark-secondary/70 sm:text-lg">
            Tell us what you're building. We'll bring the senior pod, the design
            system and the roadmap — you bring the ambition.
          </p>

          {/* Premium Contact Form Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-3xl border border-spark-accent/20 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl sm:p-10"
          >
            <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-spark-accent">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Maya Hernandez"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-spark-primary/20 bg-white/5 px-4 py-3 text-sm text-spark-secondary placeholder:text-spark-secondary/40 focus:border-spark-accent focus:outline-none focus:ring-1 focus:ring-spark-accent/30 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-spark-accent">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="e.g. maya@northpeak.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-spark-primary/20 bg-white/5 px-4 py-3 text-sm text-spark-secondary placeholder:text-spark-secondary/40 focus:border-spark-accent focus:outline-none focus:ring-1 focus:ring-spark-accent/30 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-spark-accent">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="e.g. +1 555-0199"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-spark-primary/20 bg-white/5 px-4 py-3 text-sm text-spark-secondary placeholder:text-spark-secondary/40 focus:border-spark-accent focus:outline-none focus:ring-1 focus:ring-spark-accent/30 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="selected_service" className="block text-xs font-semibold uppercase tracking-wider text-spark-accent">
                    Project Service
                  </label>
                  <div className="relative mt-2">
                    <select
                      id="selected_service"
                      name="selected_service"
                      value={formData.selected_service}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-2xl border border-spark-primary/20 bg-spark-ink px-4 py-3 text-sm text-spark-secondary focus:border-spark-accent focus:outline-none focus:ring-1 focus:ring-spark-accent/30 transition-all"
                    >
                      {SERVICES_LIST.map((service) => (
                        <option key={service} value={service} className="bg-spark-ink text-spark-secondary">
                          {service}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-spark-accent">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-spark-accent mb-2">
                  Project Budget
                </label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {BUDGET_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, budget: option }))}
                      className={`rounded-xl border py-2.5 text-xs font-medium transition-all ${
                        formData.budget === option
                          ? "border-spark-accent bg-spark-accent/15 text-spark-accent shadow-md shadow-spark-accent/5"
                          : "border-spark-primary/10 bg-white/5 text-spark-secondary/70 hover:bg-white/10"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-spark-accent">
                  Tell us about your project *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Describe your vision, roadmap, timeline and technical constraints..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-2xl border border-spark-primary/20 bg-white/5 px-4 py-3 text-sm text-spark-secondary placeholder:text-spark-secondary/40 focus:border-spark-accent focus:outline-none focus:ring-1 focus:ring-spark-accent/30 transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-spark-accent to-spark-accent-soft px-8 py-4 text-sm font-semibold text-spark-ink shadow-gold transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-spark-ink border-t-transparent" />
                  ) : isSubmitted ? (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Inquiry Submitted Successfully!
                    </>
                  ) : (
                    <>
                      <span>Submit Project Inquiry</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-spark-secondary/40">
            <span>hello@sparktechnology.io</span>
            <span className="hidden h-3 w-px bg-spark-secondary/20 sm:block" />
            <span>Remote · Worldwide</span>
            <span className="hidden h-3 w-px bg-spark-secondary/20 sm:block" />
            <span>Mon–Fri · 9–6</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ShardPiece({
  shard,
  progress,
}: {
  shard: Shard;
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, [0, 1], [`${shard.sx}%`, "0%"]);
  const y = useTransform(progress, [0, 1], [`${shard.sy}%`, "0%"]);
  const rotate = useTransform(progress, [0, 1], [shard.sr, 0]);
  const opacity = useTransform(progress, [0, 0.3, 1], [0, 0.6, 1]);

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        opacity,
        width: shard.w,
        height: shard.h,
        zIndex: shard.zIndex,
      }}
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border ${shard.borderClass} ${shard.bg} backdrop-blur-md`}
    >
      <div className="h-full w-full rounded-2xl bg-gradient-to-br from-white/5 to-transparent" />
    </motion.div>
  );
}
