"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import { contacts } from "@/lib/site-config";
import { GridBackground } from "./grid-background";

export function Cta() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-neon/30 bg-gradient-to-br from-card/80 via-background to-card/60 p-8 backdrop-blur-sm sm:p-12 lg:p-16"
        >
          <GridBackground variant="masked" />

          {/* Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklch, var(--neon) 50%, transparent), transparent 70%)",
            }}
          />

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-3 py-1.5 font-tech text-[11px] uppercase tracking-[0.2em] text-neon"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse-neon" />
                Бесплатная консультация
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]"
              >
                Запустите свой проект <span className="text-gradient-neon">с ИИ сегодня</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="mt-4 text-base text-muted-foreground sm:text-lg"
              >
                Эксперт IQin свяжется с вами в течение 30 минут. Подберём стратегию защиты
                интеллектуальной собственности или разработки сайта — бесплатно и без обязательств.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.32 }}
                className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-tech text-xs text-muted-foreground"
              >
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon" />
                  Без предоплаты
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                  NDA по умолчанию
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
                  Ответ за 30 минут
                </span>
              </motion.div>
            </div>

            {/* Contact card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full shrink-0 lg:w-auto lg:min-w-[340px]"
            >
              <div className="glass-card clip-corner rounded-2xl p-6">
                <h3 className="font-display text-xl font-semibold">Связаться напрямую</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Выберите удобный канал связи:
                </p>

                <div className="mt-5 flex flex-col gap-2">
                  <a
                    href={contacts.phoneHref}
                    className="group flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 px-4 py-3 transition-all hover:border-neon/40 hover:bg-neon/5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-neon/10 text-neon">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                        Телефон
                      </span>
                      <span className="font-mono text-sm font-semibold">{contacts.phone}</span>
                    </div>
                  </a>

                  <a
                    href={contacts.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 px-4 py-3 transition-all hover:border-neon/40 hover:bg-neon/5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-amber/10 text-amber">
                      <MessageCircle className="h-4 w-4" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                        WhatsApp
                      </span>
                      <span className="text-sm font-semibold">Написать в мессенджер</span>
                    </div>
                  </a>

                  <a
                    href={`mailto:${contacts.email}`}
                    className="group flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 px-4 py-3 transition-all hover:border-neon/40 hover:bg-neon/5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-magenta/10 text-magenta">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-tech text-[10px] uppercase tracking-wider text-muted-foreground">
                        Email
                      </span>
                      <span className="font-mono text-sm font-semibold">{contacts.email}</span>
                    </div>
                  </a>
                </div>

                <Link
                  href="/kontakt"
                  className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-neon px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:glow-neon-strong"
                >
                  Открыть форму заявки
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
