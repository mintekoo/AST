"use client";

import HeroAnimatedLayout from "./HeroAnimatedLayout";
import type { AppLocation } from "@/lib/types";

export default function HeroLocationClient({
  locations = [],
}: {
  locations?: AppLocation[];
}) {
  return (
    <HeroAnimatedLayout
      totalItems={locations.length}
      config={{ type: "simple", size: "half" }}
      renderMedia={() => null}
    >
      {(index) => {
        const item = locations[index];

        return (
          <div className="text-white text-center">
            <h1 className="text-3xl font-bold">{item?.name}</h1>
            <p className="mt-2 text-white/70">{item?.description}</p>
          </div>
        );
      }}
    </HeroAnimatedLayout>
  );
}