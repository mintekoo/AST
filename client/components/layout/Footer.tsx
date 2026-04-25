import Link from "next/link";
import Container from "@/components/ui/Container";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Send,
  Github,
  MessageCircle,
  Music2,
} from "lucide-react";

import { fetchLocations, fetchSocials } from "@/lib/api";
import type { AppLocation, Social } from "@/lib/types";

export default async function Footer() {
  const [locRes, socialRes] = await Promise.all([
    fetchLocations(),
    fetchSocials(),
  ]);

  const locations: AppLocation[] = locRes?.data ?? [];
  const socials: Social[] = socialRes?.data ?? [];
  const primaryLocation = locations[0];

  const productLinks = [
    { name: "Products", href: "/cars" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "FAQs", href: "/faqs" },
    { name: "Social Media", href: "/socials" },
    { name: "Contact Us", href: "/contactus" },
  ];

  const companyLinks = [
    { name: "Blog", href: "/blogs" },
    { name: "About", href: "/abouts" },
    { name: "Partners", href: "/partners" },
    { name: "Gallery", href: "/galleries" },
    { name: "Certifications", href: "/certifications" },
    { name: "Locations", href: "/locations" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook": return Facebook;
      case "twitter": return Twitter;
      case "instagram": return Instagram;
      case "youtube": return Youtube;
      case "tiktok": return Music2;
      case "telegram": return Send;
      case "linkedin": return Linkedin;
      case "github": return Github;
      case "whatsapp": return MessageCircle;
      default: return Globe;
    }
  };

  return (
    <footer className="bg-footer text-footer border-t border-footer transition-colors duration-300">
      <Container className="py-16 flex flex-col gap-12">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white font-bold text-xl shadow-lg shadow-[var(--color-primary)]/20 group-hover:scale-105 transition-transform">
                AST
              </span>
              <span className="text-xl font-bold tracking-tight">
                Abyssinia Software
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-footer-muted max-w-xs">
              Innovating high-performance software solutions. We specialize in real-time systems and modern web architecture.
            </p>
          </div>

          {/* Navigation Sets */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h3 className="text-primary font-bold uppercase tracking-wider text-xs mb-6">Explore</h3>
              <ul className="space-y-4">
                {productLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm footer-link transition-colors">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-primary font-bold uppercase tracking-wider text-xs mb-6">Company</h3>
              <ul className="space-y-4">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm footer-link transition-colors">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-primary font-bold uppercase tracking-wider text-xs mb-6">Get in Touch</h3>
            <ul className="space-y-4 text-sm">
              {primaryLocation?.name && (
                <li className="flex gap-3 text-footer-muted">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span>{primaryLocation.name}</span>
                </li>
              )}
              {primaryLocation?.phone?.map((p, i) => (
                <li key={i} className="flex gap-3 text-footer-muted group">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href={`tel:${p}`} className="hover:text-primary transition-colors">{p}</a>
                </li>
              ))}
              {primaryLocation?.email?.map((e, i) => (
                <li key={i} className="flex gap-3 text-footer-muted group">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href={`mailto:${e}`} className="hover:text-primary transition-colors break-all">{e}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SOCIALS & LEGAL */}
        <div className="pt-10 border-t border-footer">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socials.map((s) => {
                const Icon = getIcon(s.platform);
                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    className="social-icon-btn w-10 h-10 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Copyright & Status */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-xs text-footer-muted font-medium">
                © {new Date().getFullYear()} Abyssinia Software.
              </p>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.1em] text-primary font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Systems Operational
              </div>
            </div>

          </div>
        </div>
      </Container>
    </footer>
  );
}



// <div className="m-10 p-10 relative flex h-42 w-42 items-center justify-center rounded-full bg-white shadow-md overflow-hidden">

//   {/* 🔄 Rotating circle text */}
//   <svg
//     className="absolute inset-0 w-full h-full animate-spin-slow"
//     viewBox="0 0 100 100"
//   >
//     <defs>
//       <path
//         id="circlePath"
//         d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
//       />
//     </defs>
//  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-muted)]/5 text-[var(--color-muted)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"

//     <text className="text-[8px] fill-green-600 tracking-widest uppercase">
//       <textPath href="#circlePath">
//         Abyssinia Software Technology PLC • Abyssinia Software Technology PLC •
//       </textPath>
//     </text>
//   </svg>

//   {/* ⭐ CENTER AST (YOUR EXACT STYLE — UNCHANGED) */}
//   <span className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-white text-6xl font-bold">
//     <span
//       className="text-transparent bg-clip-text bg-primary"
//       style={{
//         backgroundImage:
//           "radial-gradient(circle, #ffffff 1px, transparent 1px)",
//         backgroundSize: "6px 6px",
//       }}
//     >
//       AST
//     </span>
//   </span>

// </div>




{/*       



      <div className="m-10 p-10">


        <span className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-white text-6xl font-bold">

          <span
            className="text-transparent bg-clip-text bg-primary"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "6px 6px",
            }}
          >
            AST
          </span>

        </span>

      </div> */}

{/* 
      <span className="inline-flex h-32 w-32 items-center justify-center rounded-full shadow-sm bg-white text-primary text-6xl font-bold">
        AST
      </span>
      <span className="inline-flex h-32 w-32 items-center justify-center rounded-full shadow-xl bg-white text-primary text-6xl font-bold">
        AST
      </span>
      <span className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-white text-primary text-6xl font-bold shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        AST
      </span>
      <span className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-white text-primary text-6xl font-bold shadow-[0_10px_40px_rgba(59,130,246,0.4)]">
        AST
      </span>
      <span className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-white text-primary text-6xl font-bold [text-shadow:0_4px_10px_rgba(0,0,0,0.3)]">
        AST
      </span>
      <span className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-white text-primary text-6xl font-bold [text-shadow:0_0_20px_rgba(59,130,246,0.7)]">
        AST
      </span>
      <span className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-white text-primary text-6xl font-bold [text-shadow:0_2px_4px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.2)]">
        AST
      </span>
      <span className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-white text-primary text-6xl font-bold [text-shadow:0_0_5px_#3b82f6,0_0_10px_#3b82f6,0_0_20px_#3b82f6]">
        AST
      </span>
      <span className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-white text-6xl font-bold text-transparent bg-clip-text 
  [background-image:radial-gradient(circle,_#3b82f6_1px,_transparent_1px)] 
  [background-size:6px_6px]">
        AST
      </span>
      <span className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-white text-6xl font-bold text-transparent bg-clip-text 
  bg-gradient-to-br from-blue-400 to-blue-700 
  [text-shadow:0_4px_10px_rgba(0,0,0,0.2)]">
        AST
      </span>
      <span className="inline-flex h-32 w-32 items-center justify-center rounded-full bg-white text-primary text-6xl font-bold 
  [text-shadow:1px_1px_0_rgba(0,0,0,0.2),-1px_-1px_0_rgba(255,255,255,0.6),2px_2px_4px_rgba(0,0,0,0.3)]">
        AST
      </span>
      <span className="inline-flex h-32 w-32 items-center justify-center rounded-full text-6xl font-bold text-transparent bg-clip-text 
  bg-gradient-to-br from-blue-400 to-purple-600 
  [background-image:radial-gradient(circle,_rgba(255,255,255,0.3)_1px,_transparent_1px)] 
  [background-size:8px_8px]">
        AST
      </span> */}