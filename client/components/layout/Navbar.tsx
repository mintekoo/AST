// Navbar.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/theme/ThemeToggle";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Constants ---
const NAV_BASE_HEIGHT = 64;
const NAV_SCROLLED_HEIGHT = 80;
const NAV_HOVER_HEIGHT = 128;

// --- Navigation Links ---
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blog" },
  { href: "/abouts", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/categories", label: "Categories" },
  { href: "/galleries", label: "Gallery" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addLinkRef = (el: HTMLAnchorElement | null) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };

  // --- State & Scroll Lock ---
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // --- Entrance Animation ---
  useEffect(() => {
    gsap.set(navRef.current, { y: -25, opacity: 0 });
    gsap.set(linksRef.current, { opacity: 0, y: -15 });

    gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
    gsap.to(linksRef.current, { y: 0, opacity: 1, stagger: 0.07, duration: 0.4, delay: 0.2, ease: "power3.out" });

    return () => {
      linksRef.current = [];
    };
  }, []);

  // --- Hover Logic ---
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      gsap.to(navRef.current, { height: `${NAV_HOVER_HEIGHT}px`, duration: 0.2, ease: "power2.out" });
      gsap.to(logoRef.current, { scale: 1.1, duration: 0.2, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      const targetHeight = window.scrollY > 50 ? NAV_SCROLLED_HEIGHT : NAV_BASE_HEIGHT;
      gsap.to(navRef.current, { height: `${targetHeight}px`, duration: 0.2, ease: "power2.out" });
      gsap.to(logoRef.current, { scale: window.scrollY > 50 ? 1.05 : 1, duration: 0.2, ease: "power2.out" });
    }
  };

  // --- ScrollTrigger & Theme Observer (FIXED DEPENDENCY WARNING) ---
  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    if (!nav || !logo) return;

    // Defined inside useEffect to resolve the linter warning
    const getScrollBgColor = (): string => {
      const isDark = document.documentElement.classList.contains('dark');
      const lightBg = "rgba(255, 255, 255, 0.9)";
      const darkBg = "rgba(17, 24, 39, 0.9)";
      return isDark ? darkBg : lightBg;
    };

    // Defined inside useEffect to resolve the linter warning
    const applyScrollStyles = (isScrolled: boolean) => {
      if (isScrolled) {
        gsap.to(nav, {
          backgroundColor: getScrollBgColor(),
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          height: `${NAV_SCROLLED_HEIGHT}px`,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(logo, { scale: 1.05, duration: 0.3, ease: "power3.out" });
      } else {
        gsap.to(nav, {
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          boxShadow: "none",
          height: `${NAV_BASE_HEIGHT}px`,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(logo, { scale: 1, duration: 0.3, ease: "power3.out" });
      }
    };

    // ScrollTrigger setup
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 99999,
      onUpdate: (self) => {
        // Apply scroll styles, but allow hover styles to override
        if (!nav.matches(':hover')) {
          applyScrollStyles(self.scroll() > 50);
        }
      },
    });

    // Theme Change Observer setup
    const observer = new MutationObserver(() => {
      const isScrolledDown = window.scrollY > 50;
      if (isScrolledDown && !nav.matches(':hover')) {
        applyScrollStyles(true);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    if (window.scrollY > 50 && !nav.matches(':hover')) {
      applyScrollStyles(true);
    }

    return () => {
      trigger.kill();
      observer.disconnect();
    };
  }, []); // Empty dependency array is now correct

  return (
    <header
      ref={navRef}
      className="fixed top-0 z-50 w-full transition-all flex items-center "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        height: `${NAV_BASE_HEIGHT}px`,
        transition: 'height 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
      }}
    >
      <Container className="flex items-center justify-between w-full">

        {/* LOGO */}
        {/* <Link href="/" className="flex items-center">
          <Image
            ref={logoRef}
            src="/logo.png"
            alt="Abyssinia Software"
            width={160}
            height={50}
            className="transition-transform duration-300"
          />
        </Link> */}
        <div className="flex flex-col items-center leading-tight transition-transform duration-300 hover:scale-105" ref={logoRef}>

          {/* ⭐ AST (EXACT SAME STYLE YOU USED IN BADGE) */}
          <span className="text-2xl font-bold text-primary">
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

          {/* Company name */}
          <span className="text-xs font-medium text-primary tracking-wide text-center">
            Abyssinia Software Technology PLC
          </span>

        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium h-full">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              ref={addLinkRef}
              href={link.href}
              className="relative group text-foreground transition py-3"
            >
              {link.label}

              <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <Link
            href="/contactus"
            className="hidden md:block rounded-full px-5 py-[8px] bg-primary text-white text-sm font-semibold shadow-lg hover:bg-primary-hover transition"
          >
            Contact Us
          </Link>

          <ThemeToggle />

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-800 transition"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </Container>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden absolute top-16 w-full bg-background dark:bg-zinc-900 shadow-xl transform transition-all duration-500
          ${isOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"} overflow-y-auto`}
      >
        <nav className="flex flex-col gap-4 p-6 text-lg font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-3 border-b border-gray-300 dark:border-gray-700 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contactus"
            onClick={() => setIsOpen(false)}
            className="mt-3 rounded-full bg-primary text-white text-center py-3 text-sm font-semibold shadow-md hover:bg-primary-hover transition"
          >
            Contact Us
          </Link>
        </nav>
      </div>

    </header>
  );
}