"use client";
import StatCard from "@/components/cards/StatCard";

export default function Excellence() {
  const statsData = [
    { title: "Years Experience", value: 15 },
    { title: "SaaS Softwares", value: 5 },
    { title: "Happy Clients", value: 200 },
    { title: "Projects Completed", value: 300 },
    { title: "Active Systems", value: 25 },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div
          className="
            backdrop-blur-xl
            bg-background/70
            border border-border
            rounded-2xl

            shadow-lg
            transition-all duration-300

            p-6 sm:p-8 lg:p-10
          "
        >
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-foreground">
              Excellence in Action
            </h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              A quick look at our operational scale and impact
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-border/60 mb-8" />

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            {statsData.map((stat, idx) => (
              <StatCard key={idx} title={stat.title} value={stat.value} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}