// app/robots.ts
import { siteInfo } from "@/lib/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteInfo.baseUrl}/sitemap.xml`,
  };
}