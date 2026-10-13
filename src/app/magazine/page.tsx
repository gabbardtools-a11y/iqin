import type { Metadata } from 'next';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { MagazineCatalog } from '@/components/magazine/catalog';
import { FileText, Shield, Users } from 'lucide-react';
import { getLang } from '@/lib/i18n/server';
import { t, type TranslationKey } from '@/lib/i18n/translations';

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: t('mkt.metaTitle', lang),
    description: t('mkt.metaDesc', lang),
    keywords: [
      'купить товарный знак',
      'купить торговую марку',
      'готовый товарный знак',
      'зарегистрированный знак',
      'продажа товарных знаков',
      'МКТУ',
      'Роспатент',
    ],
    alternates: {
      canonical: 'https://iqin.ru/magazine',
    },
    openGraph: {
      title: t('mkt.metaTitle', lang),
      description: t('mkt.metaDesc', lang),
      url: 'https://iqin.ru/magazine',
      type: 'website',
    },
  };
}

const FEATURES: { icon: React.ComponentType<{ className?: string }>; titleKey: TranslationKey; descKey: TranslationKey }[] = [
  {
    icon: FileText,
    titleKey: 'mag.f1Title',
    descKey: 'mag.f1Desc',
  },
  {
    icon: Shield,
    titleKey: 'mag.f2Title',
    descKey: 'mag.f2Desc',
  },
  {
    icon: Users,
    titleKey: 'mag.f3Title',
    descKey: 'mag.f3Desc',
  },
];

export default async function MagazinePage() {
  const lang = await getLang();
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4 py-12 sm:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                {t('mag.h1', lang)}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                {t('mag.lead', lang)}
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {FEATURES.map((f) => (
                  <div
                    key={f.titleKey}
                    className="flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border/60"
                  >
                    <f.icon className="w-6 h-6 text-primary mb-2" />
                    <h3 className="text-sm font-semibold">{t(f.titleKey, lang)}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{t(f.descKey, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Catalog */}
        <section className="container mx-auto px-4 py-8 sm:py-12">
          <MagazineCatalog />
        </section>
      </main>
      <Footer />
    </>
  );
}
