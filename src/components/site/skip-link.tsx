'use client';

/**
 * Ссылка «Перейти к содержимому» (a11y) — три языка по Закону №3.
 * Используется на всех страницах вместо дублирующегося RU-текста.
 */
import { useLanguage } from '@/lib/i18n/useLanguage';

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-neon focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
    >
      {t('common.skipToContent')}
    </a>
  );
}
