"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/theme/ThemeToggle";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ShinyText from "@/components/ui/ShinyText";

gsap.registerPlugin(ScrollTrigger);

const NAV_BASE_HEIGHT = 64;
const NAV_SCROLLED_HEIGHT = 80;
const NAV_HOVER_HEIGHT = 128;

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blog" },
  { href: "/abouts", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/certifications", label: "Certifications" },
  { href: "/testimonials", label: "Testimonials" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addLinkRef = (el: HTMLAnchorElement | null) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  // --- FIXED: Using CSS Variables instead of hardcoded RGBA ---
  const getScrollBgColor = () => {
    // We pull the hex/oklch from your computed styles to feed into GSAP
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--color-background').trim();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    if (!nav || !logo) return;

    const applyScrollStyles = (isScrolled: boolean) => {
      if (nav.matches(':hover')) return;

      gsap.to(nav, {
        backgroundColor: isScrolled ? getScrollBgColor() : "transparent",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        boxShadow: isScrolled ? "0 10px 25px rgba(0,0,0,0.2)" : "none",
        height: isScrolled ? `${NAV_SCROLLED_HEIGHT}px` : `${NAV_BASE_HEIGHT}px`,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(logo, { scale: isScrolled ? 1.05 : 1, duration: 0.4 });
    };

    const ctx = gsap.context(() => {
      gsap.set(nav, { y: -25, opacity: 0 });
      gsap.set(linksRef.current, { opacity: 0, y: -15 });

      gsap.to(nav, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
      gsap.to(linksRef.current, {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 0.4,
        delay: 0.2,
        ease: "power3.out"
      });

      ScrollTrigger.create({
        start: 50,
        onEnter: () => applyScrollStyles(true),
        onLeaveBack: () => applyScrollStyles(false),
      });
    }, navRef);

    const observer = new MutationObserver(() => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled) applyScrollStyles(true);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      ctx.revert();
      observer.disconnect();
      linksRef.current = [];
    };
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      gsap.to(navRef.current, {
        height: `${NAV_HOVER_HEIGHT}px`,
        backgroundColor: getScrollBgColor(),
        backdropFilter: "blur(20px)",
        boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(logoRef.current, { scale: 1.1, duration: 0.3 });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      const isScrolled = window.scrollY > 50;
      gsap.to(navRef.current, {
        height: isScrolled ? `${NAV_SCROLLED_HEIGHT}px` : `${NAV_BASE_HEIGHT}px`,
        backgroundColor: isScrolled ? getScrollBgColor() : "transparent",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        boxShadow: isScrolled ? "0 10px 25px rgba(0,0,0,0.1)" : "none",
        duration: 0.3,
        ease: "power2.inOut"
      });
      gsap.to(logoRef.current, { scale: isScrolled ? 1.05 : 1, duration: 0.3 });
    }
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 z-50 w-full flex items-center transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 to-transparent opacity-100 pointer-events-none transition-opacity duration-500"
        style={{ opacity: typeof window !== 'undefined' && window.scrollY > 50 ? 0 : 1 }}
      />

      <Container className="flex items-center justify-between w-full">
        <div
          ref={logoRef}
          className="flex flex-col items-center leading-tight group cursor-pointer"
        >
          <span className="text-2xl font-bold text-primary leading-none drop-shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:font-extrabold">
            <ShinyText
              text="AST"
              speed={2}
              color="var(--color-foreground)"
              shineColor="var(--color-primary)"
            />
          </span>

          <span className="text-[11px] font-medium text-primary tracking-wide text-center leading-none mt-[2px] drop-shadow-sm transition-all duration-300 group-hover:text-[13px] group-hover:font-semibold">
            <ShinyText
              text="Abyssinia Software Technology PLC"
              speed={2.5}
              color="var(--color-muted-foreground)"
            />
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
            return (
              <Link
                key={link.href}
                ref={addLinkRef}
                href={link.href}
                className={`relative group py-3 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] dark:drop-shadow-none transition-colors ${isActive ? "text-primary font-bold" : "text-foreground hover:text-primary/80"}`}
              >
                {link.label}
                <span className={`absolute left-0 bottom-[-4px] h-[2px] bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contactus" className="hidden md:block rounded-full px-5 py-[8px] bg-primary text-white text-sm font-semibold shadow-lg hover:bg-primary-hover transition-all active:scale-95">
            Contact Us
          </Link>
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </Container>

      {/* MOBILE MENU - Updated to use your theme variables */}
      <div className={`md:hidden absolute top-16 w-full bg-background border-b border-main shadow-xl transition-all duration-500 overflow-hidden ${isOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
        <nav className="flex flex-col gap-4 p-6 text-lg font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
            return (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`py-3 border-b border-main transition-colors ${isActive ? "text-primary font-bold" : "hover:text-primary text-foreground"}`}>
                {link.label}
              </Link>
            );
          })}
          <Link href="/contactus" onClick={() => setIsOpen(false)} className="mt-3 rounded-full bg-primary text-white text-center py-3 text-sm font-semibold">
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}