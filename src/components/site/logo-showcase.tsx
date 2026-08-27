"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Variant = {
  id: string;
  label: string;
  hint: string;
  className: string;
  /** extra elements rendered inside the logo box (ring, scan-bar, particles, …) */
  extra?: React.ReactNode;
  /** minimal mode: no outer border (rounded-xl instead of rounded-md + border-2);
      grid, corner brackets, and scan-line are preserved. */
  minimal?: boolean;
  /** glyphMinimal: renders 音 as pure solid color (no gradient, no glow, no animation).
      Used by V13 "Lighthouse Minimal" and V14 "Clean Minimal". */
  glyphMinimal?: boolean;
  /** Override color for glyphMinimal mode (defaults to var(--neon)). */
  glyphColor?: string;
  /** cleanMinimal: transparent background + NO scan-line. Used by V14 "Clean Minimal"
      — only grid + corner brackets + flat glyph remain. */
  cleanMinimal?: boolean;
  /** Override glyph font-size (default "20px"). V14 uses "24px" (1.2× larger). */
  glyphSize?: string;
  /** Override glyph font-weight class (default "font-black" = 900).
      V14 uses "font-medium" = 500 for a lighter, cleaner look. */
  glyphWeight?: string;
};

const PARTICLE_COUNT = 8;

function ParticleField() {
  // 8 particles evenly distributed around the circle
  return (
    <>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        const radius = 26;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        return (
          <span
            key={i}
            className="logo-particle"
            style={
              {
                "--px": `${px}px`,
                "--py": `${py}px`,
                animationDelay: `${(i * 0.06).toFixed(2)}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </>
  );
}

const VARIANTS: Variant[] = [
  {
    id: "v1-breathe",
    label: "Breathing",
    hint: "плавное дыхание glow + zoom",
    className: "logo-v-breathe",
  },
  {
    id: "v2-radar",
    label: "Radar Sweep",
    hint: "вращающееся кольцо с точкой",
    className: "logo-v-radar",
    extra: <span className="logo-ring" />,
  },
  {
    id: "v3-glitch",
    label: "Glitch RGB",
    hint: "RGB-сдвиг + микро-дрожание",
    className: "logo-v-glitch",
  },
  {
    id: "v4-scan",
    label: "Scan Sweep",
    hint: "световая полоса сверху вниз",
    className: "logo-v-scan",
    extra: <span className="logo-scan-bar" />,
  },
  {
    id: "v5-particles",
    label: "Particle Burst",
    hint: "8 частиц разлетаются наружу",
    className: "logo-v-particles",
    extra: <ParticleField />,
  },
  {
    id: "v6-electric",
    label: "Electric Pulse",
    hint: "высокочастотное мерцание + молнии",
    className: "logo-v-electric",
  },
  {
    id: "v7-combo",
    label: "Combo: Burst + Electric",
    hint: "v5 + v6 — частицы и электрические разряды",
    className: "logo-v-electric logo-v-particles",
    extra: <ParticleField />,
  },
  {
    id: "v8-glitchscan",
    label: "Combo: Glitch + Scan",
    hint: "v3 + v4 — RGB-дрейф и сканирующий луч",
    className: "logo-v-glitchscan",
    extra: <span className="logo-scan-bar" />,
  },
  {
    id: "v9-mega",
    label: "Mega Combo (V7+V8)",
    hint: "v3+v4+v5+v6 — все четыре эффекта в одной 32с синхронизации",
    className: "logo-v-mega",
    extra: (
      <>
        <span className="logo-scan-bar" />
        <ParticleField />
      </>
    ),
  },
  {
    id: "v10-lighthouse",
    label: "Lighthouse (Маяк)",
    hint: "вращающийся луч света — иероглиф 音 как маяк в тумане",
    className: "logo-v-lighthouse",
    extra: <span className="logo-beacon" />,
  },
  {
    id: "v11-axial",
    label: "Axial Lighthouse",
    hint: "луч вращается вокруг оси иероглифа — 3D-маяк, а не круговой обход",
    className: "logo-v-axial",
    extra: <span className="logo-axial-beam" />,
  },
  {
    id: "v12-tribeam",
    label: "Tri-Beam Lighthouse",
    hint: "три дискретных положения луча: слева вбок → на зрителя → справа вбок (маяк-маятник)",
    className: "logo-v-tribeam",
    extra: <span className="logo-tribeam-beam" />,
  },
  {
    id: "v13-lighthouse-minimal",
    label: "Lighthouse Minimal",
    hint: "маяк V10 без внешней рамки — сетка и уголки сохранены, 音 чисто синий",
    className: "logo-v-lighthouse",
    extra: <span className="logo-beacon" />,
    minimal: true,
    glyphMinimal: true,
  },
  {
    id: "v14-clean",
    label: "Clean Minimal",
    hint: "чистый синий 音 на прозрачном фоне — только сетка и уголки, без эффектов",
    className: "",
    minimal: true,
    glyphMinimal: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "24px",
    glyphWeight: "font-medium",
  },
  {
    id: "v15-vscan",
    label: "Vertical Scan",
    hint: "минимал V14 + тонкая вертикальная линия скользит слева направо по иероглифу",
    className: "logo-v-vscan",
    minimal: true,
    glyphMinimal: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "24px",
    glyphWeight: "font-medium",
    extra: <span className="logo-vscan-line" />,
  },
];

function LogoVariantCard({ variant, index }: { variant: Variant; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group relative flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-4 backdrop-blur-sm transition-colors hover:border-neon/40"
    >
      {/* Logo box (mirrors the header LogoMark geometry) */}
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span
          className={`relative inline-flex h-12 w-12 items-center justify-center ${variant.minimal ? "rounded-xl" : "rounded-md border-2"} ${variant.className}`}
          aria-hidden="true"
          style={
            variant.minimal
              ? { background: variant.cleanMinimal ? "transparent" : "var(--logo-bg)" }
              : { borderColor: "var(--logo-border)", background: "var(--logo-bg)" }
          }
        >
          {/* Subtle grid background — always present (kept in minimal mode).
              5×5 cells = 6 vertical + 6 horizontal lines, fully symmetric
              (regular 8px tiling lands at 0/8/16/24/32; extra layers add
              the right-edge vertical and bottom-edge horizontal line at 40). */}
          <span
            className="absolute inset-1 rounded-sm opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--logo-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--logo-grid) 1px, transparent 1px), linear-gradient(to left, var(--logo-grid) 1px, transparent 1px), linear-gradient(to top, var(--logo-grid) 1px, transparent 1px)",
              backgroundSize: "8px 8px, 8px 8px, 100% 100%, 100% 100%",
              backgroundPosition: "0 0, 0 0, 0 0, 0 0",
              backgroundRepeat: "repeat, repeat, no-repeat, no-repeat",
            }}
          />
          {/* Corner brackets — always present (kept in minimal mode) */}
          <span className="pointer-events-none absolute left-0.5 top-0.5 h-2 w-2 border-l-2 border-t-2 border-neon" />
          <span className="pointer-events-none absolute right-0.5 top-0.5 h-2 w-2 border-r-2 border-t-2 border-neon" />
          <span className="pointer-events-none absolute bottom-0.5 left-0.5 h-2 w-2 border-b-2 border-l-2 border-neon" />
          <span className="pointer-events-none absolute bottom-0.5 right-0.5 h-2 w-2 border-b-2 border-r-2 border-neon" />
          {/* Scan line through the middle (baseline) — hidden in cleanMinimal mode (V14) */}
          {!variant.cleanMinimal && (
            <span
              className="pointer-events-none absolute left-1 right-1 top-1/2 h-0.5 -translate-y-1/2 opacity-90"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--neon) 30%, var(--logo-scan-hi) 50%, var(--neon) 70%, transparent)",
                boxShadow: "0 0 4px var(--logo-scan-glow)",
              }}
            />
          )}
          {/* Variant-specific extras (ring, scan-bar, particles, beacon) */}
          {variant.extra}
          {/* The 音 character.
              - Default: gradient fill (inline) + glow filter (in globals.css on .logo-glyph,
                overridden per-variant by V3/V6/V7/V8/V9/V10/V11/V12 animations).
              - glyphMinimal (V13/V14): pure solid color, no gradient, no glow, no animation.
                Uses .logo-glyph-pure modifier to kill inherited `animation` + `filter`.
                glyphColor overrides the default var(--neon) (e.g. V14 uses var(--in-blue)). */}
          <span
            className={`logo-glyph relative ${variant.glyphWeight || "font-black"} leading-none ${variant.glyphMinimal ? "logo-glyph-pure" : ""}`}
            style={{
              fontFamily:
                "var(--font-cjk), 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
              fontSize: variant.glyphSize || "20px",
              ...(variant.glyphMinimal
                ? {
                    color: variant.glyphColor || "var(--neon)",
                    WebkitTextFillColor: variant.glyphColor || "var(--neon)",
                  }
                : {
                    background:
                      "linear-gradient(135deg, var(--logo-glyph-1) 0%, var(--logo-glyph-2) 25%, var(--logo-glyph-3) 55%, var(--logo-glyph-4) 80%, var(--logo-glyph-5) 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }),
            }}
          >
            音
          </span>
        </span>
      </div>

      {/* Label + hint */}
      <div className="flex flex-col items-center gap-0.5 text-center">
        <span className="font-display text-xs font-semibold text-foreground">
          {variant.label}
        </span>
        <span className="font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
          {variant.hint}
        </span>
      </div>

      {/* Variant index badge */}
      <span className="absolute right-2 top-2 font-tech text-[9px] uppercase tracking-widest text-neon/60">
        v{index + 1}
      </span>
    </motion.div>
  );
}

export function LogoShowcase() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      {/* Section heading */}
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-3 py-1 font-tech text-[11px] uppercase tracking-[0.2em] text-neon">
          Logo Motion Lab
        </span>
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Пятнадцать вариантов анимации логотипа{" "}
          <span>
            <span className="text-iq-gold">IQ</span>
            <span className="text-in-blue">in</span>
            <span className="text-ru-plain">.ru</span>
            <span className="opacity-60"> · </span>
            <span className="text-neon">音</span>
          </span>
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Пятнадцать динамических вариантов в стиле <span className="text-neon">Техно-Зен: Zentex</span> —
          темп глубокого дыхания, циклы 8–32 секунды, плавные переходы, без резких вспышек.
          На чистом CSS, без JS-нагрузки. V10 «Маяк» — вращающийся луч света вокруг глифа.
          V11 «Осевой маяк» — луч вращается вокруг самой вертикальной оси иероглифа
          (3D-оборот с backface-visibility:hidden, как настоящий маяк, видимый только
          когда свет направлен на зрителя). V12 «Три луча» — луч задерживается в трёх
          положениях по горизонтали: слева вбок, на зрителя, справа вбок, с явными
          паузами и мягким возвратом-маятником. V13 «Маяк минимал» — тот же вращающийся
          луч, но без внешней рамки: чистый квадрат с закруглёнными краями, сетка
          и уголки сохранены, а сам иероглиф 音 — чисто синий, без градиента и свечения.
          V14 «Чистый минимал» — окончательная дистилляция: только синий 音, сетка и
          четыре уголка на прозрачном фоне, без какого-либо движения, glow или scan-line.
          V15 «Вертикальное сканирование» — V14 + тонкая вертикальная световая линия,
          которая медленно скользит слева направо по иероглифу, как лазерный сканер.
        </p>
      </div>

      {/* Variants grid — 15 cards: 2 cols mobile, 3 cols tablet, 5 cols lg, 7 cols xl (perfect 3 rows: 7+7+1) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 xl:grid-cols-7">
        {VARIANTS.map((v, i) => (
          <LogoVariantCard key={v.id} variant={v} index={i} />
        ))}
      </div>

      {/* Manifesto quote + CTA to /logo-lab */}
      <div className="mt-10 flex flex-col items-center gap-6 text-center">
        <p className="max-w-3xl font-display text-base italic text-foreground/80 sm:text-lg">
          «Технологии, которые дышат — это не метафора. Это{" "}
          <span className="text-gradient-neon">Zentex</span>: 32 секунды на цикл,
          16 на вдох, 16 на выдох. Логотип живёт в том же темпе, что и человек,
          который на него смотрит».
        </p>
        <Link
          href="/logo-lab"
          className="group inline-flex items-center gap-2 rounded-md border border-neon/40 bg-neon/10 px-5 py-2.5 text-sm font-semibold text-neon transition-all hover:bg-neon hover:text-primary-foreground hover:glow-neon-strong"
        >
          Открыть Logo Motion Lab
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Полная галерея + история создания · Техно-Зен: Zentex
        </span>
      </div>
    </section>
  );
}
