import React from "react";
import Spinner from "@/components/ui/Spinner";

export default function Loader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 animate-bounce-soft">
      <Spinner size="lg" />
      <span className="text-sm text-muted-700 dark:text-zinc-300">{label}</span>
    </div>
  );
}


