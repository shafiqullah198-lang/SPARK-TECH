const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Fallback datasets to ensure the website continues to render beautifully even if the backend is offline.
export const DEFAULT_SERVICES = [
  {
    id: 1,
    title: "Website Development",
    slug: "website-development",
    short_description: "Cinematic marketing sites, headless commerce and high-performance platforms engineered for speed and scale.",
    desc: "Cinematic marketing sites, headless commerce and high-performance platforms engineered for speed and scale.",
    bullets: ["Next.js / React", "Headless CMS", "Edge rendering"],
    accent: "primary" as const,
    image: "/assets/services/web-dev.png",
    span: true,
  },
  {
    id: 2,
    title: "Mobile App Development",
    slug: "mobile-app-development",
    short_description: "Native-feel iOS & Android apps with offline-first architecture and 60fps motion.",
    desc: "Native-feel iOS & Android apps with offline-first architecture and 60fps motion.",
    bullets: ["React Native", "Flutter", "Push & deep links"],
    accent: "gold" as const,
    image: "/assets/services/mobile-apps.png",
  },
  {
    id: 3,
    title: "ERP Systems",
    slug: "erp-systems",
    short_description: "Unified ERP backbones that connect inventory, finance, HR and operations into one source of truth.",
    desc: "Unified ERP backbones that connect inventory, finance, HR and operations into one source of truth.",
    bullets: ["Custom modules", "Real-time sync", "Role-based access"],
    accent: "primary" as const,
    image: "/assets/services/erp.png",
  },
  {
    id: 4,
    title: "CRM Solutions",
    slug: "crm-solutions",
    short_description: "Customer platforms that turn pipelines into revenue — automations, dashboards and AI insights.",
    desc: "Customer platforms that turn pipelines into revenue — automations, dashboards and AI insights.",
    bullets: ["Sales pipelines", "Automations", "Analytics"],
    accent: "gold" as const,
    image: "/assets/services/crm.png",
  },
  {
    id: 5,
    title: "UI/UX Design",
    slug: "ui-ux-design",
    short_description: "Research-led product design — flows, prototypes and design systems that ship in weeks, not months.",
    desc: "Research-led product design — flows, prototypes and design systems that ship in weeks, not months.",
    bullets: ["Discovery", "Design systems", "Prototyping"],
    accent: "primary" as const,
    image: "/assets/services/uiux.png",
  },
  {
    id: 6,
    title: "Graphic Design",
    slug: "graphic-design",
    short_description: "Editorial-grade visual assets — from pitch decks to social kits and motion graphics.",
    desc: "Editorial-grade visual assets — from pitch decks to social kits and motion graphics.",
    bullets: ["Pitch decks", "Social kits", "Motion"],
    accent: "gold" as const,
    image: "/assets/services/graphic.png",
  },
  {
    id: 7,
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    short_description: "Performance creative + community ops that compound reach and convert attention into revenue.",
    desc: "Performance creative + community ops that compound reach and convert attention into revenue.",
    bullets: ["Content calendars", "Paid social", "Community"],
    accent: "primary" as const,
    image: "/assets/services/social.png",
  },
  {
    id: 8,
    title: "Branding",
    slug: "branding",
    short_description: "Strategic brand systems — naming, identity, voice and guidelines built to scale across surfaces.",
    desc: "Strategic brand systems — naming, identity, voice and guidelines built to scale across surfaces.",
    bullets: ["Identity", "Voice", "Guidelines"],
    accent: "gold" as const,
    image: "/assets/services/branding.png",
  },
  {
    id: 9,
    title: "E-commerce Development",
    slug: "e-commerce-development",
    short_description: "Conversion-engineered storefronts on Shopify, custom or headless — built to scale to 8 figures.",
    desc: "Conversion-engineered storefronts on Shopify, custom or headless — built to scale to 8 figures.",
    bullets: ["Shopify / Headless", "Subscriptions", "A/B testing"],
    accent: "primary" as const,
    image: "/assets/services/ecommerce.png",
    span: true,
  },
  {
    id: 10,
    title: "Analytics & Reporting",
    slug: "analytics-reporting",
    short_description: "Unified dashboards that connect every channel into one source of truth — and the insights to act on it.",
    desc: "Unified dashboards that connect every channel into one source of truth — and the insights to act on it.",
    bullets: ["BI dashboards", "ETL pipelines", "AI insights"],
    accent: "gold" as const,
    image: "/assets/services/analytics.png",
  },
];

export const DEFAULT_PORTFOLIO = [
  {
    client: "NorthPeak",
    category: "E-commerce Platform",
    title: "Headless commerce rebuild that 3x'd conversion",
    result: "Migrated a legacy Shopify storefront to a custom headless build with edge personalization.",
    metric: "3.1×",
    metricLabel: "Conversion",
    image: "/assets/portfolio/northpeak.png",
    palette: "from-spark-primary to-spark-primary-deep",
    size: "lg" as const,
    featured: true,
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
    size: "md" as const,
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
    size: "md" as const,
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
    size: "sm" as const,
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
    size: "sm" as const,
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
    size: "md" as const,
  },
];

export const DEFAULT_TESTIMONIALS = [
  {
    quote: "Spark rebuilt our storefront in nine weeks. Conversion 3x'd in the first quarter post-launch — the ROI was unambiguous. They felt like our team, not a vendor.",
    name: "Maya Hernandez",
    role: "VP Growth",
    company: "NorthPeak",
    initials: "MH",
    rating: 5,
    accent: "primary" as const,
  },
  {
    quote: "The ERP Spark built replaced nine tools. Our ops team finally has one source of truth — and our finance close dropped from 14 days to 3.",
    name: "Daniel Park",
    role: "COO",
    company: "Atlas Retail",
    initials: "DP",
    rating: 5,
    accent: "gold" as const,
  },
  {
    quote: "Best product studio we've worked with. Senior pod, no handoffs, weekly demos. They shipped our v1 in six weeks and we raised Series A off the prototype.",
    name: "Aisha Karim",
    role: "Founder & CEO",
    company: "Quantica",
    initials: "AK",
    rating: 5,
    accent: "primary" as const,
  },
  {
    quote: "Their design system work alone paid for the engagement. Every screen since has shipped 40% faster — and looks award-winning.",
    name: "Tom Whitfield",
    role: "Head of Design",
    company: "Lumen Labs",
    initials: "TW",
    rating: 5,
    accent: "gold" as const,
  },
  {
    quote: "We retained Spark after launch for roadmap. Two years in, they've shipped four major releases and our churn is down 41%.",
    name: "Sofia Rinaldi",
    role: "CPO",
    company: "Helix Bank",
    initials: "SR",
    rating: 5,
    accent: "primary" as const,
  },
  {
    quote: "From brand strategy to analytics dashboard, Spark owned the whole stack. The work is genuinely beautiful — and it performs.",
    name: "Marcus Chen",
    role: "CMO",
    company: "Verdant",
    initials: "MC",
    rating: 5,
    accent: "gold" as const,
  },
];

export const DEFAULT_SETTINGS = {
  company_name: "Spark Technology",
  logo: "/assets/spark-logo.jpg",
  whatsapp_number: "+1234567890",
  email: "hello@sparktechnology.io",
  address: "Remote · Worldwide",
  social_twitter: "#",
  social_linkedin: "#",
  social_dribbble: "#",
  social_github: "#",
};

// Safe request wrapper that falls back if API fails
async function fetchSafe<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      next: { revalidate: 60 } // dynamic ISR/cache cache for Next.js
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json() as T;
  } catch (e) {
    console.warn(`Failed to fetch from Spark API "${endpoint}":`, e);
    return fallback;
  }
}

export async function getServices() {
  return fetchSafe("services/", DEFAULT_SERVICES);
}

export async function getPortfolio() {
  return fetchSafe("portfolio/", DEFAULT_PORTFOLIO);
}

export async function getTestimonials() {
  return fetchSafe("testimonials/", DEFAULT_TESTIMONIALS);
}

export async function getSiteSettings() {
  return fetchSafe("settings/", DEFAULT_SETTINGS);
}

export interface InquiryInput {
  name: string;
  email: string;
  phone: string;
  selected_service: string;
  budget: string;
  message: string;
}

export async function submitInquiry(data: InquiryInput) {
  const res = await fetch(`${API_BASE_URL}/inquiries/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Failed submission: ${res.status}`);
  }

  return await res.json();
}
