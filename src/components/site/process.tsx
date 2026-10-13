"use client";

import { motion } from "framer-motion";
import { MessageSquare, Search, FileCheck, ShieldCheck } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { type TranslationKey } from "@/lib/i18n/translations";

const steps: {
  n: string;
  icon: React.ComponentType<{ className?: string }>;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  durationKey: TranslationKey;
}[] = [
  {
    n: "01",
    icon: MessageSquare,
    titleKey: "proc.s1Title",
    descKey: "proc.s1Desc",
    durationKey: "proc.s1Duration",
  },
  {
    n: "02",
    icon: Search,
    titleKey: "proc.s2Title",
    descKey: "proc.s2Desc",
    durationKey: "proc.s2Duration",
  },
  {
    n: "03",
    icon: FileCheck,
    titleKey: "proc.s3Title",
    descKey: "proc.s3Desc",
    durationKey: "proc.s3Duration",
  },
  {
    n: "04",
    icon: ShieldCheck,
    titleKey: "proc.s4Title",
    descKey: "proc.s4Desc",
    durationKey: "proc.s4Duration",
  },
];

export function Process() {
  const { t } = useLanguage();
  return (
    <section className="relative border-t border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("proc.eyebrow")}
          title={
            <>
              {t("proc.titleA")}{" "}
              <span className="text-gradient-neon">{t("proc.titleB")}</span>
            </>
          }
          description={t("proc.desc")}
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

              <h3 className="mt-4 font-display text-lg font-semibold">{t(step.titleKey)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(step.descKey)}</p>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/40 px-2.5 py-1 font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                {t(step.durationKey)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
