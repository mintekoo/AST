import HeroTestimonialClient from "./HeroTestimonialClient";
import { fetchTestimonials } from "@/lib/api";

export default async function HeroTestimonial() {
  const res = await fetchTestimonials({ perPage: 10 });

  return <HeroTestimonialClient testimonials={res.data ?? []} />;
}