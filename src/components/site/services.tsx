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
import { useLanguage } from "@/lib/i18n/useLanguage";
import { type TranslationKey } from "@/lib/i18n/translations";

type Service = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  titleKey: TranslationKey;
  descKey: TranslationKey;
  tagKey: TranslationKey;
  subItems?: { labelKey: TranslationKey; href: string }[];
};

const services: Service[] = [
  {
    href: "/patenti",
    icon: FileText,
    titleKey: "svc.s1Title",
    descKey: "svc.s1Desc",
    tagKey: "svc.s1Tag",
    subItems: [
      { labelKey: "svc.s1sub1", href: "/patent_na_izobretenie" },
      { labelKey: "svc.s1sub2", href: "/patent_na_poleznuyu_model" },
      { labelKey: "svc.s1sub3", href: "/patent_na_disain" },
      { labelKey: "svc.s1sub4", href: "/mezdunarudnie-patenti" },
    ],
  },
  {
    href: "/brendi",
    icon: Tag,
    titleKey: "svc.s2Title",
    descKey: "svc.s2Desc",
    tagKey: "svc.s2Tag",
    subItems: [
      { labelKey: "svc.s2sub1", href: "/tovarniy_znak_rossii" },
      { labelKey: "svc.s2sub2", href: "/mezdunarodnie_znaki" },
      { labelKey: "svc.s2sub3", href: "/china_trade_mark" },
      { labelKey: "svc.s2sub4", href: "/naming" },
    ],
  },
  {
    href: "/avtorskie_prava_kopirait",
    icon: Copyright,
    titleKey: "svc.s3Title",
    descKey: "svc.s3Desc",
    tagKey: "svc.s3Tag",
  },
  {
    href: "/patentnie_poverennie",
    icon: Scale,
    titleKey: "svc.s4Title",
    descKey: "svc.s4Desc",
    tagKey: "svc.s4Tag",
  },
  {
    href: "/rospatent",
    icon: Award,
    titleKey: "svc.s5Title",
    descKey: "svc.s5Desc",
    tagKey: "svc.s5Tag",
  },
  {
    href: "/naming",
    icon: PenTool,
    titleKey: "svc.s6Title",
    descKey: "svc.s6Desc",
    tagKey: "svc.s6Tag",
  },
  {
    href: "/mezdunarudnie-patenti",
    icon: Globe2,
    titleKey: "svc.s7Title",
    descKey: "svc.s7Desc",
    tagKey: "svc.s7Tag",
  },
  {
    href: "/masters",
    icon: Users,
    titleKey: "svc.s8Title",
    descKey: "svc.s8Desc",
    tagKey: "svc.s8Tag",
  },
];

export function Services() {
  const { t } = useLanguage();
  return (
    <section id="services" className="relative scroll-mt-20 border-t border-border/60 py-20 lg:py-28">
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-fine mask-radial opacity-50"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("svc.eyebrow")}
          title={
            <>
              {t("svc.titleA")} <span className="text-gradient-neon">{t("svc.titleB")}</span>
            </>
          }
          description={t("svc.desc")}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => (
            <ServiceCard key={service.href} service={service} index={idx} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
          <span>{t("svc.notFound")}</span>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-1 font-semibold text-neon hover:text-glow-neon"
          >
            {t("svc.askExpert")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { t } = useLanguage();
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
            {t(service.tagKey)}
          </span>
        </div>

        <h3 className="relative mt-4 font-display text-lg font-semibold tracking-tight">
          {t(service.titleKey)}
        </h3>
        <p className="relative mt-2 text-sm text-muted-foreground">{t(service.descKey)}</p>

        {service.subItems && (
          <ul className="relative mt-4 flex flex-wrap gap-1.5 border-t border-border/60 pt-3">
            {service.subItems.map((sub) => (
              <li key={sub.href}>
                <span className="inline-flex items-center rounded-md border border-border/60 bg-background/40 px-2 py-0.5 text-[11px] text-muted-foreground transition-colors group-hover:border-neon/30 group-hover:text-neon">
                  {t(sub.labelKey)}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="relative mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-neon opacity-0 transition-opacity group-hover:opacity-100">
          {t("svc.more")}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </Link>
    </motion.div>
  );
}
