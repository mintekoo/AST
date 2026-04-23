// app/page.tsx
// import Hero from "@/components/sections/Hero";
import ProductsSection from "@/components/sections/ProductsSection";
import CategoriesSection from "@/components/sections/CategoriesSection";
import BlogSection from "@/components/sections/BlogSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import PartnersSection from "@/components/sections/PartnersSection";
import Excellence from "@/app/staticsPages/Excellence";
import Differentiators from "@/app/staticsPages/Differentiators";
import Contact from "./staticsPages/Contact";
import Clients from "@/app/staticsPages/Clients";
import { fetchAbouts, fetchProducts, fetchServices, fetchCategories, fetchBlogs, fetchPartners, fetchTestimonials } from "@/lib/api";
import type { Product, Category, Blog, Service, About, Testimonial, Partner } from "@/lib/types";

export const metadata = {
  title: "Abyssinia Software",
  description: "Discover premium cars with transparent pricing, expert insights, and a modern shopping experience.",
  openGraph: {
    title: "Abyssinia Software",
    description: "Discover premium cars with transparent pricing, expert insights, and a modern shopping experience.",
    siteName: "Abyssinia Software",
    images: [
      {
        width: 1200,
        height: 630,
        alt: "Abyssinia Software",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abyssinia Software",
    description: "Discover premium cars with transparent pricing, expert insights, and a modern shopping experience.",
  },
  robots: "index, follow",
  keywords: "cars, auto shop, buy car, electric, SUV, dealership",
};

export default async function Home() {
  const [
    productsResp,
    categoriesResp,
    blogsResp,
    servicesResp,
    aboutsResp,
    partnersResp,
    testimonialsResp,
  ] = await Promise.all([
    fetchProducts({ page: 1, perPage: 6 }),
    fetchCategories(),
    fetchBlogs({ page: 1, perPage: 10 }),
    fetchServices({ page: 1, perPage: 10 }),
    fetchAbouts({ page: 1, perPage: 4 }),
    fetchPartners(),
    fetchTestimonials({ page: 1, perPage: 3 }),
  ]);

  const featuredProducts: Product[] = productsResp?.products ?? [];
  const categories: Category[] = categoriesResp?.categories ?? [];
  const recentBlogs: Blog[] = blogsResp?.blogs ?? [];
  const services: Service[] = servicesResp?.services ?? [];
  const abouts: About[] = aboutsResp?.abouts ?? [];
  const partners: Partner[] = partnersResp?.data ?? [];
  const testimonials: Testimonial[] = testimonialsResp?.testimonials ?? [];

  return (
    <main className="bg-background text-foreground">
      {/* <Hero featuredProducts={featuredProducts} /> */}
      <CategoriesSection categories={categories.slice(0, 6)} />
      <ProductsSection products={featuredProducts} />
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
