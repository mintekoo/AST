import HeroCategoryClient from "./HeroCategoryClient";
import { fetchCategories } from "@/lib/api";

export default async function HeroCategory() {
  const res = await fetchCategories({ perPage: 10 });

  return <HeroCategoryClient categories={res.data ?? []} />;
}