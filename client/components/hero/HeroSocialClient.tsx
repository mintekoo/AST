"use client";

import HeroAnimatedLayout from "./HeroAnimatedLayout";
import type { Social } from "@/lib/types";

export default function HeroSocialClient({
  socials = [],
}: {
  socials?: Social[];
}) {
  return (
    <HeroAnimatedLayout
      totalItems={socials.length}
      config={{ type: "simple", size: "compact" }}
      renderMedia={() => null}
    >
      {(index) => {
        const item = socials[index];

        return (
          <div className="text-white text-center">
            <h1 className="text-3xl font-bold capitalize">
              {item?.platform}
            </h1>
            <p className="mt-2 text-white/70">{item?.url}</p>
          </div>
        );
      }}
    </HeroAnimatedLayout>
  );
}