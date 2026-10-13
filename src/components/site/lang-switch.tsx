'use client';

/**
 * Переключатель языка [RU][EN][中] — эталон iznaki.ru (синий/изумруд/красный),
 * адаптирован под navy/neon-эстетику iqin.ru.
 */
import { useLanguage } from '@/lib/i18n/useLanguage';
import { LANGUAGES, type Lang } from '@/lib/i18n/translations';
import { cn } from '@/lib/utils';

const ACTIVE_STYLES: Record<Lang, string> = {
  ru: 'bg-sky-500/20 text-sky-300 border-sky-400/60',
  en: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/60',
  zh: 'bg-red-500/20 text-red-300 border-red-400/60',
};

export function LangSwitch({ className }: { className?: string }) {
  const { lang, switchLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Switch language / Язык / 语言"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-md border border-navy-line bg-background/40 p-0.5',
        className
      )}
    >
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => switchLang(l.code)}
          aria-label={l.nativeName}
          aria-pressed={lang === l.code}
          title={l.nativeName}
          className={cn(
            'rounded-sm px-2 py-1 font-tech text-[11px] font-semibold uppercase tracking-wider transition-all',
            lang === l.code
              ? ACTIVE_STYLES[l.code]
              : 'text-navy-muted hover:text-neon hover:bg-neon/10'
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
