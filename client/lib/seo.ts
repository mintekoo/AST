// lib/seo.ts
import { siteInfo } from "./site";
import { generateSEOKeywords } from "./keyword";

/* =========================
   TYPES
========================= */
type SEOInput = {
  title: string;
  content?: string;
  image?: string;
  path: string;
  keywords?: string[];
};

/* =========================
   SEO BUILDER (GLOBAL)
========================= */
export function buildSEO({
  title,
  content,
  image,
  path,
  keywords = [],
}: SEOInput) {
  const url = `${siteInfo.baseUrl}${path}`;

  const fullTitle = `${title} | ${siteInfo.shortName}`;

  const description =
    content?.slice(0, 160) || siteInfo.description;

  const autoKeywords = generateSEOKeywords(title, content);

  const allKeywords = Array.from(
    new Set([...autoKeywords, ...keywords])
  ).slice(0, 12);

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,

    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteInfo.name,
      images: [image || "/og-image.png"],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image || "/og-image.png"],
    },
  };
}

/* =========================
   BASE SCHEMA (REUSABLE CORE)
========================= */
function baseOrganization() {
  return {
    "@type": "Organization",
    name: siteInfo.name,
    url: siteInfo.baseUrl,
    email: siteInfo.email,
    telephone: siteInfo.phone,
  };
}

/* =========================
   SERVICE SCHEMA
========================= */
export function buildServiceSchema({
  title,
  content,
  image,
}: {
  title: string;
  content?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: content?.slice(0, 150),
    image: image || "/og-image.png",
    areaServed: "Ethiopia",
    provider: baseOrganization(),
  };
}

/* =========================
   PROJECT SCHEMA
========================= */
export function buildProjectSchema({
  title,
  content,
  image,
}: {
  title: string;
  content?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: content?.slice(0, 150),
    image: image || "/og-image.png",
    creator: baseOrganization(),
  };
}

/* =========================
   BLOG SCHEMA (optional future use)
========================= */
export function buildBlogSchema({
  title,
  content,
  image,
}: {
  title: string;
  content?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: content?.slice(0, 150),
    image: image || "/og-image.png",
    author: baseOrganization(),
  };
}