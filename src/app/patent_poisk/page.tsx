import SearchDatabasesPage from "@/components/site/search-databases-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Поиск патентов на изобретения — 8 бесплатных баз | IQin.ru",
  description:
    "Бесплатные сервисы для поиска патентов: AIpat.ru (наш собственный ИИ-поиск по Google, WIPO, Роспатенту), Google Patents, Espacenet, Цифровая платформа Роспатента, WIPO Patentscope, ЕАПТ, ФИПС, Google Scholar.",
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
    title: "Поиск патентов на изобретения — 8 бесплатных баз",
    description:
      "Российские и международные базы патентов на изобретения и полезные модели. Проверка новизны перед подачей заявки.",
    url: "https://iqin.ru/patent_poisk",
  },
};

const DATABASES = [
  {
    name: "AIpat.ru",
    url: "https://aipat.ru/",
    category: "(РФ + INT)",
    description: "Объединённый ИИ-поиск патентов по базам Google Patents, WIPO и Роспатента. Один запрос — результаты из всех источников. Наша собственная разработка.",
    recommended: true,
  },
  {
    name: "Google Patents",
    url: "https://patents.google.com/",
    category: "(INT)",
    description: "Самая полная международная база патентов, включает РФ, США, Европу, Азию.",
  },
  {
    name: "Espacenet",
    url: "https://ru.espacenet.com/",
    category: "(INT)",
    description: "Европейское патентное ведомство (ЕПВ). 140+ млн патентных документов.",
  },
  {
    name: "Цифровая платформа Роспатента",
    url: "https://searchplatform.rospatent.gov.ru/",
    category: "(РФ)",
    description: "Официальная платформа ФИПС для поиска по российским патентам и знакам.",
    recommended: true,
  },
  {
    name: "WIPO Patentscope",
    url: "https://patentscope.wipo.int/search/ru/",
    category: "(INT)",
    description: "Международная база ВОИС для заявок PCT и национальных патентов.",
  },
  {
    name: "ЕАПТ",
    url: "http://www.eapatis.com",
    category: "(EAPO)",
    description: "Евразийская патентная организация — патенты, действующие в РФ, Беларуси, Казахстане и др.",
  },
  {
    name: "ФИПС — Реестры Роспатента",
    url: "https://www1.fips.ru/registers-web/",
    category: "(РФ)",
    description: "Официальные реестры Роспатента: изобретения, полезные модели, промобразцы.",
    recommended: true,
  },
  {
    name: "Google Scholar",
    url: "https://scholar.google.com/",
    category: "(INT)",
    description: "Поиск научных публикаций — полезно для проверки новизны изобретения.",
  },
];

export default function PatentPoiskPage() {
  return (
    <SearchDatabasesPage
      slug="patent_poisk"
      title="Поиск по патентам на изобретения"
      description="Бесплатные сервисы для проверки новизны вашей идеи перед подачей заявки на патент. 8 российских и международных баз патентов — включая наш собственный AIpat.ru с объединённым ИИ-поиском по Google, WIPO и Роспатенту."
      intro={[
        "Перед подачей заявки на патент на изобретение нужно проверить новизну — то есть убедиться, что аналогичного решения ещё не существует. Если аналоги есть — ваша заявка будет отклонена, а пошлина не возвращается.",
        "Ниже — 8 проверенных баз патентов. Рекомендуем начать с AIpat.ru — это наш собственный сервис, который объединяет ИИ-поиском сразу несколько баз (Google Patents, WIPO, Роспатент) в одном запросе. Затем можно проверить результаты в каждой отдельной базе — Google Patents, Espacenet, ФИПС. Для научных идей также полезен Google Scholar — там можно найти статьи, которые ещё не стали патентами.",
      ]}
      databases={DATABASES}
      accent="#A78BFA"
    />
  );
}
