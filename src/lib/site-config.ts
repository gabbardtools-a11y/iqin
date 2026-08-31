/**
 * Конфигурация сайта IQin
 * Все URL-адреса сохранены от старого сайта iqin.ru
 * для сохранения SEO и обратной совместимости
 */

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

/** Главная навигация — пути сохранены со старого сайта iqin.ru */
export const mainNav: NavItem[] = [
  {
    label: "Патенты",
    href: "/patenti",
    children: [
      { label: "Патент на изобретение", href: "/patent_na_izobretenie" },
      { label: "Патент на полезную модель", href: "/patent_na_poleznuyu_model" },
      { label: "Патент на дизайн", href: "/patent_na_disain" },
      { label: "Международные патенты", href: "/mezdunarudnie-patenti" },
    ],
  },
  {
    label: "Бренды",
    href: "/brendi",
    children: [
      { label: "Товарный знак России", href: "/tovarniy_znak_rossii" },
      { label: "Международные знаки", href: "/mezdunarodnie_znaki" },
      { label: "Товарный знак в Китае", href: "/china_trade_mark" },
      { label: "Нейминг", href: "/naming" },
    ],
  },
  { label: "Авторские права", href: "/avtorskie_prava_kopirait" },
  {
    label: "Сервисы",
    href: "#services",
    children: [
      { label: "Патентные классификаторы", href: "/patent_class" },
      { label: "Поиск знаков", href: "/znak_poisk" },
      { label: "Поиск патентов", href: "/patent_poisk" },
      { label: "Магазин знаков", href: "/magazine" },
      { label: "Магазин патентов", href: "/patent_store" },
    ],
  },
  {
    label: "News",
    href: "#news",
    children: [
      { label: "Новости ИС", href: "/patent_news" },
      { label: "Новости НТ", href: "/techno_news" },
      { label: "Новости ИИ", href: "/AI_IT_news" },
    ],
  },
  { label: "Docs", href: "/docs" },
  { label: "Патентные поверенные", href: "/patentnie_poverennie" },
  { label: "Цены", href: "/price" },
  { label: "Акции", href: "/akcii_i_skidki" },
  { label: "О компании", href: "/company" },
];

/** Полный список URL старого сайта для карты сайта */
export const allSiteUrls: string[] = [
  "/",
  "/company",
  "/patenti",
  "/brendi",
  "/avtorskie_prava_kopirait",
  "/price",
  "/akcii_i_skidki",
  "/magazine",
  "/kontakt",
  "/patent_na_izobretenie",
  "/patent_na_poleznuyu_model",
  "/patent_na_disain",
  "/mezdunarudnie-patenti",
  "/tovarniy_znak_rossii",
  "/mezdunarodnie_znaki",
  "/china_trade_mark",
  "/naming",
  "/novosti",
  "/rospatent",
  "/patentnie_poverennie",
  "/masters",
  "/patent_class",
  "/patent_store",
  "/patent_news",
  "/techno_news",
  "/AI_IT_news",
  "/docs",
];

/**
 * Контактные данные (с iqin.ru/kontakt)
 * Email и телефон обновлены по запросу пользователя.
 */
export const contacts = {
  phone: "+7 (995) 789-09-00",
  phoneHref: "tel:+79957890900",
  whatsapp: "https://api.whatsapp.com/send/?phone=79957890900",
  email: "info@ptn.su",
  address: "Москва, м. «Бабушкинская», Анадырский проезд, д. 31/1, оф. 31",
  addressShort: "Москва, Анадырский проезд, 31/1, оф. 31",
  hours: "Пн—Пт: 10:00—20:00",
  hoursWeekend: "Сб—Вс: бесплатные консультации",
};

/**
 * Юридическая информация о компании
 * (с iqin.ru/kontakt)
 */
export const company = {
  name: "Патентные Технологии",
  legalForm: "Общество с ограниченной ответственностью",
  fullName: 'ООО «Патентные Технологии»',
  description:
    "Патентное бюро полного цикла. Аккредитованные патентные поверенные с опытом 15+ лет ведут дела в Роспатенте и международных ведомствах. Защищаем изобретения, товарные знаки, промышленные образцы и авторские права.",
};

/**
 * Патентные поверенные (с iqin.ru/kontakt)
 */
export const patentAttorneys = [
  {
    name: "Беркутова Наталья Николаевна",
    role: "Гендиректор",
    specialization: "Патентный поверенный по товарным знакам",
    registrationNumber: "№ 957",
    phone: "+7 (916) 496-49-29",
    phoneHref: "tel:+79164964929",
  },
  {
    name: "Туленинов Николай Николаевич",
    role: "Патентный поверенный",
    specialization: "Патентный поверенный по патентам",
    registrationNumber: "№ 1416",
    phone: "+7 (985) 938-38-72",
    phoneHref: "tel:+79859383872",
  },
];
