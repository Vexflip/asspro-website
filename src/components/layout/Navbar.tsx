"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/data/navigation";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        )}
      >
        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src={scrolled ? "/images/logo-white-bg.png" : "/images/logo-dark-bg.png"}
              alt="ASSPRO"
              width={140}
              height={48}
              className="h-16 w-auto object-contain transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.children && setDropdownOpen(item.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1",
                    pathname === item.href
                      ? scrolled
                        ? "text-primary bg-primary/10"
                        : "text-white bg-white/20"
                      : scrolled
                        ? "text-dark hover:text-primary hover:bg-surface"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3" />}
                </Link>

                {/* Dropdown */}
                {item.children && dropdownOpen === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-dark hover:bg-surface hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTAs + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/formations"
              className={cn(
                "hidden md:inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold transition-all",
                scrolled
                  ? "bg-primary text-white hover:bg-primary-light"
                  : "bg-white text-primary hover:bg-white/90"
              )}
            >
              Nos formations
            </Link>
            <Link
              href="/contact"
              className={cn(
                "hidden md:inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold transition-all border",
                scrolled
                  ? "border-primary text-primary hover:bg-primary hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-primary"
              )}
            >
              Espace adhérent
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors cursor-pointer",
                scrolled ? "text-dark hover:bg-surface" : "text-white hover:bg-white/10"
              )}
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
