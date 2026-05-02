"use client";

import React, { useEffect, useState } from "react";
import { fetchLocations } from "@/lib/api";
import Loader from "@/components/ui/Loader";

import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
} from "lucide-react";
import { AppLocation } from "@/lib/types";

export default function Contact() {
  const [locations, setLocations] = useState<AppLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const resp = await fetchLocations();
        setLocations(resp?.data ?? []);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We’re here to help — reach out for bookings, inquiries, or technical support.
          </p>
        </div>

        {locations.map((loc) => (
          <div
            key={loc.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 items-start"
          >

            {/* LEFT: Info */}
            <div className="space-y-5">

              <InfoItem
                icon={<MapPin className="w-5 h-5 text-primary" />}
                text={
                  <>
                    <strong className="text-foreground">{loc.name}</strong>
                    <div className="text-muted-foreground text-sm mt-1">
                      Lat: {loc.latitude}, Lng: {loc.longitude}
                    </div>
                  </>
                }
              />

              {loc.phone?.length > 0 && (
                <InfoItem
                  icon={<Phone className="w-5 h-5 text-primary" />}
                  text={
                    <div className="space-y-1">
                      {loc.phone.map((p, i) => (
                        <div key={i} className="text-foreground">
                          {p}
                        </div>
                      ))}
                    </div>
                  }
                />
              )}

              {loc.email?.length > 0 && (
                <InfoItem
                  icon={<Mail className="w-5 h-5 text-primary" />}
                  text={
                    <div className="space-y-1">
                      {loc.email.map((e, i) => (
                        <div key={i} className="text-foreground">
                          {e}
                        </div>
                      ))}
                    </div>
                  }
                />
              )}

              {loc.web?.length > 0 && (
                <InfoItem
                  icon={<Globe className="w-5 h-5 text-primary" />}
                  text={
                    <div className="space-y-1">
                      {loc.web.map((w, i) => (
                        <a
                          key={i}
                          href={`https://${w}`}
                          target="_blank"
                          className="block text-foreground hover:text-primary transition"
                        >
                          {w}
                        </a>
                      ))}
                    </div>
                  }
                />
              )}

              {loc.workingHours && (
                <InfoItem
                  icon={<Clock className="w-5 h-5 text-primary" />}
                  text={
                    <div className="space-y-1 text-sm">
                      {Object.entries(loc.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="text-muted-foreground capitalize">
                            {day}
                          </span>
                          <span className="text-foreground font-medium">
                            {hours as string}
                          </span>
                        </div>
                      ))}
                    </div>
                  }
                />
              )}
            </div>

            {/* RIGHT: Map */}
            <div className="h-[500px] rounded-2xl overflow-hidden border border-border shadow-lg backdrop-blur-xl bg-background/40">
              <iframe
                src={`https://www.google.com/maps?q=${loc.latitude},${loc.longitude}&z=15&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Description */}
            <p className="col-span-full text-center text-muted-foreground italic text-lg mt-6">
              {loc.description}
            </p>

          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Helper ---------------- */

function InfoItem({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <div
      className="
        flex items-start gap-4 p-5
        rounded-xl

        backdrop-blur-md
        bg-background/50
        border border-border

        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-md
      "
    >
      <div className="mt-0.5">{icon}</div>

      <div className="text-foreground text-sm leading-relaxed">
        {text}
      </div>
    </div>
  );
}