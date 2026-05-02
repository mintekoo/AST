import HeroCertificationsClient from "./HeroCertificationsClient";
import { fetchCertifications } from "@/lib/api";

export default async function HeroCertifications() {
  const res = await fetchCertifications({
    page: 1,
    perPage: 10,
  });

  return (
    <HeroCertificationsClient
      certifications={res.data ?? []}
    />
  );
}