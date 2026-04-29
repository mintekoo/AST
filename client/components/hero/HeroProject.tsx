// HeroProject.tsx (SERVER COMPONENT)
import HeroProjectClient from "./HeroProjectClient";
import { fetchProjects } from "@/lib/api";

export default async function HeroProject() {
  const res = await fetchProjects({ page: 1, perPage: 10 });

  return (
    <HeroProjectClient products={res.data ?? []} />
  );
}