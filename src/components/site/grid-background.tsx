"use client";

import { cn } from "@/lib/utils";

type GridBackgroundProps = {
  variant?: "default" | "fine" | "masked";
  className?: string;
};

/**
 * Сетчатый фон в техно-стиле.
 * Используется в Hero и секциях для создания hi-tech атмосферы.
 */
export function GridBackground({ variant = "default", className }: GridBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          variant === "fine" ? "bg-grid-fine" : "bg-grid",
          variant === "masked" && "mask-radial"
        )}
      />
      {/* Subtle radial glow */}
      <div
        className="absolute left-1/2 top-0 h-[480px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklch, var(--neon) 35%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}
