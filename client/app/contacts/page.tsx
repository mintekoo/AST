// app/contacts/page.tsx
import Contact from "@/app/staticsPages/Contact";

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
        <Contact />
    </main>
  );
}
