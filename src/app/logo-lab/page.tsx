"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Code2, Clock, Sparkles, Quote, Wind, Zap } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { GridBackground } from "@/components/site/grid-background";

type Variant = {
  id: string;
  num: string;
  label: string;
  hint: string;
  cycle: string;
  easing: string;
  technique: string;
  className: string;
  extra?: React.ReactNode;
  /** minimal mode: no outer border (rounded-2xl instead of rounded-md + border-2);
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
  /** Override glyph font-size (default "44px"). V14 uses "52.8px" (1.2× larger). */
  glyphSize?: string;
  /** Override glyph font-weight class (default "font-black" = 900).
      V14/V15/V16 use "font-medium" = 500 for a lighter, cleaner look. */
  glyphWeight?: string;
  /** glyphFlash: solid-color glyph (like glyphMinimal) BUT animates filter
      (brightness + drop-shadow) so the glyph flashes bright when a scan bar
      crosses it. Used by V16 "Cross Scan + Flash Glyph". */
  glyphFlash?: boolean;
};

const PARTICLE_COUNT = 8;

function ParticleField({ count = PARTICLE_COUNT, radius = 36 }: { count?: number; radius?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
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
    num: "V1",
    label: "Breathing",
    hint: "плавное дыхание glow + zoom",
    cycle: "8s",
    easing: "cubic-bezier(0.45, 0, 0.55, 1)",
    technique: "scale + drop-shadow",
    className: "logo-v-breathe",
  },
  {
    id: "v2-radar",
    num: "V2",
    label: "Radar Sweep",
    hint: "вращающееся кольцо с точкой",
    cycle: "12s",
    easing: "linear",
    technique: "rotate 360°",
    className: "logo-v-radar",
    extra: <span className="logo-ring" />,
  },
  {
    id: "v3-glitch",
    num: "V3",
    label: "Glitch RGB",
    hint: "RGB-сдвиг + микро-дрожание",
    cycle: "9s",
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    technique: "translateX + text-shadow",
    className: "logo-v-glitch",
  },
  {
    id: "v4-scan",
    num: "V4",
    label: "Scan Sweep",
    hint: "световая полоса сверху вниз",
    cycle: "8s",
    easing: "cubic-bezier(0.45, 0, 0.55, 1)",
    technique: "translateY + opacity",
    className: "logo-v-scan",
    extra: <span className="logo-scan-bar" />,
  },
  {
    id: "v5-particles",
    num: "V5",
    label: "Particle Burst",
    hint: "8 частиц разлетаются наружу",
    cycle: "20s",
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    technique: "radial translate + scale",
    className: "logo-v-particles",
    extra: <ParticleField count={8} radius={36} />,
  },
  {
    id: "v6-electric",
    num: "V6",
    label: "Electric Pulse",
    hint: "плавное нарастание подсветки контура и гало (32с — дзен-цикл)",
    cycle: "32s",
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    technique: "box-shadow + drop-shadow sine",
    className: "logo-v-electric",
  },
  {
    id: "v7-combo",
    num: "V7",
    label: "Combo: Burst + Electric",
    hint: "v5 + v6 — частицы и электрические разряды в дзен-синхронизации",
    cycle: "32s + 20s",
    easing: "дзен-синхрон",
    technique: "v5 ⊕ v6",
    className: "logo-v-electric logo-v-particles",
    extra: <ParticleField count={8} radius={36} />,
  },
  {
    id: "v8-glitchscan",
    num: "V8",
    label: "Combo: Glitch + Scan",
    hint: "v3 + v4 — редкие RGB-дрейфы пересекаются сканирующим лучом",
    cycle: "9s + 8s",
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    technique: "v3 ⊕ v4",
    className: "logo-v-glitchscan",
    extra: <span className="logo-scan-bar" />,
  },
  {
    id: "v9-mega",
    num: "V9",
    label: "Mega Combo (V7+V8)",
    hint: "v3+v4+v5+v6 — все четыре эффекта в одной 32-секундной синхронизации",
    cycle: "32s + 8s + 20s",
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    technique: "v3 ⊕ v4 ⊕ v5 ⊕ v6 (merged keyframe)",
    className: "logo-v-mega",
    extra: (
      <>
        <span className="logo-scan-bar" />
        <ParticleField count={8} radius={36} />
      </>
    ),
  },
  {
    id: "v10-lighthouse",
    num: "V10",
    label: "Lighthouse (Маяк)",
    hint: "вращающийся луч света вокруг глифа — иероглиф 音 как маяк в тумане",
    cycle: "12s + 8s",
    easing: "linear + cubic-bezier(0.45, 0, 0.55, 1)",
    technique: "conic-gradient rotate + drop-shadow sine",
    className: "logo-v-lighthouse",
    extra: <span className="logo-beacon" />,
  },
  {
    id: "v11-axial",
    num: "V11",
    label: "Axial Lighthouse (Ось маяка)",
    hint: "луч вращается вокруг вертикальной оси иероглифа — 3D-оборот с backface-visibility:hidden",
    cycle: "16s + 16s",
    easing: "linear (rotateY) + cubic-bezier(0.45, 0, 0.55, 1) (glow)",
    technique: "perspective rotateY + drop-shadow sine (synced)",
    className: "logo-v-axial",
    extra: <span className="logo-axial-beam" />,
  },
  {
    id: "v12-tribeam",
    num: "V12",
    label: "Tri-Beam Lighthouse (Три луча)",
    hint: "три дискретных положения по горизонтали: слева вбок → на зрителя → справа вбок (маяк-маятник)",
    cycle: "18s",
    easing: "cubic-bezier(0.45, 0, 0.55, 1) (и луч, и glow)",
    technique: "perspective rotateY ±60° с ключами-паузами + drop-shadow sine (synced)",
    className: "logo-v-tribeam",
    extra: <span className="logo-tribeam-beam" />,
  },
  {
    id: "v13-lighthouse-minimal",
    num: "V13",
    label: "Lighthouse Minimal (Маяк минимал)",
    hint: "тот же вращающийся луч что и V10, но без внешней рамки — чистый квадрат с закруглёнными краями, сетка и уголки сохранены, 音 чисто синий без эффектов",
    cycle: "12s + 0s",
    easing: "linear (beacon) + none (glyph)",
    technique: "conic-gradient rotate beacon + static solid-blue glyph (no border; grid/brackets/scan kept; no glow animation)",
    className: "logo-v-lighthouse",
    extra: <span className="logo-beacon" />,
    minimal: true,
    glyphMinimal: true,
  },
  {
    id: "v14-clean",
    num: "V14",
    label: "Clean Minimal (Чистый минимал)",
    hint: "окончательная дистилляция: только синий 音, сетка и четыре уголка на прозрачном фоне, без какого-либо движения, glow или scan-line",
    cycle: "0s",
    easing: "none",
    technique: "static solid-color glyph (var(--in-blue)) + grid pattern + 4 corner brackets on transparent background; no border, no beacon, no scan-line, no glow",
    className: "",
    minimal: true,
    glyphMinimal: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "52.8px",
    glyphWeight: "font-medium",
  },
  {
    id: "v15-vscan",
    num: "V15",
    label: "Vertical Scan (Вертикальное сканирование)",
    hint: "V14 + тонкая вертикальная световая линия медленно скользит слева направо по иероглифу, как лазерный сканер",
    cycle: "8s",
    easing: "cubic-bezier(0.45, 0, 0.55, 1)",
    technique: "static solid-color glyph (var(--in-blue)) + grid + 4 corner brackets on transparent background + 14px-wide vertical light bar with horizontal gradient (rgba(147,197,253) → rgba(59,130,246) → rgba(147,197,253)) sliding left→right via translateX, mix-blend-mode:screen, drop-shadow glow, 8s cycle",
    className: "logo-v-vscan",
    minimal: true,
    glyphMinimal: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "52.8px",
    glyphWeight: "font-medium",
    extra: <span className="logo-vscan-line" />,
  },
  {
    id: "v16-crossscan-flash",
    num: "V16",
    label: "Cross Scan + Flash Glyph (Вспышка на сканировании)",
    hint: "V14 + две толстые полупрозрачные световые полосы по очереди проносят по иероглифу (32s вертикально + 32s горизонтально), и сам 音 вспыхивает ярким бело-синим в момент прохождения каждой полосы. 64s цикл — ультра-медитативный ритм (2x медленнее V6 Zen 32s)",
    cycle: "64s + 64s",
    easing: "cubic-bezier(0.45, 0, 0.55, 1) (bars) + linear (flash)",
    technique: "solid-color glyph (var(--in-blue)) on transparent bg + grid + 4 corner brackets + two 50%-wide light bars sweeping L→R then T→B (mix-blend-mode:screen, drop-shadow glow, 64s cycle = 32s + 32s, ultra-slow) + glyph brightness×2.6 + white-blue drop-shadow flash synced to bar crossings (~22% ≈14s and ~72% ≈46s of cycle)",
    className: "logo-v-crossscan",
    minimal: true,
    glyphFlash: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "52.8px",
    glyphWeight: "font-medium",
    extra: (
      <>
        <span className="logo-vscan-line" />
        <span className="logo-hscan-line" />
      </>
    ),
  },
  {
    id: "v17-halo-breath",
    num: "V17",
    label: "Halo Breath (Дыхание гало)",
    hint: "V14 + мягкое радиальное гало вокруг 音 дышит opacity 0.20↔0.85 + scale 0.80↔1.05 на 32-секундном дзен-цикле. Сам глиф остаётся плоско-синим — дышит только аура вокруг него, как медитативная лампа: пламя неподвижно, свет пульсирует",
    cycle: "32s",
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    technique: "static solid-color glyph (var(--in-blue)) on transparent bg + grid + 4 corner brackets + radial-gradient halo (160% diameter, rgba(147,197,253) → rgba(59,130,246) → transparent, blur 6px, mix-blend-mode:screen) animating opacity + scale on a 32s sine wave (same Zen tempo as V6 Electric Pulse, but only the halo moves — glyph is flat)",
    className: "logo-v-halo",
    minimal: true,
    glyphMinimal: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "52.8px",
    glyphWeight: "font-medium",
    extra: <span className="logo-halo-ring" />,
  },
  {
    id: "v18-glow-letter",
    num: "V18",
    label: "Glow Letter (Светящаяся буква)",
    hint: "V14 + сам 音 медленно пульсирует brightness 1.0↔1.5 и soft drop-shadow на 32-секундном дзен-цикле. Никакого гало, никаких полос — только сам иероглиф становится ярче и тусклее, как медитативная лампа, где пламя — единственный движущийся элемент",
    cycle: "32s",
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    technique: "solid-color glyph (var(--in-blue)) on transparent bg + grid + 4 corner brackets + glyph itself animating filter: brightness(1.0→1.5) + double drop-shadow (14px rgba(147,197,253,0.75) + 22px rgba(59,130,246,0.45)) on a 32s sine wave (uses logo-glyph-flash modifier to keep animation/filter available — same mechanism as V16, but slow continuous breathing instead of sharp flash)",
    className: "logo-v-glow",
    minimal: true,
    glyphFlash: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "52.8px",
    glyphWeight: "font-medium",
  },
  {
    id: "v19-aurora-wash",
    num: "V19",
    label: "Aurora Wash (Полярное сияние)",
    hint: "V14 + медленный conic-градиент за глифом вращается 360° за 24s и одновременно затухает opacity 0.15↔0.75. Цвета плавно перетекают blue → cyan → indigo, как мягкое полярное сияние поверх HUD-квадрата. Сам 音 остаётся плоско-синим",
    cycle: "24s",
    easing: "linear (rotate) + cubic-bezier(0.4, 0, 0.6, 1) (fade)",
    technique: "static solid-color glyph (var(--in-blue)) on transparent bg + grid + 4 corner brackets + conic-gradient overlay (inset -20%, rgba(59,130,246) → rgba(34,211,238) cyan → rgba(147,197,253) → rgba(96,165,250), blur 14px, mix-blend-mode:screen) with two simultaneous animations: rotate 360° linear 24s + opacity sine 0.15↔0.75 cubic-bezier 24s",
    className: "logo-v-aurora",
    minimal: true,
    glyphMinimal: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "52.8px",
    glyphWeight: "font-medium",
    extra: <span className="logo-aurora" />,
  },
  {
    id: "v20-orbit-satellite",
    num: "V20",
    label: "Orbit Satellite (Орбита-спутник)",
    hint: "V14 + маленькая 4px неоновая точка вращается по эллиптической орбите вокруг 音 за 12 секунд (тот же темп что у V10 Маяк). Тонкая орбитальная дорожка едва видна — точка оставляет мягкий box-shadow след. Сам глиф остаётся плоско-синим",
    cycle: "12s",
    easing: "linear",
    technique: "static solid-color glyph (var(--in-blue)) on transparent bg + grid + 4 corner brackets + elliptical orbit wrapper (130% width × 90% height, ::after pseudo-element = 4px dot at right edge with 3-layer box-shadow trail, ::before = faint 1px orbit path at 10% opacity) rotating 360° linear 12s",
    className: "logo-v-orbit",
    minimal: true,
    glyphMinimal: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "52.8px",
    glyphWeight: "font-medium",
    extra: <span className="logo-orbit-ring" />,
  },
  {
    id: "v21-ripple-pulse",
    num: "V21",
    label: "Ripple Pulse (Круги на воде)",
    hint: "V14 + три концентрических кольца-рябь расходятся от центра глифа каждые 8 секунд (со сдвигом 2.67s между кольцами). Каждое кольцо расширяется от 30% до 110% размера квадрата и затухает 0.7→0.0 — как капли дождя, падающие в воду в медитативном темпе",
    cycle: "8s (×3 staggered)",
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    technique: "static solid-color glyph (var(--in-blue)) on transparent bg + grid + 4 corner brackets + three 1.5px neon rings (rgba(147,197,253,0.7) border + 6px rgba(59,130,246,0.25) glow) animating scale 1→3.6 + opacity 0→0.7→0 over 8s, each with --ripple-delay stagger of 0s/2.67s/5.33s",
    className: "logo-v-ripple",
    minimal: true,
    glyphMinimal: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "52.8px",
    glyphWeight: "font-medium",
    extra: (
      <>
        <span className="logo-ripple" style={{ "--ripple-delay": "0s" } as React.CSSProperties} />
        <span className="logo-ripple" style={{ "--ripple-delay": "2.67s" } as React.CSSProperties} />
        <span className="logo-ripple" style={{ "--ripple-delay": "5.33s" } as React.CSSProperties} />
      </>
    ),
  },
  {
    id: "v22-glitch-drift",
    num: "V22",
    label: "Glitch Drift (Цифровой дрейф)",
    hint: "V14 + раз в 7 секунд 音 на мгновение (≈300ms) расщепляется на magenta+cyan хроматический сдвиг ±2px по X, как цифровой артефакт. Сам глиф остаётся плоско-синим — glitch редкий, не постоянный (как V3), и применяется к минималистичной базе V14",
    cycle: "14s",
    easing: "linear (keyframe-exact peaks)",
    technique: "solid-color glyph (var(--in-blue)) on transparent bg + grid + 4 corner brackets + glyph filter animating brief RGB chromatic split drop-shadow (magenta #F472B6 left offset + cyan #60A5FA right offset) + translateX ±2px on a 14s cycle, two glitch peaks at ~18% (2.5s) and ~68% (9.5s), each lasting ~300ms (≈2% of cycle); uses glyphFlash modifier so animation/filter stay available on .logo-glyph",
    className: "logo-v-glitch-drift",
    minimal: true,
    glyphFlash: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "52.8px",
    glyphWeight: "font-medium",
  },
  {
    id: "v23-pulse-grid",
    num: "V23",
    label: "Pulse Grid (Дышащая сетка)",
    hint: "V14 + сама сетка и четыре угловых скобки медленно дышат opacity 0.35↔1.0 на 16-секундном цикле. Сам 音 остаётся плоско-синим — инверсия V18: дышит HUD-инфраструктура вокруг глифа, а не сам глиф",
    cycle: "16s",
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    technique: "static solid-color glyph (var(--in-blue)) on transparent bg + grid pattern + 4 corner brackets that ALL breathe opacity 0.35→1.0 on a 16s sine wave (cubic-bezier(0.4,0,0.6,1)); uses .logo-pulse-grid modifier on the parent logo span which drives an opacity animation on its grid + corner-bracket children via a CSS custom property cascade. Glyph itself stays flat — first variant where the HUD infrastructure moves while the glyph is frozen",
    className: "logo-v-pulse-grid",
    minimal: true,
    glyphMinimal: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "52.8px",
    glyphWeight: "font-medium",
  },
  {
    id: "v24-tilt-parallax",
    num: "V24",
    label: "Tilt Parallax (Наклон-параллакс)",
    hint: "V14 + весь HUD-квадрат медленно наклоняется в 3D: rotateY ±8° + rotateX ±4° на 20-секундном синусоидальном цикле с perspective 600px. Сам 音 остаётся плоско-синим — дышит вся рамка целиком, как медитативно покачивающийся портрет",
    cycle: "20s",
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    technique: "static solid-color glyph (var(--in-blue)) on transparent bg + grid + 4 corner brackets + parent logo span animating transform: rotateY(±8deg) rotateX(±4deg) on a 20s sine wave (cubic-bezier(0.4,0,0.6,1)); parent wrapper gets perspective:600px so the rotation reads as 3D depth; backface-visibility:hidden prevents mirror-flip artifacts at peaks",
    className: "logo-v-tilt",
    minimal: true,
    glyphMinimal: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "52.8px",
    glyphWeight: "font-medium",
  },
  {
    id: "v25-echo-trace",
    num: "V25",
    label: "Echo Trace (Эхо-след)",
    hint: "V14 + два фантомных эха 音 (±2.5px и ±1.5px по X) медленно проявляются за основным glyph на 14-секундном цикле. Эха используют mix-blend-mode:screen, чтобы мягко подсвечивать glyph в пике. Сам 音 остаётся плоско-синим — эффект motion-blur без движения",
    cycle: "14s",
    easing: "cubic-bezier(0.4, 0, 0.6, 1)",
    technique: "static solid-color glyph (var(--in-blue)) on transparent bg + grid + 4 corner brackets + two .logo-echo-trace span children positioned absolutely behind glyph, each rendering 音 via ::before content pseudo-element with color rgba(147,197,253, 0.55), -webkit-text-fill-color: transparent, -webkit-text-stroke: 1px rgba(147,197,253, 0.6); each echo animates opacity 0→0.6→0 + translateX (±2.5px / ±1.5px) on a 14s sine wave with staggered peaks (35% and 70%)",
    className: "logo-v-echo",
    minimal: true,
    glyphMinimal: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "52.8px",
    glyphWeight: "font-medium",
    extra: (
      <>
        <span className="logo-echo-trace logo-echo-trace--left" aria-hidden="true" />
        <span className="logo-echo-trace logo-echo-trace--right" aria-hidden="true" />
      </>
    ),
  },
  {
    id: "v26-frame-strobe",
    num: "V26",
    label: "Frame Strobe (Импульс рамки)",
    hint: "V14 + рамка квадрата вспыхивает дискретными box-shadow импульсами каждые ≈4.7 секунды (3 импульса на 14s цикл), как сердцебиение. В отличие от V6 (непрерывная sine-волна) и V17 (дыхание гало) — V26 emits резкие дискретные пульсы с быстрым затуханием. Сам 音 остаётся плоско-синим",
    cycle: "14s",
    easing: "linear (keyframe-exact pulse peaks)",
    technique: "static solid-color glyph (var(--in-blue)) on transparent bg + grid + 4 corner brackets + parent logo span animating box-shadow (0 0 0 2px rgba(147,197,253,0.95) + 0 0 18px rgba(59,130,246,0.7) + 0 0 36px rgba(59,130,246,0.4)) at three discrete peaks per 14s cycle (~14% / ~50% / ~86%), each pulse ≈400ms rise + ≈600ms fall, with quiet baseline between pulses; the strobe feels like a heartbeat monitor rather than continuous breathing",
    className: "logo-v-strobe",
    minimal: true,
    glyphMinimal: true,
    cleanMinimal: true,
    glyphColor: "var(--in-blue)",
    glyphSize: "52.8px",
    glyphWeight: "font-medium",
  },
];

function LargeLogoCard({ variant, index }: { variant: Variant; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm transition-colors hover:border-neon/40"
    >
      {/* Top: large logo on the left, info on the right */}
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
        {/* Large logo box (96x96 — 2x bigger than showcase) */}
        <div className="relative flex h-32 w-32 shrink-0 items-center justify-center sm:h-40 sm:w-40">
          <span
            className={`relative inline-flex h-24 w-24 items-center justify-center sm:h-32 sm:w-32 ${variant.minimal ? "rounded-2xl" : "rounded-md border-2"} ${variant.className}`}
            aria-hidden="true"
            style={
              variant.minimal
                ? { background: variant.cleanMinimal ? "transparent" : "var(--logo-bg)" }
                : { borderColor: "var(--logo-border)", background: "var(--logo-bg)" }
            }
          >
            {/* Subtle grid background — always present (kept in minimal mode) */}
            <span
              className="absolute inset-1.5 rounded-sm opacity-70"
              style={{
                backgroundImage:
                  "linear-gradient(to right, var(--logo-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--logo-grid) 1px, transparent 1px)",
                backgroundSize: "10px 10px",
              }}
            />
            {/* Corner brackets — always present (kept in minimal mode) */}
            <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 border-l-2 border-t-2 border-neon" />
            <span className="pointer-events-none absolute right-1 top-1 h-3 w-3 border-r-2 border-t-2 border-neon" />
            <span className="pointer-events-none absolute bottom-1 left-1 h-3 w-3 border-b-2 border-l-2 border-neon" />
            <span className="pointer-events-none absolute bottom-1 right-1 h-3 w-3 border-b-2 border-r-2 border-neon" />
            {/* Scan line through the middle — hidden in cleanMinimal mode (V14) */}
            {!variant.cleanMinimal && (
              <span
                className="pointer-events-none absolute left-1.5 right-1.5 top-1/2 h-0.5 -translate-y-1/2 opacity-90"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--neon) 30%, var(--logo-scan-hi) 50%, var(--neon) 70%, transparent)",
                  boxShadow: "0 0 4px var(--logo-scan-glow)",
                }}
              />
            )}
            {/* Variant-specific extras */}
            {variant.extra}
            {/* The 音 character.
                - Default: gradient fill (inline) + glow filter (in globals.css on .logo-glyph,
                  overridden per-variant by V3/V6/V7/V8/V9/V10/V11/V12 animations).
                - glyphMinimal (V13/V14): pure solid color, no gradient, no glow, no animation.
                  Uses .logo-glyph-pure modifier to kill inherited `animation` + `filter`.
                  glyphColor overrides the default var(--neon) (e.g. V14 uses var(--in-blue)).
                - glyphFlash (V16): solid color like glyphMinimal, but uses .logo-glyph-flash
                  modifier which keeps `animation` + `filter` available — so the parent variant
                  can drive a flash animation on the glyph (e.g. synced to scan-bar crossings). */}
            <span
              className={`logo-glyph relative ${variant.glyphWeight || "font-black"} leading-none ${variant.glyphFlash ? "logo-glyph-flash" : ""} ${variant.glyphMinimal ? "logo-glyph-pure" : ""}`}
              style={{
                fontFamily:
                  "var(--font-cjk), 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
                fontSize: variant.glyphSize || "44px",
                ...(variant.glyphMinimal || variant.glyphFlash
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

        {/* Info column */}
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="font-tech text-xs uppercase tracking-[0.25em] text-neon/70">
              {variant.num}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-neon/40 to-transparent" />
          </div>
          <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {variant.label}
          </h3>
          <p className="text-sm text-muted-foreground sm:text-base">{variant.hint}</p>

          {/* Tech details grid */}
          <div className="mt-2 grid grid-cols-1 gap-2 font-mono text-xs sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-md border border-border/60 bg-background/40 px-3 py-2">
              <Clock className="h-3.5 w-3.5 text-neon" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  Cycle
                </span>
                <span className="text-foreground/90">{variant.cycle}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border/60 bg-background/40 px-3 py-2 sm:col-span-2">
              <Code2 className="h-3.5 w-3.5 text-neon" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  Easing
                </span>
                <span className="truncate text-foreground/90">{variant.easing}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border/60 bg-background/40 px-3 py-2 sm:col-span-3">
              <Sparkles className="h-3.5 w-3.5 text-neon" />
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                  Technique
                </span>
                <span className="text-foreground/90">{variant.technique}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer strip with class name */}
      <div className="border-t border-border/60 bg-background/40 px-6 py-3 sm:px-8">
        <code className="font-mono text-[11px] text-muted-foreground">
          .{variant.className.replace(/\s+/g, ".")}
        </code>
      </div>
    </motion.div>
  );
}

export default function LogoLabPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />

      <main id="main" className="flex-1">
        {/* Hero of the lab */}
        <section className="relative overflow-hidden pt-12 pb-12 sm:pt-16 lg:pt-20">
          <GridBackground variant="masked" />

          {/* Ambient orbs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--neon) 50%, transparent), transparent 70%)",
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
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-neon/40 hover:text-neon"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                На главную
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-3 py-1.5 font-tech text-[11px] uppercase tracking-[0.2em] text-neon"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              Logo Motion Lab · v1.0
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Пятнадцать вариантов анимации{" "}
              <span className="text-gradient-neon text-glow-neon">логотипа 音</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Полная галерея динамических вариантов в стиле{" "}
              <span className="font-tech text-neon">Техно-Зен: Zentex</span> — от плавного
              дыхания до комбо-эффектов с частицами, электрическими разрядами и
              сканирующими лучами. Все анимации в темпе глубокого дзен-дыхания
              (8–32 секунды на цикл), на чистом CSS, без JS-нагрузки.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-3 font-tech text-[12px] uppercase tracking-[0.18em] text-neon/90 sm:text-[13px]"
            >
              Ultra Next-Gen all-in-one AI-IP Platform · patents · trademarks · IP · Web · Copyright · Intellectual property ·
            </motion.p>
          </div>
        </section>

        {/* Variants list */}
        <section className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:gap-8">
            {VARIANTS.map((v, i) => (
              <LargeLogoCard key={v.id} variant={v} index={i} />
            ))}
          </div>

          {/* Footer note — Технические детали */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm sm:p-8"
          >
            <h2 className="mb-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
              Технические детали
            </h2>
            <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
              <div>
                <span className="font-tech text-[10px] uppercase tracking-wider text-neon">
                  Производительность
                </span>
                <p className="mt-1.5 leading-relaxed">
                  Все 26 вариантов используют только CSS-анимации — никаких JS-таймеров
                  и React-ре-рендеров. GPU-ускорение через <code className="font-mono text-foreground/80">transform</code>,{" "}
                  <code className="font-mono text-foreground/80">filter</code> и{" "}
                  <code className="font-mono text-foreground/80">box-shadow</code>.
                </p>
              </div>
              <div>
                <span className="font-tech text-[10px] uppercase tracking-wider text-neon">
                  Доступность
                </span>
                <p className="mt-1.5 leading-relaxed">
                  Иероглиф 音 доступен для скринридеров через <code className="font-mono text-foreground/80">aria-label</code>{" "}
                  на родительской ссылке. Визуальные эффекты не влияют на семантику.
                </p>
              </div>
              <div>
                <span className="font-tech text-[10px] uppercase tracking-wider text-neon">
                  Темп дыхания
                </span>
                <p className="mt-1.5 leading-relaxed">
                  Базовые циклы 8–12 секунд соответствуют ритму спокойного дыхания.
                  V6/V7/V9 — 32 секунды на цикл (16с вдох + 16с выдох), как в пранаяме.
                  V5 — 20 секунд на разлёт частиц. V8 — 9с glitch + 8с scan. V9 объединяет
                  все четыре эффекта в одной 32-секундной синхронизации через merged keyframe.
                  V10 «Маяк» — 12с вращение луча (linear, как настоящий маяк) + 8с дыхание глифа.
                  V11 «Осевой маяк» — 16с оборот луча вокруг Y-оси глифа (linear, с
                  backface-visibility:hidden) + 16с дыхание глифа в фазе с лучом: пик
                  яркости, когда луч смотрит на зрителя, минимум — когда уходит за глиф.
                  V12 «Три луча» — 18с маятник: луч задерживается в трёх положениях по
                  горизонтали (слева вбок → на зрителя → справа вбок → на зрителя → слева),
                  с явными паузами через ключи-дубли (0%,10% / 20%,35% / 45%,60%) и мягким
                  cubic-bezier переходом между ними. Glow глифа имеет два пика за цикл —
                  на каждом центральном положении, и спадает до мягкого бокового свечения
                  в левой и правой позициях.
                </p>
              </div>
              <div>
                <span className="font-tech text-[10px] uppercase tracking-wider text-neon">
                  Применение
                </span>
                <p className="mt-1.5 leading-relaxed">
                  V7 (Burst + Electric) сейчас используется в шапке сайта. V8 (Glitch + Scan),
                  V9 (Mega Combo), V10 (Lighthouse), V11 (Axial Lighthouse), V12 (Tri-Beam
                  Lighthouse) и V13 (Lighthouse Minimal) — экспериментальные. V14 (Clean Minimal)
                  — кандидат на 404-страницу, login-лоадер и favicon: максимально дешёвый по
                  рендеру, ничто не отвлекает от самого иероглифа. V15 (Vertical Scan) — V14
                  с одной тонкой вертикальной световой линией, медленно скользящей слева
                  направо: эффект лазерного сканера, сохраняющий минималистичность.
                  V16 (Cross Scan + Flash Glyph) — V14 + две толстые полосы (вертикальная
                  и горизонтальная) по очереди проносятся по глифу за 32 с (цикл 64 с), и сам 音
                  вспыхивает бело-синим каждый раз, когда полоса пересекает его центр:
                  первый вариант с синхронизированной реакцией глифа на сканер.
                  V17 (Halo Breath) — V14 + мягкое радиальное гало вокруг 音 дышит
                  на 32-секундном дзен-цикле, сам глиф остаётся плоско-синим.
                  V18 (Glow Letter) — V14 + сам 音 медленно пульсирует brightness
                  1.0↔1.5 на 32-секундном цикле, без всякого гало: эффект медитативной лампы.
                  V19 (Aurora Wash) — V14 + медленный conic-градиент за глифом вращается
                  и затухает за 24s, как полярное сияние поверх HUD-квадрата.
                  V20 (Orbit Satellite) — V14 + 4px неоновая точка вращается по
                  эллиптической орбите вокруг 音 за 12s, как спутник вокруг планеты.
                  V21 (Ripple Pulse) — V14 + три концентрических кольца-рябь расходятся
                  от центра глифа каждые 8s со сдвигом 2.67s, как капли дождя в воде.
                  V22 (Glitch Drift) — V14 + раз в 7 секунд 音 на мгновение (≈300ms)
                  расщепляется на magenta+cyan хроматический сдвиг ±2px, как цифровой
                  артефакт. 14s цикл, 96% времени — статика.
                  V23 (Pulse Grid) — V14 + сама сетка и четыре угловых скобки дышат
                  opacity 0.35↔1.0 на 16s цикле; инверсия V18 (дышит HUD, не glyph).
                  V24 (Tilt Parallax) — V14 + весь HUD-квадрат медленно покачивается
                  в 3D: rotateY ±8° + rotateX ±4° на 20s цикле с perspective 600px.
                  Первое настоящее 3D-движение в серии.
                  V25 (Echo Trace) — V14 + два фантомных эха 音 (контуры, не заливка)
                  медленно проявляются позади глифа на 14s цикле со сдвигом ±2.5/1.5px.
                  Эффект motion-blur без движения.
                  V26 (Frame Strobe) — V14 + рамка излучает три дискретных box-shadow
                  импульса за 14s цикл (~14%/50%/86%), как монитор пульса. В отличие
                  от V6/V17 (непрерывная sine) — V26 emits резкие импульсы с тихим baseline.
                  Все варианты с V15 по V26 — это V14 + одна дополнительная идея,
                  без нарушения минималистичной эстетики.
                  Остальные варианты доступны на этой странице для будущих A/B-тестов и
                  кастомных применений.
                </p>
              </div>
            </div>
          </motion.div>

          {/* === История создания === */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mt-16 overflow-hidden rounded-2xl border border-neon/30 bg-gradient-to-br from-card/60 via-background/40 to-card/30 p-6 backdrop-blur-md sm:p-10 lg:p-12"
          >
            {/* Section header */}
            <div className="mb-8 flex flex-col gap-3">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-3 py-1 font-tech text-[11px] uppercase tracking-[0.2em] text-neon">
                <Wind className="h-3 w-3" />
                История создания · Техно-Зен: Zentex
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Как мы делали{" "}
                <span className="text-gradient-neon text-glow-neon">логотип 音</span>
              </h2>
              <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
                Полный путь от первой мигающей точки до двадцати шести дзен-вариантов анимации.
                Итеративный диалог человека и ИИ — десять вечеров, несколько десятков
                итераций и одна неожиданная философия.
              </p>
            </div>

            {/* Story timeline */}
            <div className="relative flex flex-col gap-8 border-l border-neon/20 pl-6 sm:pl-10">

              {/* Chapter 1 */}
              <Chapter
                num="01"
                title="Мигающая amber-точка и попытка неона"
                date="День 1 · начало"
                icon={<Zap className="h-4 w-4" />}
              >
                <p>
                  Всё началось с логотипа в шапке. Изначально внутри иероглифа{" "}
                  <span className="font-mono text-neon">音</span> стояла маленькая{" "}
                  <span className="text-amber">amber-точка</span>, которая мигала каждые
                  полсекунды. Идея была хорошая — добавить визуальный «пульс» — но
                  на тёмном navy-фоне шапки она выглядела как индикатор уведомления,
                  а не как дыхание живого бренда.
                </p>
                <p>
                  Параллельно сам иероглиф{" "}
                  <span className="font-mono text-neon">音</span> (yīn — «звук, интонация»,
                  когнат слога «in» в IQin) был окрашен в тусклый blue-градиент и
                  почти сливался с фоном. На скриншоте было видно: логотип есть,
                  но он не «горит». Решили убрать мигающую точку из header и favicon,
                  а сам иероглиф сделать по-настоящему ярким — насыщенный neon blue
                  с многослойным glow.
                </p>
              </Chapter>

              {/* Chapter 2 */}
              <Chapter
                num="02"
                title="Logo Motion Lab — шесть вариантов"
                date="День 2 · генерация"
                icon={<Sparkles className="h-4 w-4" />}
              >
                <p>
                  Вместо того чтобы оставить один вариант, решили сделать целую
                  лабораторию. За один присест родилось{" "}
                  <span className="text-neon">шесть концептов</span> анимации — все
                  на чистом CSS, без единой строчки JS:
                </p>
                <ul className="my-3 grid gap-1.5 pl-1 text-sm text-muted-foreground">
                  <li>• <span className="text-foreground/90">V1 · Breathing</span> — плавное дыхание glow + zoom</li>
                  <li>• <span className="text-foreground/90">V2 · Radar Sweep</span> — вращающееся кольцо с точкой</li>
                  <li>• <span className="text-foreground/90">V3 · Glitch RGB</span> — RGB-сдвиг + микро-дрожание</li>
                  <li>• <span className="text-foreground/90">V4 · Scan Sweep</span> — световая полоса сверху вниз</li>
                  <li>• <span className="text-foreground/90">V5 · Particle Burst</span> — 8 частиц разлетаются наружу</li>
                  <li>• <span className="text-foreground/90">V6 · Electric Pulse</span> — мерцание + молнии по бордеру</li>
                </ul>
                <p>
                  Получилась сетка из шести карточек прямо в Hero-секции. Каждый
                  мини-логотип 48×48px повторял геометрию шапочного: grid-фон,
                  угловые скобки, центральная scan-линия и сам иероглиф. Жалко было
                  удалять даже один — все получились живыми.
                </p>
              </Chapter>

              {/* Chapter 3 */}
              <Chapter
                num="03"
                title="V7 — первое комбо"
                date="День 3 · синтез"
                icon={<Zap className="h-4 w-4" />}
              >
                <p>
                  Шесть вариантов понравились все. Возникла естественная мысль:{" "}
                  <span className="text-neon">а что если их миксовать?</span> Первым
                  комбо стал V7 = V5 (Particle Burst) + V6 (Electric Pulse). Технически
                  это оказалось просто: две анимации не конфликтуют, потому что V6
                  действует на box-shadow бордера и filter глифа, а V5 анимирует
                  только дочерние .logo-particle элементы.
                </p>
                <p>
                  Получилось восемь частиц, разлетающихся наружу, на фоне плавно
                  пульсирующего контура и гало. Сначала подсветили V7 золотым
                  amber-рамкой и бейджем «NEW», но потом решили убрать —
                  оставить визуально идентичным остальным. Все варианты равны.
                </p>
              </Chapter>

              {/* Chapter 4 — Zen */}
              <Chapter
                num="04"
                title="Замедли до Дзен"
                date="День 4 · философия"
                icon={<Wind className="h-4 w-4" />}
                highlight
              >
                <p>
                  После первых трёх итераций динамичных, но быстрых анимаций
                  (циклы 0.6–2.4 секунды) пришло понимание:{" "}
                  <span className="text-neon">логотип не должен торопиться</span>.
                  Мерцание и резкие вспышки хороши для nightclub-эстетики или
                  gaming-UI, но для платформы интеллектуальной собственности,
                  где речь идёт о патентах, авторских правах и доверии —
                  нужна другая динамика.
                </p>
                <Quote className="my-4 h-5 w-5 text-neon/40" />
                <blockquote className="border-l-2 border-neon/40 pl-4 text-base italic text-foreground/90 sm:text-lg">
                  «Сделай как глубокое дыхание в Дзен медитации».
                </blockquote>
                <p className="mt-4">
                  Эта фраза задала весь дальнейший тон. Все анимации замедлили до
                  циклов 8–12 секунд — темп спокойного дыхания взрослого человека.
                  V6 и V7 получили цикл по 16 секунд, потом ещё удвоили до{" "}
                  <span className="font-mono text-neon">32 секунд</span> — это уже
                  не анимация, а дыхательная практика: 16 секунд вдох, 16 секунд
                  выдох, чистая синусоида от минимума к максимуму и обратно.
                </p>
                <p>
                  Из CSS убрали все <code className="font-mono text-foreground/80">steps(2, end)</code>{" "}
                  (ступенчатые функции, дававшие жёсткое мерцание) и заменили на{" "}
                  <code className="font-mono text-foreground/80">cubic-bezier(0.4, 0, 0.6, 1)</code>{" "}
                  — стандартный «ease-in-out» Tailwind. В keyframes для V6 оставили
                  только три ключевых кадра: 0% → 50% → 100%. Никаких провалов 22%/62%,
                  никаких резких «вкл/выкл». Плавная волна яркости, как настоящая
                  пранаяма.
                </p>
              </Chapter>

              {/* Chapter 5 — Zentex */}
              <Chapter
                num="05"
                title="Рождение стиля Техно-Зен: Zentex"
                date="День 5 · манифест"
                icon={<Sparkles className="h-4 w-4" />}
                highlight
              >
                <p>
                  Когда дзен-темп был найден, стало ясно: это не просто анимация
                  логотипа, это <span className="text-neon">целый визуальный язык</span>.
                  Контраст двух миров: технологическая точность (Techno) — grid-фоны,
                  угловые скобки, моноширинные шрифты, неоновые цвета, scan-линии —
                  и медитативная плавность (Zen) — длинные циклы, мягкие переходы,
                  дыхательный темп.
                </p>
                <p>
                  Этот стиль получил имя{" "}
                  <span className="font-tech text-base font-semibold text-neon">Zentex</span> —
                  от <span className="font-mono">Zen + Tech</span>. Это не просто
                  эстетика, это принцип проектирования интерфейсов:{" "}
                  <em className="text-foreground/90">технологии, которые дышат</em>.
                  Логотип 音 — первый и самый чистый артефакт этого стиля.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                    <span className="font-tech text-[10px] uppercase tracking-wider text-neon">
                      Техно
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      Royal blue неон (#3B82F6 → #2563EB), grid-паттерны,
                      HUD-уголки, моноширинный JetBrains Mono, scan-линии,
                      clip-path углы. Точность, схематичность, инженерность.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-background/40 p-4">
                    <span className="font-tech text-[10px] uppercase tracking-wider text-neon">
                      Зен
                    </span>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      Циклы 8–32 секунды, чистые синусоиды, мягкие ease-in-out
                      кривые, отсутствие мерцания, breathing glow, пранаяма-темп.
                      Спокойствие, присутствие, дыхание.
                    </p>
                  </div>
                </div>
              </Chapter>

              {/* Chapter 6 — V8 */}
              <Chapter
                num="06"
                title="V8 — второе комбо"
                date="День 6 · синтез #2"
                icon={<Code2 className="h-4 w-4" />}
              >
                <p>
                  Логичным продолжением V7 (Burst + Electric) стал{" "}
                  <span className="text-neon">V8 = V3 (Glitch) + V4 (Scan)</span> —
                  редкие RGB-дрейфы пересекаются медленным сканирующим лучом.
                  Технически это заняло один класс <code className="font-mono text-foreground/80">.logo-v-glitchscan</code>,
                  который применяет keyframes от обоих родителей. Получился
                  «цифровой ритуал»: иногда по логотипу проходит лёгкая цифровая
                  рябь (как мысль в медитации), а параллельно медленно спускается
                  световой луч — как взгляд, скользящий по мандале.
                </p>
                <p>
                  Сразу после V8 стало понятно: два комбо (V7 и V8) уже существует,
                  и естественный следующий шаг — собрать всё вместе. Но это потребовало
                  решения нетривиальной технической задачи про конфликт CSS-анимаций.
                </p>
              </Chapter>

              {/* Chapter 7 — V9 final mega-combo */}
              <Chapter
                num="07"
                title="V9 — финальный mega-комбо"
                date="День 7 · синтез #3"
                icon={<Zap className="h-4 w-4" />}
                highlight
              >
                <p>
                  Когда V7 (Burst + Electric) и V8 (Glitch + Scan) уже существовали,
                  возник естественный вопрос:{" "}
                  <span className="text-neon">а что если объединить их все четыре?</span>{" "}
                  Получился V9 = V3 ⊕ V4 ⊕ V5 ⊕ V6 — частицы, сканирующий луч,
                  RGB-дрейф и электрическое дыхание в одной синхронизации.
                </p>
                <p>
                  Технически это потребовало создания единого{" "}
                  <code className="font-mono text-foreground/80">merged keyframe</code>.
                  V3 (glitch filter) и V6 (electric glow filter) оба анимируют свойство{" "}
                  <code className="font-mono text-foreground/80">filter</code> на{" "}
                  <code className="font-mono text-foreground/80">.logo-glyph</code>, а в
                  CSS два animation на одном свойстве не складываются — последний
                  перезаписывает предыдущий. Пришлось вручную объединить keyframes в{" "}
                  <code className="font-mono text-foreground/80">logo-mega-glyph</code> —
                  32-секундный цикл с синусоидой электрического дыхания и четырьмя
                  RGB-всплесками за цикл (примерно каждые 8 секунд).
                </p>
                <p>
                  Получился самый плотный и одновременно самый спокойный вариант —
                  все четыре эффекта работают, но ни один не доминирует.
                </p>
              </Chapter>

              {/* Chapter 8 — V10 Lighthouse */}
              <Chapter
                num="08"
                title="V10 — Маяк"
                date="День 8 · семантика #1"
                icon={<Sparkles className="h-4 w-4" />}
                highlight
              >
                <p>
                  После V9 последовательность “число-комбо” себя исчерпала — девятый
                  вариант объединил все четыре базовых эффекта, и добавить к ним ещё
                  что-то в рамках того же подхода уже невозможно. Тогда взгляд
                  сместился с механики на{" "}
                  <span className="text-neon">семантику</span>. Кто такой вообще этот{" "}
                  <span className="font-mono text-neon">音</span> в визуальном смысле?
                </p>
                <p>
                  Иероглиф <span className="font-mono text-neon">音</span> (yīn — «звук,
                  интонация», когнат слога «in» в IQin) по форме напоминает маяк:
                  вертикальная черта-башня посередине, горизонтальные перекладины-платформы
                  сверху и в середине, основание-фундаммент снизу. Если смотреть на
                  него как на маяк, сразу хочется добавить вращающийся луч света,
                  который бы обходил логотип по кругу — как настоящий маяк, ведущий
                  корабли в порту сквозь туман.
                </p>
                <p>
                  Так появился{" "}
                  <span className="text-neon">V10 «Маяк»</span>:{" "}
                  <code className="font-mono text-foreground/80">conic-gradient</code> с
                  узким сектором яркого света (≈30°) вращается линейно с периодом
                  12 секунд — ровно один оборот, как маяк на мысе. Параллельно глиф
                  дышит мягким 8-секундным glow-циклом — как лампа маяка, которая
                  пульсирует в тумане. Луч выходит за пределы логотипа
                  (<code className="font-mono text-foreground/80">inset: -40%</code>),
                  так что свет буквально освещает пространство вокруг. Техно-Зен: Zentex
                  нашёл свою первую метафору — и она оказалась морской.
                </p>
                <p>
                  Сейчас в шапке сайта живёт V7. V8, V9 и V10 — экспериментальные.
                  Остальные шесть вариантов ждут своих применений: возможно, V1 (Breathing)
                  отправится в footer, V4 (Scan) — на лоадеры, V2 (Radar) — на индикаторы
                  загрузки, а V10 (Маяк) — на страницу 404 или на "загрузочный" экран
                  входа в личный кабинет.
                </p>
              </Chapter>

              {/* Chapter 9 — V11 Axial Lighthouse */}
              <Chapter
                num="09"
                title="V11 — Осевой маяк"
                date="День 9 · настоящее"
                icon={<Zap className="h-4 w-4" />}
                highlight
              >
                <p>
                  V10 «Маяк» открыл семантическое направление: луч света как метафора
                  иероглифа 音. Но одно наблюдение за ним показало физическую неточность.
                  В V10 луч вращается в <span className="text-neon">плоскости экрана</span> —
                  это плоское 2D-вращение вокруг Z-оси, как радар на топ-даун карте.
                  Настоящий маяк работает иначе: его луч вращается вокруг{" "}
                  <span className="text-neon">вертикальной оси башни</span>, и наблюдатель
                  видит вспышку света только в тот момент, когда луч направлен на него.
                  Половину цикла луч уходит за башню и становится невидимым.
                </p>
                <p>
                  Так появился{" "}
                  <span className="text-neon">V11 «Осевой маяк»</span> — второй маяк,
                  на этот раз с настоящим 3D-поведением. Технически это{" "}
                  <code className="font-mono text-foreground/80">transform: perspective(500px) rotateY(0deg → 360deg)</code>{" "}
                  на дочернем элементе <code className="font-mono text-foreground/80">.logo-axial-beam</code> —
                  широком горизонтальном световом клине (300% ширины, 160% высоты
                  родителя), центрированном на глифе. <code className="font-mono text-foreground/80">perspective(500px)</code>{" "}
                  даёт 3D-перспективу и эффект сокращения ширины при повороте;
                  <code className="font-mono text-foreground/80">backface-visibility: hidden</code>{" "}
                  скрывает луч, когда он повёрнут обратной стороной к зрителю —
                  ровно половина 16-секундного цикла луч невидим, как и должно быть
                  у настоящего маяка.
                </p>
                <p>
                  Цикл — 16 секунд линейного оборота (механический темп маяка) плюс
                  16-секундная синусоида дыхания глифа, жёстко синхронизированная с
                  лучом: пик яркости приходится на моменты, когда луч смотрит прямо
                  на зрителя (0% и 100% цикла), минимум — когда луч уходит за глиф
                  (50% цикла). Получается не просто вращение, а <em className="text-foreground/90">диалог
                  света и наблюдателя</em>: маяк дышит в темпе приходящих к нему вспышек.
                  V10 и V11 теперь сосуществуют как две интерпретации одной метафоры —
                  круговой обход (как в топ-даун радаре) и осевой оборот (как в настоящей
                  башне). Техно-Зен: Zentex нашёл свою вторую метафору, и она оказалась
                  глубже первой.
                </p>
              </Chapter>

              {/* Chapter 10 — V12 Tri-Beam Lighthouse */}
              <Chapter
                num="10"
                title="V12 — Три луча"
                date="День 10 · синтез #5"
                icon={<Sparkles className="h-4 w-4" />}
              >
                <p>
                  V11 «Осевой маяк» с его непрерывным 360°-оборотом и{" "}
                  <code className="font-mono text-foreground/80">backface-visibility:hidden</code>{" "}
                  выявил новое наблюдение: половина цикла луч невидим, и зритель видит
                  лишь <em className="text-foreground/90">вспышку</em>, а не сам луч.
                  Метафора физически точна, но педагогически неубедительна —
                  невозможно <span className="text-neon">увидеть</span>, как луч
                  расходится в стороны, потому что в боковых положениях он
                  сокращается до нулевой ширины (edge-on, под углом 90° к зрителю).
                  Третья интерпретация маяка должна была показать расхождение лучей
                  явно — не как вспышку, а как удержание.
                </p>
                <p>
                  Так появился <span className="text-neon">V12 «Три луча»</span> —
                  маяк-маятник. Вместо полного оборота луч колеблется в ограниченном
                  диапазоне ±60° вокруг Y-оси, задерживаясь в трёх дискретных
                  положениях с явными паузами:{" "}
                  <span className="text-neon">слева вбок</span> (rotateY −60°) →{" "}
                  <span className="text-neon">на зрителя</span> (rotateY 0°) →{" "}
                  <span className="text-neon">справа вбок</span> (rotateY +60°) →
                  обратно через центр к левой позиции. Цикл — 18 секунд, ритм
                  маятника. Технически ключи-дубли в{" "}
                  <code className="font-mono text-foreground/80">@keyframes logo-tribeam-sweep</code>{" "}
                  создают паузы: 0% и 10% оба содержат rotateY(−60°), 20% и 35% оба
                  rotateY(0°), 45% и 60% оба rotateY(+60°) — между ними{" "}
                  <code className="font-mono text-foreground/80">cubic-bezier(0.45, 0, 0.55, 1)</code>{" "}
                  плавно переводит луч от одного положения к следующему, как
                  дыхательный переход между вдохом и выдохом.
                </p>
                <p>
                  Ключевое инженерное решение — угол ±60°, а не ±90°. При 90° луч
                  foreshorten до нуля и снова становится невидимым (как в V11).
                  При 60° он сохраняет около половины своей видимой ширины, а
                  <code className="font-mono text-foreground/80">perspective(500px)</code>{" "}
                  делает ближний край луча крупнее дальнего — клин visibly сужается
                  к одному концу и явно «расходится» в одну сторону. Без{" "}
                  <code className="font-mono text-foreground/80">backface-visibility:hidden</code>{" "}
                  луч виден во всех трёх положениях. Glow глифа синхронизирован: два
                  пика яркости за цикл — на каждом центральном положении (20–35% и
                  70–85%), мягкое боковое свечение в левой и правой позициях. Три
                  маяка — V10, V11, V12 — теперь образуют три метафоры одного
                  объекта: круговой обход, осевой оборот и маятник.
                </p>
              </Chapter>

              {/* Chapter 11 — V13 + V14 Minimal distillation */}
              <Chapter
                num="11"
                title="V13 + V14 — Дистилляция"
                date="День 11 · настоящее"
                icon={<Wind className="h-4 w-4" />}
                highlight
              >
                <p>
                  Три маяка (V10, V11, V12) исчерпали метафору «вращающегося луча» —
                  три механические интерпретации одного образа. Следующий шаг был
                  не добавить ещё одну анимацию, а убрать всё лишнее. V13 «Маяк минимал»
                  стал первой попыткой: убрать внешнюю рамку, заменить градиентный glyph
                  на чисто синий (без glow, без анимации дыхания), но сохранить вращающийся
                  beacon, сетку, уголки и scan-line. Получилось спокойнее — но всё ещё{" "}
                  <em className="text-foreground/90">шумно</em>: translucent-фон заливал
                  квадрат голубоватой полупрозрачной плёнкой, scan-line резал glyph пополам,
                  а сетка просвечивала сквозь иероглиф. Glyph выглядел{" "}
                  <span className="text-neon">нечётко</span> — эффект был не в самом glyph
                  (он был статичным и плоским), а во всём, что его окружало.
                </p>
                <p>
                  V14 «Чистый минимал» — окончательная дистилляция. Слой за слоем:{" "}
                  <span className="text-neon">убрали beacon</span> (нет никакого движения),{" "}
                  <span className="text-neon">убрали scan-line</span> (горизонтальная полоса
                  больше не режет glyph),{" "}
                  <span className="text-neon">убрали translucent-фон</span> (теперь фон
                  полностью прозрачный — тёмный сайт-фон просвечивает насквозь),{" "}
                  <span className="text-neon">убрали градиент и glow glyph'а</span> (теперь
                  это плоский синий цвет <code className="font-mono text-foreground/80">var(--in-blue)</code> —
                  тот же оттенок, что и у «in» в логотипе IQin.ru). Что осталось? Только
                  три вещи: сам иероглиф 音, сетка 8×8 px и четыре неоновых уголка по краям
                  квадрата. Всё. Никаких ключевых кадров, никаких{" "}
                  <code className="font-mono text-foreground/80">@keyframes</code>, никакого{" "}
                  <code className="font-mono text-foreground/80">filter</code>.
                </p>
                <p>
                  Этот вариант — кандидат на favicon, login-лоадер и 404-страницу:
                  минимальный расход GPU (нулевая анимация, только статичные стили),
                  идеально читается даже в 16×16 px, и при этом сохраняет фирменную
                  HUD-эстетику Техно-Зен. Путь от V1 (первая мигающая точка) до V14
                  занял десять вечеров и привёл к парадоксу: самый «простой» вариант
                  оказался самым сложным — потребовалось убрать тринадцать слоёв,
                  чтобы оставить три. <span className="text-neon">音, сетка, уголки.</span>
                </p>
              </Chapter>

              {/* Chapter 12 — V15 Vertical Scan */}
              <Chapter
                num="12"
                title="V15 — Вертикальное сканирование"
                date="День 12 · настоящее"
                icon={<Zap className="h-4 w-4" />}
                highlight
              >
                <p>
                  V14 был окончательной дистилляцией — три элемента и ни одного{" "}
                  <code className="font-mono text-foreground/80">@keyframes</code>. V15
                  возвращает движение, но делает это осторожно: берёт V14 как есть
                  (плоский синий 音 на прозрачном фоне, сетка, четыре уголка) и добавляет{" "}
                  <em className="text-foreground/90">один-единственный</em> новый слой —
                  тонкую вертикальную световую линию шириной 14 px, которая медленно
                  скользит слева направо через весь квадрат логотипа за 8 секунд.
                  Тот же темп, что у V4 «Scan Sweep», но другая геометрия: V4 сканировал{" "}
                  <span className="text-neon">по вертикали</span> (полупрозрачная полоса
                  сверху вниз), а V15 сканирует{" "}
                  <span className="text-neon">по горизонтали</span> (узкая линия слева
                  направо) — как лазерный сканер штрих-кода или проход рентгена.
                </p>
                <p>
                  Линия использует горизонтальный градиент с мягкими краями{" "}
                  (<code className="font-mono text-foreground/80">rgba(147, 197, 253)</code>{" "}
                  → <code className="font-mono text-foreground/80">rgba(59, 130, 246)</code>{" "}
                  → <code className="font-mono text-foreground/80">rgba(147, 197, 253)</code>),
                  <code className="font-mono text-foreground/80">mix-blend-mode: screen</code>{" "}
                  для подсветки глифа при прохождении и{" "}
                  <code className="font-mono text-foreground/80">drop-shadow</code> glow
                  в 4 px — ровно столько, чтобы линия читалась как свет, а не как
                  цветной прямоугольник. <span className="text-neon">Один слой движения,
                  три слоя статики</span> — ratio, обратный V9 «Mega Combo», где четыре
                  эффекта наслаивались друг на друга. V15 — это не «больше», это
                  «минимум + одна идея».
                </p>
              </Chapter>

              {/* Chapter 13 — V16 Cross Scan + Flash Glyph */}
              <Chapter
                num="13"
                title="V16 — Вспышка на сканировании"
                date="День 13 · настоящее"
                icon={<Zap className="h-4 w-4" />}
                highlight
              >
                <p>
                  V15 сканировал глиф, но сам 音 оставался пассивным — линия
                  проходила сквозь него, а иероглиф ничего не «чувствовал».
                  V16 заставляет глиф <span className="text-neon">отвечать</span>{" "}
                  на сканер. Две толстые полупрозрачные световые полосы
                  (50% ширины квадрата, с ярким ведущим краём и мягким хвостом)
                  проносят по глифу по очереди: сначала вертикальная — слева
                  направо за 32 секунды, затем горизонтальная — сверху вниз за
                  следующие 32 секунды. Цикл — 64 секунды, без перекрытия фаз —
                  ультра-медитативный ритм, вдвое медленнее дзен-цикла V6 «Electric Pulse» (32 с): 32 секунды вдох
                  + 32 секунды выдох.
                </p>
                <p>
                  Каждый раз, когда полоса пересекает центр глифа (≈14 с и
                  ≈46 с от начала цикла), сам <span className="text-neon">音
                  вспыхивает</span>:{}{" "}
                  <code className="font-mono text-foreground/80">
                    brightness(2.6)
                  </code>{" "}
                  + двойной{" "}
                  <code className="font-mono text-foreground/80">drop-shadow</code>{" "}
                  (белый 22 px + синий 38 px). Вспышка короткая — около 3% цикла,
                  ≈2 с — с коротким нарастанием (1.0 → 1.3 → 2.6) и плавным
                  затуханием (2.6 → 1.55 → 1.0). Между вспышками глиф остаётся
                  плоско-синим, как в V14. Технически это первый вариант, где{" "}
                  <span className="text-neon">движение полосы и реакция глифа
                  синхронизированы</span> в одном тайминге: полоса приносит
                  свет, глиф его отражает.
                </p>
              </Chapter>

              {/* Chapter 14 — V17 Halo Breath */}
              <Chapter
                num="14"
                title="V17 — Дыхание гало"
                date="День 14 · настоящее"
                icon={<Wind className="h-4 w-4" />}
                highlight
              >
                <p>
                  V16 сделал glyph активным — он вспыхивал в ответ на прохождение
                  полосы. Но движение полос было всё ещё главной хореографией, а
                  глиф лишь реагировал. Возник вопрос:{" "}
                  <span className="text-neon">что если убрать полосы совсем,
                  но оставить «дыхание»?</span> V17 возвращается к V14 как
                  точке отсчёта и добавляет ровно один новый слой — мягкое
                  радиальное гало вокруг иероглифа, которое дышит на 32-секундном
                  дзен-цикле. Сам{" "}
                  <span className="text-neon">音 остаётся плоско-синим</span>,
                  без glow, без анимации — как лампа в медитационном зале:
                  пламя неподвижно, пульсирует только аура вокруг него.
                </p>
                <p>
                  Технически гало — это{" "}
                  <code className="font-mono text-foreground/80">radial-gradient</code>{" "}
                  диаметром 160% от размера логотипа, с плавным затуханием от
                  ярко-голубого центра{" "}
                  (<code className="font-mono text-foreground/80">rgba(147, 197, 253, 0.55)</code>)
                  к прозрачным краям. <code className="font-mono text-foreground/80">blur(6px)</code>{" "}
                  смягчает край, <code className="font-mono text-foreground/80">mix-blend-mode: screen</code>{" "}
                  — складывает свет с фоном карточки, а не замещает его. Анимация
                  комбинирует opacity (0.20 ↔ 0.85) и scale (0.80 ↔ 1.05) на
                  одной синусоиде <code className="font-mono text-foreground/80">cubic-bezier(0.4, 0, 0.6, 1)</code> —
                  ровно тот же темп, что у V6 «Electric Pulse» (32 секунды), но
                  там glow дышал на самом глифе, а здесь — вокруг него. Эстетика
                  V14 сохранена полностью: прозрачный фон, сетка, четыре уголка,
                  плоский 音. Единственное отличие — мягкий пульсирующий ореол
                  за спиной иероглифа.
                </p>
              </Chapter>

              {/* Chapter 15 — V18 Glow Letter */}
              <Chapter
                num="15"
                title="V18 — Светящаяся буква"
                date="День 15 · настоящее"
                icon={<Zap className="h-4 w-4" />}
                highlight
              >
                <p>
                  V17 разделил «дыхание» и «пламя»: гало пульсировало, глиф стоял
                  неподвижно. V18 делает обратный эксперимент —{" "}
                  <span className="text-neon">убирает гало и заставляет сам
                  иероглиф дышать</span>. Никаких внешних слоёв: ни полос, ни
                  гало, ни орбит, ни ряби. Только 音, который медленно становится
                  ярче и тусклее на 32-секундном цикле — единственный движущийся
                  элемент в кадре. Это самая тихая анимация в коллекции: всё
                  внимание зрителя сосредоточено на самом иероглифе, потому что
                  больше не на что смотреть.
                </p>
                <p>
                  Технически используется тот же{" "}
                  <code className="font-mono text-foreground/80">logo-glyph-flash</code>{" "}
                  модификатор, что и в V16 — он сохраняет{" "}
                  <code className="font-mono text-foreground/80">animation</code>{" "}
                  и <code className="font-mono text-foreground/80">filter</code>{" "}
                  доступными на глифе, позволяя родительскому классу{" "}
                  <code className="font-mono text-foreground/80">.logo-v-glow</code>{" "}
                  запускать собственную синусоиду. Ключевые кадры простые:{" "}
                  <code className="font-mono text-foreground/80">brightness(1.0)</code>{" "}
                  → <code className="font-mono text-foreground/80">brightness(1.5)</code> →
                  обратно, плюс двойной{" "}
                  <code className="font-mono text-foreground/80">drop-shadow</code>{" "}
                  (14 px голубой + 22 px синий) в пике. Между V17 и V18 —
                  философская развилка: первый гасит glyph и оживляет фон, второй
                  гасит фон и оживляет glyph. V18 — это медитативная лампа в её
                  самом чистом виде.
                </p>
              </Chapter>

              {/* Chapter 16 — V19 Aurora Wash */}
              <Chapter
                num="16"
                title="V19 — Полярное сияние"
                date="День 16 · настоящее"
                icon={<Sparkles className="h-4 w-4" />}
                highlight
              >
                <p>
                  V17 и V18 исследовали «дыхание» — либо вокруг глифа, либо
                  внутри него. V19 меняет метафору: вместо дыхания —{" "}
                  <span className="text-neon">сияние</span>. За глифом
                  медленно вращается большой{" "}
                  <code className="font-mono text-foreground/80">conic-gradient</code>{" "}
                  с переходом между тремя оттенками синего и голубого:
                  royal blue, cyan и indigo. Градиент вращается на 360° за 24
                  секунды и одновременно затухает opacity 0.15 ↔ 0.75 —
                  получается эффект мягкого полярного сияния, плывущего за
                  HUD-квадратом. Сам 音 остаётся плоско-синим и неподвижным,
                  как силуэт на фоне северного неба.
                </p>
                <p>
                  Технически градиент — это{" "}
                  <code className="font-mono text-foreground/80">inset: -20%</code>{" "}
                  (чуть больше родительского квадрата),{" "}
                  <code className="font-mono text-foreground/80">blur(14px)</code>{" "}
                  (сильное размытие убирает жёсткие переходы между секторами
                  конуса) и <code className="font-mono text-foreground/80">mix-blend-mode: screen</code>{" "}
                  (только складывается со светом, не замещает тёмный фон). Две
                  одновременные анимации —{" "}
                  <code className="font-mono text-foreground/80">logo-aurora-spin</code>{" "}
                  (linear 24s, механическое вращение) и{" "}
                  <code className="font-mono text-foreground/80">logo-aurora-fade</code>{" "}
                  (cubic-bezier 24s, дыхательная синусоида) — складываются в
                  сложный, но плавный ритм: сияние всегда движется, но его
                  интенсивность приходит и уходит. 24-секундный цикл попадает
                  ровно в середину Техно-Зен диапазона 8–32 с, между V15 (8 с)
                  и V6/V17 (32 с).
                </p>
              </Chapter>

              {/* Chapter 17 — V20 Orbit Satellite */}
              <Chapter
                num="17"
                title="V20 — Орбита-спутник"
                date="День 17 · настоящее"
                icon={<Zap className="h-4 w-4" />}
                highlight
              >
                <p>
                  После трёх «дышащих» вариантов (V17, V18, V19) захотелось
                  вернуть механическое движение, но в принципиально новой
                  геометрии — не линейное сканирование, не радиальное дыхание,
                  а <span className="text-neon">орбитальное вращение</span>.
                  V20 берёт V14 как базу и добавляет маленькую 4 px неоновую
                  точку, которая вращается по эллиптической орбите вокруг
                  иероглифа за 12 секунд — тот же темп, что у V10 «Маяк».
                  Получается образ планеты со спутником: 音 — стабильный
                  центр, точка — быстро движущийся наблюдатель. Тонкая
                  орбитальная дорожка видна на 10% opacity, чтобы дать глазу
                  опору — иначе траектория точки читалась бы как хаотичная.
                </p>
                <p>
                  Технически это{" "}
                  <code className="font-mono text-foreground/80">.logo-orbit-ring</code>{" "}
                  — дочерний элемент 130% × 90% от родителя (чуть шире, чем
                  выше — эллипс, а не круг), центрированный через{" "}
                  <code className="font-mono text-foreground/80">translate(-50%, -50%)</code>.
                  Сама точка — это{" "}
                  <code className="font-mono text-foreground/80">::after</code>{" "}
                  псевдо-элемент на правом краю кольца: 4 px диаметр,
                  <code className="font-mono text-foreground/80">background: #DBEAFE</code>{" "}
                  (почти белый голубой), трёхслойный{" "}
                  <code className="font-mono text-foreground/80">box-shadow</code>{" "}
                  создаёт мягкий trail (4 px + 10 px + 18 px нарастающего
                  размытия). <code className="font-mono text-foreground/80">::before</code>{" "}
                  рисует едва видимую орбитальную дорожку. Анимация —
                  чистый <code className="font-mono text-foreground/80">linear 12s</code>,
                  без синусоиды: спутник движется с постоянной скоростью, как
                  настоящее тело по кеплеровской орбите (без учёта второго
                  закона Кеплера — упрощение ради чистоты эффекта).
                </p>
              </Chapter>

              {/* Chapter 18 — V21 Ripple Pulse */}
              <Chapter
                num="18"
                title="V21 — Круги на воде"
                date="День 18 · настоящее"
                icon={<Wind className="h-4 w-4" />}
                highlight
              >
                <p>
                  V20 вернул механическое вращение. V21 возвращается к
                  органической метафоре — но не дыханию, а{" "}
                  <span className="text-neon">волне</span>. Тонкие концентрические
                  кольца расходятся от центра глифа каждые 8 секунд, как
                  круги на воде от упавшей капли. Три кольца со сдвигом 2.67
                  секунды между ними — поэтому новая рябь появляется
                  примерно каждые 2.67 секунды, складываясь в непрерывный
                  ритм. Каждое кольцо расширяется от 30% до 110% размера
                  квадрата и одновременно затухает от 0.7 до 0.0 opacity —
                  мягко исчезает к моменту, когда достигает углов.
                </p>
                <p>
                  Технически — три одинаковых{" "}
                  <code className="font-mono text-foreground/80">&lt;span class="logo-ripple"&gt;</code>{" "}
                  элемента, каждый со своим{" "}
                  <code className="font-mono text-foreground/80">--ripple-delay</code>{" "}
                  (0s / 2.67s / 5.33s). Кольцо — это{" "}
                  <code className="font-mono text-foreground/80">border: 1.5px solid rgba(147, 197, 253, 0.7)</code>{" "}
                  с <code className="font-mono text-foreground/80">box-shadow: 0 0 6px rgba(59, 130, 246, 0.25)</code>{" "}
                  для лёгкого glow. Анимация{" "}
                  <code className="font-mono text-foreground/80">logo-ripple-expand</code>{" "}
                  использует <code className="font-mono text-foreground/80">cubic-bezier(0.25, 0.1, 0.25, 1)</code> —
                  то же смягчение, что в V5 «Particle Burst», чтобы
                  расширение замедлялось к концу. 8-секундный цикл совпадает
                  с V4 «Scan Sweep» и V15 «Vertical Scan» — самый быстрый
                  темп в дзен-диапазоне. Метафора —{" "}
                  <em className="text-foreground/90">звук</em>: иероглиф 音
                  (yīn, «звук, интонация») наконец-то получил визуальное
                  воплощение своего значения. Он не издаёт звук — но он
                  распространяет волну.
                </p>
              </Chapter>

              {/* Chapter 19 — V22 Glitch Drift */}
              <Chapter
                num="19"
                title="V22 — Цифровой дрейф"
                date="День 19 · настоящее"
                icon={<Zap className="h-4 w-4" />}
                highlight
              >
                <p>
                  V21 завершил органическую метафору — рябь как звук. V22
                  возвращается к цифровой эстетике, но делает это{" "}
                  <em className="text-foreground/90">минимально</em>. Берёт
                  V14 как есть (плоский синий 音, сетка, четыре уголка,
                  прозрачный фон) и добавляет{" "}
                  <span className="text-neon">ровно один цифровой артефакт</span>:
                  раз в 7 секунд иероглиф на мгновение (~300 миллисекунд)
                  расщепляется на magenta+cyan хроматический сдвиг ±2 пикселя
                  по горизонтали, как будто видеосигнал на долю секунды
                  потерял синхронизацию. Два таких глитча за 14-секундный
                  цикл — на ~18% (≈2.5 с) и ~68% (≈9.5 с). В остальное
                  время — 96% цикла — вариант неотличим от V14.
                </p>
                <p>
                  Технически это{" "}
                  <code className="font-mono text-foreground/80">filter: drop-shadow(-2px 0 0 #F472B6) drop-shadow(2px 0 0 #60A5FA)</code>{" "}
                  на самом глифе — тот же приём что в V3 «Glitch», но в V3
                  glitch был{" "}
                  <span className="text-neon">постоянным</span> (9-секундный
                  sine-цикл с регулярными всплесками), а здесь он{" "}
                  <span className="text-neon">редкий</span> — два острых
                  пика на плоской базовой линии. Использует{" "}
                  <code className="font-mono text-foreground/80">glyphFlash</code>{" "}
                  модификатор (как V16/V18), чтобы анимация и фильтр остались
                  доступны на{" "}
                  <code className="font-mono text-foreground/80">.logo-glyph</code>,
                  но ключевые кадры аккуратно вставлены между 15%–20% и
                  65%–70% цикла, оставляя длинные quiet-базовые сегменты.
                  Метафора — <em className="text-foreground/90">помеха</em>:
                  логотип не дышит, не светится, не движется — но иногда,
                  очень редко, он как будто <span className="text-neon">моргнет
                  цифровым шумом</span>, напоминая что это всё-таки экран, а
                  не гравюра. V22 — это компромисс между абсолютной
                  статичностью V14 и постоянной активностью V3.
                </p>
              </Chapter>

              {/* Chapter 20 — V23 Pulse Grid */}
              <Chapter
                num="20"
                title="V23 — Дышащая сетка"
                date="День 20 · настоящее"
                icon={<Sparkles className="h-4 w-4" />}
                highlight
              >
                <p>
                  V18 «Glow Letter» сделал обратное от V17: в V17 дышит
                  гало вокруг глифа, а сам 音 остаётся плоским; в V18
                  дышит сам глиф, а гало убрано. V23 делает{" "}
                  <em className="text-foreground/90">третий ход</em> в этой
                  логике — дышит{" "}
                  <span className="text-neon">HUD-инфраструктура вокруг
                  глифа</span>, а сам 音 остаётся неподвижным. Сетка и четыре
                  угловых скобки медленно меняют opacity от 0.35 до 1.0 и
                  обратно на 16-секундном синусоидальном цикле. Минимум
                  0.35 (а не 0) выбран сознательно — сетка никогда полностью
                  не исчезает, чтобы не было ощущения «квадрат пропал».
                  Только плавное наполнение и угасание контура, как будто
                  рамка «заряжается» и «разряжается».
                </p>
                <p>
                  Это <span className="text-neon">первая инверсия</span> в
                  серии: до V23 во всех вариантах HUD-инфраструктура
                  (сетка + уголки) была статичной константой, а двигались
                  только «добавленные» элементы — линии, гало, орбиты,
                  рябь. V23 ломает это правило: теперь движется именно
                  «обрамление», а glyph становится единственным якорем
                  покоя. Селектор{" "}
                  <code className="font-mono text-foreground/80">.logo-v-pulse-grid &gt; span:not(.logo-glyph)</code>{" "}
                  нацеливается на все дочерние span'ы родительского
                  логотипа, кроме самого глифа — то есть на сетку и четыре
                  угловых скобки одновременно. 16-секундный цикл попадает
                  точно в дзен-диапазон 8–32 с, между V15 (8 с) и V17 (32 с),
                  с тем же смягчением{" "}
                  <code className="font-mono text-foreground/80">cubic-bezier(0.4, 0, 0.6, 1)</code>{" "}
                  что у V17/V18/V19. Метафора —{" "}
                  <em className="text-foreground/90">пробуждение</em>: рамка
                  «оживает» первой, готовя место для неподвижного глифа.
                </p>
              </Chapter>

              {/* Chapter 21 — V24 Tilt Parallax */}
              <Chapter
                num="21"
                title="V24 — Наклон-параллакс"
                date="День 21 · настоящее"
                icon={<Wind className="h-4 w-4" />}
                highlight
              >
                <p>
                  Все эффекты от V15 до V23 были{" "}
                  <em className="text-foreground/90">двухмерными</em> —
                  плоские скан-линии, плоские гало, плоская рябь. V24 ломает
                  это ограничение: берёт V14 как есть и заставляет весь
                  HUD-квадрат{" "}
                  <span className="text-neon">медленно покачиваться в 3D</span> —
                  rotateY от −8° до +8° и одновременно rotateX от −4° до
                  +4° на 20-секундном синусоидальном цикле. Сам 音 остаётся
                  плоско-синим внутри квадрата — он не вращается отдельно,
                  а движется вместе с родительским контейнером. Эффект
                  напоминает медитативно покачивающийся портрет или
                  медленно поворачивающийся кристалл: лёгкое движение в
                  пространстве, не отвлекающее от центра.
                </p>
                <p>
                  Технически —{" "}
                  <code className="font-mono text-foreground/80">transform: perspective(600px) rotateY(±8deg) rotateX(±4deg)</code>{" "}
                  на родительском span логотипа. Perspective встроена прямо
                  в <code className="font-mono text-foreground/80">transform</code>,
                  поэтому не нужен отдельный родительский wrapper с{" "}
                  <code className="font-mono text-foreground/80">perspective</code> свойством.
                  <code className="font-mono text-foreground/80">transform-style: preserve-3d</code> и{" "}
                  <code className="font-mono text-foreground/80">backface-visibility: hidden</code>{" "}
                  предотвращают артефакты зеркального отражения на пиках
                  вращения. 20-секундный цикл попадает между V19 (24 с) и
                  V15 (8 с) — средний темп в дзен-диапазоне. Угол ±8° выбран
                  сознательно минимальным: больше — отвлекало бы от глифа,
                  меньше — движение читалось бы как случайный дрож. В пике
                  цикла (50%) угол наклона достигает максимума, и глиф
                  оказывается развёрнут на 8° вправо — это{" "}
                  <span className="text-neon">первое настоящее 3D-движение</span>{" "}
                  в истории логотипа 音. Метафора —{" "}
                  <em className="text-foreground/90">присутствие</em>: квадрат
                  «дышит» не плоско, а в пространстве, напоминая что лого —
                  это объект, а не только символ.
                </p>
              </Chapter>

              {/* Chapter 22 — V25 Echo Trace */}
              <Chapter
                num="22"
                title="V25 — Эхо-след"
                date="День 22 · настоящее"
                icon={<Code2 className="h-4 w-4" />}
                highlight
              >
                <p>
                  V22 уже возвращался к glitch-эстетике, но делал это
                  «редко и резко». V25 идёт в другую сторону —{" "}
                  <em className="text-foreground/90">плавно и тонко</em>.
                  Берёт V14 и добавляет{" "}
                  <span className="text-neon">два фантомных эха</span> иероглифа
                  音, расположенных позади основного глифа. Левое эхо
                  появляется на 35% цикла (смещение −2.5 px по горизонтали),
                  правое — на 70% цикла (смещение +1.5 px). Каждое эхо —
                  это контур (outline) глифа, а не его залитая копия:
                  прозрачная заливка + 1px text-stroke голубого цвета,
                  мягкий glow, mix-blend-mode: screen. Эхо читается как
                  «призрак» буквы, как motion-blur от движения, которого
                  на самом деле не было — основной глиф стоит на месте.
                </p>
                <p>
                  Технически — два{" "}
                  <code className="font-mono text-foreground/80">&lt;span class="logo-echo-trace"&gt;</code>{" "}
                  элемента внутри{" "}
                  <code className="font-mono text-foreground/80">variant.extra</code>,
                  рендерятся перед глифом в DOM, что автоматически помещает
                  их ниже в z-stack. Каждый span использует{" "}
                  <code className="font-mono text-foreground/80">::before {`{ content: "音" }`}</code>{" "}
                  псевдоэлемент, чтобы отрисовать иероглиф без дублирования
                  в JSX. Z-index:0 у эха и z-index:1 у глифа гарантируют
                  порядок наложения. 14-секундный цикл с тем же смягчением{" "}
                  <code className="font-mono text-foreground/80">cubic-bezier(0.4, 0, 0.6, 1)</code>{" "}
                  что у V17/V18/V23 — дзен-синусоида. Метафора —{" "}
                  <em className="text-foreground/90">память</em>: glyph как
                  будто оставляет след в воздухе, как будто он только что
                  двигался, хотя он неподвижен. V25 — самый «поэтичный»
                  вариант серии: вместо движения он показывает{" "}
                  <span className="text-neon">отзвук движения</span>. В
                  некоторых ракурсах эхо читается как дыхание, в других — как
                  искажение фотоаппарата; смысл остаётся открытым.
                </p>
              </Chapter>

              {/* Chapter 23 — V26 Frame Strobe */}
              <Chapter
                num="23"
                title="V26 — Импульс рамки"
                date="День 23 · настоящее"
                icon={<Zap className="h-4 w-4" />}
                highlight
              >
                <p>
                  V6 «Electric Pulse» дышит непрерывной синусоидой 32 с —
                  плавный inhale-exhale на box-shadow. V17 «Halo Breath»
                  делает то же самое с гало. V26 идёт в{" "}
                  <em className="text-foreground/90">противоположную</em>{" "}
                  сторону — вместо непрерывного дыхания он{" "}
                  <span className="text-neon">излучает дискретные импульсы</span>:
                  три коротких вспышки box-shadow на 14-секундном цикле,
                  примерно каждые 4.7 секунды (~14%, ~50%, ~86%). Каждая
                  вспышка длится около 1 секунды: 400 мс нарастание, 200 мс
                  пик, 600 мс спад. Между вспышками рамка абсолютно тихая —
                  никакого свечения. Эффект читается как{" "}
                  <span className="text-neon">монитор пульса</span> или
                  маяк, передающий сигнал три раза за цикл.
                </p>
                <p>
                  Технически это{" "}
                  <code className="font-mono text-foreground/80">@keyframes logo-frame-strobe</code>{" "}
                  на родительском span логотипа с{" "}
                  <code className="font-mono text-foreground/80">linear</code> easing
                  — линейным, потому что все пики заданы точными
                  процентами в ключевых кадрах (13% build-up → 14% peak →
                  15% hold → 17% trail → 18% baseline, и повторяется дважды
                  с тем же паттерном на 49–53% и 85–89%). В пике box-shadow
                  трёхслойный:{" "}
                  <code className="font-mono text-foreground/80">0 0 0 2px rgba(147,197,253,0.95)</code>{" "}
                  (контур) +{" "}
                  <code className="font-mono text-foreground/80">0 0 18px rgba(59,130,246,0.7)</code>{" "}
                  (ближний glow) +{" "}
                  <code className="font-mono text-foreground/80">0 0 36px rgba(59,130,246,0.4)</code>{" "}
                  (дальний halo). 14-секундный цикл — самый короткий в
                  «световом» подмножестве (V17=32 с, V18=32 с, V19=24 с),
                  но импульсный характер смягчает скорость: в каждой секунде
                  цикла есть только ~0.07 секунды активности, остальные
                  ~0.93 секунды — тишина. Метафора —{" "}
                  <em className="text-foreground/90">сигнал</em>: рамка не
                  дышит, а <span className="text-neon">передаёт</span> — три
                  коротких морзе-подобных вспышки, как пинг от радара или
                  heartbeat от пульсометра. Сам 音 остаётся плоско-синим и
                  неподвижным — он пассажир, а не водитель.
                </p>
              </Chapter>
            </div>

            {/* Closing quote */}
            <div className="mt-12 flex flex-col items-center gap-3 border-t border-neon/15 pt-8 text-center">
              <Wind className="h-6 w-6 text-neon/50" />
              <p className="max-w-2xl font-display text-lg italic text-foreground/80 sm:text-xl">
                «Технологии, которые дышат — это не метафора.
                Это <span className="text-gradient-neon">Zentex</span>: 32 секунды
                на цикл, 16 на вдох, 16 на выдох. Логотип живёт в том же темпе,
                что и человек, который на него смотрит».
              </p>
              <span className="font-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                — манифест Техно-Зен: Zentex
              </span>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Chapter({
  num,
  title,
  date,
  icon,
  children,
  highlight,
}: {
  num: string;
  title: string;
  date: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Timeline dot */}
      <span
        className={
          "absolute -left-[1.65rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border sm:-left-[2.65rem] " +
          (highlight
            ? "border-neon bg-neon/15 text-neon glow-neon"
            : "border-neon/40 bg-background/80 text-neon/70")
        }
      >
        {icon}
      </span>

      {/* Header */}
      <div className="mb-3 flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="font-tech text-xs uppercase tracking-[0.2em] text-neon/70">
            {num}
          </span>
          <span className="font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
            {date}
          </span>
        </div>
        <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          {title}
        </h3>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </div>
    </motion.div>
  );
}
