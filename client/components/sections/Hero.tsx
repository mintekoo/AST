import HeroClient from "./HeroClient";
import { fetchProjects } from "@/lib/api";

export default async function Hero() {
  const res = await fetchProjects({ page: 1, perPage: 10 });

  const featuredProducts = res.data ?? [];

  return <HeroClient featuredProducts={featuredProducts} />;
}