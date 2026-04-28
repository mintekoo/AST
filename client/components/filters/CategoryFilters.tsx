"use client";

type Props = {
  selected: string;
  onChange: (value: string) => void;
};

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-6 mb-6">
      <button
        onClick={() => onChange("")}
        className={selected === "" ? "font-bold text-primary" : ""}
      >
        All
      </button>

      <button
        onClick={() => onChange("project")}
        className={selected === "project" ? "font-bold text-primary" : ""}
      >
        Projects
      </button>

      <button
        onClick={() => onChange("blog")}
        className={selected === "blog" ? "font-bold text-primary" : ""}
      >
        Blogs
      </button>
    </div>
  );
}