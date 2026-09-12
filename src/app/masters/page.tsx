"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Frame,
  Globe,
  Code2,
  ArrowRight,
  Search,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

/** Custom "Registered" icon — R inside a circle (like ® trademark symbol).
 *  lucide-react doesn't have this built-in, so we draw it ourselves.
 *  Stroke-based, matches lucide visual style (24x24 viewBox, 2px stroke).
 */
function Registered({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx="12" cy="12" r="10" />
      {/* Letter "R" — drawn as path: vertical stroke + bowl + diagonal leg */}
      <path d="M9 7v10" />
      <path d="M9 7h4a2.5 2.5 0 0 1 0 5H9" />
      <path d="M12 12l3 5" />
    </svg>
  );
}

type CardItem = {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string; // CSS color for the icon glow
  bullets: string[];
  external?: boolean;
};

const CARDS: CardItem[] = [
  {
    href: "/znak_poisk",
    title: "Поиск по товарным знакам",
    description:
      "Проверьте оригинальность вашего логотипа, названия или бренда перед регистрацией. Узнайте, не занят ли знак в России и за рубежом.",
    icon: <Registered className="h-7 w-7" />,
    accent: "#60A5FA",
    bullets: [
      "Российские и международные базы",
      "Проверка по 11 сервисам (LINKMARK, WIPO, USPTO, ФИПС и др.)",
      "Сверка с реестром Роспатента",
    ],
  },
  {
    href: "/patent_poisk",
    title: "Поиск по патентам на изобретения",
    description:
      "Проверьте новизну вашей идеи перед подачей заявки. Найдите аналоги в российских и международных патентных базах.",
    icon: <Lightbulb className="h-7 w-7" />,
    accent: "#A78BFA",
    bullets: [
      "Яндекс.Патенты, Google Patents, Espacenet",
      "Цифровая платформа Роспатента",
      "WIPO Patentscope, ЕАПТ, ФИПС",
    ],
  },
  {
    href: "/patent_poisk_design",
    title: "Поиск по промышленным образцам",
    description:
      "Проверьте оригинальность дизайна изделия. Поиск по российским и международным базам промышленных образцов.",
    icon: <Frame className="h-7 w-7" />,
    accent: "#F472B6",
    bullets: [
      "WIPO Hague Express (международная база)",
      "TMview Design (европейская база)",
      "ФИПС — реестр промобразцов РФ",
    ],
  },
  {
    href: "https://sprinthost.ru/tariffs/domains.html",
    title: "Поиск по доменным именам",
    description:
      "Проверьте свободность доменного имени в зонах .ru, .рф, .com и других. Подберите подходящее имя для вашего проекта.",
    icon: <Globe className="h-7 w-7" />,
    accent: "#34D399",
    bullets: [
      "Официальные регистраторы доменов",
      "Проверка в зонах .ru, .рф, .com, .net, .org",
      "Стоимость от 49 ₽ до 200 ₽ за домен",
    ],
    external: true,
  },
  {
    href: "/poisk_soft",
    title: "Поиск по программам и базам данных",
    description:
      "Узнайте, как внести свой софт в реестр российского ПО. Проверьте, зарегистрированы ли аналогичные программы в Роспатенте.",
    icon: <Code2 className="h-7 w-7" />,
    accent: "#FBBF24",
    bullets: [
      "Реестр российского ПО (Минцифры)",
      "ФИПС — реестр программ ЭВМ и баз данных",
      "Регистрация программ для ЭВМ под ключ",
    ],
  },
  {
    href: "/patent_class",
    title: "Патентные классификаторы",
    description:
      "Определите правильные классы МКТУ, МПК, МКПО для вашего объекта интеллектуальной собственности. Гибридный подход: ИИ + патентный поверенный.",
    icon: <Search className="h-7 w-7" />,
    accent: "#22D3EE",
    bullets: [
      "МКТУ — 45 классов для товарных знаков",
      "МПК — 70 000+ подклассов для изобретений",
      "МКПО — 32 класса для промышленных образцов",
    ],
  },
];

export default function MastersPage() {
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
            <div className="font-tech text-[10px] uppercase tracking-[0.25em] text-neon/80">
              {"// "}
              <span className="text-iq-gold">IQ</span>
              <span className="text-in-blue">in</span>
              <span className="text-ru-plain">.ru</span>
              <span className="opacity-60"> · masters</span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Сервисы и поисковые базы
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy-muted sm:text-lg">
              Бесплатные инструменты для проверки товарных знаков, патентов на
              изобретения, промышленных образцов, доменных имён и программ для
              ЭВМ. Выберите категорию поиска ниже — мы собрали проверенные
              сервисы с описанием каждого.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-tech text-[11px] uppercase tracking-wider text-navy-muted">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                {CARDS.length} категорий поиска
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Registered className="h-3.5 w-3.5" />
                25+ поисковых баз
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Search className="h-3.5 w-3.5" />
                Бесплатная проверка
              </span>
            </div>
          </div>
        </section>

        {/* Cards grid */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card, i) => (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card item={card} />
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
                  Не нашли нужный сервис?
                </h2>
                <p className="mt-1 text-sm text-navy-muted sm:text-base">
                  Свяжитесь с нашими патентными поверенными — поможем подобрать
                  правильный инструмент или проведём поиск за вас.
                </p>
              </div>
              <Link
                href="/kontakt"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-neon/40 bg-neon/10 px-4 py-2.5 text-sm font-semibold text-neon transition-all hover:bg-neon hover:text-primary-foreground hover:glow-navy"
              >
                <Sparkles className="h-4 w-4" />
                Оставить заявку
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Card({ item }: { item: CardItem }) {
  const isExternal = item.external || item.href.startsWith("http");
  const linkProps = isExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
    : {};

  return (
    <Link
      href={item.href}
      {...linkProps}
      className="group relative block h-full overflow-hidden rounded-xl border border-navy-line/60 bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-neon/40 hover:bg-card/60"
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

      {/* Corner brackets — HUD aesthetic (like the logo) */}
      <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-neon/50 transition-colors group-hover:border-neon" />
      <span className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-neon/50 transition-colors group-hover:border-neon" />
      <span className="pointer-events-none absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 border-neon/50 transition-colors group-hover:border-neon" />
      <span className="pointer-events-none absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-neon/50 transition-colors group-hover:border-neon" />

      <div className="relative">
        {/* Icon with glow */}
        <div className="mb-4 flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-lg border transition-all group-hover:scale-110"
            style={{
              borderColor: `${item.accent}40`,
              backgroundColor: `${item.accent}10`,
              color: item.accent,
              boxShadow: `0 0 20px ${item.accent}20`,
            }}
          >
            {item.icon}
          </div>
          <ArrowRight className="h-4 w-4 text-navy-muted transition-all group-hover:translate-x-1 group-hover:text-neon" />
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold tracking-tight text-navy sm:text-xl">
          {item.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-navy-muted">
          {item.description}
        </p>

        {/* Bullet list */}
        <ul className="mt-4 space-y-1.5">
          {item.bullets.map((bullet, j) => (
            <li
              key={j}
              className="flex items-start gap-2 text-[13px] leading-relaxed text-navy-muted/80"
            >
              <span
                className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full"
                style={{ backgroundColor: item.accent }}
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        {/* Footer link */}
        <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-neon/70 transition-colors group-hover:text-neon">
          <span className="font-tech uppercase tracking-wider">
            {isExternal ? "Открыть сервис" : "Перейти к поиску"}
          </span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}
