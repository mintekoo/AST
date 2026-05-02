"use client";

import HeroAnimatedLayout from "./HeroAnimatedLayout";
import HeroMediaCarousel from "./HeroMediaCarousel";
import type { Certification } from "@/lib/types";
import { useMemo } from "react";

export default function HeroCertificationsClient({
  certifications = [],
}: {
  certifications?: Certification[];
}) {
  // ✅ match media format used by your carousel system
  const mediaItems = useMemo(
    () =>
      certifications.map((c) => ({
        image: c.image ?? null,
        title: c.title,
      })),
    [certifications]
  );

  const safeItems =
    mediaItems.length > 0
      ? mediaItems
      : [{ image: null, title: "Certification" }];

  return (
    <HeroAnimatedLayout
      totalItems={safeItems.length}
      config={{
        type: "simple",
        size: "small",
      }}
      renderMedia={(index) => (
        <HeroMediaCarousel
          items={safeItems}
          currentSlide={index}
        />
      )}
    >
      {(index: number) => {
        const item = certifications[index];

        return (
          <div className="max-w-3xl px-6 text-center">
            {/* Tag */}
            {/* <span className="inline-block px-3 py-1 mb-4 text-xs font-medium uppercase rounded-full bg-primary text-primary-foreground">
              Certifications
            </span> */}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
              {item?.title || "Professional Certification"}
            </h1>

            {/* Issuer */}
            {/* <p className="mt-3 text-muted-foreground text-base sm:text-lg">
              {item?.issuingOrganization}
            </p> */}

            {/* Issue Date */}
            {/* {item?.issueDate && (
              <p className="mt-1 text-sm text-muted-foreground/80">
                Issued: {new Date(item.issueDate).toLocaleDateString()}
              </p>
            )} */}
          </div>
        );
      }}
    </HeroAnimatedLayout>
  );
}