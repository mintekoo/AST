// HeroSimple.tsx

type Props = {
  title?: string;
  subtitle?: string;
};

export default function HeroSimple({
  title = "Welcome",
  subtitle,
}: Props) {
  return (
    <section className="w-full py-20 text-center bg-muted/40">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
    </section>
  );
}