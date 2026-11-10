import type { MetadataRoute } from "next";
import fs from "node:fs/promises";
import path from "node:path";

// Сайтмап собирается из JSON-страниц src/lib/iqin-data (тот же источник данных,
// что и [...slug]). Вычисляется на этапе сборки: все страницы пре-рендерятся
// через generateStaticParams, поэтому fs-чтения здесь статически безопасны.
// R212: починка https://iqin.ru/sitemap.xml (был 404) и строки Sitemap в robots.txt.

type IqinPageMeta = {
  url?: string;
  title?: string;
};

const DATA_DIR = path.join(process.cwd(), "src", "lib", "iqin-data");
const SITE = "https://iqin.ru";

// Сервисные и инструментальные страницы — приоритет выше архивных
const HIGH_PRIORITY_PATHS = new Set([
  "/masters",
  "/magazine",
  "/patent_poisk",
  "/patent_poisk_design",
  "/poisk_soft",
  "/znak_poisk",
  "/kontakt",
  "/company",
  "/price",
  "/portfolio",
  "/docs",
]);

function normalizeUrl(raw: string): string | null {
  const cleaned = raw.split("#")[0].split("?")[0].trim();
  if (!cleaned) return null;
  // главная в обоих вариантах
  if (cleaned === "https://iqin.ru" || cleaned === "https://iqin.ru/") return `${SITE}/`;
  // абсолютный адрес
  if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
    if (!cleaned.startsWith(SITE)) return null; // чужие домены не включаем
    return cleaned.replace(/\/+$/, "") || `${SITE}/`;
  }
  // относительный путь
  if (cleaned.startsWith("/")) return `${SITE}${cleaned.replace(/\/+$/, "")}`;
  return null;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let files: string[] = [];
  try {
    files = (await fs.readdir(DATA_DIR)).filter(
      (f) => f.endsWith(".json") && f !== "_index.json"
    );
  } catch {
    // каталога нет — отдаём хотя бы главную, сайтмап не должен падать
    return [{ url: `${SITE}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
  }

  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  for (const file of files) {
    try {
      const raw = await fs.readFile(path.join(DATA_DIR, file), "utf-8");
      const page = JSON.parse(raw) as IqinPageMeta;
      if (!page || typeof page.url !== "string") continue;
      const full = normalizeUrl(page.url);
      if (!full || seen.has(full)) continue;
      seen.add(full);
      const stat = await fs.stat(path.join(DATA_DIR, file));
      const pathname = full === `${SITE}/` ? "/" : full.slice(SITE.length);
      entries.push({
        url: full,
        lastModified: stat.mtime,
        changeFrequency: "monthly",
        priority: pathname === "/" ? 1 : HIGH_PRIORITY_PATHS.has(pathname) ? 0.8 : 0.5,
      });
    } catch {
      // битый файл пропускаем
    }
  }

  // R237 (Iqin, пакет 20261110): собственные маршруты вне JSON-архива — гид по патентам
  const STATIC_EXTRA: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/blog/chto-takoe-patent`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
  for (const e of STATIC_EXTRA) {
    if (!seen.has(e.url)) {
      seen.add(e.url);
      entries.push(e);
    }
  }

  // главная — первой, остальное по алфавиту
  entries.sort((a, b) => {
    if (a.url === `${SITE}/`) return -1;
    if (b.url === `${SITE}/`) return 1;
    return a.url.localeCompare(b.url);
  });
  return entries;
}
