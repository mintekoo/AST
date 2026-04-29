import HeroGalleryClient from "./HeroGalleryClient";
import { fetchGalleries } from "@/lib/api";

export default async function HeroGallery() {
  const res = await fetchGalleries({ perPage: 10 });

  return <HeroGalleryClient galleries={res.data ?? []} />;
}