// app/sitemap.ts
import { fetchBlogs, fetchProjects, fetchServices } from "@/lib/api";
import { siteInfo } from "@/lib/site";

export default async function sitemap() {
  const baseUrl = siteInfo.baseUrl;

  const [blogsRes, projectsRes, servicesRes] = await Promise.all([
    fetchBlogs({ page: 1, perPage: 100 }),
    fetchProjects({ page: 1, perPage: 100 }),
    fetchServices({ page: 1, perPage: 100 }),
  ]);

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/blogs`, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },

    ...(blogsRes?.data || []).map((b) => ({
      url: `${baseUrl}/blogs/${b.id}`,
      lastModified: new Date(),
    })),

    ...(projectsRes?.data || []).map((p) => ({
      url: `${baseUrl}/projects/${p.id}`,
      lastModified: new Date(),
    })),

    ...(servicesRes?.data || []).map((s) => ({
      url: `${baseUrl}/services/${s.id}`,
      lastModified: new Date(),
    })),
  ];
}