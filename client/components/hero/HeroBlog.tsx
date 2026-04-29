// components/hero/HeroBlog.tsx

import HeroBlogClient from "./HeroBlogClient";
import { fetchBlogs } from "@/lib/api";

export default async function HeroBlog() {
  const res = await fetchBlogs({ page: 1, perPage: 10 });

  return (
    <HeroBlogClient blogs={res.data ?? []} />
  );
}