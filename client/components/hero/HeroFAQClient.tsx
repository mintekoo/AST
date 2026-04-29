"use client";

import HeroAnimatedLayout from "./HeroAnimatedLayout";
import type { FAQ } from "@/lib/types";

export default function HeroFAQClient({
  faqs = [],
}: {
  faqs?: FAQ[];
}) {
  return (
    <HeroAnimatedLayout
      totalItems={faqs.length}
      config={{ type: "simple", size: "compact" }}
      renderMedia={() => null}
    >
      {(index) => {
        const item = faqs[index];

        return (
          <div className="text-white max-w-2xl text-center">
            <h1 className="text-2xl font-semibold">{item?.question}</h1>
            <p className="mt-4 text-white/80">{item?.answer}</p>
          </div>
        );
      }}
    </HeroAnimatedLayout>
  );
}