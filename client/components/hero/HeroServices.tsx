// components/hero/HeroServices.tsx
import HeroServicesClient from "./HeroServicesClient";
import { fetchServices } from "@/lib/api";

export default async function HeroServices() {
  const res = await fetchServices({ page: 1, perPage: 10 });

  return (
    <HeroServicesClient services={res.data ?? []} />
  );
}