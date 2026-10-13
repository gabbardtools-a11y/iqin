import SearchDatabasesPage from "@/components/site/search-databases-page";
import type { Metadata } from "next";
import { getLang } from "@/lib/i18n/server";
import { t, type TranslationKey } from "@/lib/i18n/translations";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title:
      lang === "en"
        ? "Industrial Design Search — 3 Databases | IQin.ru"
        : lang === "zh"
          ? "外观设计检索 —— 3 个数据库 | IQin.ru"
          : "Поиск промышленных образцов — 3 базы | IQin.ru",
    description: t("ppd.desc", lang),
    keywords: [
      "поиск промышленных образцов",
      "поиск дизайна",
      "патент на дизайн",
      "WIPO Hague Express",
      "TMview Design",
      "ФИПС",
      "промобразец",
      "Locarno",
    ],
    openGraph: {
      title:
        lang === "en"
          ? "Industrial Design Search — 3 Free Databases"
          : lang === "zh"
            ? "外观设计检索 —— 3 个免费数据库"
            : "Поиск промышленных образцов — 3 бесплатные базы",
      description: t("ppd.desc", lang),
      url: "https://iqin.ru/patent_poisk_design",
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
    name: "WIPO Hague Express",
    url: "https://www3.wipo.int/designdb/en/index.jsp",
    category: "(INT)",
    descKey: "ppd.dbHague",
    recommended: true,
  },
  {
    name: "TMview Design",
    url: "https://www.tmdn.org/tmdsview-web/welcome#/dsview",
    category: "(INT)",
    descKey: "ppd.dbTmview",
  },
  {
    name: "ФИПС — Поиск по промобразцам",
    url: "https://www1.fips.ru/iiss/search.xhtml",
    category: "(РФ)",
    descKey: "ppd.dbFips",
    recommended: true,
  },
];

export default async function PatentPoiskDesignPage() {
  const lang = await getLang();
  const databases = DATABASES.map(({ descKey, ...rest }) => ({
    ...rest,
    description: t(descKey, lang),
  }));

  return (
    <SearchDatabasesPage
      slug="patent_poisk_design"
      title={t("ppd.title", lang)}
      description={t("ppd.desc", lang)}
      intro={[t("ppd.intro1", lang), t("ppd.intro2", lang)]}
      databases={databases}
      accent="#F472B6"
    />
  );
}
