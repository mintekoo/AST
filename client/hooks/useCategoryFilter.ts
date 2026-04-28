"use client";

import { useState } from "react";
import type { Category } from "@/lib/types";

export function useCategoryFilter(categories: Category[]) {
  const [selected, setSelected] = useState<string>("");

  const filteredCategories = selected
    ? categories.filter((c) => c.typeIs === selected)
    : categories;

  return {
    selected,
    setSelected,
    filteredCategories,
  };
}