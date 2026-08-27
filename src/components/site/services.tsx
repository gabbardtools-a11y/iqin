"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Award,
  Copyright,
  Globe2,
  Tag,
  PenTool,
  Scale,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "./section-heading";

type Service = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tag: string;
  subItems?: { label: string; href: string }[];
};

const services: Service[] = [
  {
    href: "/patenti",
    icon: FileText,
    title: "Патенты",
    description:
      "Регистрация изобретений, полезных моделей и промышленных образцов в Роспатенте и за рубежом. Полное сопровождение от поиска до выдачи патента.",
    tag: "Патентование",
    subItems: [
      { label: "Изобретения", href: "/patent_na_izobretenie" },
      { label: "Полезные модели", href: "/patent_na_poleznuyu_model" },
      { label: "Дизайн", href: "/patent_na_disain" },
      { label: "Международные", href: "/mezdunarudnie-patenti" },
    ],
  },
  {
    href: "/brendi",
    icon: Tag,
    title: "Бренды и товарные знаки",
    description:
      "Регистрация товарных знаков в России, по Мадридской системе и в Китае. Проверка уникальности, нейминг и защита от конкурентов.",
    tag: "Товарные знаки",
    subItems: [
      { label: "ТЗ в России", href: "/tovarniy_znak_rossii" },
      { label: "Международные", href: "/mezdunarodnie_znaki" },
      { label: "ТЗ в Китае", href: "/china_trade_mark" },
      { label: "Нейминг", href: "/naming" },
    ],
  },
  {
    href: "/avtorskie_prava_kopirait",
    icon: Copyright,
    title: "Авторские права",
    description:
      "Защита произведений науки, литературы и искусства. Депонирование, договоры отчуждения и лицензионные соглашения, судебная защита.",
    tag: "Copyright",
  },
  {
    href: "/patentnie_poverennie",
    icon: Scale,
    title: "Патентные поверенные",
    description:
      "Аккредитованные Роспатентом поверенные с опытом 15+ лет. Ведение делопроизводства, ответы на запросы экспертизы, оспаривание отказов.",
    tag: "Сопровождение",
  },
  {
    href: "/rospatent",
    icon: Award,
    title: "Работа с Роспатентом",
    description:
      "Прямое взаимодействие с ФИПС и Роспатентом. Электронная подача заявок, отслеживание статуса, ускоренные процедуры регистрации.",
    tag: "Гос. услуги",
  },
  {
    href: "/naming",
    icon: PenTool,
    title: "Нейминг и брендинг",
    description:
      "Разработка названий компаний, продуктов и доменов с проверкой патентной чистоты. Креатив и правовая защита в одном пакете.",
    tag: "Креатив",
  },
  {
    href: "/mezdunarudnie-patenti",
    icon: Globe2,
    title: "Международное патентование",
    description:
      "Защита интеллектуальной собственности по системам PCT, Евразийской и Европейской патентной конвенции. Подача в 150+ стран мира.",
    tag: "Global IP",
  },
  {
    href: "/masters",
    icon: Users,
    title: "Мастера IQin",
    description:
      "Команда экспертов: патентные поверенные, юристы по ИС, дизайнеры, разработчики и ИИ-инженеры — работаем над вашим проектом вместе.",
    tag: "Команда",
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 border-t border-border/60 py-20 lg:py-28">
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-fine mask-radial opacity-50"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Полный спектр услуг"
          title={
            <>
              Защита интеллектуальной <span className="text-gradient-neon">собственности</span> под
              ключ
            </>
          }
          description="Классические патентные услуги IQin, проверенные 15 годами практики. Сохранены все URL старого сайта — закладки и ссылки продолжат работать."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => (
            <ServiceCard key={service.href} service={service} index={idx} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
          <span>Не нашли нужную услугу?</span>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-1 font-semibold text-neon hover:text-glow-neon"
          >
            Задайте вопрос эксперту
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
    >
      <Link
        href={service.href}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-neon/40 hover:bg-card/70"
      >
        {/* Hover glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at 50% 0%, color-mix(in oklch, var(--neon) 10%, transparent), transparent 70%)",
          }}
        />

        <div className="relative flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-neon/20 bg-neon/5 text-neon transition-all group-hover:scale-110 group-hover:glow-neon">
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-tech text-[9px] uppercase tracking-wider text-muted-foreground">
            {service.tag}
          </span>
        </div>

        <h3 className="relative mt-4 font-display text-lg font-semibold tracking-tight">
          {service.title}
        </h3>
        <p className="relative mt-2 text-sm text-muted-foreground">{service.description}</p>

        {service.subItems && (
          <ul className="relative mt-4 flex flex-wrap gap-1.5 border-t border-border/60 pt-3">
            {service.subItems.map((sub) => (
              <li key={sub.href}>
                <span className="inline-flex items-center rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[11px] text-muted-foreground transition-colors group-hover:border-neon/30 group-hover:text-neon">
                  {sub.label}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="relative mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-neon opacity-0 transition-opacity group-hover:opacity-100">
          Подробнее
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </Link>
    </motion.div>
  );
}
