import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactForm from "@/components/form/ContactForm";
import { fetchLocations } from "@/lib/api";
import { MapPin, Phone, Mail, Clock, ArrowRight, Globe } from "lucide-react";
import type { AppLocation } from "@/lib/types";
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

export default async function ContactPage() {
  const resp = await fetchLocations();
  const locations: AppLocation[] = resp?.data ?? [];
  const primaryLoc = locations[0];

  const hoursToday = getTodayHours(primaryLoc?.workingHours);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteInfo.name,
    "image": `${siteInfo.baseUrl}/og-image.png`,
    "url": `${siteInfo.baseUrl}/contactus`,
    "telephone": primaryLoc?.phone?.[0] || siteInfo.phone,
    "email": primaryLoc?.email?.[0] || siteInfo.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Addis Ababa",
      "addressCountry": "ET"
    }
  };

  return (
    <main className="text-foreground transition-colors duration-300">
      {/* JSON-LD Schema for Local SEO */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Container className="py-16 sm:py-24 space-y-16">
        <SectionHeader
          title="Contact Us"
          className="text-center"
        />
        <div className="flex flex-col lg:flex-row items-stretch gap-16">

          {/* LEFT: Contact Information (40%) */}
          <div className="lg:w-5/12 space-y-10">

            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Let's <span className="text-primary">Connect.</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed">
                {primaryLoc?.description || "Our team is here to help you scale your business with modern software solutions."}
              </p>
            </div>

            <div className="grid gap-4">

              {/* OFFICE */}
              <ContactInfoItem
                icon={<MapPin className="w-5 h-5" />}
                title="Office"
                detail={primaryLoc?.name || "N/A"}
              />

              {/* PHONE (ONE CARD) */}
              {primaryLoc?.phone?.length > 0 && (
                <ContactInfoItem
                  icon={<Phone className="w-5 h-5" />}
                  title="Phone"
                  detail={
                    <div className="flex flex-col gap-1">
                      {primaryLoc.phone.map((p: string, i: number) => (
                        <a
                          key={i}
                          href={`tel:${p}`}
                          className="hover:text-primary transition"
                        >
                          {p}
                        </a>
                      ))}
                    </div>
                  }
                />
              )}

              {/* EMAIL (ONE CARD) */}
              {primaryLoc?.email?.length > 0 && (
                <ContactInfoItem
                  icon={<Mail className="w-5 h-5" />}
                  title="Email"
                  detail={
                    <div className="flex flex-col gap-1">
                      {primaryLoc.email.map((e: string, i: number) => (
                        <a
                          key={i}
                          href={`mailto:${e}`}
                          className="hover:text-primary transition"
                        >
                          {e}
                        </a>
                      ))}
                    </div>
                  }
                />
              )}

              {/* WEB (ONE CARD) */}
              {primaryLoc?.web?.length > 0 && (
                <ContactInfoItem
                  icon={<Globe className="w-5 h-5" />}
                  title="Website"
                  detail={
                    <div className="flex flex-col gap-1">
                      {primaryLoc.web.map((w: string, i: number) => (
                        <a
                          key={i}
                          href={`https://${w}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition"
                        >
                          {w}
                        </a>
                      ))}
                    </div>
                  }
                />
              )}

              {/* HOURS */}
              <ContactInfoItem
                icon={<Clock className="w-5 h-5" />}
                title="Today's Hours"
                detail={hoursToday}
              />

            </div>
          </div>

          {/* RIGHT: Contact Form (60%) */}
          <div className="lg:w-7/12">
            <div className="p-8 sm:p-12 rounded-[3rem] backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-2xl relative overflow-hidden">
              {/* Aesthetic Background Brand Initial */}
              <span className="absolute -top-10 -right-10 text-[200px] font-black text-primary/[0.01] dark:text-white/[0.02] pointer-events-none select-none">
                A
              </span>

              <div className="relative z-10">
                <div className="mb-10">
                  <h3 className="text-2xl font-bold">Send a Message</h3>
                  <p className="text-muted mt-2 text-sm">Fill out the form and we will get back to you shortly.</p>
                </div>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM: Full Width Map */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              Our Location <ArrowRight className="w-4 h-4 text-primary" />
            </h3>
            <span className="text-xs font-mono text-muted">
              {primaryLoc?.latitude}, {primaryLoc?.longitude}
            </span>
          </div>

          <div className="h-[450px] w-full rounded-[3rem] overflow-hidden backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-inner relative group">
            <iframe
              title="Office Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={`https://maps.google.com/maps?q=${primaryLoc?.latitude},${primaryLoc?.longitude}&z=15&output=embed`}
              className="grayscale-[0.4] contrast-[1.1] opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]" />
          </div>
        </div>
      </Container>
    </main>
  );
}

function ContactInfoItem({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-5 p-6 rounded-2xl backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 hover:border-primary/40 transition-all duration-300 group shadow-lg hover:-translate-y-1 hover:shadow-xl">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
        {icon}
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary opacity-70">
          {title}
        </p>

        <div className="text-base font-bold mt-0.5">
          {detail}
        </div>
      </div>

    </div>
  );
}

function getTodayHours(workingHours?: any) {
  if (!workingHours) return "Closed";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  }).toLowerCase();

  const value = workingHours[today];

  return typeof value === "string" ? value : "Closed";
}