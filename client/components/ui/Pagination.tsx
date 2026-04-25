"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Meta } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type Props = {
  meta: Meta;
  basePath: string;
};

export default function Pagination({ meta, basePath }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!meta || meta.totalPages <= 1) return null;

  const { currentPage, totalPages } = meta;

  const onChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    router.push(`${basePath}?${params.toString()}`);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .slice(Math.max(0, currentPage - 3), currentPage + 2);

  return (
    <div className="mt-10 flex flex-col items-center gap-4">

      {/* BUTTON ROW */}
      <div className="flex items-center gap-2 flex-wrap">

        {/* Prev */}
        <Button
          variant="ghost"
          size="sm"
          disabled={prevDisabled}
          onClick={() => !prevDisabled && onChange(currentPage - 1)}
        >
          Prev
        </Button>

        {/* Pages */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={`px-3 py-1 rounded-lg border text-sm transition ${p === currentPage
                ? "bg-primary text-white pointer-events-none"
                : "hover:bg-primary hover:text-white"
              }`}
          >
            {p}
          </button>
        ))}

        {/* Next */}
        <Button
          variant="ghost"
          size="sm"
          disabled={nextDisabled}
          onClick={() => !nextDisabled && onChange(currentPage + 1)}
        >
          Next
        </Button>

      </div>

      {/* INFO */}
      <span className="text-sm text-muted-foreground">
        Page {currentPage} / {totalPages}
      </span>

    </div>
  );
}