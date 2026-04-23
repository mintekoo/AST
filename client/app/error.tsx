"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-lg rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900 shadow-sm dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
        <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>
        <p className="mb-4 text-sm opacity-90">{error.message || "An unexpected error occurred."}</p>
        <div className="flex items-center gap-3">
          <Button onClick={reset} variant="secondary">Try again</Button>
          <Button variant="ghost" onClick={() => (window.location.href = "/")}>Go home</Button>
        </div>
      </div>
    </Container>
  );
}


