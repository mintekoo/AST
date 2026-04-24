import Container from "@/components/ui/Container";
import { fetchCertification, API_BASE_URL } from "@/lib/api";
import Image from "next/image";

export default async function CertificationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const resp = await fetchCertification(id);
  const cert = resp.data;

  const fullImage = cert.image
    ? `${API_BASE_URL}/${cert.image}`
    : "/window.svg";

  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-3xl animate-fade-in">

          {/* Image */}
          <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-border">
            <Image
              src={fullImage}
              alt={cert.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold sm:text-3xl">
            {cert.title}
          </h1>

          {/* Meta */}
          <div className="mt-2 text-sm text-muted-foreground space-y-1">
            <p>
              <span className="font-medium">Issued by:</span>{" "}
              {cert.issuingOrganization}
            </p>
            <p>
              <span className="font-medium">Issue date:</span>{" "}
              {new Date(cert.issueDate).toLocaleDateString()}
            </p>
          </div>

          {/* Optional extra section */}
          <div className="mt-6 text-sm text-muted-foreground">
            This certification verifies professional achievement and compliance with industry standards.
          </div>

        </div>
      </Container>
    </main>
  );
}