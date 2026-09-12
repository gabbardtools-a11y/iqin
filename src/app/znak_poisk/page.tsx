import SearchDatabasesPage from "@/components/site/search-databases-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Поиск товарных знаков — 12 бесплатных баз | IQin.ru",
  description:
    "Бесплатные сервисы для проверки товарных знаков: NayTea.ru (наш собственный ИИ-поиск), LINKMARK, WIPO Global Brand Database, TMview, USPTO TMsearch, FINDtm, Brandsearch, Гардиум, MKTU. Сверка с реестром Роспатента.",
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
    title: "Поиск товарных знаков — 12 бесплатных баз",
    description:
      "Российские и международные поисковые базы для проверки товарных знаков, торговых марок и логотипов. Включая наш собственный сервис NayTea.ru с ИИ-поиском.",
    url: "https://iqin.ru/znak_poisk",
  },
};

const DATABASES = [
  {
    name: "NayTea.ru",
    url: "https://naytea.ru/",
    category: "(РФ + INT)",
    description: "Онлайн-проверка товарного знака с помощью ИИ по российским и международным базам. Один запрос — результаты из реестров Роспатента, ВОИС, EUIPO. Наша собственная разработка.",
    recommended: true,
  },
  {
    name: "LINKMARK",
    url: "https://linkmark.ru/",
    category: "(РФ + INT)",
    description: "Российский и международный поиск знаков. Удобный интерфейс, актуальная база.",
    recommended: true,
  },
  {
    name: "РБК Компании",
    url: "https://companies.rbc.ru/",
    category: "(РФ)",
    description: "База российских компаний и их товарных знаков от РБК.",
  },
  {
    name: "WIPO Global Brand Database",
    url: "https://www3.wipo.int/branddb/en/",
    category: "(INT)",
    description: "Международная база ВОИС — самый полный источник по мировым брендам.",
    recommended: true,
  },
  {
    name: "TMview",
    url: "https://www.tmdn.org/tmview/#/tmview",
    category: "(INT)",
    description: "Европейская база торговых знаков EUIPO. Включает все страны ЕС.",
    recommended: true,
  },
  {
    name: "Unibrander",
    url: "https://ru.unibrander.com",
    category: "(INT)",
    description: "Международный поиск знаков с поддержкой русского языка.",
  },
  {
    name: "USPTO TMsearch",
    url: "https://tmsearch.uspto.gov",
    category: "(INT)",
    description: "Официальная база патентного ведомства США. Данные по американским знакам.",
    recommended: true,
  },
  {
    name: "FINDtm",
    url: "https://findtm.ru",
    category: "(РФ)",
    description: "Российский сервис поиска товарных знаков с экспресс-проверкой.",
  },
  {
    name: "Brandsearch",
    url: "https://brand-search.ru",
    category: "(РФ)",
    description: "Поиск по российским товарным знакам с фильтрами по классам МКТУ.",
  },
  {
    name: "Гардиум",
    url: "https://legal-support.ru/services/trademarks/online-proverka-tovarnogo-znaka/",
    category: "(РФ + INT)",
    description: "Профессиональный сервис проверки знаков от патентного бюро Гардиум.",
    recommended: true,
  },
  {
    name: "MKTU.INFO",
    url: "http://www.mktu.info/",
    category: "(классификатор)",
    description: "Справочник классов МКТУ с поиском по товарам и услугам.",
    recommended: true,
  },
  {
    name: "МКТУ.рус",
    url: "https://xn--j1adte.xn--p1acf/",
    category: "(классификатор)",
    description: "Российский справочник МКТУ с актуальной базой классов.",
  },
];

export default function ZnakPoiskPage() {
  return (
    <SearchDatabasesPage
      slug="znak_poisk"
      title="Поиск по товарным знакам"
      description="Бесплатные сервисы для проверки оригинальности вашего логотипа, названия или бренда. 12 российских и международных баз — включая наш собственный сервис NayTea.ru с ИИ-поиском по реестрам Роспатента, ВОИС и EUIPO."
      intro={[
        "Перед подачей заявки на регистрацию товарного знака обязательно проверьте, не занят ли он в России и за рубежом. Это можно сделать бесплатно через официальные базы Роспатента, ВОИС и коммерческие сервисы. Если знак уже зарегистрирован кем-то другим — вашу заявку отклонят, а пошлину не вернут.",
        "Ниже — 12 проверенных сервисов для поиска. Рекомендуем начать с NayTea.ru — это наш собственный сервис, который с помощью ИИ проверяет сразу несколько баз (Роспатент, ВОИС, EUIPO) в одном запросе. Затем можно проверить результаты в каждой отдельной базе — LINKMARK, WIPO, USPTO. Для определения нужных классов МКТУ используйте справочники MKTU.INFO или МКТУ.рус.",
      ]}
      databases={DATABASES}
      accent="#60A5FA"
    />
  );
}
