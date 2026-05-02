import { fetchLocations } from "@/lib/api";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Locations | Abyssinia Software Technology",
  description: "Find Abyssinia Software Technology's office locations in Addis Ababa, Ethiopia. Get directions, contact details, and our working hours.",
  keywords: [
    "Abyssinia Software location",
    "software company address Ethiopia",
    "Addis Ababa tech company location"
  ],
};

export default async function LocationsPage() {
  const resp = await fetchLocations();
  const locations = resp?.data ?? [];

  return (
    <main className="py-20 backdrop-blur-md text-foreground">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-primary">
            Our Locations
          </h2>
          <p className="mt-4 text-lg">
            Find us, contact us, or visit our office.
          </p>
        </div>

        {locations.map((loc) => (
          <div
            key={loc.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
          >
            {/* LEFT: Info */}
            <div className="space-y-6 text-bold">

              {/* Address */}
              <InfoItem
                icon={<MapPin className="w-6 h-6 text-primary" />}
                text={
                  <>
                    <strong>{loc.name}</strong>
                    <br />
                    Lat: {loc.latitude}, Lng: {loc.longitude}
                  </>
                }
              />

              {/* Phones */}
              {loc.phone?.length > 0 && (
                <InfoItem
                  icon={<Phone className="w-6 h-6 text-primary" />}
                  text={
                    <>
                      {loc.phone.map((p, i) => (
                        <div key={i}>{p}</div>
                      ))}
                    </>
                  }
                />
              )}

              {/* Emails */}
              {loc.email?.length > 0 && (
                <InfoItem
                  icon={<Mail className="w-6 h-6 text-primary" />}
                  text={
                    <>
                      {loc.email.map((e, i) => (
                        <div key={i}>{e}</div>
                      ))}
                    </>
                  }
                />
              )}

              {/* Websites */}
              {loc.web?.length > 0 && (
                <InfoItem
                  icon={<Globe className="w-6 h-6 text-primary" />}
                  text={
                    <>
                      {loc.web.map((w, i) => (
                        <a
                          key={i}
                          href={`https://${w}`}
                          target="_blank"
                          className="block hover:underline"
                        >
                          {w}
                        </a>
                      ))}
                    </>
                  }
                />
              )}

              {/* Working Hours */}
              {loc.workingHours && (
                <InfoItem
                  icon={<Clock className="w-6 h-6 text-primary" />}
                  text={
                    <div className="space-y-1 text-sm">
                      {Object.entries(loc.workingHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between gap-4">
                          <span className="capitalize text-foreground/70">
                            {day}
                          </span>
                          <span className="font-medium text-foreground">
                            {hours as string}
                          </span>
                        </div>
                      ))}
                    </div>
                  }
                />
              )}


            </div>

            {/* RIGHT: Google Map */}
            <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-xl border border-muted">
              <iframe
                src={`https://www.google.com/maps?q=${loc.latitude},${loc.longitude}&z=15&output=embed`}
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Footer */}
            <p className="col-span-full block  text-center italic text-lg">
              {loc.description}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

/* Helper */
function InfoItem({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl backdrop-blur-xl bg-white/40 dark:bg-black/30 border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
      <span className="mt-1">{icon}</span>

      {/* CHANGE THIS */}
      <div className="text-foreground/80 text-lg leading-relaxed">
        {text}
      </div>
    </div>
  );
}