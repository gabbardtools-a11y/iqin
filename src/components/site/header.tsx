"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Sparkles } from "lucide-react";
import { mainNav, contacts } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "bg-navy-header border-b border-navy-line",
        scrolled && "bg-navy-header-scrolled"
      )}
    >
      {/* Top accent line — cyan-to-neon glow */}
      <div aria-hidden="true" className="navy-accent-line h-px w-full" />
      {/* Subtle navy grid overlay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-navy-grid opacity-40" />

      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Logo — overflow:hidden prevents scan-line glow / drop-shadow
            from inflating the header height on desktop (lg:h-20 = 80px). */}
        <Link href="/" className="group flex items-center gap-2.5" aria-label="IQin — на главную">
          <LogoMark />
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-navy">
              <span className="text-in-blue">IQ</span>
              <span className="text-in-blue">in</span>
              <span className="text-ru-plain text-base">.ru</span>
            </span>
            <span className="font-tech text-[9px] uppercase tracking-[0.25em] text-navy-muted">
              Ultra Next-Gen AI-IP Platform
            </span>
          </div>
        </Link>

        {/* Desktop navigation — only a few high-priority items.
            Items: Патентные поверенные, Цены, Акции, О компании — moved to
            mobile-only (burger) menu to avoid overflow on smaller laptops. */}
        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Основная навигация">
          {mainNav
            .filter(
              (item) =>
                ![
                  "/patentnie_poverennie",
                  "/price",
                  "/akcii_i_skidki",
                  "/company",
                ].includes(item.href)
            )
            .map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-all",
                  "text-navy-muted hover-navy-item"
                )}
              >
                {item.label}
                {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
              </Link>
              {item.children && (
                <AnimatePresence>
                  {openDropdown === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full pt-2"
                    >
                      <div
                        className="clip-corner-sm min-w-[260px] overflow-hidden rounded-lg p-1.5 shadow-2xl"
                        style={{
                          background:
                            "linear-gradient(180deg, var(--navy-700), var(--navy-900))",
                          border: "1px solid var(--navy-line)",
                          backdropFilter: "blur(16px) saturate(150%)",
                          WebkitBackdropFilter: "blur(16px) saturate(150%)",
                          boxShadow:
                            "0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px var(--navy-line), 0 0 24px color-mix(in oklch, var(--navy-glow) 20%, transparent)",
                        }}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-md px-3 py-2 text-sm text-navy-muted transition-all hover:bg-neon/10 hover:text-neon"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-2">
          <a
            href={contacts.phoneHref}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-navy-muted transition-colors hover:text-neon lg:flex"
          >
            <Phone className="h-4 w-4" />
            <span className="font-tech">{contacts.phone}</span>
          </a>
          <ThemeToggle className="hidden sm:inline-flex" />
          <Link
            href="/kontakt"
            className="hidden items-center gap-1.5 rounded-md border border-neon/40 bg-neon/10 px-4 py-2 text-sm font-semibold text-neon transition-all hover:bg-neon hover:text-primary-foreground hover:glow-navy md:inline-flex"
          >
            <Sparkles className="h-4 w-4" />
            Оставить заявку
          </Link>
          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-navy-line text-navy transition-colors hover:bg-neon/10 hover:text-neon xl:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 xl:hidden"
          >
            <div
              className="absolute inset-0 backdrop-blur-xl"
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in oklch, var(--navy-900) 92%, transparent), color-mix(in oklch, var(--background) 95%, transparent))",
              }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="absolute right-0 top-0 h-full w-[88%] max-w-sm overflow-y-auto custom-scroll p-6"
              style={{
                background:
                  "linear-gradient(180deg, var(--navy-800), var(--navy-900))",
                borderLeft: "1px solid var(--navy-line)",
                boxShadow: "-16px 0 48px rgba(0,0,0,0.6)",
              }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <LogoMark />
                  <span className="font-display text-lg font-bold text-navy">
                    <span className="text-in-blue">IQ</span>
                    <span className="text-in-blue">in</span>
                    <span className="text-ru-plain text-sm">.ru</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Закрыть меню"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-navy-line text-navy transition-colors hover:bg-neon/10 hover:text-neon"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
                {mainNav.map((item) => (
                  <div key={item.href} className="border-b border-navy-line py-1">
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2.5 text-base font-medium text-navy transition-colors hover:bg-neon/10 hover:text-neon"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-3 flex flex-col gap-0.5 border-l border-neon/15 pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-md px-3 py-2 text-sm text-navy-muted transition-colors hover:text-neon"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={contacts.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-navy-line px-4 py-3 text-sm font-medium text-navy transition-colors hover:bg-neon/10 hover:text-neon"
                >
                  <Phone className="h-4 w-4" />
                  {contacts.phone}
                </a>
                <Link
                  href="/kontakt"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-neon px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:glow-navy"
                >
                  <Sparkles className="h-4 w-4" />
                  Оставить заявку
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LogoMark() {
  return (
    <span
      className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl logo-v-crossscan"
      aria-hidden="true"
      style={{
        background: "transparent",
      }}
    >
      {/* Subtle grid background */}
      <span
        className="absolute inset-1 rounded-sm opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--logo-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--logo-grid) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      />
      {/* Corner brackets — circuit/HUD aesthetic */}
      <span className="pointer-events-none absolute left-0.5 top-0.5 h-2 w-2 border-l-2 border-t-2 border-neon" />
      <span className="pointer-events-none absolute right-0.5 top-0.5 h-2 w-2 border-r-2 border-t-2 border-neon" />
      <span className="pointer-events-none absolute bottom-0.5 left-0.5 h-2 w-2 border-b-2 border-l-2 border-neon" />
      <span className="pointer-events-none absolute bottom-0.5 right-0.5 h-2 w-2 border-b-2 border-r-2 border-neon" />
      {/* V16 — Vertical sweeping bar (L→R, 16s cycle) */}
      <span className="logo-vscan-line" />
      {/* V16 — Horizontal sweeping bar (T→B, 16s cycle) */}
      <span className="logo-hscan-line" />
      {/* The 音 character — yīn (sound/intellect), cognate of "in" in IQin.
          Solid blue (var(--in-blue)), font-medium 500, 20px.
          Uses .logo-glyph-flash so it flashes bright white-blue when each
          sweeping bar crosses its center (~22% and ~72% of the 16s cycle). */}
      <span
        className="logo-glyph relative font-medium leading-none logo-glyph-flash"
        style={{
          fontFamily: "var(--font-cjk), 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
          fontSize: "20px",
          color: "var(--in-blue)",
          WebkitTextFillColor: "var(--in-blue)",
        }}
      >
        音
      </span>
    </span>
  );
}
