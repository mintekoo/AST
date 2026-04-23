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

// User type
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email?: string | null;
};

// Category type
export type Category = {
  id: number;
  name: string;
  description?: string | null;
  image?: string | null;
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

// Testimonial type
export type Testimonial = {
  id: number;
  clientName: string;
  rating: number;
  content: string;
  image?: string | null;
  userId?: number | null;
  User?: User | null;
  company?: string | null;
  position?: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// Blog type
export type Blog = {
  id: number;
  title: string;
  slug?: string;
  content: string;
  image?: string | null;
  authorId?: number;
  categoryId?: number;
  isPublished?: boolean;
  User: User;
  Category?: Category | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
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

export type Partner = {
  id?: number;
  name: string;
  image?: string | File | null;
  contact: string[];
  createdAt?: string;
  updatedAt?: string;
};


export type Gallery = {
  images: string[];
  id: number;
  title: string;
  createdAt?: string;
  updatedAt?: string;
};