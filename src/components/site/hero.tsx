"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Cpu, ShieldCheck } from "lucide-react";
import { LogoShowcase } from "./logo-showcase";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { type TranslationKey } from "@/lib/i18n/translations";

/** The six AI models that power IQin — shown as a chip cloud in the hero. */
const AI_MODELS = ["GPT", "Claude", "GLM", "Z.ai", "Kimi", "Qwen"] as const;

const TICKER_KEYS: TranslationKey[] = [
  "ticker.inventionPatents",
  "ticker.utilityModels",
  "ticker.designs",
  "ticker.tmRu",
  "ticker.marksIntl",
  "ticker.tmChina",
  "ticker.copyright",
  "ticker.naming",
  "ticker.software",
  "ticker.intlPatenting",
];

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative isolate overflow-hidden pt-12 pb-16 sm:pt-16 lg:pt-24 lg:pb-24">
      {/* Floating ambient orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--amber) 50%, transparent), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--magenta) 45%, transparent), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Left: copy */}
          <div className="flex flex-col items-start gap-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-3 py-1.5 font-tech text-[11px] uppercase tracking-[0.2em] text-neon"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              <span className="text-iq-gold">IQ</span>
              <span className="text-in-blue">in</span>
              <span className="text-ru-plain">.ru</span>
              <span className="opacity-50"> · </span>
              <span>Next-Gen IP Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              {t("hero.h1a")}{" "}
              <span className="text-neon-solid">{t("hero.h1b")}</span>{" "}
              {t("hero.h1c")}{" "}
              <span className="text-neon-solid">{t("hero.ai")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="font-tech text-[12px] uppercase tracking-[0.18em] text-neon/90 sm:text-[13px]"
            >
              Ultra Next-Gen all-in-one AI-IP Platform · patents · trademarks · IP · Web · Copyright · Intellectual property ·
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="max-w-xl text-base text-muted-foreground sm:text-lg"
            >
              {t("hero.lead")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="/kontakt"
                className="group inline-flex items-center justify-center gap-2 rounded-md border border-neon/50 bg-[var(--navy-700)] px-6 py-3.5 text-sm font-semibold text-neon transition-all hover:bg-[var(--navy-600)] hover:glow-neon-strong"
              >
                {t("hero.ctaProject")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#ai-services"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card/40 px-6 py-3.5 text-sm font-semibold backdrop-blur-sm transition-all hover:border-neon/40 hover:text-neon"
              >
                <Sparkles className="h-4 w-4" />
                {t("hero.ctaServices")}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 font-tech text-xs text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-neon" />
                {t("hero.licensedAttorneys")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-amber" />
                {t("hero.sixLlm")}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-neon" />
                {t("hero.online247")}
              </span>
            </motion.div>

            {/* AI models chip cloud */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36 }}
              className="flex flex-col gap-2 pt-1"
            >
              <span className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground/80">
                Powered by 6 AI models
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {AI_MODELS.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-card/40 px-2.5 py-1 font-tech text-[11px] uppercase tracking-wider text-foreground/85 transition-colors hover:border-neon/50 hover:text-neon"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-neon/70" />
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Ticker */}
      <Ticker />

      {/* Logo animation variants showcase */}
      <LogoShowcase />
    </section>
  );
}

function HeroVisual() {
  const { t } = useLanguage();
  return (
    <div className="relative">
      {/* Main panel */}
      <div className="relative glass-card clip-corner rounded-2xl p-5 sm:p-6">
        {/* Top bar */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-neon/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-magenta/70" />
          </div>
          <span className="font-tech text-[10px] uppercase tracking-widest text-muted-foreground">
            iqin.ai/patent-gen
          </span>
        </div>

        {/* Prompt-like input */}
        <div className="mb-4 rounded-lg border border-neon/20 bg-background/60 p-3">
          <div className="mb-2 font-tech text-[10px] uppercase tracking-wider text-neon">
            {"// prompt"}
          </div>
          <div className="font-mono text-xs leading-relaxed text-foreground/90 sm:text-sm">
            <span className="text-muted-foreground">&gt;</span> {t("hero.prompt")}{" "}
            <span className="text-amber">{t("hero.promptTopic")}</span> ...
            <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-neon align-middle" />
          </div>
        </div>

        {/* Output stream */}
        <div className="space-y-2.5">
          <StreamLine label={t("hero.streamPriorArt")} status="done" delay={0.4} />
          <StreamLine label={t("hero.streamIpc")} status="done" delay={0.55} />
          <StreamLine label={t("hero.streamClaims")} status="active" delay={0.7} />
          <StreamLine label={t("hero.streamProtocol")} status="queue" delay={0.85} />
        </div>

        {/* Bottom stats */}
        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/60 pt-4">
          <Stat label={t("hero.statAccuracy")} value="98.4%" />
          <Stat label={t("hero.statTimeSaved")} value="–73%" />
          <Stat label={t("hero.statStatus")} value="Live" dot />
        </div>
      </div>

      {/* Floating chip 1 */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-1/4 hidden glass-card rounded-lg px-3 py-2 sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-neon/15 text-neon">
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-tech text-[9px] uppercase tracking-wider text-muted-foreground">
              {t("hero.chipProtection")}
            </span>
            <span className="text-xs font-semibold">Роспатент</span>
          </div>
        </div>
      </motion.div>

      {/* Floating chip 2 */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -right-4 bottom-1/4 hidden glass-card rounded-lg px-3 py-2 sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-amber/15 text-amber">
            <Cpu className="h-4 w-4" />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-tech text-[9px] uppercase tracking-wider text-muted-foreground">
              {t("hero.chipAiModel")}
            </span>
            <span className="text-xs font-semibold">IQin-Patent v3</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StreamLine({
  label,
  status,
  delay,
}: {
  label: string;
  status: "done" | "active" | "queue";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center justify-between rounded-md border border-border/50 bg-background/40 px-3 py-2"
    >
      <div className="flex items-center gap-2">
        <span
          className={
            status === "done"
              ? "h-1.5 w-1.5 rounded-full bg-neon"
              : status === "active"
                ? "h-1.5 w-1.5 rounded-full bg-amber animate-pulse-neon"
                : "h-1.5 w-1.5 rounded-full bg-muted-foreground/40"
          }
        />
        <span className="font-mono text-xs text-foreground/80">{label}</span>
      </div>
      <span
        className={
          status === "done"
            ? "font-tech text-[10px] uppercase text-neon"
            : status === "active"
              ? "font-tech text-[10px] uppercase text-amber"
              : "font-tech text-[10px] uppercase text-muted-foreground"
        }
      >
        {status === "done" ? "ready" : status === "active" ? "streaming" : "queue"}
      </span>
    </motion.div>
  );
}

function Stat({ label, value, dot }: { label: string; value: string; dot?: boolean }) {
  return (
    <div className="flex flex-col">
      <span className="font-tech text-[9px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="font-display text-base font-semibold text-foreground">
        {dot && <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-neon animate-pulse-neon" />}
        {value}
      </span>
    </div>
  );
}

function Ticker() {
  const { t } = useLanguage();
  return (
    <div className="relative mt-14 border-y border-neon/15 bg-card/30 py-3 backdrop-blur-sm sm:mt-20">
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {[...TICKER_KEYS, ...TICKER_KEYS].map((key, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-neon/60" />
              <span className="font-tech text-xs uppercase tracking-wider text-muted-foreground">
                {t(key)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
