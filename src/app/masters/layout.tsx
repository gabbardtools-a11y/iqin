import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сервисы и поисковые базы — IQin",
  description:
    "Бесплатные сервисы для проверки товарных знаков, патентов на изобретения, промышленных образцов, доменных имён и программ для ЭВМ. 25+ поисковых баз в одном месте.",
  keywords: [
    "поиск товарных знаков",
    "поиск патентов",
    "поиск промышленных образцов",
    "проверка доменов",
    "реестр российского ПО",
    "МКТУ",
    "МПК",
    "МКПО",
    "Роспатент",
    "ФИПС",
    "поисковые базы",
  ],
  openGraph: {
    title: "Сервисы и поисковые базы — IQin",
    description:
      "Бесплатные инструменты для проверки товарных знаков, патентов, промышленных образцов, доменов и программ для ЭВМ.",
    url: "https://iqin.ru/masters",
    type: "website",
  },
};

export default function MastersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
