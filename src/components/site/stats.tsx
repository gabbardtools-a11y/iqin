"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { type TranslationKey } from "@/lib/i18n/translations";

const stats: { value?: string; valueKey?: TranslationKey; labelKey: TranslationKey; subKey: TranslationKey }[] = [
  { value: "15+", labelKey: "stats.1label", subKey: "stats.1sub" },
  { value: "3 200+", labelKey: "stats.2label", subKey: "stats.2sub" },
  { value: "98.4%", labelKey: "stats.3label", subKey: "stats.3sub" },
  { valueKey: "stats.4value" as TranslationKey, labelKey: "stats.4label", subKey: "stats.4sub" },
];

export function Stats() {
  const { t } = useLanguage();
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
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="font-display text-4xl font-bold tracking-tight text-gradient-neon sm:text-5xl">
                  {stat.valueKey ? t(stat.valueKey) : stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">{t(stat.labelKey)}</div>
                <div className="mt-0.5 font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                  {t(stat.subKey)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
