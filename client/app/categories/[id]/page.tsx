// app/categories/[id]/page.tsx
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { fetchCategory, API_BASE_URL } from "@/lib/api";
import type { Project, Blog } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

// --------------------
// Project Card
// --------------------
function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-border bg-card-background dark:bg-card-background-dark">
      <div className="relative aspect-video">
        <Image
          src={p.image ? `${API_BASE_URL}/${p.image}` : "/window.svg"}
          alt={p.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold">{p.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {p.content}
        </p>

        <Link href={`/projects/${p.id}`}>
          <Button size="sm" className="w-full mt-2">
            View Project
          </Button>
        </Link>
      </div>
    </div>
  );
}

// --------------------
// Blog Card
// --------------------
function BlogCard({ b }: { b: Blog }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm ring-1 ring-border bg-card-background dark:bg-card-background-dark">
      <div className="relative aspect-video">
        <Image
          src={b.image ? `${API_BASE_URL}/${b.image}` : "/window.svg"}
          alt={b.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold">{b.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {b.description}
        </p>

        <Link href={`/blogs/${b.id}`}>
          <Button size="sm" className="w-full mt-2">
            Read Blog
          </Button>
        </Link>
      </div>
    </div>
  );
}

// --------------------
// Page
// --------------------
export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetchCategory(id);

  const category = res.data.category;
  const projects = res.data.projects.data ?? [];
  const blogs = res.data.blogs.data ?? [];


  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-12 sm:py-16 lg:py-20">
        <SectionHeader
          title={category.title}
          subtitle={`Browse ${category.typeIs} content`}
        />

        {/* CATEGORY INFO */}
        <div className="mb-10 flex items-center gap-4">
          {category.image && (
            <Image
              src={`${API_BASE_URL}/${category.image}`}
              alt={category.title}
              width={80}
              height={80}
              className="rounded-xl object-cover"
              unoptimized
            />
          )}

          <div>
            <h2 className="text-xl font-semibold">{category.title}</h2>
            <p className="text-sm text-muted-foreground capitalize">
              Type: {category.typeIs}
            </p>
          </div>
        </div>

        {/* PROJECTS */}
        {projects.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-4">Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {projects.map((p: Project) => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </div>
          </>
        )}

        {/* BLOGS */}
        {blogs.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mb-4">Blogs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((b: Blog) => (
                <BlogCard key={b.id} b={b} />
              ))}
            </div>
          </>
        )}

        {/* EMPTY STATE */}
        {projects.length === 0 && blogs.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">
            No content found in this category.
          </p>
        )}
      </Container>
    </main>
  );
}