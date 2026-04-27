// lib/api.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
export const API_PUBLIC_URL = process.env.NEXT_PUBLIC_SITE_URL || "";


import type {
  Meta,
  Product,
  Booking,
  Testimonial,
  Blog,
  Category,
  About,
  Service,
  Partner,
  Gallery,
  ApiListResponse,
  Certification,
  Project,
  Term,
  FAQ,
  Social,
  AppLocation,
  ContactPayload,
} from "./types";

type FetchOptions = RequestInit & { next?: { revalidate?: number } };

async function request<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  if (!API_BASE_URL) throw new Error("API base URL is not configured");
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export function buildQuery(
  params: Record<string, string | number | undefined>,
) {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) sp.set(k, String(v));
  });
  const q = sp.toString();
  return q ? `?${q}` : "";
}

// Products
export async function fetchProducts(
  query: { page?: number; categoryId?: string; perPage?: number } = {},
) {
  const q = buildQuery({
    page: query.page,
    categoryId: query.categoryId,
    perPage: query.perPage,
  });
  return request<{ products: Product[]; meta: Meta }>(`/api/products${q}`, {
    next: { revalidate: 60 },
  });
}

export async function fetchProduct(id: string) {
  return request<Product>(`/api/products/${id}`, { next: { revalidate: 60 } });
}

// Bookings
export async function fetchBookings(
  query: { page?: number; perPage?: number } = {},
) {
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });
  return request<{ bookings: Booking[]; meta: Meta }>(`/api/bookings${q}`, {
    next: { revalidate: 60 },
  });
}

export async function fetchBooking(id: string) {
  return request<Booking>(`/api/bookings/${id}`, { next: { revalidate: 60 } });
}

// Blogs
export async function fetchBlogs(
  query: { page?: number; perPage?: number } = {},
) {
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });

  return request<{
    success: boolean;
    data: Blog[];
    meta: Meta;
  }>(`/api/blogs${q}`, {
    next: { revalidate: 120 },
  });
}

export async function fetchBlog(id: string) {
  return request<{
    success: boolean;
    data: Blog;
  }>(`/api/blogs/${id}`, {
    next: { revalidate: 120 },
  });
}

// About
export async function fetchAbouts(
  query: { page?: number; perPage?: number } = {},
) {
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });

  return request<{
    success: boolean;
    data: About[];
    meta: Meta;
  }>(`/api/abouts${q}`, {
    next: { revalidate: 300 },
  });
}

export async function fetchAbout(id: string | number) {
  return request<{
    success: boolean;
    data: About;
  }>(`/api/about/${id}`, {
    next: { revalidate: 300 },
  });
}

export async function fetchCertifications(
  query: { page?: number; perPage?: number } = {},
) {
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });

  return request<{
    success: boolean;
    data: Certification[];
    meta: Meta;
  }>(`/api/certifications${q}`, {
    next: { revalidate: 300 },
  });
}

export async function createContact(data: ContactPayload) {
  return request<{
    success: boolean;
    message: string;
  }>(`/api/contacts`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchCertification(id: string | number) {
  return request<{
    success: boolean;
    data: Certification;
  }>(`/api/certifications/${id}`, {
    next: { revalidate: 300 },
  });
}

export async function fetchFAQs(
  query: { page?: number; perPage?: number } = {}
) {
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });

  return request<{
    success: boolean;
    data: FAQ[];
    meta: Meta;
  }>(`/api/faqs${q}`, {
    next: { revalidate: 300 },
  });
}

export async function fetchFAQ(id: string | number) {
  return request<{
    success: boolean;
    data: FAQ;
  }>(`/api/faqs/${id}`, {
    next: { revalidate: 300 },
  });
}

// Fetch paginated galleries
export async function fetchGalleries(
  query: { page?: number; perPage?: number } = {},
) {
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });

  return request<{ data: Gallery[]; meta: Meta }>(`/api/galleries${q}`, {
    next: { revalidate: 120 },
  });
}

// Fetch a single gallery by ID

export async function fetchGallery(id: number | string): Promise<Gallery> {
  const res = await request<{ success: boolean; data: Gallery }>(
    `/api/galleries/${id}`,
    {
      next: { revalidate: 120 },
    },
  );
  return res.data;
}

export async function fetchLocations(
  query: { page?: number; perPage?: number } = {}
) {
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });

  return request<{
    success: boolean;
    data: AppLocation[];
    meta: Meta;
  }>(`/api/locations${q}`, {
    next: { revalidate: 300 },
  });
}

export async function fetchLocation(id: string | number) {
  return request<{
    success: boolean;
    data: AppLocation;
  }>(`/api/locations/${id}`, {
    next: { revalidate: 300 },
  });
}

// Services
export async function fetchServices(
  query: { page?: number; perPage?: number } = {},
) {
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });

  return request<{
    success: boolean;
    data: Service[];
    meta: Meta;
  }>(`/api/services${q}`, {
    next: { revalidate: 300 },
  });
}

export async function fetchService(id: string | number) {
  return request<{
    success: boolean;
    data: Service;
  }>(`/api/services/${id}`, {
    next: { revalidate: 300 },
  });
}

export async function fetchSocials(
  query: { page?: number; perPage?: number } = {}
) {
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });

  return request<{
    success: boolean;
    data: Social[];
    meta: Meta;
  }>(`/api/socials${q}`, {
    next: { revalidate: 300 },
  });
}

export async function fetchSocial(id: string | number) {
  return request<{
    success: boolean;
    data: Social;
  }>(`/api/socials/${id}`, {
    next: { revalidate: 300 },
  });
}

// Testimonials
export async function fetchTestimonials(
  query: { page?: number; perPage?: number } = {},
) {
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });

  return request<ApiListResponse<Testimonial>>(`/api/testimonials${q}`, {
    next: { revalidate: 120 },
  });
}

export async function fetchTestimonial(id: string) {
  return request<{ success: boolean; data: Testimonial }>(
    `/api/testimonials/${id}`,
    {
      next: { revalidate: 120 },
    },
  );
}

export async function fetchTerms(
  query: { page?: number; perPage?: number } = {}
) {
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });

  return request<{
    success: boolean;
    data: Term[];
    meta: Meta;
  }>(`/api/terms${q}`, {
    next: { revalidate: 300 },
  });
}

export async function fetchTerm(id: string | number) {
  return request<{
    success: boolean;
    data: Term;
  }>(`/api/terms/${id}`, {
    next: { revalidate: 300 },
  });
}

// Partners
export async function fetchPartners(
  query: { page?: number; perPage?: number } = {},
) {
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });

  const res = await request<{ data: Partner[]; meta: Meta }>(
    `/api/partners${q}`,
    { next: { revalidate: 120 } },
  );

  return {
    data: res.data,
    meta: res.meta,
  };
}

export async function fetchPartner(id: string | number) {
  return request<Partner>(`/api/partners/${id}`, { next: { revalidate: 120 } });
}

export async function fetchProjects(
  query: { page?: number; perPage?: number } = {},
) {
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });

  return request<{
    success: boolean;
    data: Project[];
    meta: Meta;
  }>(`/api/projects${q}`, {
    next: { revalidate: 300 },
  });
}

export async function fetchProject(id: string | number) {
  return request<{
    success: boolean;
    data: Project;
  }>(`/api/projects/${id}`, {
    next: { revalidate: 300 },
  });
}

// Categories
export async function fetchCategories() {
  return request<{ categories: Category[]; meta: Meta }>(`/api/categories`, {
    next: { revalidate: 300 },
  });
}

// products by category ID
export async function fetchProductsByCategory(
  categoryId: string | number,
  query: { page?: number; perPage?: number } = {},
) {
  const id = categoryId.toString();
  const q = buildQuery({
    page: query.page,
    perPage: query.perPage,
  });
  return request<{ products: Product[]; meta: Meta }>(
    `/api/products/category/${id}${q}`,
    {
      next: { revalidate: 60 },
    },
  );
}
