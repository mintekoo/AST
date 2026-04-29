// components/hero/HeroSimple.tsx
import GridDistortion from "@/components/ui/GridDistortion";

type Props = {
  title?: string;
  subtitle?: string;
};

export default function HeroSimple({
  title = "Welcome",
  subtitle,
}: Props) {
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden">

      {/* 🔥 Background (WebGL distortion effect) */}
      <div className="absolute inset-0">
        <GridDistortion
          imageSrc="https://picsum.photos/1920/1080"
          grid={12}
          mouse={0.28}
          strength={0.2}
          relaxation={0.9}
          className="w-full h-full"
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">

        <h1 className="text-3xl sm:text-5xl font-bold text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-white/80 text-base sm:text-lg max-w-2xl">
            {subtitle}
          </p>
        )}

      </div>

    </section>
  );
}