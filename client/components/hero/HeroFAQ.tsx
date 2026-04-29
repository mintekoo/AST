import HeroFAQClient from "./HeroFAQClient";
import { fetchFAQs } from "@/lib/api";

export default async function HeroFAQ() {
  const res = await fetchFAQs({ perPage: 10 });

  return <HeroFAQClient faqs={res.data ?? []} />;
}