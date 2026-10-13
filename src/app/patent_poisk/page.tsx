import SearchDatabasesPage from "@/components/site/search-databases-page";
import type { Metadata } from "next";
import { getLang } from "@/lib/i18n/server";
import { t, type TranslationKey } from "@/lib/i18n/translations";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title:
      lang === "en"
        ? "Invention Patent Search — 8 Free Databases | IQin.ru"
        : lang === "zh"
          ? "发明专利检索 —— 8 个免费数据库 | IQin.ru"
          : "Поиск патентов на изобретения — 8 бесплатных баз | IQin.ru",
    description: t("pp.desc", lang),
    keywords: [
      "поиск патентов",
      "проверка патента",
      "AIpat.ru",
      "ИИ поиск патентов",
      "Google Patents",
      "Espacenet",
      "WIPO Patentscope",
      "ЕАПТ",
      "ФИПС",
      "Роспатент",
    ],
    openGraph: {
      title:
        lang === "en"
          ? "Invention Patent Search — 8 Free Databases"
          : lang === "zh"
            ? "发明专利检索 —— 8 个免费数据库"
            : "Поиск патентов на изобретения — 8 бесплатных баз",
      description: t("pp.desc", lang),
      url: "https://iqin.ru/patent_poisk",
    },
  };
}

type Db = {
  name: string;
  url: string;
  category: string;
  descKey: TranslationKey;
  recommended?: boolean;
};

const DATABASES: Db[] = [
  {
    name: "AIpat.ru",
    url: "https://aipat.ru/",
    category: "(РФ + INT)",
    descKey: "pp.dbAipat",
    recommended: true,
  },
  {
    name: "Google Patents",
    url: "https://patents.google.com/",
    category: "(INT)",
    descKey: "pp.dbGoogle",
  },
  {
    name: "Espacenet",
    url: "https://ru.espacenet.com/",
    category: "(INT)",
    descKey: "pp.dbEspacenet",
  },
  {
    name: "Цифровая платформа Роспатента",
    url: "https://searchplatform.rospatent.gov.ru/",
    category: "(РФ)",
    descKey: "pp.dbRosplatform",
    recommended: true,
  },
  {
    name: "WIPO Patentscope",
    url: "https://patentscope.wipo.int/search/ru/",
    category: "(INT)",
    descKey: "pp.dbPatentscope",
  },
  {
    name: "ЕАПТ",
    url: "http://www.eapatis.com",
    category: "(EAPO)",
    descKey: "pp.dbEapo",
  },
  {
    name: "ФИПС — Реестры Роспатента",
    url: "https://www1.fips.ru/registers-web/",
    category: "(РФ)",
    descKey: "pp.dbFips",
    recommended: true,
  },
  {
    name: "Google Scholar",
    url: "https://scholar.google.com/",
    category: "(INT)",
    descKey: "pp.dbScholar",
  },
];

export default async function PatentPoiskPage() {
  const lang = await getLang();
  const databases = DATABASES.map(({ descKey, ...rest }) => ({
    ...rest,
    description: t(descKey, lang),
  }));

  return (
    <SearchDatabasesPage
      slug="patent_poisk"
      title={t("pp.title", lang)}
      description={t("pp.desc", lang)}
      intro={[t("pp.intro1", lang), t("pp.intro2", lang)]}
      databases={databases}
      accent="#A78BFA"
    />
  );
}
