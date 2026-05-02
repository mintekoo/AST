// components/hero/HeroAbout.tsx
import HeroAboutClient from "./HeroAboutClient";
import { fetchAbouts } from "@/lib/api";

export default async function HeroAbout() {
  const res = await fetchAbouts({ page: 1, perPage: 5 });

  return <HeroAboutClient abouts={res.data ?? []} />;
}