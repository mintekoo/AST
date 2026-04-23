"use client";

import React from "react";
import Pagination from "@/components/ui/Pagination";

export default function PaginationRouter({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const onChange = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url.toString());
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.location.reload();
  };
  return <Pagination meta={{ currentPage, totalPages }} onChange={onChange} />;
}



