"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Star,
  ChevronLeft,
  Search,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

/** A single search database entry — corresponds to one card on the page.
 *  Each card links to an external search service (target=_blank).
 */
type SearchDb = {
  name: string;
  url: string;
  category: string; // e.g. "(РФ)", "(INT)", "(РФ + INT)"
  description?: string;
  recommended?: boolean; // ★ marker
};

/** Props for the SearchDatabasesPage component. */
type Props = {
  /** Hero breadcrumb label, e.g. "znak_poisk" */
  slug: string;
  /** Hero h1 title */
  title: string;
  /** Hero description paragraph */
  description: string;
  /** Optional intro paragraphs (rendered above the cards grid) */
  intro?: string[];
  /** Search databases to render as cards */
  databases: SearchDb[];
  /** Accent color for icons (CSS hex) */
  accent?: string;
  /** "Назад к /masters" link */
  backHref?: string;
  /** Back link label */
  backLabel?: string;
};

export default function SearchDatabasesPage({
  slug,
  title,
  description,
  intro,
  databases,
  accent = "#60A5FA",
  backHref = "/masters",
  backLabel = "Все сервисы",
}: Props) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background bg-grid-mm-page">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-neon focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Перейти к содержимому
      </a>
      <Header />

      <main id="main" className="flex-1">
        {/* Hero header */}
        <section className="relative overflow-hidden border-b border-navy-line/60">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-navy-grid opacity-30"
          />
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            {/* Breadcrumbs with back link */}
            <div className="mb-4 flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.18em] text-navy-muted">
              <Link
                href={backHref}
                className="inline-flex items-center gap-1 transition-colors hover:text-neon"
              >
                <ChevronLeft className="h-3 w-3" />
                {backLabel}
              </Link>
              <span className="opacity-40">/</span>
              <span className="text-neon">{slug}</span>
            </div>
            <div className="font-tech text-[10px] uppercase tracking-[0.25em] text-neon/80">
              {"// "}
              <span className="text-iq-gold">IQ</span>
              <span className="text-in-blue">in</span>
              <span className="text-ru-plain">.ru</span>
              <span className="opacity-60"> · {slug}</span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy-muted sm:text-lg">
              {description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-tech text-[11px] uppercase tracking-wider text-navy-muted">
              <span className="inline-flex items-center gap-1.5">
                <Search className="h-3.5 w-3.5" />
                {databases.length} поисковых баз
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5" style={{ color: accent }} />
                {databases.filter((d) => d.recommended).length} рекомендуемых
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ExternalLink className="h-3.5 w-3.5" />
                Все открываются в новой вкладке
              </span>
            </div>
          </div>
        </section>

        {/* Intro paragraphs (optional) */}
        {intro && intro.length > 0 && (
          <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="space-y-4 text-[15px] leading-[1.75] text-foreground/90">
              {intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {/* Cards grid */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {databases.map((db, i) => (
              <motion.div
                key={db.url}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <SearchDbCard db={db} accent={accent} />
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 rounded-2xl border border-neon/30 bg-gradient-to-br from-card/60 via-background/40 to-card/30 p-6 backdrop-blur-md sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-bold tracking-tight text-navy sm:text-2xl">
                  Нужна помощь с поиском?
                </h2>
                <p className="mt-1 text-sm text-navy-muted sm:text-base">
                  Патентные поверенные проведут профессиональный поиск и
                  составят отчёт. Экономия времени и гарантия результата.
                </p>
              </div>
              <Link
                href="/kontakt"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-neon/40 bg-neon/10 px-4 py-2.5 text-sm font-semibold text-neon transition-all hover:bg-neon hover:text-primary-foreground hover:glow-navy"
              >
                <Sparkles className="h-4 w-4" />
                Заказать поиск
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/** Single search database card. */
function SearchDbCard({ db, accent }: { db: SearchDb; accent: string }) {
  return (
    <a
      href={db.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full overflow-hidden rounded-xl border border-navy-line/60 bg-card/40 p-5 backdrop-blur-sm transition-all hover:border-neon/40 hover:bg-card/60"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--navy-line) 1px, transparent 1px), linear-gradient(to bottom, var(--navy-line) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Corner brackets — HUD aesthetic */}
      <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-neon/50 transition-colors group-hover:border-neon" />
      <span className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-neon/50 transition-colors group-hover:border-neon" />
      <span className="pointer-events-none absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 border-neon/50 transition-colors group-hover:border-neon" />
      <span className="pointer-events-none absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-neon/50 transition-colors group-hover:border-neon" />

      <div className="relative">
        {/* Top row: name + external icon */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-display text-base font-bold tracking-tight text-navy sm:text-lg">
            {db.name}
            <span
              className="ml-2 inline-block align-middle font-tech text-[10px] font-medium uppercase tracking-wider"
              style={{ color: accent }}
            >
              {db.category}
            </span>
            {db.recommended && (
              <span
                className="ml-2 inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                style={{
                  backgroundColor: `${accent}20`,
                  color: accent,
                  border: `1px solid ${accent}40`,
                }}
              >
                <Star className="h-2.5 w-2.5 fill-current" />
                рекомендуем
              </span>
            )}
          </h3>
          <ExternalLink className="h-4 w-4 shrink-0 text-navy-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neon" />
        </div>

        {/* Description (optional) */}
        {db.description && (
          <p className="mb-3 text-[13px] leading-relaxed text-navy-muted">
            {db.description}
          </p>
        )}

        {/* URL display */}
        <div className="mt-3 flex items-center gap-1.5 text-xs font-tech text-neon/70 transition-colors group-hover:text-neon">
          <span className="truncate">
            {db.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
          <ArrowRight className="h-3 w-3 shrink-0" />
        </div>
      </div>
    </a>
  );
}
