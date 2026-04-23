import React from "react";
import Container from "@/components/ui/Container";
import Spinner from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <Container className="py-20 flex items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
        <Spinner />
        <span>Loading...</span>
      </div>
    </Container>
  );
}


