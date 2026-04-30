# Abyssinia Software Technology PLC - Client Application

This is the front-end application for **Abyssinia Software Technology PLC**, a custom software development company in Ethiopia. The project is a modern web platform designed to showcase the company's portfolio, services, blogs, and corporate information while providing an excellent user experience.

## 🚀 Technologies Used

The application is built on top of a highly modern and performant technology stack:

### Core
*   **Next.js (v16.0.7):** Utilizing the App Router for server-side rendering, static site generation, and advanced routing.
*   **React (v19.2.0):** Used as the core library for building UI components.
*   **TypeScript:** Enforcing static typing for reliability, better developer experience, and maintainable code.

### Styling & UI
*   **Tailwind CSS (v4):** Utility-first CSS framework for rapid and scalable styling.
*   **Shadcn UI & Base UI:** For accessible, customizable, and high-quality pre-built components.
*   **Next Themes:** Providing seamless Light and Dark mode switching.
*   **Lucide React:** A beautiful and consistent icon set.

### Animations & 3D
*   **GSAP & Motion:** Powering complex, high-performance scroll animations, micro-interactions, and page transitions.
*   **Three.js & OGL:** Used to render interactive and lightweight 3D graphics (e.g., the `LineWaves` background).
*   **Swiper:** For building smooth, touch-enabled carousels and sliders.

### Utilities
*   **Vercel Analytics:** For privacy-friendly web analytics.
*   **ESLint:** For code linting and maintaining best practices.

---

## 🏗️ End-to-End Architecture & Flow

### 1. Request Flow & Routing
The application uses the Next.js **App Router** (`/app`). 
*   **`app/layout.tsx`:** The root layout acts as the entry point for all pages. It sets up the `ThemeProvider`, global metadata for SEO, global fonts (Geist/Inter), and persistent layout components (`Navbar`, `Footer`, and the 3D `LineWaves` background).
*   **`app/page.tsx`:** The dynamic landing page. It aggregates multiple content sections (Projects, Categories, Blogs, About, Services, Partners, Testimonials).
*   **Dynamic Routes:** Additional directories (e.g., `/projects`, `/blogs`, `/services`, `/contactus`) represent individual pages and nested routes.

### 2. Data Fetching & State Management
*   **Server Components:** By default, Next.js handles data fetching securely on the server side, resulting in smaller client bundles and better SEO.
*   **API Integration (`lib/api.ts`):** 
    *   A centralized module dedicated to interacting with an external backend API (defined by `NEXT_PUBLIC_API_BASE_URL`).
    *   Contains helper methods (`fetchProjects`, `fetchBlogs`, `fetchServices`, etc.) equipped with caching and revalidation logic (`next: { revalidate: 300 }`), utilizing **Incremental Static Regeneration (ISR)** to keep data fresh without sacrificing performance.
*   **Client Components:** Only used where interactivity or browser APIs are required (e.g., animations, form handling), using the `"use client"` directive.

### 3. Rendering & Hydration
1.  **Server:** A user navigates to the site. The Next.js server fetches the required data via `lib/api.ts` from the backend API.
2.  **HTML Generation:** The server renders the React Server Components into static HTML, injecting SEO metadata.
3.  **Client Hydration:** The browser receives the HTML and minimal JavaScript. Client components (like GSAP animations, theme toggles, and the Three.js background) are hydrated to become interactive.

---

## 📁 Folder Structure

```text
/client
├── app/                  # Next.js App Router (pages, layouts, error, loading)
│   ├── abouts/           # About Us routing
│   ├── blogs/            # Blog routing
│   ├── projects/         # Portfolio/Projects routing
│   ├── services/         # Services routing
│   ├── layout.tsx        # Global layout and providers
│   └── page.tsx          # Home page
├── components/           # Reusable UI components
│   ├── layout/           # Navbar, Footer, etc.
│   ├── sections/         # Home page sections (AboutSection, BlogSection, etc.)
│   └── ui/               # Core atomic UI components (Buttons, Inputs, etc.)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions, API clients, and TypeScript types
│   ├── api.ts            # Central API fetching logic
│   └── types.ts          # Global TypeScript interfaces
├── public/               # Static assets (images, fonts, favicons)
└── utils/                # Helper functions
```

---

## ⚙️ Getting Started

### Prerequisites
*   Node.js (v20+ recommended)
*   npm, yarn, pnpm, or bun

### 1. Clone & Install
```bash
# Install dependencies
npm install
# or
yarn install
```

### 2. Environment Variables
Create a `.env` file in the root directory and add the necessary environment variables. Example:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
*   `NEXT_PUBLIC_API_BASE_URL`: Points to your backend server handling content and data.

### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
npm run start
```

## 📜 Scripts
*   `npm run dev`: Starts the application in development mode.
*   `npm run build`: Compiles the application for production deployment.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Runs ESLint to check for code issues.
*   `npm run clean`: Cleans the `.next` directory to resolve caching issues.