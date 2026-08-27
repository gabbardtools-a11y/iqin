"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "15+", label: "Лет на рынке ИС", sub: "с 2009 года" },
  { value: "3 200+", label: "Поданных заявок", sub: "патенты и ТЗ" },
  { value: "98.4%", label: "Успешных регистраций", sub: "по итогам 2024" },
  { value: "24ч", label: "Среднее время старта", sub: "от заявки до работы" },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-2xl border border-neon/20 bg-gradient-to-br from-card/60 via-background to-card/40 p-6 backdrop-blur-sm sm:p-10"
        >
          {/* Background grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-grid-fine mask-radial opacity-50"
          />

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="font-display text-4xl font-bold tracking-tight text-gradient-neon sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">{stat.label}</div>
                <div className="mt-0.5 font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
