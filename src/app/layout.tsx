import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spark Technology — Premium Digital Solutions for Ambitious Brands",
  description:
    "Spark Technology is a premium software house crafting websites, mobile apps, ERP, CRM, branding and analytics solutions for startups, SMEs, enterprises and e-commerce brands.",
  keywords: [
    "Spark Technology",
    "software house",
    "web development",
    "mobile app development",
    "ERP systems",
    "CRM solutions",
    "UI/UX design",
    "branding",
    "e-commerce development",
    "analytics",
    "social media marketing",
  ],
  authors: [{ name: "Spark Technology" }],
  openGraph: {
    title: "Spark Technology — Premium Digital Solutions",
    description:
      "We architect digital products that move businesses forward — websites, apps, ERP, CRM and brand systems.",
    siteName: "Spark Technology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spark Technology — Premium Digital Solutions",
    description:
      "We architect digital products that move businesses forward — websites, apps, ERP, CRM and brand systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
