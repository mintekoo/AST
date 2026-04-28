"use client";

import { useRouter, useSearchParams } from "next/navigation";
import TiltedCard from "@/components/ui/TiltedCard";
import type { Category } from "@/lib/types";
import { API_BASE_URL } from "@/lib/api";


type Props = {
  categories: Category[];
};

export default function CategoryCardFilter({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selected = searchParams.get("categoryId") || "";

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("categoryId", value);
    } else {
      params.delete("categoryId");
    }

    // 🔥 reset page when filtering
    params.delete("page");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {/* ✅ ALL */}
      <div
        onClick={() => handleClick("")}
        className={`cursor-pointer ${
          selected === "" ? "ring-2 ring-primary" : ""
        }`}
      >
        <TiltedCard
          imageSrc="/window.svg"
          captionText="All"
          containerWidth="180px"
          containerHeight="180px"
          imageWidth="180px"
          imageHeight="180px"
          scaleOnHover={1.05}
          rotateAmplitude={10}
        />
      </div>

      {/* ✅ Categories */}
      {categories.map((c) => {
        const fullImg = c.image
          ? `${API_BASE_URL}/${c.image}`
          : "/window.svg";

        return (
          <div
            key={c.id}
            onClick={() => handleClick(String(c.id))}
            className={`cursor-pointer ${
              selected === String(c.id)
                ? "ring-2 ring-primary"
                : ""
            }`}
          >
            <TiltedCard
              imageSrc={fullImg}
              altText={c.title}
              captionText={c.title}
              containerWidth="180px"
              containerHeight="180px"
              imageWidth="180px"
              imageHeight="180px"
              scaleOnHover={1.05}
              rotateAmplitude={10}
              displayOverlayContent
              overlayContent={
                <div className="w-full h-full flex items-end p-2">
                  <span className="text-xs font-semibold bg-black/60 text-white px-2 py-1 rounded">
                    {c.title}
                  </span>
                </div>
              }
            />
          </div>
        );
      })}
    </div>
  );
}