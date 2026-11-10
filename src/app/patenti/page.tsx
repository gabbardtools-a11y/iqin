"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Ban,
  BrainCircuit,
  ChevronLeft,
  ClipboardCheck,
  Factory,
  Fingerprint,
  Flag,
  Gavel,
  Globe2,
  Landmark,
  Lightbulb,
  MailX,
  Palette,
  PenLine,
  Puzzle,
  Search,
  SearchCheck,
  Send,
  ShieldCheck,
  Siren,
  Sparkles,
  Telescope,
  TrendingUp,
  KeyRound,
  BookOpenCheck,
  Layers,
} from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

/* ---------- Типы данных страницы ---------- */

type Benefit = { icon: typeof ShieldCheck; title: string; text: string };
type ObjectCard = {
  icon: typeof Lightbulb;
  tag: string;
  title: string;
  what: string;
  conditions: string[];
  term: string;
  example: string;
  href: string;
  accent: string;
};
type Step = { icon: typeof Search; title: string; text: string; time: string };
type AbroadCard = {
  icon: typeof Globe2;
  title: string;
  when: string;
  text: string;
  facts: string[];
};
type DefenseCard = { icon: typeof MailX; title: string; text: string };
type PatentTypeCard = {
  icon: typeof Lightbulb;
  title: string;
  text: string;
  href: string;
  accent: string;
  wide?: boolean;
};

/* ---------- Данные ---------- */

const BENEFITS: Benefit[] = [
  {
    icon: ShieldCheck,
    title: "Монополия и защита от подделок",
    text: "Только владелец решает, кто производит и продаёт запатентованное решение. Копирование прекращается через суд.",
  },
  {
    icon: TrendingUp,
    title: "Окупаемость НИОКР и рост стоимости",
    text: "Патент возвращает расходы на разработку, увеличивает цену продукции и стоимость самой компании на балансе.",
  },
  {
    icon: KeyRound,
    title: "Доход от лицензий и продажи",
    text: "Решение приносит деньги даже без собственного производства: лицензии, франшизы, отчуждение патента.",
  },
  {
    icon: Siren,
    title: "Щит от троллей и конкурентов",
    text: "Собственный патент закрывает уязвимость перед теми, кто оформляет чужие разработки на себя.",
  },
];

const OBJECTS: ObjectCard[] = [
  {
    icon: Lightbulb,
    tag: "20 лет охраны",
    title: "Изобретение",
    what: "Техническое решение: устройство, способ, вещество, применение по новому назначению. Отвечает на вопрос «как это работает».",
    conditions: ["Новизна", "Изобретательский уровень", "Промышленная применимость"],
    term: "Патент: 1–2 года",
    example: "Способ получения воды из воздуха, состав сплава, система выявления вредоносного ПО",
    href: "/patent_na_izobretenie",
    accent: "#1D4ED8",
  },
  {
    icon: Puzzle,
    tag: "10 лет охраны",
    title: "Полезная модель",
    what: "«Малое изобретение»: охраняются только устройства. Экспертиза быстрее и мягче — без проверки неочевидности.",
    conditions: ["Новизна", "Промышленная применимость"],
    term: "Патент: ~6 месяцев",
    example: "Модуль LED-подсветки в корпусе фотоаппарата, новая компоновка узла прибора",
    href: "/patent_na_poleznuyu_model",
    accent: "#0E7490",
  },
  {
    icon: Palette,
    tag: "до 25 лет охраны",
    title: "Промышленный образец",
    what: "Дизайн изделия: форма, линии, цвета, орнамент, интерфейс, упаковка. Отвечает на вопрос «как это выглядит».",
    conditions: ["Новизна", "Оригинальность"],
    term: "Патент: 6–12 месяцев",
    example: "Корпус устройства, этикетка и упаковка, фасон одежды, интерфейс сайта",
    href: "/patent_na_disain",
    accent: "#7A5C3A",
  },
];

const CRITERIA = [
  {
    icon: Sparkles,
    title: "Новизна",
    text: "Решение неизвестно из уровня техники. Публикация, продажа или даже каталог компании до подачи уничтожают новизну.",
  },
  {
    icon: BrainCircuit,
    title: "Изобретательский уровень",
    text: "Для изобретений: решение неочевидно для специалиста. Смена материала, размеров или деталей барьер не проходит.",
  },
  {
    icon: Factory,
    title: "Промышленная применимость",
    text: "Решение работает и воспроизводимо в промышленности — достаточно показать назначение и осуществимость.",
  },
  {
    icon: Fingerprint,
    title: "Оригинальность",
    text: "Для промышленных образцов: внешний вид производит самостоятельное впечатление, а не имитирует известные дизайны.",
  },
];

const STEPS: Step[] = [
  {
    icon: Search,
    title: "Патентный поиск",
    text: "Проверка решения по базам ФИПС, Espacenet, WIPO и Google Patents: что уже охраняется и опубликовано.",
    time: "от нескольких дней",
  },
  {
    icon: PenLine,
    title: "Подготовка заявки",
    text: "Заявление, описание, формула, чертежи и реферат. Формула определяет объём охраны — её выверяют в первую очередь.",
    time: "1–4 недели",
  },
  {
    icon: Send,
    title: "Подача в ФИПС",
    text: "Электронная подача через сервис ведомства — дешевле по пошлине. С этой даты решение получает приоритет.",
    time: "1 день",
  },
  {
    icon: ClipboardCheck,
    title: "Формальная экспертиза",
    text: "Проверка комплектности документов и пошлин. Существа решения ещё не касаются.",
    time: "1–2 месяца",
  },
  {
    icon: Award,
    title: "Экспертиза по существу и выдача",
    text: "Решение сопоставляют с мировым уровнем техники. Запросы экспертов снимаются мотивированными ответами.",
    time: "6–18 месяцев",
  },
];

const ABROAD: AbroadCard[] = [
  {
    icon: Flag,
    title: "Национальные заявки",
    when: "1–2 страны",
    text: "Отдельная заявка в каждом ведомстве. Подать — в течение 12 месяцев после российской подачи, нужен местный поверенный.",
    facts: ["Гибкая настройка охраны", "Умеренные расходы", "Сохранение приоритета"],
  },
  {
    icon: Globe2,
    title: "Заявка PCT",
    when: "150+ стран",
    text: "Одна международная заявка резервирует приоритет, национальные фазы — в течение 30 месяцев. Платежи распределяются поэтапно.",
    facts: ["Пауза на 30 месяцев", "Платежи по частям", "Российский этап обязателен"],
  },
  {
    icon: Landmark,
    title: "Евразийский патент",
    when: "8 стран ЕАПК",
    text: "Один патент для России, Беларуси, Казахстана и ещё пяти государств: общая экспертиза, пошлины напрямую в ЕАПВ.",
    facts: ["Одна заявка и экспертиза", "Выгоден для 3+ стран СНГ", "Поверенный не обязателен"],
  },
];

const DEFENSE: DefenseCard[] = [
  {
    icon: MailX,
    title: "Письмо о прекращении нарушений",
    text: "Первая линия при непреднамеренном нарушении: конфликт часто заканчивается лицензионным договором.",
  },
  {
    icon: Gavel,
    title: "Иск и обеспечительные меры",
    text: "Компенсация до 5 млн ₽ без доказательства убытков; суд изымает и уничтожает контрафакт.",
  },
  {
    icon: Ban,
    title: "Возражение против чужого патента",
    text: "Патент, выданный с нарушением новизны, оспаривается в Палате по патентным спорам без суда.",
  },
];

const PATENT_TYPES: PatentTypeCard[] = [
  {
    icon: Lightbulb,
    title: "Патент на изобретение",
    text: "Устройство, способ, вещество. 20 лет охраны, самый сильный объём защиты.",
    href: "/patent_na_izobretenie",
    accent: "#1D4ED8",
  },
  {
    icon: Puzzle,
    title: "Патент на полезную модель",
    text: "Малое изобретение: только устройства. Экспертиза быстрее, ~6 месяцев.",
    href: "/patent_na_poleznuyu_model",
    accent: "#0E7490",
  },
  {
    icon: Palette,
    title: "Патент на промышленный образец",
    text: "Дизайн изделия: форма, упаковка, интерфейс. До 25 лет охраны.",
    href: "/patent_na_disain",
    accent: "#7A5C3A",
  },
  {
    icon: Award,
    title: "Получить патент на изобретение",
    text: "Как запатентовать техническое решение под ключ: от поиска до выдачи.",
    href: "/izobretenie",
    accent: "#1D4ED8",
  },
  {
    icon: BrainCircuit,
    title: "Полезная модель как на изобретение",
    text: "Отличия двух объектов, выбор под задачу и оформление заявки.",
    href: "/patent_na_model",
    accent: "#0E7490",
  },
  {
    icon: Layers,
    title: "Патентные классификаторы МКТУ, МПК, МКПО",
    text: "Как ведомство определяет класс защиты вашего решения и товарного знака.",
    href: "/patent_class",
    accent: "#475569",
  },
  {
    icon: Globe2,
    title: "Международные патенты",
    text: "Зарубежное патентование под ключ: PCT, евразийский патент, национальные заявки. Один патент — восемь стран ЕАПК, 150+ стран через PCT.",
    href: "/mezdunarudnie-patenti",
    accent: "#B8860B",
    wide: true,
  },
];

/* ---------- Анимация появления ---------- */

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Иконка в фирменном стиле (как в инструкции, но «навийная») ---------- */

function IconBadge({
  icon: Icon,
  accent = "#1D4ED8",
  size = "md",
}: {
  icon: typeof ShieldCheck;
  accent?: string;
  size?: "md" | "lg";
}) {
  const box = size === "lg" ? "h-12 w-12 rounded-xl" : "h-10 w-10 rounded-lg";
  const ic = size === "lg" ? "h-6 w-6" : "h-5 w-5";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center border ${box}`}
      style={{
        color: accent,
        backgroundColor: `${accent}14`,
        borderColor: `${accent}40`,
      }}
    >
      <Icon className={ic} strokeWidth={1.75} />
    </span>
  );
}

/* ---------- Заголовок раздела ---------- */

function SectionHead({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}) {
  return (
    <Reveal className="mb-8 max-w-3xl">
      <div className="font-tech text-[10px] uppercase tracking-[0.25em] text-neon/80">
        {label}
      </div>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
        {title}
      </h2>
      {text && (
        <p className="mt-3 text-[15px] leading-relaxed text-navy-muted sm:text-base">
          {text}
        </p>
      )}
    </Reveal>
  );
}

/* ---------- Карточка с HUD-рамкой (как у соседних страниц сайта) ---------- */

function HudCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative h-full overflow-hidden rounded-xl border border-navy-line/60 bg-card/40 p-5 backdrop-blur-sm transition-all hover:border-neon/40 hover:bg-card/60 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--navy-line) 1px, transparent 1px), linear-gradient(to bottom, var(--navy-line) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-neon/50 transition-colors group-hover:border-neon" />
      <span className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-neon/50 transition-colors group-hover:border-neon" />
      <span className="pointer-events-none absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 border-neon/50 transition-colors group-hover:border-neon" />
      <span className="pointer-events-none absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-neon/50 transition-colors group-hover:border-neon" />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ---------- Страница ---------- */

export default function PatentiPage() {
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
        {/* ======== HERO ======== */}
        <section className="relative overflow-hidden border-b border-navy-line/60">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-navy-grid opacity-30"
          />
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="mb-4 flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.18em] text-navy-muted">
              <Link
                href="/"
                className="inline-flex items-center gap-1 transition-colors hover:text-neon"
              >
                <ChevronLeft className="h-3 w-3" />
                Главная
              </Link>
              <span className="opacity-40">/</span>
              <span className="text-neon">патенты</span>
            </div>
            <div className="font-tech text-[10px] uppercase tracking-[0.25em] text-neon/80">
              {"// "}
              <span className="text-iq-gold">IQ</span>
              <span className="text-in-blue">in</span>
              <span className="text-ru-plain">.ru</span>
              <span className="opacity-60"> · патентование</span>
            </div>
            <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-5xl">
              Патенты:{" "}
              <span className="text-neon">инструкция по применению</span> — от
              идеи до охраняемого актива
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-navy-muted sm:text-lg">
              Что можно запатентовать, как устроена процедура, сколько это
              стоит и как защищать права. Короткий обзор по каждому вопросу —
              и большой гид с деталями для тех, кто хочет разобраться глубже.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-tech text-[11px] uppercase tracking-wider text-navy-muted">
              <span className="inline-flex items-center gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 text-neon" />
                3 объекта патентования
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ClipboardCheck className="h-3.5 w-3.5 text-neon" />
                5 шагов до документа
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-neon" />
                компенсация до 5 млн ₽
              </span>
            </div>
          </div>
        </section>

        {/* ======== ЧТО ДАЁТ ПАТЕНТ ======== */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionHead
            label="01 · зачем нужен патент"
            title="Что даёт патент владельцу"
            text="Патент — это юридический щит и финансовый актив одновременно. Четыре причины, по которым разработчики патентуют решения."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <HudCard>
                  <IconBadge icon={b.icon} />
                  <h3 className="mt-4 font-display text-base font-bold tracking-tight text-navy">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-navy-muted">
                    {b.text}
                  </p>
                </HudCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ======== ТРИ ОБЪЕКТА ======== */}
        <section className="border-y border-navy-line/40 bg-navy-800/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <SectionHead
              label="02 · что можно запатентовать"
              title="Три объекта патентования"
              text="Выбор объекта — первая стратегия заявителя: от него зависят сроки, стоимость и сила защиты. На одно изделие можно получить несколько патентов сразу."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {OBJECTS.map((o, i) => (
                <Reveal key={o.title} delay={i * 0.07}>
                  <HudCard className="flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <IconBadge icon={o.icon} accent={o.accent} size="lg" />
                      <span
                        className="rounded-full px-2.5 py-1 font-tech text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          color: o.accent,
                          backgroundColor: `${o.accent}14`,
                          border: `1px solid ${o.accent}40`,
                        }}
                      >
                        {o.tag}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-navy">
                      {o.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-navy-muted">
                      {o.what}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {o.conditions.map((c) => (
                        <span
                          key={c}
                          className="rounded border border-navy-line/70 bg-background/60 px-2 py-0.5 font-tech text-[10px] uppercase tracking-wide text-navy-muted"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 border-t border-navy-line/50 pt-3 text-[12px] leading-relaxed text-navy-muted">
                      <span className="font-tech uppercase tracking-wider text-navy">
                        Примеры:
                      </span>{" "}
                      {o.example}
                    </p>
                    <div className="mt-auto pt-4">
                      <span className="inline-flex items-center gap-1 font-tech text-[11px] uppercase tracking-wider text-neon">
                        {o.term}
                      </span>
                      <Link
                        href={o.href}
                        className="mt-2 flex items-center justify-between rounded-md border border-neon/40 bg-neon/10 px-3 py-2 text-sm font-semibold text-neon transition-all hover:bg-neon hover:text-primary-foreground"
                      >
                        Подробнее об объекте
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </HudCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ======== ВИДЫ ПАТЕНТОВ — НАВИГАЦИЯ ======== */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionHead
            label="02b · страницы по видам"
            title="Виды патентов — отдельные страницы"
            text="Каждый вид патента — со своей процедурой, сроками и пошлинами. Шесть страниц с подробностями по каждому объекту и связанной теме."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PATENT_TYPES.map((p, i) => (
              <Reveal
                key={p.href}
                delay={i * 0.05}
                className={p.wide ? "sm:col-span-2 lg:col-span-3" : undefined}
              >
                <Link
                  href={p.href}
                  className={`group relative flex h-full items-start gap-4 overflow-hidden rounded-xl border border-navy-line/60 bg-card/40 p-4 backdrop-blur-sm transition-all hover:border-neon/50 hover:bg-card/60 hover:shadow-lg hover:shadow-neon/5 ${p.wide ? "sm:items-center" : ""}`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, var(--navy-line) 1px, transparent 1px), linear-gradient(to bottom, var(--navy-line) 1px, transparent 1px)",
                      backgroundSize: "16px 16px",
                      opacity: 0.2,
                    }}
                  />
                  <IconBadge icon={p.icon} accent={p.accent} />
                  <div className="relative min-w-0 flex-1">
                    <h3 className="font-display text-[15px] font-bold leading-snug tracking-tight text-navy">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-navy-muted">
                      {p.text}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1 font-tech text-[10px] font-semibold uppercase tracking-wider text-neon">
                      Открыть страницу
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ======== УСЛОВИЯ ПАТЕНТОСПОСОБНОСТИ ======== */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionHead
            label="03 · проверка ведомства"
            title="Условия патентоспособности"
            text="Набор условий у каждого объекта свой. Понимание критериев экономит месяцы переписки с экспертами ФИПС."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CRITERIA.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-navy-line/60 bg-card/40 p-5">
                  <div className="flex items-center gap-3">
                    <IconBadge icon={c.icon} />
                    <h3 className="font-display text-base font-bold tracking-tight text-navy">
                      {c.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-navy-muted">
                    {c.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-6">
            <div className="rounded-xl border border-iq-gold/40 bg-iq-gold/10 p-4 sm:p-5">
              <p className="text-[14px] leading-relaxed text-navy">
                <strong className="font-semibold">Главное правило:</strong>{" "}
                сначала заявка — потом публикации. Статья, доклад на
                конференции, пост в сети, начало продаж или включение изделия
                в каталог до даты подачи лишают решение новизны — безвозвратно.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ======== ПУТЬ ДО ПАТЕНТА ======== */}
        <section className="border-y border-navy-line/40 bg-navy-800/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <SectionHead
              label="04 · процедура"
              title="Путь до патента: пять шагов"
              text="Логика одинакова для всех объектов: проверить новизну, грамотно описать решение, пройти две экспертизы и получить документ."
            />
            <div className="relative grid gap-5 md:grid-cols-3 lg:grid-cols-5">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.06}>
                  <div className="relative h-full rounded-xl border border-navy-line/60 bg-card/40 p-5">
                    <div className="flex items-center justify-between">
                      <IconBadge icon={s.icon} />
                      <span className="font-display text-2xl font-bold text-navy-line">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[15px] font-bold leading-snug tracking-tight text-navy">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-navy-muted">
                      {s.text}
                    </p>
                    <p className="mt-3 font-tech text-[10px] uppercase tracking-wider text-neon/80">
                      {s.time}
                    </p>
                    {i < STEPS.length - 1 && (
                      <ArrowRight
                        aria-hidden="true"
                        className="absolute -right-4 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-neon/60 lg:block"
                      />
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.25} className="mt-8">
              <div className="flex flex-col gap-4 rounded-2xl border border-neon/30 bg-gradient-to-br from-card/60 via-background/40 to-card/30 p-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-navy sm:text-xl">
                    Реальный кейс: патент за 7 месяцев вместо года
                  </h3>
                  <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-navy-muted sm:text-sm">
                    Разработчик дыхательных аппаратов для спасателей получил
                    патент почти вдвое быстрее типичного срока — вовремя
                    подготовленный ответ на запрос экспертизы снял все
                    возражения ведомства.
                  </p>
                </div>
                <Link
                  href="/blog/chto-takoe-patent#kak-poluchit-patent-put-ot-idei-do-dokumenta"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-neon/40 bg-neon/10 px-4 py-2.5 text-sm font-semibold text-neon transition-all hover:bg-neon hover:text-primary-foreground hover:glow-navy"
                >
                  <BookOpenCheck className="h-4 w-4" />
                  Как это было
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ======== ПОИСК И ИССЛЕДОВАНИЯ ======== */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionHead
            label="05 · проверка до и после"
            title="Поиск, экспертизы и патентные исследования"
            text="Эксперты ФИПС проверяют заявку только на патентоспособность — на нарушение чужих патентов её никто не проверяет. Эта работа остаётся за заявителем."
          />
          <div className="grid gap-5 md:grid-cols-3">
            <Reveal>
              <HudCard>
                <IconBadge icon={SearchCheck} />
                <h3 className="mt-4 font-display text-base font-bold tracking-tight text-navy">
                  Патентный поиск
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-navy-muted">
                  Отбор выданных патентов и опубликованных заявок по предмету
                  поиска. Показывает шансы на регистрацию до вложений в
                  пошлины.
                </p>
                <Link
                  href="/patent_poisk"
                  className="mt-4 inline-flex items-center gap-1 font-tech text-[11px] font-semibold uppercase tracking-wider text-neon transition-colors hover:text-neon-dim"
                >
                  8 бесплатных баз поиска
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </HudCard>
            </Reveal>
            <Reveal delay={0.07}>
              <HudCard>
                <IconBadge icon={Telescope} />
                <h3 className="mt-4 font-display text-base font-bold tracking-tight text-navy">
                  Экспертиза на выдачу
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-navy-muted">
                  Анализ найденных источников и вывод об охраноспособности
                  решения — по критериям новизны, уровня и применимости.
                </p>
              </HudCard>
            </Reveal>
            <Reveal delay={0.14}>
              <HudCard>
                <IconBadge icon={ShieldCheck} />
                <h3 className="mt-4 font-display text-base font-bold tracking-tight text-navy">
                  Проверка патентной чистоты
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-navy-muted">
                  Анализ чужих действующих патентов: не пересекается ли новый
                  продукт с ними. Для госконтрактов оформляется формуляром по
                  ГОСТ 15.012-84.
                </p>
              </HudCard>
            </Reveal>
          </div>
        </section>

        {/* ======== ЗА РУБЕЖОМ ======== */}
        <section className="border-y border-navy-line/40 bg-navy-800/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <SectionHead
              label="06 · экспорт"
              title="Патент за рубежом: три маршрута"
              text="Патент территориален: российский не действует ни в Казахстане, ни в Китае. Выбор маршрута зависит от количества целевых стран."
            />
            <div className="grid gap-5 md:grid-cols-3">
              {ABROAD.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.07}>
                  <HudCard>
                    <div className="flex items-center justify-between">
                      <IconBadge icon={a.icon} />
                      <span className="rounded-full border border-neon/40 bg-neon/10 px-2.5 py-1 font-tech text-[10px] font-semibold uppercase tracking-wider text-neon">
                        {a.when}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-navy">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-navy-muted">
                      {a.text}
                    </p>
                    <ul className="mt-4 space-y-1.5 border-t border-navy-line/50 pt-3">
                      {a.facts.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-[12px] text-navy-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 rounded-full bg-neon"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </HudCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ======== ЗАЩИТА ПРАВ ======== */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <SectionHead
            label="07 · спор"
            title="Защита прав: от письма до суда"
            text="Патент не отменяет подделки, но даёт инструменты, чтобы остановить нарушителя и взыскать компенсацию. Арбитражный суд Москвы по делу № А40-163822/17 взыскал её за использование промышленного образца платёжного терминала."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {DEFENSE.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.07}>
                <HudCard>
                  <IconBadge icon={d.icon} />
                  <h3 className="mt-4 font-display text-base font-bold tracking-tight text-navy">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-navy-muted">
                    {d.text}
                  </p>
                </HudCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ======== ФИНАЛЬНЫЙ CTA ======== */}
        <section className="border-t border-navy-line/40 bg-navy-800/30">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <Reveal>
              <div className="relative overflow-hidden rounded-2xl border border-neon/30 bg-gradient-to-br from-card/60 via-background/40 to-card/30 p-6 backdrop-blur-md sm:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-navy-grid opacity-20"
                />
                <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl">
                    <div className="font-tech text-[10px] uppercase tracking-[0.25em] text-neon/80">
                      большой гид · {guideSectionsCount} разделов
                    </div>
                    <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                      «Что такое патент» —{" "}
                      <span className="text-neon">полный гид по патентованию</span>
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-navy-muted">
                      Все темы этого обзора разобраны подробно: критерии
                      охраноспособности, пошлины и льготы, служебные
                      разработки, международные маршруты, реальные судебные
                      дела и ответы на частые вопросы.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href="/blog/chto-takoe-patent"
                        className="inline-flex items-center gap-1.5 rounded-md bg-neon px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-neon-dim hover:glow-navy"
                      >
                        <BookOpenCheck className="h-4 w-4" />
                        Читать гид
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/kontakt"
                        className="inline-flex items-center gap-1.5 rounded-md border border-neon/40 bg-neon/10 px-5 py-2.5 text-sm font-semibold text-neon transition-all hover:bg-neon hover:text-primary-foreground"
                      >
                        <Sparkles className="h-4 w-4" />
                        Бесплатная консультация
                      </Link>
                    </div>
                  </div>
                  <div className="grid shrink-0 grid-cols-2 gap-3 lg:w-72">
                    {[
                      { n: "3", t: "объекта охраны" },
                      { n: "5", t: "шагов процедуры" },
                      { n: "5 млн ₽", t: "максимум компенсации" },
                      { n: "20 лет", t: "охрана изобретения" },
                    ].map((s) => (
                      <div
                        key={s.t}
                        className="rounded-xl border border-navy-line/60 bg-card/50 p-4 text-center"
                      >
                        <div className="font-display text-xl font-bold text-neon">
                          {s.n}
                        </div>
                        <div className="mt-1 font-tech text-[10px] uppercase tracking-wider text-navy-muted">
                          {s.t}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const guideSectionsCount = 16;
