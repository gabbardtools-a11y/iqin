import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ArrowRight, ArrowLeft, FileText, ImageIcon, LinkIcon } from "lucide-react";
import Link from "next/link";

type IqinPage = {
  slug: string;
  url: string;
  title: string;
  h1: string;
  description: string;
  keywords: string;
  body: string;
  headings: { level: number; text: string }[];
  images: { src: string; alt: string }[];
  links: { href: string; text: string }[];
  bodyLength: number;
};

const DATA_DIR = path.join(process.cwd(), "src", "lib", "iqin-data");

async function loadPage(slugSegments: string[]): Promise<IqinPage | null> {
  const slug = slugSegments.join("/") || "home";
  const fileSlug = slug.replace(/\//g, "__");
  const file = path.join(DATA_DIR, `${fileSlug}.json`);
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as IqinPage;
  } catch {
    return null;
  }
}

async function getAllSlugs(): Promise<string[]> {
  const indexFile = path.join(DATA_DIR, "_index.json");
  try {
    const raw = await fs.readFile(indexFile, "utf-8");
    const list = JSON.parse(raw) as { slug: string }[];
    return list.map((x) => x.slug);
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs
    .filter((s) => s !== "home")
    .map((slug) => ({
      slug: slug.split("/"),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug: slugSegments } = await params;
  const page = await loadPage(slugSegments ?? []);
  if (!page) {
    return { title: "Страница не найдена" };
  }
  return {
    title: page.title,
    description: page.description || page.h1,
    keywords: page.keywords ? page.keywords.split(",").map((s) => s.trim()).filter(Boolean) : [],
    openGraph: {
      title: page.title,
      description: page.description || page.h1,
      url: page.url,
      type: "article",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug: slugSegments } = await params;
  const page = await loadPage(slugSegments ?? []);
  if (!page) {
    notFound();
  }

  const segments = slugSegments ?? [];

  // Split body into paragraphs by 2+ newlines
  const paragraphs = (page.body || "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const toc = page.headings.filter((h) => h.level >= 1 && h.level <= 3);

  const internalLinks = page.links.filter(
    (l) => l.href.startsWith("https://iqin.ru/") || l.href.startsWith("/")
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-neon focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Перейти к содержимому
      </a>
      <Header />

      <main id="main" className="flex-1">
        {/* Breadcrumbs / system path bar */}
        <div className="border-b border-navy-line/60 bg-navy-header/40">
          <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
            <nav
              aria-label="Хлебные крошки"
              className="flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-[0.18em] text-navy-muted"
            >
              <Link href="/" className="hover:text-neon transition-colors">
                / root
              </Link>
              {segments.length > 0 && (
                <>
                  <span className="opacity-40">/</span>
                  <span className="text-neon">{segments.join("/")}</span>
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Hero header for the page */}
        <section className="relative overflow-hidden border-b border-navy-line/60">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-navy-grid opacity-30"
          />
          <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="font-tech text-[10px] uppercase tracking-[0.25em] text-neon/80">
              {"// "}
              <span className="text-iq-gold">IQ</span>
              <span className="text-in-blue">in</span>
              <span className="text-ru-plain">.ru</span>
              <span className="opacity-60"> · archive</span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              {page.h1}
            </h1>
            {page.description && (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy-muted sm:text-lg">
                {page.description}
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-tech text-[11px] uppercase tracking-wider text-navy-muted">
              <span className="inline-flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                {page.bodyLength.toLocaleString("ru-RU")} симв.
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5" />
                {page.images.length} изображ.
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LinkIcon className="h-3.5 w-3.5" />
                {page.links.length} ссылок
              </span>
              <span className="text-navy-muted/60">
                Источник:{" "}
                <a
                  href={page.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon hover:underline"
                >
                  {page.url}
                </a>
              </span>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_220px]">
            <article>
              {paragraphs.length > 0 ? (
                paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="mb-4 text-[15px] leading-[1.75] text-foreground/90"
                  >
                    {p}
                  </p>
                ))
              ) : (
                <div className="rounded-lg border border-navy-line/60 bg-card/30 p-8 text-center">
                  <p className="font-tech text-sm uppercase tracking-wider text-navy-muted">
                    {"// Контент страницы пуст"}
                  </p>
                  <p className="mt-2 text-sm text-navy-muted">
                    Содержимое не было извлечено из исходной страницы.
                  </p>
                </div>
              )}

              {page.images.length > 0 && (
                <div className="mt-10">
                  <h2 className="font-tech text-[11px] uppercase tracking-[0.2em] text-neon">
                    {"// Изображения на странице"}
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {page.images.slice(0, 12).map((img, i) => (
                      <figure
                        key={i}
                        className="overflow-hidden rounded-lg border border-navy-line/60 bg-card/40"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="h-44 w-full object-cover"
                          loading="lazy"
                        />
                        {img.alt && (
                          <figcaption className="border-t border-navy-line/40 px-3 py-2 font-tech text-[10px] uppercase tracking-wider text-navy-muted">
                            {img.alt}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                  {page.images.length > 12 && (
                    <p className="mt-3 text-xs text-navy-muted">
                      …и ещё {page.images.length - 12} изображений
                    </p>
                  )}
                </div>
              )}
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {toc.length > 0 && (
                  <div>
                    <h3 className="font-tech text-[10px] uppercase tracking-[0.2em] text-neon">
                      {"// Содержание"}
                    </h3>
                    <ul className="mt-3 space-y-1.5">
                      {toc.slice(0, 20).map((h, i) => (
                        <li
                          key={i}
                          className={`text-xs leading-relaxed ${
                            h.level === 1
                              ? "font-semibold text-foreground"
                              : h.level === 2
                              ? "pl-2 text-navy-muted"
                              : "pl-4 text-navy-muted/70"
                          }`}
                        >
                          {h.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {internalLinks.length > 0 && (
                  <div>
                    <h3 className="font-tech text-[10px] uppercase tracking-[0.2em] text-neon">
                      {"// Ссылки по теме"}
                    </h3>
                    <ul className="mt-3 space-y-1.5">
                      {internalLinks.slice(0, 12).map((l, i) => {
                        const href = l.href.replace("https://iqin.ru", "");
                        return (
                          <li key={i}>
                            <Link
                              href={href}
                              className="inline-flex items-start gap-1.5 text-xs leading-relaxed text-navy-muted transition-colors hover:text-neon"
                            >
                              <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-neon/60" />
                              <span>{l.text}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>

          <div className="mt-16 flex flex-col gap-3 border-t border-navy-line/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md border border-navy-line px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-neon/10 hover:text-neon"
            >
              <ArrowLeft className="h-4 w-4" />
              На главную
            </Link>
            <Link
              href="/logo-lab"
              className="inline-flex items-center gap-2 rounded-md border border-neon/40 bg-neon/10 px-4 py-2 text-sm font-semibold text-neon transition-all hover:bg-neon hover:text-primary-foreground"
            >
              Logo Motion Lab
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
