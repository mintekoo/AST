// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import LineWaves from "@/components/ui/LineWaves";
import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// import Hero from "@/components/sections/Hero";
import ScrollToTop from "./ScrollToTop";

import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";

import { siteInfo } from "@/lib/site";
import { cn } from "@/lib/utils";

const geistHeading = Geist({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* =========================
   ROOT METADATA (CLEAN + DYNAMIC)
========================= */
export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.baseUrl),

  title: {
    default: `${siteInfo.name} | Software Development Company in Ethiopia`,
    template: `%s | ${siteInfo.shortName}`,
  },

  description: siteInfo.description,

  keywords: [
    ...siteInfo.baseKeywords,
    ...siteInfo.seoBoostKeywords,
  ],

  openGraph: {
    title: `${siteInfo.name} | Software Company in Ethiopia`,
    description: siteInfo.description,
    url: siteInfo.baseUrl,
    siteName: siteInfo.shortName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteInfo.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteInfo.name} | Software Development Ethiopia`,
    description: siteInfo.description,
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable, geistHeading.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* 🔥 Background Layer */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            <LineWaves
              speed={0.2}
              innerLineCount={20}
              outerLineCount={24}
              warpIntensity={0.6}
              brightness={0.12}
              color1="#089d25"
              color2="#089d25"
              color3="#089d25"
            />
          </div>

          {/* App Content */}
          <Navbar />
          <ScrollToTop />
          {/* <Hero /> */}
          {children}
          <Analytics />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
