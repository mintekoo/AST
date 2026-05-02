// components/hero/Hero.tsx

import HeroProject from "./HeroProject";
import HeroServices from "./HeroServices";
import HeroSimple from "./HeroSimple";
import HeroBlog from "./HeroBlog";
import HeroCategory from "./HeroCategory";
import HeroGallery from "./HeroGallery";
import HeroFAQ from "./HeroFAQ";
import HeroLocation from "./HeroLocation";
import HeroSocial from "./HeroSocial";
import HeroTestimonial from "./HeroTestimonial";
import HeroAbout from "./HeroAbout";
import HeroCertifications from "./HeroCertifications";

type HeroVariant =
  | "project"
  | "service"
  | "blog"
  | "category"
  | "certifications"
  | "gallery"
  | "about"
  | "faq"
  | "location"
  | "social"
  | "testimonial"
  | "simple";

type HeroProps = {
  variant?: HeroVariant;
};

export default function Hero({ variant = "simple" }: HeroProps) {
  switch (variant) {
    case "project":
      return <HeroProject />;

    case "service":
      return <HeroServices />;

    case "blog":
      return <HeroBlog />;

    case "category":
      return <HeroCategory />;
    case "about":
      return <HeroAbout />;

    case "certifications":
      return <HeroCertifications />;

    case "gallery":
      return <HeroGallery />;

    case "faq":
      return <HeroFAQ />;

    case "location":
      return <HeroLocation />;

    case "social":
      return <HeroSocial />;

    case "testimonial":
      return <HeroTestimonial />;

    default:
      return <HeroSimple />;
  }
}