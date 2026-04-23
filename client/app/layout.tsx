// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next"
import ScrollToTop from "./ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://api.adinascarrent.com"),
  title: {
    default: "Abyssinia Software ",
    template: "%s | Abyssinia Software",
  },
  description:
    "Discover premium cars with transparent pricing, expert insights, and a modern shopping experience.",
  openGraph: {
    title: "Abyssinia Software ",
    description:
      "Discover premium cars with transparent pricing, expert insights, and a modern shopping experience.",
    url: "https://api.adinascarrent.com/",
    siteName: "Abyssinia Software",
    images: [{ url: "/next.svg", width: 1200, height: 630, alt: "Abyssinia Software" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abyssinia Software ",
    description:
      "Discover premium cars with transparent pricing, expert insights, and a modern shopping experience.",
    images: ["/next.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "cars",
    "auto shop",
    "buy car",
    "electric",
    "SUV",
    "dealership",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
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
