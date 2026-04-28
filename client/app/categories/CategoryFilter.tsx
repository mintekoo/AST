// client/app/categories/CategoryFilter.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import RadioButton from "@/components/ui/RadioButton";

type Props = {
  selected?: string;
};

export default function CategoryFilter({ selected }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("typeIs");
    } else {
      params.set("typeIs", value);
    }

    router.push(`/categories?${params.toString()}`);
  };

  return (
    <div className="flex gap-6 mb-6">
      <RadioButton
        name="typeIs"
        label="All"
        value="all"
        checked={!selected}
        onChange={updateFilter}
      />

      <RadioButton
        name="typeIs"
        label="Projects"
        value="project"
        checked={selected === "project"}
        onChange={updateFilter}
      />

      <RadioButton
        name="typeIs"
        label="Blogs"
        value="blog"
        checked={selected === "blog"}
        onChange={updateFilter}
      />
    </div>
  );
}