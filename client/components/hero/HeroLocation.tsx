import HeroLocationClient from "./HeroLocationClient";
import { fetchLocations } from "@/lib/api";

export default async function HeroLocation() {
  const res = await fetchLocations({ perPage: 10 });

  return <HeroLocationClient locations={res.data ?? []} />;
}