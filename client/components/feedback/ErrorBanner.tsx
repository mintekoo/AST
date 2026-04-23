"use client";

import React from "react";

type ErrorBannerProps = {
  message: string;
  onClose?: () => void;
};

export default function ErrorBanner({ message, onClose }: ErrorBannerProps) {
  return (
    <div className="fixed inset-x-0 top-16 z-50 mx-auto w-full max-w-3xl px-4">
      <div className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-900 shadow-sm dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
        <div className="text-sm">
          <strong className="font-semibold">Error:</strong> {message}
        </div>
        <button
          className="rounded-md px-2 py-1 text-sm hover:bg-red-100/60 dark:hover:bg-red-900/30"
          onClick={onClose}
          aria-label="Close error"
        >
          ✕
        </button>
      </div>
    </div>
  );
}


