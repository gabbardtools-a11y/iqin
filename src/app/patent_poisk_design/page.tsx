import SearchDatabasesPage from "@/components/site/search-databases-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Поиск промышленных образцов — 3 базы | IQin.ru",
  description:
    "Бесплатные сервисы для поиска промышленных образцов (дизайна изделий): WIPO Hague Express, TMview Design, ФИПС — реестр промобразцов РФ.",
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
    title: "Поиск промышленных образцов — 3 бесплатные базы",
    description:
      "Российские и международные базы для проверки оригинальности дизайна изделия перед регистрацией промобразца.",
    url: "https://iqin.ru/patent_poisk_design",
  },
};

const DATABASES = [
  {
    name: "WIPO Hague Express",
    url: "https://www3.wipo.int/designdb/en/index.jsp",
    category: "(INT)",
    description: "Международная база ВОИС по промышленным образцам. Самый полный источник по мировым дизайнам.",
    recommended: true,
  },
  {
    name: "TMview Design",
    url: "https://www.tmdn.org/tmdsview-web/welcome#/dsview",
    category: "(INT)",
    description: "Европейская база промышленных образцов EUIPO. Покрывает все страны ЕС.",
  },
  {
    name: "ФИПС — Поиск по промобразцам",
    url: "https://www1.fips.ru/iiss/search.xhtml",
    category: "(РФ)",
    description: "Официальный реестр Роспатента по промышленным образцам РФ.",
    recommended: true,
  },
];

export default function PatentPoiskDesignPage() {
  return (
    <SearchDatabasesPage
      slug="patent_poisk_design"
      title="Поиск по промышленным образцам"
      description="Бесплатные сервисы для проверки оригинальности дизайна изделия перед регистрацией промышленного образца. 3 базы — международная WIPO Hague, европейская TMview Design и официальная база ФИПС."
      intro={[
        "Промышленный образец — это патент на оригинальный внешний вид изделия: форму телефона, дизайн упаковки, вид мебели. Перед регистрацией нужно убедиться, что аналогичный дизайн уже не запатентован кем-то другим.",
        "Ниже — 3 проверенные базы. Начните с российской (ФИПС), затем проверьте международную WIPO Hague и европейскую TMview Design. Если похожий дизайн найден — можно изменить отличительные элементы или отказаться от регистрации.",
      ]}
      databases={DATABASES}
      accent="#F472B6"
    />
  );
}
