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
    // Local & Regional SEO
    "software company in Ethiopia",
    "Software Development Company in Ethiopia",
    "Software Development Company in Addis Ababa",
    "software development Addis Ababa",
    "IT company Ethiopia",
    "custom software development Ethiopia",
    "Best IT Solutions in Ethiopia",
    "Custom Software Development Addis",
    "Abyssinia Software Tech",
    "Tech startup Ethiopia",
    "software company in Addis Ababa",
    "software developers in Addis Ababa",
    "IT company in Addis Ababa",
    "website development Addis Ababa",
    "mobile app development Ethiopia",
    "tech company Ethiopia",
    "software house Ethiopia",
    // Industry-Focused Keywords
    "Fintech Solutions Ethiopia",
    "Digital Transformation for Ethiopian Businesses",
    "E-commerce Development Addis",
    "Corporate Branding and Tech Identity",
  ],

  seoBoostKeywords: [
    // Product-Specific Keywords (High Intent)
    "ERP system Ethiopia",
    "ERP Systems Ethiopia",
    "ERP system in Ethiopia",
    "School Management Software Addis Ababa",
    "school management system Ethiopia",
    "inventory management system Ethiopia",
    "Inventory Management Systems Ethiopia",
    "Clinic Management Software",
    "Property Management Systems (PMS) Ethiopia",
    "property management software Ethiopia",
    "Hospitality Software Solutions",
    "HR management system Ethiopia",
    "business software Ethiopia",
    "business software solutions Ethiopia",
    "enterprise software Ethiopia",
    "Enterprise Software Solutions",
    // Service & Technology Stack
    "Cross-platform Mobile App Development (Flutter)",
    "Custom Web Application Development",
    "UI/UX Design Services Ethiopia",
    "Backend Development (Node.js/MongoDB)",
    "Desktop App Development (Windows/Linux)",
    // Problem-Based Keywords
    "best ERP system for small business Ethiopia",
    "how to manage school system in Ethiopia",
    "inventory tracking system for shops Ethiopia",
    "property rental management system Ethiopia",
    "automate business in Ethiopia software",
    "digital transformation Ethiopia businesses",
    "accounting software Ethiopia businesses",
    // Service-Based Keywords
    "ERP software development Ethiopia",
    "custom ERP development company Ethiopia",
    "school software development Ethiopia",
    "inventory software development Ethiopia",
    "HR system development Ethiopia",
    "web application development Ethiopia",
    "SaaS development Ethiopia",
    // Long-Tail Keywords
    "affordable ERP system in Ethiopia",
    "best school management software in Ethiopia",
    "cheap inventory system for small business Ethiopia",
    "property management system for landlords Ethiopia",
    "custom software for Ethiopian companies",
    "business management software Ethiopia price",
  ],
} as const;
