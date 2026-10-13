'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { trademarks, type Trademark } from './data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Phone, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/useLanguage';
import { tFoundMarks, tShowMore, type Lang } from '@/lib/i18n/translations';

// Popular МКТУ classes for filtering
const POPULAR_CLASSES = [
  3, 5, 9, 16, 25, 28, 29, 30, 32, 33, 35, 41, 42, 43, 44, 45,
];

type TFn = (key: 'mag.negotiable' | 'mag.mlnRub' | 'mag.kRub') => string;

function formatPrice(price: number | null, priceType: string, t: TFn): string {
  if (price === null) return t('mag.negotiable');
  if (priceType === 'contract') return t('mag.negotiable');
  if (price >= 1_000_000)
    return `${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)} ${t('mag.mlnRub')}`;
  if (price >= 1000) return `${Math.round(price / 1000)} ${t('mag.kRub')}`;
  return `${price} ₽`;
}

function TrademarkCard({ tm }: { tm: Trademark }) {
  const { t, lang } = useLanguage();
  const imageUrl = tm.imageUrl;

  return (
    <Card className="overflow-hidden flex flex-col group hover:border-primary/50 transition-all hover:shadow-lg">
      <div className="relative aspect-square bg-muted/30 flex items-center justify-center overflow-hidden">
        <Image
          src={imageUrl}
          alt={tm.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />
        {tm.isPremium && (
          <Badge className="absolute top-2 left-2 bg-amber-500 text-white">Premium</Badge>
        )}
        {tm.isNew && (
          <Badge className="absolute top-2 right-2 bg-orange-500 text-white">NEW</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold line-clamp-1">{tm.name}</CardTitle>
        <div className="flex flex-wrap gap-1 mt-1">
          {tm.classes.slice(0, 3).map((cls) => (
            <Badge key={cls} variant="secondary" className="text-xs">
              {t('mag.niceBadge')} {cls}
            </Badge>
          ))}
          {tm.classes.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tm.classes.length - 3}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col justify-between">
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
          {tm.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-primary">
            {formatPrice(tm.price, tm.priceType, t)}
          </span>
          <Badge variant="outline" className="text-xs">
            №{tm.registrationNumber}
          </Badge>
        </div>
        <div className="mt-3 flex gap-1">
          
          {tm.sellerPhone && (
            <Button asChild size="sm" variant="outline" className="h-8 w-8 p-0">
              <a href={`tel:${tm.sellerPhone}`} title={tm.sellerPhone}>
                <Phone className="w-3 h-3" />
              </a>
            </Button>
          )}
          {tm.sellerEmail && (
            <Button asChild size="sm" variant="outline" className="h-8 w-8 p-0">
              <a href={`mailto:${tm.sellerEmail}`} title={tm.sellerEmail}>
                <Mail className="w-3 h-3" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function MagazineCatalog() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [visibleCount, setVisibleCount] = useState(24);

  const filtered = useMemo(() => {
    let result = trademarks;

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (tm) =>
          tm.name.toLowerCase().includes(q) ||
          tm.registrationNumber.includes(q) ||
          tm.seller.toLowerCase().includes(q) ||
          tm.description.toLowerCase().includes(q)
      );
    }

    // МКТУ filter
    if (selectedClass !== 'all') {
      const cls = parseInt(selectedClass);
      result = result.filter((tm) => tm.classes.includes(cls));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => {
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return a.price - b.price;
        });
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => {
          if (a.price === null) return 1;
          if (b.price === null) return -1;
          return b.price - a.price;
        });
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [search, selectedClass, sortBy]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t('mag.searchPlaceholder')}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(24);
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={selectedClass}
          onValueChange={(v) => {
            setSelectedClass(v);
            setVisibleCount(24);
          }}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t('mag.classFilter')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('mag.allClasses')}</SelectItem>
            {POPULAR_CLASSES.map((cls) => (
              <SelectItem key={cls} value={cls.toString()}>
                {t('mag.niceBadge')} {cls}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder={t('mag.sortBy')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">{t('mag.sortDefault')}</SelectItem>
            <SelectItem value="price-asc">{t('mag.sortPriceAsc')}</SelectItem>
            <SelectItem value="price-desc">{t('mag.sortPriceDesc')}</SelectItem>
            <SelectItem value="name">{t('mag.sortName')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {tFoundMarks(filtered.length, lang as Lang)}
        </p>
        {filtered.length > visibleCount && (
          <p className="text-xs text-muted-foreground">
            {lang === 'en'
              ? `Showing ${visibleCount} of ${filtered.length}`
              : lang === 'zh'
                ? `显示 ${visibleCount} / 共 ${filtered.length}`
                : `Показано ${visibleCount} из ${filtered.length}`}
          </p>
        )}
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {visible.map((tm) => (
            <TrademarkCard key={tm.id} tm={tm} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">{t('mag.noResults')}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearch('');
              setSelectedClass('all');
              setSortBy('default');
            }}
          >
            {t('mag.resetFilters')}
          </Button>
        </div>
      )}

      {/* Load more */}
      {filtered.length > visibleCount && (
        <div className="text-center pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setVisibleCount((c) => c + 24)}
          >
            {tShowMore(Math.min(24, filtered.length - visibleCount), lang as Lang)}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}

      {/* CTA bottom */}
      
    </div>
  );
}
