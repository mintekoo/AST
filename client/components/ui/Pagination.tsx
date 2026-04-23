"use client";
import React from "react";
import type { Meta } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type Props = {
  meta: Meta;
  onChange: (page: number) => void;
};

export default function Pagination({ meta, onChange }: Props) {
  const { currentPage, totalPages } = meta;
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        disabled={prevDisabled}
        onClick={() => onChange(currentPage - 1)}
        className="transition-standard"
      >
        Prev
      </Button>
      <span className="text-sm text-muted-700 dark:text-zinc-400">
        Page {currentPage} / {totalPages}
      </span>
      <Button
        variant="ghost"
        size="sm"
        disabled={nextDisabled}
        onClick={() => onChange(currentPage + 1)}
        className="transition-standard"
      >
        Next
      </Button>
    </div>
  );
}


