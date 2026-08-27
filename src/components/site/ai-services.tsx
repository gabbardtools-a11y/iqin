"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Code2,
  ArrowUpRight,
  FileText,
  Search,
  ShieldCheck,
  Globe,
  Cpu,
  Zap,
  Layout,
  Palette,
  ShoppingBag,
  TrendingUp,
  Check,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

const patentFeatures = [
  {
    icon: Search,
    title: "Умный патентный поиск",
    description:
      "ИИ анализирует миллионы патентов в реальном времени — находит аналоги, оценивает оригинальность и подбирает МПК-классы с точностью 98.4%.",
  },
  {
    icon: FileText,
    title: "Генерация формулы и реферата",
    description:
      "Модель IQin-Patent v3 формирует независимые и зависимые пункты формулы, реферат и описание на основе технического задания.",
  },
  {
    icon: ShieldCheck,
    title: "Анти-рисковый аудит",
    description:
      "Предиктивная оценка вероятности отказа Роспатента. ИИ находит слабые места заявки до подачи и предлагает доработки.",
  },
];

const siteFeatures = [
  {
    icon: Layout,
    title: "Архитектура и UX под бизнес",
    description:
      "ИИ-агент анализирует нишу, целевую аудиторию и конкурентов — предлагает структуру страниц и прототип за минуты, а не недели.",
  },
  {
    icon: Palette,
    title: "Дизайн в техно-стиле",
    description:
      "Генеративные дизайн-системы создают уникальные визуальные концепции: от типографики и палитры до анимаций и микро-взаимодействий.",
  },
  {
    icon: Cpu,
    title: "Код на Next.js + TypeScript",
    description:
      "Готовый production-код на современном стеке: React 19, Next.js 16, Tailwind CSS 4, shadcn/ui. SEO, адаптивность, производительность 90+.",
  },
];

export function AiServices() {
  return (
    <section id="ai-services" className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="IQin AI Suite"
          title={
            <>
              <span className="text-neon-solid">ИИ-</span>сервисы, которые{" "}
              <span className="text-neon-solid">меняют правила игры</span>
            </>
          }
          description="Мы встроили большие языковые модели в патентный и веб-процессы. Получите результат, на который у традиционных агентств уходят недели — за один рабочий день."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <AiServiceCard
            variant="patent"
            badge="Patent AI"
            title="Создание патентов с ИИ"
            tagline="От идеи до заявки в Роспатент — за 24 часа"
            description="Полный цикл патентования с искусственным интеллектом: поиск, формула, описание, аудит рисков и сопровождение поверенным."
            features={patentFeatures}
            stats={[
              { value: "98.4%", label: "Точность МПК" },
              { value: "−73%", label: "Время подготовки" },
              { value: "24ч", label: "До подачи заявки" },
            ]}
            cta={{ label: "Подать заявку на патент", href: "/patenti" }}
          />
          <AiServiceCard
            variant="site"
            badge="Web AI"
            title="Создание сайтов с ИИ"
            tagline="Production-готовый сайт на Next.js за один день"
            description="Генеративная разработка: от анализа ниши и прототипа до чистого кода на Next.js + TypeScript. Адаптивный, быстрый, SEO-оптимизированный."
            features={siteFeatures}
            stats={[
              { value: "90+", label: "PageSpeed" },
              { value: "1 день", label: "До запуска MVP" },
              { value: "100%", label: "Кастомный дизайн" },
            ]}
            cta={{ label: "Заказать сайт с ИИ", href: "/kontakt" }}
          />
        </div>

        {/* Combined CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-8 overflow-hidden rounded-2xl border border-neon/20 bg-gradient-to-r from-card/60 via-background to-card/60 p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neon/10 text-neon glow-neon">
                <Zap className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold">
                  Комбо: патент + сайт для стартапа
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Запатентуйте технологию и запустите сайт для её продвижения — единым контрактом
                  со скидкой до 25%.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-md bg-neon px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:glow-neon-strong"
              >
                Получить КП
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/price"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-neon/40 hover:text-neon"
              >
                Прайс-лист
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

type AiServiceCardProps = {
  variant: "patent" | "site";
  badge: string;
  title: string;
  tagline: string;
  description: string;
  features: Feature[];
  stats: { value: string; label: string }[];
  cta: { label: string; href: string };
};

function AiServiceCard({
  variant,
  badge,
  title,
  tagline,
  description,
  features,
  stats,
  cta,
}: AiServiceCardProps) {
  const isPatent = variant === "patent";
  const accentColor = isPatent ? "var(--neon)" : "var(--amber)";
  const Icon = isPatent ? Brain : Code2;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: isPatent ? 0 : 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-sm transition-all hover:border-neon/40"
    >
      {/* Top accent line */}
      <div
        className="h-0.5 w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }}
      />

      {/* Glow on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at 50% 0%, color-mix(in oklch, ${accentColor} 12%, transparent), transparent 70%)`,
        }}
      />

      <div className="relative flex flex-1 flex-col p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-lg transition-all group-hover:scale-110"
              style={{
                background: `color-mix(in oklch, ${accentColor} 12%, transparent)`,
                color: accentColor,
                boxShadow: `0 0 24px color-mix(in oklch, ${accentColor} 25%, transparent)`,
              }}
            >
              <Icon className="h-6 w-6" />
            </span>
            <div className="flex flex-col">
              <span
                className="font-tech text-[10px] uppercase tracking-[0.2em]"
                style={{ color: accentColor }}
              >
                {badge}
              </span>
              <span className="font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                Powered by IQin AI
              </span>
            </div>
          </div>
          <ArrowUpRight
            className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neon"
            style={{ color: isPatent ? undefined : "var(--amber)" }}
          />
        </div>

        {/* Title block */}
        <div className="mt-6">
          <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h3>
          <p
            className="mt-1.5 font-tech text-xs uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            {tagline}
          </p>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">{description}</p>
        </div>

        {/* Features */}
        <ul className="mt-6 flex flex-col gap-3">
          {features.map((feature) => (
            <li key={feature.title} className="flex gap-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border"
                style={{
                  borderColor: `color-mix(in oklch, ${accentColor} 30%, transparent)`,
                  background: `color-mix(in oklch, ${accentColor} 6%, transparent)`,
                  color: accentColor,
                }}
              >
                <feature.icon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{feature.title}</span>
                  <Check className="h-3.5 w-3.5" style={{ color: accentColor }} />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border/60 pt-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span
                className="font-display text-xl font-bold sm:text-2xl"
                style={{ color: accentColor }}
              >
                {stat.value}
              </span>
              <span className="font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={cta.href}
            className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-all"
            style={{
              background: `color-mix(in oklch, ${accentColor} 14%, transparent)`,
              color: accentColor,
              border: `1px solid color-mix(in oklch, ${accentColor} 40%, transparent)`,
            }}
          >
            {cta.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-1.5 font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse-neon"
              style={{ background: accentColor }}
            />
            Демо-доступ открыто
          </div>
        </div>
      </div>
    </motion.article>
  );
}
