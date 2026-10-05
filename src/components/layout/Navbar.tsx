"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Church, 
  Clock, 
  Users, 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  ChevronRight 
} from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Inicio", href: "/", icon: Church },
    { name: "Horarios", href: "/horarios", icon: Clock },
    { name: "Grupos", href: "/grupos", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? "glass-nav border-stone-200/80 shadow-sm py-2.5"
            : "bg-white/95 backdrop-blur-md border-stone-200 py-3.5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group py-0.5">
            <Image
              src="/images/logo-san-roque-horizontal.png"
              alt="Parroquia San Roque - Diócesis de Ciudad Quesadda"
              width={220}
              height={52}
              className="h-11 sm:h-12 w-auto object-contain group-hover:opacity-95 transition-opacity duration-200"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "text-red-800 bg-red-50 font-semibold shadow-xs"
                      : "text-stone-700 hover:text-red-800 hover:bg-stone-100/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-red-800" : "text-stone-400"}`} />
                  {link.name}
                </Link>
              );
            })}

            <div className="h-5 w-px bg-stone-200 mx-2" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 shadow-xl">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "text-red-800 bg-red-50 font-semibold"
                        : "text-stone-700 hover:bg-stone-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-md ${isActive ? "bg-red-100 text-red-800" : "bg-stone-100 text-stone-500"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{link.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </Link>
                );
              })}

              <div className="pt-3 mt-2 border-t border-stone-100 flex flex-col gap-2">
                <Link
                  href="/horarios"
                  className="w-full text-center py-2.5 px-4 rounded-lg bg-red-800 text-white font-medium text-sm shadow hover:bg-red-900 transition"
                >
                  Consultar Horarios de Misa
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

