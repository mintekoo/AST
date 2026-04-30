// app/page.tsx
import ProjectsSection from "@/components/sections/ProjectsSection";
import BlogSection from "@/components/sections/BlogSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import PartnersSection from "@/components/sections/PartnersSection";
import Excellence from "@/app/staticsPages/Excellence";
import Differentiators from "@/app/staticsPages/Differentiators";
import Contact from "./staticsPages/Contact";
import Clients from "@/app/staticsPages/Clients";
import { fetchAbouts, fetchServices, fetchBlogs, fetchPartners, fetchTestimonials, fetchProjects } from "@/lib/api";
import type { Blog, Service, About, Testimonial, Partner, Project } from "@/lib/types";
import Hero from "@/components/sections/Hero";

export const metadata = {
  title: "Abyssinia Software Technology PLC",
  description:
    "Abyssinia Software Technology PLC delivers innovative custom software solutions, including web and mobile applications, designed for scalability, performance, and business growth.",

  openGraph: {
    title: "Abyssinia Software Technology PLC",
    description:
      "Transform your ideas into powerful digital products with Abyssinia Software Technology PLC. متخصص in modern web and mobile solutions.",
    siteName: "Abyssinia Software",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abyssinia Software Technology",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Abyssinia Software Technology PLC",
    description:
      "Custom software, web & mobile solutions built for performance, security, and scale.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  keywords: [
    "software development",
    "custom software",
    "web development",
    "mobile app development",
    "Ethiopia software company",
    "Abyssinia Software",
    "digital solutions",
    "tech company Ethiopia",
  ],
};

export default async function Home() {
  const [
    projectsResp,
    blogsResp,
    servicesResp,
    aboutsResp,
    partnersResp,
    testimonialsResp,
  ] = await Promise.all([
    fetchProjects({ page: 1, perPage: 6 }),
    fetchBlogs({ page: 1, perPage: 10 }),
    fetchServices({ page: 1, perPage: 10 }),
    fetchAbouts({ page: 1, perPage: 4 }),
    fetchPartners(),
    fetchTestimonials({ page: 1, perPage: 3 }),
  ]);

  const projects: Project[] = projectsResp?.data ?? [];
  const recentBlogs: Blog[] = blogsResp?.data ?? [];
  const services: Service[] = servicesResp?.data ?? [];
  const abouts: About[] = aboutsResp?.data ?? [];
  const partners: Partner[] = partnersResp?.data ?? [];
  const testimonials: Testimonial[] = testimonialsResp?.data ?? [];

  return (
    <main className="backdrop-blur-sm text-foreground">
      <Hero />
      <ProjectsSection projects={projects} />
      <BlogSection blogs={recentBlogs} />
      <AboutSection abouts={abouts} />
      <Excellence />
      <ServicesSection services={services} />
      <Differentiators />
      <Clients />
      <PartnersSection partners={partners} />
      <Contact />
      <TestimonialsSection testimonials={testimonials} />
    </main>
  );
}
