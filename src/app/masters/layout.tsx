import type { Metadata } from "next";
import { getLang } from "@/lib/i18n/server";
import { t } from "@/lib/i18n/translations";

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
    title: t("mst.metaTitle", lang),
    description: t("mst.metaDesc", lang),
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
      title: t("mst.metaTitle", lang),
      description: t("mst.metaDesc", lang),
      url: "https://iqin.ru/masters",
      type: "website",
    },
  };
}

export default function MastersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
