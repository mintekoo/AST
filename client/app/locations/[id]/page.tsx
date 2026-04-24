import { fetchLocation } from "@/lib/api";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

type Props = {
  params: { id: string };
};

export default async function LocationDetailPage({ params }: Props) {
  const resp = await fetchLocation(params.id);
  const loc = resp?.data;

  if (!loc) {
    return <div className="p-10 text-center">Location not found</div>;
  }

  return (
    <main className="py-20 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4">

        <h1 className="text-3xl font-bold mb-6">{loc.name}</h1>

        <p className="mb-6 text-muted">{loc.description}</p>

        <div className="space-y-4">

          <InfoItem
            icon={<MapPin className="w-5 h-5 text-primary" />}
            text={`Lat: ${loc.latitude}, Lng: ${loc.longitude}`}
          />

          <InfoItem
            icon={<Phone className="w-5 h-5 text-primary" />}
            text={loc.phone?.map((p) => <div key={p}>+251 {p}</div>)}
          />

          <InfoItem
            icon={<Mail className="w-5 h-5 text-primary" />}
            text={loc.email?.map((e) => <div key={e}>{e}</div>)}
          />

          <InfoItem
            icon={<Globe className="w-5 h-5 text-primary" />}
            text={loc.web?.map((w) => (
              <a key={w} href={`https://${w}`} target="_blank" className="block hover:underline">
                {w}
              </a>
            ))}
          />
        </div>

        {/* Map */}
        <div className="mt-8 h-[400px] rounded-xl overflow-hidden border">
          <iframe
            src={`https://www.google.com/maps?q=${loc.latitude},${loc.longitude}&z=15&output=embed`}
            width="100%"
            height="100%"
            loading="lazy"
          />
        </div>
      </div>
    </main>
  );
}

function InfoItem({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 p-3 border rounded-lg">
      {icon}
      <div>{text}</div>
    </div>
  );
}