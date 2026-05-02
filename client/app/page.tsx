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

import { siteInfo } from "@/lib/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteInfo.name} | Top Software Company in Ethiopia`,
  description: siteInfo.description,

  openGraph: {
    title: siteInfo.name,
    description: siteInfo.description,
    siteName: siteInfo.shortName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteInfo.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteInfo.name,
    description: siteInfo.description,
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  keywords: [
    ...siteInfo.baseKeywords,
    ...siteInfo.seoBoostKeywords,
  ],
};


import Script from "next/script";

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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteInfo.name,
    "url": siteInfo.baseUrl,
    "logo": `${siteInfo.baseUrl}/logo.png`,
    "description": siteInfo.description,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteInfo.phone,
      "contactType": "customer service"
    }
  };

  return (
    <main className="backdrop-blur-sm text-foreground">
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
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
