"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, FileCheck, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    n: "01",
    icon: MessageSquare,
    title: "Брифинг и постановка задачи",
    description:
      "Вы заполняете короткий бриф или общаетесь с ИИ-ассистентом. Система автоматически классифицирует задачу и подбирает эксперта.",
    duration: "15 минут",
  },
  {
    n: "02",
    icon: Search,
    title: "ИИ-анализ и стратегия",
    description:
      "ИИ проводит патентный поиск, оценивает оригинальность, формирует стратегию защиты. Проверенный поверенный подтверждает план.",
    duration: "24 часа",
  },
  {
    n: "03",
    icon: FileCheck,
    title: "Подготовка и подача заявки",
    description:
      "Генерируем формулу, описание, реферат. Подаём заявку в Роспатент в электронном виде. Вы получаете трекинг статуса в реальном времени.",
    duration: "2–5 дней",
  },
  {
    n: "04",
    icon: ShieldCheck,
    title: "Сопровождение до выдачи",
    description:
      "Ведём делопроизводство, отвечаем на запросы экспертизы, оспариваем отказы. Финальный отчёт и передача патента владельцу.",
    duration: "до 12 месяцев",
  },
];

export function Process() {
  return (
    <section className="relative border-t border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Как мы работаем"
          title={
            <>
              Процесс от заявки до{" "}
              <span className="text-gradient-neon">выдачи патента</span>
            </>
          }
          description="Прозрачный pipeline с фиксацией сроков на каждом этапе. ИИ ускоряет рутину, поверенные принимают ключевые решения."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-neon/40"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-8 -translate-y-1/2 translate-x-full bg-gradient-to-r from-neon/40 to-transparent lg:block"
                />
              )}

              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-bold text-border transition-colors group-hover:text-neon/50">
                  {step.n}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon/20 bg-neon/5 text-neon">
                  <step.icon className="h-4.5 w-4.5" />
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/40 px-2.5 py-1 font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                {step.duration}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
