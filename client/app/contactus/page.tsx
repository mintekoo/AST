import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactForm from "@/components/form/ContactForm";
export default function ContactPage() {
  return (
    <main className="bg-background text-foreground dark:bg-backgroundDark dark:text-foregroundDark">
      <Container className="py-12 sm:py-16 lg:py-20">
        <SectionHeader
          title="Contact Us"
          subtitle="We’d love to hear from you"
        />

        <ContactForm />
      </Container>
    </main>
  );
}