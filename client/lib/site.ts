// lib/site.ts
import { API_PUBLIC_URL } from "@/lib/api";

export const siteInfo = {
  name: "Abyssinia Software Technology PLC",
  shortName: "Abyssinia Software",
  description:
    "Leading software development company in Ethiopia providing ERP systems, school management systems, inventory systems, and custom web & mobile apps.",

  slogan: "Building Scalable Digital Solutions in Ethiopia",

  email: "info@yourdomain.com",
  phone: "+251XXXXXXXXX",
  address: "Addis Ababa, Ethiopia",

  baseUrl: API_PUBLIC_URL || "https://yourdomain.com",

  social: {
    facebook: "",
    linkedin: "",
    twitter: "",
  },

  baseKeywords: [
    "software company in Ethiopia",
    "software development Addis Ababa",
    "IT company Ethiopia",
    "custom software development Ethiopia",
  ],

  seoBoostKeywords: [
    "ERP system Ethiopia",
    "school management system Ethiopia",
    "inventory management system Ethiopia",
    "business software Ethiopia",
    "enterprise software Ethiopia",
  ],
} as const;
