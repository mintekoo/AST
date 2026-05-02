// app/contacts/page.tsx
import Contact from "@/app/staticsPages/Contact";
import { Metadata } from "next";
import Script from "next/script";
import { siteInfo } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Abyssinia Software Technology PLC",
  description: "Get in touch with Abyssinia Software Technology PLC. Find our address, phone number, and email for the best software development services in Addis Ababa, Ethiopia.",
  keywords: [
    "contact software company Ethiopia",
    "Abyssinia Software Technology address",
    "software developers in Addis Ababa contact",
    "IT company Ethiopia phone number",
  ],
};

export default function ContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteInfo.name,
    "image": `${siteInfo.baseUrl}/og-image.png`,
    "url": `${siteInfo.baseUrl}/contacts`,
    "telephone": siteInfo.phone,
    "email": siteInfo.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Addis Ababa",
      "addressCountry": "ET"
    }
  };

  return (
    <main className="text-foreground">
      {/* JSON-LD Schema for Local SEO */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Contact />
    </main>
  );
}
