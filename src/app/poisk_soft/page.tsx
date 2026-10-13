import SearchDatabasesPage from "@/components/site/search-databases-page";
import type { Metadata } from "next";
import { getLang } from "@/lib/i18n/server";
import { t, type TranslationKey } from "@/lib/i18n/translations";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title:
      lang === "en"
        ? "Software and Database Search — 3 Registries | IQin.ru"
        : lang === "zh"
          ? "软件与数据库检索 —— 3 个登记簿 | IQin.ru"
          : "Поиск программ и баз данных — 3 базы | IQin.ru",
    description: t("ps.desc", lang),
    keywords: [
      "поиск программ",
      "реестр российского ПО",
      "Минцифры",
      "Минсвязи",
      "ФИПС",
      "программы ЭВМ",
      "базы данных",
      "регистрация ПО",
    ],
    openGraph: {
      title:
        lang === "en"
          ? "Software and Database Search — 3 Free Registries"
          : lang === "zh"
            ? "软件与数据库检索 —— 3 个免费登记簿"
            : "Поиск программ и баз данных — 3 бесплатные базы",
      description: t("ps.desc", lang),
      url: "https://iqin.ru/poisk_soft",
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
    name: "Реестр российского ПО (Минцифры)",
    url: "https://reestr.digital.gov.ru/reestr/",
    category: "(РФ)",
    descKey: "ps.dbMincifry",
    recommended: true,
  },
  {
    name: "Реестр российского ПО (Минсвязи)",
    url: "https://reestr-minsvyaz.ru/",
    category: "(РФ)",
    descKey: "ps.dbMinsvyaz",
  },
  {
    name: "ФИПС — Реестр программ ЭВМ и баз данных",
    url: "https://www1.fips.ru/iiss/search.xhtml",
    category: "(РФ)",
    descKey: "ps.dbFips",
    recommended: true,
  },
];

export default async function PoiskSoftPage() {
  const lang = await getLang();
  const databases = DATABASES.map(({ descKey, ...rest }) => ({
    ...rest,
    description: t(descKey, lang),
  }));

  return (
    <SearchDatabasesPage
      slug="poisk_soft"
      title={t("ps.title", lang)}
      description={t("ps.desc", lang)}
      intro={[t("ps.intro1", lang), t("ps.intro2", lang)]}
      databases={databases}
      accent="#FBBF24"
    />
  );
}
