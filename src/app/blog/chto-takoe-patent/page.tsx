import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import {
  ArrowRight,
  ChevronLeft,
  ChevronUp,
  Clock,
  ListTree,
  Sparkles,
  BookOpenCheck,
  Search,
  Gavel,
} from "lucide-react";
import {
  guideTitle,
  guideSubtitle,
  guideDate,
  guideSections,
  type GuideSection,
} from "@/lib/patent-guide";

export const metadata: Metadata = {
  title: "Что такое патент — большой гид по патентованию | IQin.ru",
  description:
    "Большой гид по патентам: три вида объектов, критерии охраноспособности, процедура получения за 5 шагов, пошлины и льготы, защита от конкурентов, патентование за рубежом (PCT, евразийский патент) и ответы на частые вопросы.",
  keywords: [
    "что такое патент",
    "виды патентов",
    "как запатентовать изобретение",
    "патентование",
    "полезная модель",
    "промышленный образец",
    "патентный поиск",
    "PCT",
    "евразийский патент",
  ],
  openGraph: {
    title: "Что такое патент — большой гид по патентованию",
    description:
      "Виды объектов, критерии охраноспособности, процедура, стоимость, защита прав и международное патентование — всё о патентах простыми словами.",
    url: "https://iqin.ru/blog/chto-takoe-patent",
    type: "article",
  },
};

const CTA_LINKS = [
  {
    href: "/patent_poisk",
    icon: Search,
    title: "Проверить новизну решения",
    text: "8 бесплатных баз патентного поиска — включая наш AIpat.ru с объединённым ИИ-поиском.",
  },
  {
    href: "/kontakt",
    icon: Gavel,
    title: "Консультация патентного поверенного",
    text: "Поиск, заявка, ответы на запросы экспертизы и защита в спорах — под ключ.",
  },
];

function Section({
  section,
  num,
}: {
  section: GuideSection;
  num: number;
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 border-t border-navy-line/50 pt-8"
    >
      <div className="mb-4 flex items-baseline gap-3">
        <span className="font-tech text-sm font-semibold text-neon/70">
          {String(num).padStart(2, "0")}
        </span>
        <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          {section.h1}
        </h2>
      </div>
      <div className="space-y-4 text-[15px] leading-[1.8] text-foreground/90 sm:text-base">
        {section.blocks.map((b, i) => {
          if (b.t === "p")
            return (
              <p key={i}>
                {b.text}
              </p>
            );
          if (b.t === "h2")
            return (
              <h3
                key={i}
                className="pt-4 font-display text-lg font-bold tracking-tight text-navy sm:text-xl"
              >
                {b.text}
              </h3>
            );
          if (b.t === "listintro") return <p key={i}>{b.text}</p>;
          if (b.t === "list")
            return (
              <ol key={i} className="space-y-3 pl-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-neon/40 bg-neon/10 font-tech text-[11px] font-semibold text-neon">
                      {j + 1}
                    </span>
                    <span>
                      <strong className="font-semibold text-navy">{it.b}</strong>
                      {it.text}
                    </span>
                  </li>
                ))}
              </ol>
            );
          if (b.t === "table")
            return (
              <figure key={i} className="pt-2">
                <figcaption className="mb-2 font-tech text-[11px] uppercase tracking-[0.18em] text-navy-muted">
                  {b.title}
                </figcaption>
                <div className="overflow-x-auto rounded-xl border border-navy-line/60">
                  <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-neon/10">
                        {b.head.map((h) => (
                          <th
                            key={h}
                            className="border-b border-navy-line/60 px-3 py-2.5 font-display font-semibold text-navy"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, ri) => (
                        <tr
                          key={ri}
                          className={ri % 2 ? "bg-card/40" : "bg-transparent"}
                        >
                          {row.map((cell, ci) => (
                            <td
                              key={ci}
                              className={`border-b border-navy-line/40 px-3 py-2.5 align-top ${ci === 0 ? "font-medium text-navy" : "text-foreground/85"}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </figure>
            );
          if (b.t === "faq")
            return (
              <div
                key={i}
                className="rounded-xl border border-navy-line/60 bg-card/40 p-4 backdrop-blur-sm"
              >
                <div className="flex items-start gap-2.5">
                  <BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                  <p className="font-display font-semibold text-navy">{b.q}</p>
                </div>
                <p className="mt-2 pl-[26px] text-[14px] leading-relaxed text-foreground/85">
                  {b.a}
                </p>
              </div>
            );
          return null;
        })}
      </div>
    </section>
  );
}

export default function PatentGuidePage() {
  const faqCount = guideSections.reduce(
    (n, s) => n + s.blocks.filter((b) => b.t === "faq").length,
    0
  );
  const tableCount = guideSections.reduce(
    (n, s) => n + s.blocks.filter((b) => b.t === "table").length,
    0
  );

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
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-navy-line/60">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-navy-grid opacity-30"
          />
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="mb-4 flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.18em] text-navy-muted">
              <Link
                href="/patenti"
                className="inline-flex items-center gap-1 transition-colors hover:text-neon"
              >
                <ChevronLeft className="h-3 w-3" />
                Патенты
              </Link>
              <span className="opacity-40">/</span>
              <span className="text-neon">гид</span>
            </div>
            <div className="font-tech text-[10px] uppercase tracking-[0.25em] text-neon/80">
              {"// "}
              <span className="text-iq-gold">IQ</span>
              <span className="text-in-blue">in</span>
              <span className="text-ru-plain">.ru</span>
              <span className="opacity-60"> · большой гид</span>
            </div>
            <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              {guideTitle}:{" "}
              <span className="text-neon">полный гид по патентованию</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy-muted sm:text-lg">
              {guideSubtitle}. Материал опирается на часть четвёртую ГК РФ и
              практику патентных бюро — от первого поиска до защиты в споре.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-tech text-[11px] uppercase tracking-wider text-navy-muted">
              <span className="inline-flex items-center gap-1.5">
                <ListTree className="h-3.5 w-3.5 text-neon" />
                {guideSections.length} разделов
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BookOpenCheck className="h-3.5 w-3.5 text-neon" />
                {tableCount} таблицы{faqCount ? ` · ${faqCount} вопроса-ответа` : ""}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-neon" />
                ~25 минут чтения
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-iq-gold" />
                обновлено {guideDate}
              </span>
            </div>
          </div>
        </section>

        {/* Content + TOC */}
        <div className="mx-auto max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8 lg:py-16">
          {/* TOC sidebar */}
          <aside className="mb-10 lg:mb-0">
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 font-tech text-[10px] uppercase tracking-[0.22em] text-navy-muted">
                Содержание
              </p>
              <nav className="space-y-1.5 border-l border-navy-line/60 pl-4">
                {guideSections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-[13px] leading-snug text-navy-muted transition-colors hover:text-neon"
                  >
                    <span className="mr-1.5 font-tech text-[10px] text-neon/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.h1}
                  </a>
                ))}
              </nav>
              <Link
                href="/patenti"
                className="mt-6 inline-flex items-center gap-1.5 rounded-md border border-neon/40 bg-neon/10 px-3.5 py-2 text-[13px] font-semibold text-neon transition-all hover:bg-neon hover:text-primary-foreground hover:glow-navy"
              >
                <ChevronUp className="h-3.5 w-3.5 rotate-[-90deg]" />
                Обзор патентов на /patenti
              </Link>
            </div>
          </aside>

          {/* Article body */}
          <article className="min-w-0 space-y-8">
            {guideSections.map((s, i) => (
              <Section key={s.id} section={s} num={i + 1} />
            ))}

            {/* Bottom CTA */}
            <div className="grid gap-4 border-t border-navy-line/50 pt-8 sm:grid-cols-2">
              {CTA_LINKS.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group relative overflow-hidden rounded-2xl border border-neon/30 bg-gradient-to-br from-card/60 via-background/40 to-card/30 p-5 backdrop-blur-md transition-all hover:border-neon/60 sm:p-6"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neon/30 bg-neon/10">
                    <c.icon className="h-5 w-5 text-neon" />
                  </div>
                  <h2 className="font-display text-lg font-bold text-navy">
                    {c.title}
                  </h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-navy-muted">
                    {c.text}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 font-tech text-xs font-semibold uppercase tracking-wider text-neon">
                    Перейти
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
