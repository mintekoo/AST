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
    { name: "Our Fleet", href: "/categories" },
    { name: "Certifications", href: "/certifications" },
    { name: "Projects", href: "/projects" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "FAQs", href: "/faqs" },
    { name: "Social Media", href: "/socials" },
    { name: "Locations", href: "/locations" },
    { name: "Contact Us", href: "/contactus" },
  ];

  const companyLinks = [
    { name: "Blog", href: "/blogs" },
    { name: "About", href: "/abouts" },
    { name: "Services", href: "/services" },
    { name: "Partners", href: "/partners" },
    { name: "Gallery", href: "/galleries" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  // icon mapper (safe fallback)
  const getIcon = (platform: string) => {
    const name = platform.toLowerCase();
    if (name.includes("facebook")) return Facebook;
    if (name.includes("linkedin")) return Linkedin;
    if (name.includes("twitter")) return Twitter;
    if (name.includes("instagram")) return Instagram;
    return Globe;
  };

  return (
    <footer className="mt-16 border-t bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <Container className="py-12 flex flex-col gap-12">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex h-10 w-16 items-center justify-center rounded-lg bg-primary text-white font-bold">
                AST
              </span>
              <span className="text-lg font-semibold">
                Abyssinia Software
              </span>
            </Link>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Innovating software solutions for modern businesses.
            </p>

            {/* SOCIAL ICONS (NEW) */}
            <div className="flex items-center gap-3 pt-2">
              {socials.map((s) => {
                const Icon = getIcon(s.platform);

                return (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    className="
                      w-9 h-9 flex items-center justify-center
                      rounded-full bg-white dark:bg-gray-800
                      shadow-sm hover:shadow-md
                      hover:scale-110 transition
                      text-primary
                    "
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Products</h3>
            <ul className="space-y-2 text-sm">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary transition">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary transition">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Contact</h3>

            <ul className="space-y-3 text-sm">
              {primaryLocation?.name && (
                <li className="flex gap-2">
                  <MapPin className="w-4 h-4 text-primary mt-1" />
                  <span>{primaryLocation.name}</span>
                </li>
              )}

              {primaryLocation?.phone?.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <Phone className="w-4 h-4 text-primary mt-1" />
                  <a href={`tel:${p}`} className="hover:text-primary">
                    {p}
                  </a>
                </li>
              ))}

              {primaryLocation?.email?.map((e, i) => (
                <li key={i} className="flex gap-2">
                  <Mail className="w-4 h-4 text-primary mt-1" />
                  <a href={`mailto:${e}`} className="hover:text-primary">
                    {e}
                  </a>
                </li>
              ))}

              {primaryLocation?.web?.map((w, i) => (
                <li key={i} className="flex gap-2">
                  <Globe className="w-4 h-4 text-primary mt-1" />
                  <a
                    href={`https://${w}`}
                    target="_blank"
                    className="hover:text-primary"
                  >
                    {w}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR (HORIZONTAL CLEAN LAYOUT) */}
        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Abyssinia Software. All rights reserved.
          </p>

          {/* CENTER LINE STYLE BRAND */}
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Built with modern software engineering
          </div>

          {/* SOCIAL MINI ROW (SECOND STYLE) */}
          <div className="flex items-center gap-2">
            {socials.slice(0, 4).map((s) => {
              const Icon = getIcon(s.platform);
              return (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  className="p-2 rounded-full hover:bg-primary hover:text-white transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
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