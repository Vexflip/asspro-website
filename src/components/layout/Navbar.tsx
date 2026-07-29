"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation } from "@/data/navigation";
import { LINKEDIN_URL } from "@/lib/org";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q");
    if (q) {
      router.push(`/recherche?q=${encodeURIComponent(q.toString())}`);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // Call immediately to set correct initial state on refresh
    
    // Mobile browsers often restore scroll position asynchronously after paint
    const t1 = setTimeout(onScroll, 50);
    const t2 = setTimeout(onScroll, 500);
    const t3 = setTimeout(onScroll, 1500);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("scroll", onScroll);
    };
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
            <div className="relative h-16 w-[140px]">
              <Image
                src={scrolled ? "/images/logo-white-bg.webp" : "/images/logo-dark-bg.webp"}
                alt="ASSPRO"
                fill
                className="object-contain transition-all duration-300"
                priority
                loading="eager"
              />
            </div>
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
                  <div className="absolute top-full left-0 w-56 pt-1 z-50">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2">
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
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTAs + Mobile toggle */}
          <div className="flex items-center gap-3">
            <form 
              onSubmit={handleSearch}
              className={cn(
                "hidden md:flex items-center px-3 py-2 rounded-lg transition-all border",
                scrolled 
                  ? "bg-surface border-gray-200 focus-within:border-primary focus-within:bg-white text-dark" 
                  : "bg-white/10 border-transparent focus-within:bg-white focus-within:text-dark text-white"
              )}>
                <Search className="w-4 h-4 opacity-70 shrink-0" />
                <input 
                  type="text" 
                  name="q"
                  placeholder="Recherche..." 
                  className={cn(
                    "bg-transparent border-none outline-none ml-2 text-sm w-28 lg:w-32 focus:w-40 lg:focus:w-48 transition-all",
                    scrolled ? "placeholder:text-gray-500" : "placeholder:text-white/70 focus:placeholder:text-gray-500"
                  )}
                />
            </form>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden md:inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold transition-all",
                scrolled
                  ? "bg-primary text-white hover:bg-primary-light"
                  : "bg-white text-accent-teal hover:bg-white/90"
              )}
            >
              LinkedIn
              <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
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
