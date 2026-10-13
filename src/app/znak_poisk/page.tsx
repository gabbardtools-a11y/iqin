import SearchDatabasesPage from "@/components/site/search-databases-page";
import type { Metadata } from "next";
import { getLang } from "@/lib/i18n/server";
import { t, type TranslationKey } from "@/lib/i18n/translations";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title:
      lang === "en"
        ? "Trademark Search — 12 Free Databases | IQin.ru"
        : lang === "zh"
          ? "商标检索 —— 12 个免费数据库 | IQin.ru"
          : "Поиск товарных знаков — 12 бесплатных баз | IQin.ru",
    description: t("zp.desc", lang),
    keywords: [
      "поиск товарных знаков",
      "проверка товарного знака",
      "NayTea.ru",
      "поиск торговых марок",
      "LINKMARK",
      "WIPO",
      "TMview",
      "USPTO",
      "ФИПС",
      "МКТУ",
      "Роспатент",
    ],
    openGraph: {
      title:
        lang === "en"
          ? "Trademark Search — 12 Free Databases"
          : lang === "zh"
            ? "商标检索 —— 12 个免费数据库"
            : "Поиск товарных знаков — 12 бесплатных баз",
      description: t("zp.desc", lang),
      url: "https://iqin.ru/znak_poisk",
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
    name: "NayTea.ru",
    url: "https://naytea.ru/",
    category: "(РФ + INT)",
    descKey: "zp.dbNaytea",
    recommended: true,
  },
  {
    name: "LINKMARK",
    url: "https://linkmark.ru/",
    category: "(РФ + INT)",
    descKey: "zp.dbLinkmark",
    recommended: true,
  },
  {
    name: "РБК Компании",
    url: "https://companies.rbc.ru/",
    category: "(РФ)",
    descKey: "zp.dbRbc",
  },
  {
    name: "WIPO Global Brand Database",
    url: "https://www3.wipo.int/branddb/en/",
    category: "(INT)",
    descKey: "zp.dbWipo",
    recommended: true,
  },
  {
    name: "TMview",
    url: "https://www.tmdn.org/tmview/#/tmview",
    category: "(INT)",
    descKey: "zp.dbTmview",
    recommended: true,
  },
  {
    name: "Unibrander",
    url: "https://ru.unibrander.com",
    category: "(INT)",
    descKey: "zp.dbUnibrander",
  },
  {
    name: "USPTO TMsearch",
    url: "https://tmsearch.uspto.gov",
    category: "(INT)",
    descKey: "zp.dbUspto",
    recommended: true,
  },
  {
    name: "FINDtm",
    url: "https://findtm.ru",
    category: "(РФ)",
    descKey: "zp.dbFindtm",
  },
  {
    name: "Brandsearch",
    url: "https://brand-search.ru",
    category: "(РФ)",
    descKey: "zp.dbBrandsearch",
  },
  {
    name: "Гардиум",
    url: "https://legal-support.ru/services/trademarks/online-proverka-tovarnogo-znaka/",
    category: "(РФ + INT)",
    descKey: "zp.dbGardium",
    recommended: true,
  },
  {
    name: "MKTU.INFO",
    url: "http://www.mktu.info/",
    category: "(классификатор)",
    descKey: "zp.dbMktuInfo",
    recommended: true,
  },
  {
    name: "МКТУ.рус",
    url: "https://xn--j1adte.xn--p1acf/",
    category: "(классификатор)",
    descKey: "zp.dbMktuRus",
  },
];

export default async function ZnakPoiskPage() {
  const lang = await getLang();
  const databases = DATABASES.map(({ descKey, ...rest }) => ({
    ...rest,
    description: t(descKey, lang),
  }));

  return (
    <SearchDatabasesPage
      slug="znak_poisk"
      title={t("zp.title", lang)}
      description={t("zp.desc", lang)}
      intro={[t("zp.intro1", lang), t("zp.intro2", lang)]}
      databases={databases}
      accent="#60A5FA"
    />
  );
}
