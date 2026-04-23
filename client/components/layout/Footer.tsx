"use client";

import React from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { Phone, Mail, MapPin, Globe } from "lucide-react";

export default function Footer() {
  const productLinks = [
    { name: "Products", href: "/cars" },
    { name: "Our Fleet", href: "/categories" },
  ];

  const companyLinks = [
    { name: "Blog", href: "/blogs" },
    { name: "About", href: "/abouts" },
    { name: "Service", href: "/services" },
    { name: "Partners", href: "/partners" },
    { name: "Gallery", href: "/galleries" },
    { name: "Contact", href: "/contacts" },
    { name: "Testimonials", href: "/testimonials" },
  ];

  const contactInfo = [
    { icon: MapPin, text: "Addis Ababa, around Pushkin Square" },
    { icon: Phone, text: "0911 510313 / 0977 777717 / 911 323333", href: "tel:0911510313" },
    { icon: Mail, text: "soliyano10@gmail.com", href: "mailto:soliyano10@gmail.com" },
    { icon: Mail, text: "adinascarrent@gmail.com", href: "mailto:adinascarrent@gmail.com" },
    { icon: Globe, text: "www.adinascarrent.com", href: "https://adinascarrent.com" },
  ];

  return (

    <footer className="mt-16 border-t bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">

      <div className="m-10 p-10 relative flex h-42 w-42 items-center justify-center rounded-full bg-white shadow-md overflow-hidden">

        {/* 🔄 Rotating circle text */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin-slow"
          viewBox="0 0 100 100"
        >
          <defs>
            <path
              id="circlePath"
              d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            />
          </defs>

          <text className="text-[8px] fill-green-600 tracking-widest uppercase">
            <textPath href="#circlePath">
              Abyssinia Software Technology PLC • Abyssinia Software Technology PLC •
            </textPath>
          </text>
        </svg>

        {/* ⭐ CENTER AST (YOUR EXACT STYLE — UNCHANGED) */}
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

      </div>

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

      </div>

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





      <Container className="py-12 flex flex-col gap-10 md:gap-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-10 w-20 items-center justify-center rounded-lg shadow-sm bg-primary text-white text-xl font-bold">
                AST
              </span>
              <span className="text-lg font-semibold">
                Abyssinia Softwareal
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Abyssinia Softwareal – Your trusted partner in safe, reliable, and efficient transport solutions.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Products</h3>
            <ul className="space-y-1 text-sm">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-1 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="space-y-2 text-sm">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start gap-2">
                  <info.icon className="w-4 h-4 mt-1 flex-shrink-0 text-red-600 dark:text-red-500" />
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="underline text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-400">{info.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-6 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Abyssinia Softwareal. All rights reserved.</p>

          <p className="text-center">
            Developed by <span className="font-semibold hover:text-green-600 dark:hover:text-green-500 transition-colors">Abyssinia Software Technology</span>
          </p>

          <div className="flex gap-6">
            <Link href="#" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">LinkedIn</Link>
            <Link href="#" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">GitHub</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
