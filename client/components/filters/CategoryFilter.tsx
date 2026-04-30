"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types";

type Props = {
  categories: Category[];
};

export default function CategoryFilter({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selected = searchParams.get("categoryId") || "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("categoryId", value);
    } else {
      params.delete("categoryId");
    }

    params.delete("page");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {/* ALL */}
      <button
        onClick={() => handleChange("")}
        className={`px-4 py-2 rounded-full border transition
          ${
            selected === ""
              ? "bg-primary text-white border-primary"
              : "bg-transparent text-muted-foreground border-border hover:bg-muted"
          }`}
      >
        All
      </button>

      {/* Categories */}
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => handleChange(String(c.id))}
          className={`px-4 py-2 rounded-full border transition
            ${
              selected === String(c.id)
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-muted-foreground border-border hover:bg-muted"
            }`}
        >
          {c.title}
        </button>
      ))}
    </div>
  );
}