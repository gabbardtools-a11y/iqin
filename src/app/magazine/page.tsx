import type { Metadata } from 'next';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { MagazineCatalog } from '@/components/magazine/catalog';
import { FileText, Shield, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Продать или Купить готовый Товарный знак Торговую Марку Бренд Логотип',
  description:
    'Продать или купить готовый зарегистрированный товарный знак, торговую марку, бренд или логотип. 760+ знаков с проверкой в Роспатенте. Прямые контакты продавцов, без комиссий.',
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
    title: 'Продать или Купить готовый Товарный знак Торговую Марку Бренд Логотип',
    description:
      '760+ готовых зарегистрированных товарных знаков. Прямые контакты продавцов, без комиссий.',
    url: 'https://iqin.ru/magazine',
    type: 'website',
  },
};

const FEATURES = [
  {
    icon: FileText,
    title: '760+ знаков',
    description: 'Готовые зарегистрированные товарные знаки в каталоге',
  },
  {
    icon: Shield,
    title: 'Проверка ФИПС',
    description: 'Все знаки проверены в базе Роспатента',
  },
  {
    icon: Users,
    title: 'Прямые контакты',
    description: 'Связь с продавцом без посредников и комиссий',
  },
];

export default function MagazinePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4 py-12 sm:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                Магазин товарных знаков
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                Каталог готовых зарегистрированных товарных знаков для вашего бизнеса.
                Прямые контакты продавцов, полная юридическая поддержка, безопасные сделки.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className="flex flex-col items-center text-center p-4 rounded-xl bg-card border border-border/60"
                  >
                    <f.icon className="w-6 h-6 text-primary mb-2" />
                    <h3 className="text-sm font-semibold">{f.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{f.description}</p>
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
