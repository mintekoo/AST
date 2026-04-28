export type Meta = {
  currentPage: number;
  totalPages: number;
  perPage?: number;
  totalItems?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
};

export type ApiListResponse<T> = {
  data: T[];
  meta: Meta;
};

// Blog
export type Blog = {
  id: number;
  categoryId?: number | null;
  title: string;
  description: string;
  image?: string | null;
  category?: Category;
  createdAt: string;
  updatedAt: string;
};

export type About = {
  id: number;
  title: string;
  description: string;
  image?: string | null;
  vision?: string;
  mission?: string;
  values?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CategoryType = "project" | "service" | "blog";

export interface Category {
  id: number;
  title: string;
  image?: string | null;
  typeIs?: CategoryType | null;
  createdAt?: string;
  updatedAt?: string;
}

export type Certification = {
  id: number;
  title: string;
  issuingOrganization: string;
  issueDate: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ContactPayload = {
  fullName: string;
  email?: string | null;
  phone?: string | null;
  message: string;
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
};

export type Gallery = {
  images: string[];
  id: number;
  title: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AppLocation = {
  id: number;
  name: string;
  description: string;

  phone: string[];
  email: string[];
  web: string[];
  workingHours: string[];

  latitude: string;
  longitude: string;

  createdAt: string;
  updatedAt: string;
};

export type SocialPlatform =
  | "facebook"
  | "twitter"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "telegram"
  | "linkedin"
  | "github"
  | "whatsapp"
  | "website";

export type Social = {
  id: number;
  platform: SocialPlatform;
  url: string;
  createdAt: string;
  updatedAt: string;
};

export type Service = {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
};

// Testimonial type
export type Testimonial = {
  id: number;
  fullName: string;
  content: string;
  rating: number;
  image?: string | null;
  company?: string | null;
  position?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Term = {
  id: number;
  title: string;
  content: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Partner = {
  id?: number;
  name: string;
  image?: string | File | null;
  contact: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type Project = {
  id: number;
  categoryId?: number | null;
  title: string;
  content: string;
  image?: string | null;
  category?: Category;
  createdAt: string;
  updatedAt: string;
};

// User type
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email?: string | null;
};

// Product type
export type Product = {
  id: number;
  title: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  pricePerHour?: number;
  description?: string | null;
  features?: string[];
  images: string[];
  status?: string;
  seatingCapacity?: number;
  location?: string | null;
  isActive?: boolean;
  User: User;
  Category?: Category | null;
  createdAt?: string;
  updatedAt?: string;
};

// Booking type
export type Booking = {
  id: number;
  productId: number;
  renterId?: number;
  ownerId?: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status?: string;
  paymentStatus?: string;
  Product?: {
    id: number;
    title: string;
    pricePerDay: number;
  };
  User?: User;
  createdAt?: string;
  updatedAt?: string;
};

// Create Booking Input Type
export type CreateBookingInput = {
  productId: number;
  fullName: string;
  Phone: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  driver?: "yes" | "no";
};
