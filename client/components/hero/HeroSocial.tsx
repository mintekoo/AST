import HeroSocialClient from "./HeroSocialClient";
import { fetchSocials } from "@/lib/api";

export default async function HeroSocial() {
  const res = await fetchSocials({ perPage: 10 });

  return <HeroSocialClient socials={res.data ?? []} />;
}