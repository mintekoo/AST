import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionHeader({ title, subtitle, className }: Props) {
  return (
    <div className={["mb-8 animate-fade-in", className ?? ""].join(" ")}>
      <h2 className="text-2xl font-heading font-semibold sm:text-3xl">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-sm text-muted-700 text-primary">{subtitle}</p>
      )}
    </div>
  );
}


