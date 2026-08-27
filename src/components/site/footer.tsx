"use client";

import Link from "next/link";
import { Phone, Mail, MessageCircle, MapPin, Clock, Building2, Award, CalendarDays } from "lucide-react";
import { mainNav, contacts, allSiteUrls, company, patentAttorneys } from "@/lib/site-config";

const popularUrls = [
  { label: "Патенты", href: "/patenti" },
  { label: "Товарные знаки", href: "/brendi" },
  { label: "Авторские права", href: "/avtorskie_prava_kopirait" },
  { label: "Цены", href: "/price" },
  { label: "О компании", href: "/company" },
  { label: "Контакты", href: "/kontakt" },
  { label: "Магазин брендов", href: "/magazine" },
  { label: "Новости", href: "/novosti" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border/60 bg-card/30 backdrop-blur-sm">
      {/* Top accent line */}
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklch, var(--neon) 50%, transparent), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top: brand + columns */}
        <div className="grid gap-10 py-14 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand + Legal entity block */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5" aria-label="IQin — на главную">
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border-2 border-neon/70 bg-neon/20">
                {/* Subtle grid background */}
                <span
                  aria-hidden="true"
                  className="absolute inset-1 rounded-sm opacity-50"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, color-mix(in oklch, var(--neon) 35%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--neon) 35%, transparent) 1px, transparent 1px)",
                    backgroundSize: "8px 8px",
                  }}
                />
                {/* Corner brackets */}
                <span aria-hidden="true" className="pointer-events-none absolute left-0.5 top-0.5 h-2 w-2 border-l-2 border-t-2 border-neon" />
                <span aria-hidden="true" className="pointer-events-none absolute right-0.5 top-0.5 h-2 w-2 border-r-2 border-t-2 border-neon" />
                <span aria-hidden="true" className="pointer-events-none absolute bottom-0.5 left-0.5 h-2 w-2 border-b-2 border-l-2 border-neon" />
                <span aria-hidden="true" className="pointer-events-none absolute bottom-0.5 right-0.5 h-2 w-2 border-b-2 border-r-2 border-neon" />
                {/* Scan line (stronger) */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1 right-1 top-1/2 h-0.5 -translate-y-1/2 opacity-80"
                  style={{
                    background: "linear-gradient(to right, transparent, var(--neon) 30%, #93C5FD 50%, var(--neon) 70%, transparent)",
                    boxShadow: "0 0 4px rgba(59, 130, 246, 0.9)",
                  }}
                />
                {/* 音 character — bright neon */}
                <span
                  className="relative font-black leading-none animate-neon-pulse"
                  style={{
                    fontFamily: "var(--font-cjk), 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
                    fontSize: "18px",
                    background: "linear-gradient(135deg, #DBEAFE 0%, #93C5FD 25%, #3B82F6 55%, #60A5FA 80%, #2563EB 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    filter:
                      "drop-shadow(0 0 3px rgba(147, 197, 253, 1)) drop-shadow(0 0 6px rgba(59, 130, 246, 1)) drop-shadow(0 0 12px rgba(59, 130, 246, 0.85)) drop-shadow(0 0 22px rgba(59, 130, 246, 0.55))",
                  }}
                >
                  音
                </span>
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl font-bold tracking-tight">
                  <span className="text-iq-gold">IQ</span>
                  <span className="text-in-blue">in</span>
                  <span className="text-ru-plain text-base">.ru</span>
                </span>
                <span className="font-tech text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                  Next-Gen AI IP Platform
                </span>
              </div>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Ультрасовременная платформа интеллектуальной собственности. Патентные услуги и
              веб-разработка на базе искусственного интеллекта.
            </p>

            {/* Legal entity block */}
            <div className="mt-1 rounded-lg border border-neon/15 bg-background/40 p-3.5">
              <div className="flex items-center gap-2 text-neon">
                <Building2 className="h-4 w-4" />
                <span className="font-tech text-[10px] uppercase tracking-[0.18em]">
                  Юридическое лицо
                </span>
              </div>
              <div className="mt-2 font-display text-sm font-semibold text-foreground">
                {company.fullName}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {company.description}
              </p>
            </div>

            <div className="flex items-center gap-2 font-tech text-[11px] uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-neon" />
              System status: All operational
            </div>
          </div>

          {/* Nav columns */}
          <FooterColumn title="Услуги" items={mainNav.slice(0, 5).map((i) => ({ label: i.label, href: i.href }))} />
          <FooterColumn title="Информация" items={mainNav.slice(5).map((i) => ({ label: i.label, href: i.href }))} />
          <FooterColumn title="Популярное" items={popularUrls} />
        </div>

        {/* Patent attorneys block */}
        <div className="mb-6 grid gap-4 border-t border-border/60 pt-8 md:grid-cols-2">
          {patentAttorneys.map((attorney) => (
            <div
              key={attorney.name}
              className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/30 p-4 transition-colors hover:border-neon/30"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-neon/20 bg-neon/5 text-neon">
                <Award className="h-5 w-5" />
              </span>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="font-display text-sm font-semibold text-foreground">
                    {attorney.name}
                  </span>
                  <span className="font-tech text-[10px] uppercase tracking-wider text-neon">
                    рег. {attorney.registrationNumber}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {attorney.role} · {attorney.specialization}
                </div>
                <a
                  href={attorney.phoneHref}
                  className="mt-1 inline-flex w-fit items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-neon"
                >
                  <Phone className="h-3 w-3" />
                  {attorney.phone}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Contacts strip */}
        <div className="grid gap-4 border-y border-border/60 py-6 sm:grid-cols-2 lg:grid-cols-4">
          <ContactItem icon={Phone} label="Телефон" value={contacts.phone} href={contacts.phoneHref} />
          <ContactItem
            icon={MessageCircle}
            label="WhatsApp"
            value="Написать в чат"
            href={contacts.whatsapp}
            external
          />
          <ContactItem icon={Mail} label="Email" value={contacts.email} href={`mailto:${contacts.email}`} />
          <ContactItem icon={Clock} label="Часы работы" value={contacts.hours} subValue={contacts.hoursWeekend} />
        </div>

        {/* Address strip */}
        <div className="grid gap-3 border-b border-border/60 py-6 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neon/20 bg-neon/5 text-neon">
              <MapPin className="h-4 w-4" />
            </span>
            <div className="flex flex-col">
              <span className="font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                Адрес офиса
              </span>
              <span className="text-sm font-medium text-foreground">{contacts.address}</span>
              <span className="mt-0.5 font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                м. «Бабушкинская»
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neon/20 bg-neon/5 text-neon">
              <CalendarDays className="h-4 w-4" />
            </span>
            <div className="flex flex-col">
              <span className="font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                График работы
              </span>
              <span className="text-sm font-medium text-foreground">{contacts.hours}</span>
              <span className="mt-0.5 text-xs text-muted-foreground">{contacts.hoursWeekend}</span>
            </div>
          </div>
        </div>

        {/* Sitemap URLs (preserving all old addresses for SEO) */}
        <div className="py-6">
          <div className="mb-2 font-tech text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {"// Карта сайта — все URL сохранены"}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {allSiteUrls.map((url) => (
              <Link
                key={url}
                href={url}
                className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-neon"
              >
                {url === "/" ? "/" : url}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {company.fullName}. Все права защищены. Патентные
            технологии нового поколения.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <Link href="/kontakt" className="hover:text-neon">
              Связаться
            </Link>
            <Link href="/logo-lab" className="hover:text-neon">
              Logo Motion Lab
            </Link>
            <span className="font-tech">v3.0 · Next.js 16</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-tech text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </h3>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-neon"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
  subValue,
  href,
  external,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  subValue?: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neon/20 bg-neon/5 text-neon">
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex flex-col">
        <span className="font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-medium text-foreground">{value}</span>
        {subValue && (
          <span className="mt-0.5 text-xs text-muted-foreground">{subValue}</span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="transition-all hover:opacity-80"
      >
        {content}
      </a>
    );
  }
  return content;
}
