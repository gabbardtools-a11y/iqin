/**
 * i18n система для iqin.ru — RU/EN/ZH (по ЗАКОНУ №3, эталон iznaki.ru → aipat/mktu)
 *
 * Логика:
 * - Cookie `lang` хранит выбор пользователя ('ru' | 'en' | 'zh')
 * - URL /en/... или /zh/... middleware rewrite → тот же компонент, но lang=xx
 * - useLanguage() hook (клиент) / getLang() (сервер) возвращают язык
 * - Запрещены хардкод-тексты в JSX — только ключи словаря
 */

export type Lang = 'ru' | 'en' | 'zh';

export const DEFAULT_LANG: Lang = 'ru';

export const LANGUAGES: { code: Lang; label: string; nativeName: string }[] = [
  { code: 'ru', label: 'RU', nativeName: 'Русский' },
  { code: 'en', label: 'EN', nativeName: 'English' },
  { code: 'zh', label: '中', nativeName: '中文' },
];

/** Словарь переводов — все ключи и их RU/EN/ZH значения */
export const translations = {
  // ===== Общие =====
  'common.skipToContent': { ru: 'Перейти к содержимому', en: 'Skip to content', zh: '跳到内容' },
  'common.switchLang': { ru: 'Переключить язык', en: 'Switch language', zh: '切换语言' },

  // ===== Header =====
  'header.logoAria': { ru: 'IQin — на главную', en: 'IQin — home', zh: 'IQin — 返回首页' },
  'header.navAria': { ru: 'Основная навигация', en: 'Main navigation', zh: '主导航' },
  'header.contacts': { ru: 'Контакты', en: 'Contacts', zh: '联系我们' },
  'header.openMenu': { ru: 'Открыть меню', en: 'Open menu', zh: '打开菜单' },
  'header.closeMenu': { ru: 'Закрыть меню', en: 'Close menu', zh: '关闭菜单' },
  'header.mobileNavAria': { ru: 'Мобильная навигация', en: 'Mobile navigation', zh: '移动端导航' },

  // ===== Навигация (по href из site-config) =====
  'nav.patents': { ru: 'Патенты', en: 'Patents', zh: '专利' },
  'nav.patentInvention': { ru: 'Патент на изобретение', en: 'Invention patent', zh: '发明专利' },
  'nav.patentUtilityModel': { ru: 'Патент на полезную модель', en: 'Utility model patent', zh: '实用新型专利' },
  'nav.patentDesign': { ru: 'Патент на дизайн', en: 'Design patent', zh: '外观设计专利' },
  'nav.patentsInternational': { ru: 'Международные патенты', en: 'International patents', zh: '国际专利' },
  'nav.brands': { ru: 'Бренды', en: 'Brands', zh: '品牌' },
  'nav.tmRussia': { ru: 'Товарный знак России', en: 'Russian trademark', zh: '俄罗斯商标' },
  'nav.marksInternational': { ru: 'Международные знаки', en: 'International marks', zh: '国际商标' },
  'nav.tmChina': { ru: 'Товарный знак в Китае', en: 'Trademark in China', zh: '中国商标注册' },
  'nav.naming': { ru: 'Нейминг', en: 'Naming', zh: '品牌命名' },
  'nav.copyright': { ru: 'Авторские права', en: 'Copyright', zh: '版权' },
  'nav.services': { ru: 'Сервисы', en: 'Services', zh: '服务' },
  'nav.classifiers': { ru: 'Патентные классификаторы', en: 'Patent classifiers', zh: '专利分类号' },
  'nav.markSearch': { ru: 'Поиск знаков', en: 'Trademark search', zh: '商标检索' },
  'nav.patentSearch': { ru: 'Поиск патентов', en: 'Patent search', zh: '专利检索' },
  'nav.markStore': { ru: 'Магазин знаков', en: 'Trademark store', zh: '商标商店' },
  'nav.patentStore': { ru: 'Магазин патентов', en: 'Patent store', zh: '专利商店' },
  'nav.news': { ru: 'News', en: 'News', zh: '新闻' },
  'nav.ipNews': { ru: 'Новости ИС', en: 'IP news', zh: '知识产权新闻' },
  'nav.techNews': { ru: 'Новости НТ', en: 'Sci-tech news', zh: '科技新闻' },
  'nav.aiNews': { ru: 'Новости ИИ', en: 'AI news', zh: 'AI 新闻' },
  'nav.docs': { ru: 'Docs', en: 'Docs', zh: '文档' },
  'nav.attorneys': { ru: 'Патентные поверенные', en: 'Patent attorneys', zh: '专利代理人' },
  'nav.pricing': { ru: 'Цены', en: 'Pricing', zh: '价格' },
  'nav.promos': { ru: 'Акции', en: 'Promotions', zh: '优惠活动' },
  'nav.company': { ru: 'О компании', en: 'About us', zh: '关于我们' },

  // ===== Hero =====
  'hero.h1a': { ru: 'Интеллектуальная собственность', en: 'Intellectual property', zh: '知识产权' },
  'hero.h1b': { ru: 'нового поколения', en: 'of the new generation', zh: '新一代' },
  'hero.h1c': { ru: 'на базе', en: 'powered by', zh: '基于' },
  'hero.ai': { ru: 'ИИ', en: 'AI', zh: 'AI' },
  'hero.lead': {
    ru: 'Мы создаём патенты, товарные знаки, дизайн, лендинги и веб-платформы с ИИ — быстрее, точнее и прозрачнее, чем традиционные агентства. Используйте наши свободные сервисы уже сейчас бесплатно и без регистрации. На платных тарифах Вы можете объединить все свои кейсы и наши сервисы с ИИ (AI) агентами в одном личном кабинете.',
    en: 'We create patents, trademarks, designs, landing pages and web platforms with AI — faster, more accurately and more transparently than traditional agencies. Use our free services right now, free of charge and without registration. On paid plans you can combine all your cases and our services with AI agents in a single dashboard.',
    zh: '我们借助 AI 创作专利、商标、外观设计、落地页和 Web 平台 —— 比传统代理机构更快、更精准、更透明。现在即可免费使用我们的开放服务，无需注册。付费套餐可将您的全部案件与我们的 AI 智能体服务整合到同一个工作台。',
  },
  'hero.ctaProject': { ru: 'Запустить проект', en: 'Launch a project', zh: '启动项目' },
  'hero.ctaServices': { ru: 'ИИ-сервисы IQin', en: 'IQin AI services', zh: 'IQin AI 服务' },
  'hero.licensedAttorneys': { ru: 'Лицензированные поверенные', en: 'Licensed attorneys', zh: '持照专利代理人' },
  'hero.sixLlm': { ru: '6 LLM в работе', en: '6 LLMs at work', zh: '6 个大模型协同' },
  'hero.online247': { ru: 'Онлайн 24/7', en: 'Online 24/7', zh: '全天候在线' },
  'hero.prompt': {
    ru: 'Сгенерируй формулу изобретения для',
    en: 'Generate a claim set for',
    zh: '请为以下主题生成权利要求：',
  },
  'hero.promptTopic': {
    ru: 'нейросетевого метода анализа изображений',
    en: 'a neural network image analysis method',
    zh: '神经网络图像分析方法',
  },
  'hero.streamPriorArt': { ru: 'Анализ уровня техники', en: 'Prior art analysis', zh: '现有技术分析' },
  'hero.streamIpc': { ru: 'Подбор МПК-классов', en: 'IPC class selection', zh: 'IPC 分类选择' },
  'hero.streamClaims': { ru: 'Формула изобретения', en: 'Claim formulation', zh: '权利要求撰写' },
  'hero.streamProtocol': { ru: 'Регламент поиска', en: 'Search protocol', zh: '检索报告' },
  'hero.statAccuracy': { ru: 'Точность', en: 'Accuracy', zh: '准确率' },
  'hero.statTimeSaved': { ru: 'Экономия времени', en: 'Time saved', zh: '节省时间' },
  'hero.statStatus': { ru: 'Статус', en: 'Status', zh: '状态' },
  'hero.chipProtection': { ru: 'Защита', en: 'Protection', zh: '保护' },
  'hero.chipAiModel': { ru: 'ИИ-модель', en: 'AI model', zh: 'AI 模型' },

  // ===== Ticker (бегущая строка hero) =====
  'ticker.inventionPatents': { ru: 'Патенты на изобретения', en: 'Invention patents', zh: '发明专利' },
  'ticker.utilityModels': { ru: 'Полезные модели', en: 'Utility models', zh: '实用新型' },
  'ticker.designs': { ru: 'Промышленные образцы', en: 'Industrial designs', zh: '外观设计' },
  'ticker.tmRu': { ru: 'Товарные знаки РФ', en: 'Russian trademarks', zh: '俄罗斯商标' },
  'ticker.marksIntl': { ru: 'Международные знаки', en: 'International marks', zh: '国际商标' },
  'ticker.tmChina': { ru: 'Товарные знаки в Китае', en: 'Trademarks in China', zh: '中国商标' },
  'ticker.copyright': { ru: 'Авторские права', en: 'Copyright', zh: '版权' },
  'ticker.naming': { ru: 'Нейминг брендов', en: 'Brand naming', zh: '品牌命名' },
  'ticker.software': { ru: 'Программы для ЭВМ', en: 'Software registrations', zh: '计算机软件著作权' },
  'ticker.intlPatenting': { ru: 'Международное патентование', en: 'International patenting', zh: '国际专利申请' },

  // ===== AI Services =====
  'ai.eyebrow': { ru: 'IQin AI Suite', en: 'IQin AI Suite', zh: 'IQin AI Suite' },
  'ai.titleA': { ru: 'ИИ-сервисы', en: 'AI services', zh: 'AI 服务' },
  'ai.titleB': { ru: 'которые меняют правила игры', en: 'that change the game', zh: '颠覆行业规则' },
  'ai.desc': {
    ru: 'Мы встроили большие языковые модели в патентный и веб-процессы. Получите результат, на который у традиционных агентств уходят недели — за один рабочий день.',
    en: 'We have embedded large language models into the patent and web workflows. Get in one working day the result that traditional agencies take weeks to deliver.',
    zh: '我们将大语言模型深度嵌入专利与 Web 工作流。传统机构需要数周才能交付的成果，现在一个工作日即可完成。',
  },
  'ai.patentTitle': { ru: 'Создание патентов с ИИ', en: 'AI-powered patent creation', zh: 'AI 专利撰写' },
  'ai.patentTagline': {
    ru: 'От идеи до заявки в Роспатент — за 24 часа',
    en: 'From idea to Rospatent filing — in 24 hours',
    zh: '从创意到俄罗斯专利局申请 —— 24 小时',
  },
  'ai.patentDesc': {
    ru: 'Полный цикл патентования с искусственным интеллектом: поиск, формула, описание, аудит рисков и сопровождение поверенным.',
    en: 'The full patenting cycle with artificial intelligence: search, claims, description, risk audit and attorney support.',
    zh: 'AI 全流程专利服务：检索、权利要求、说明书、风险审计及代理人全程陪跑。',
  },
  'ai.pf1Title': { ru: 'Умный патентный поиск', en: 'Smart patent search', zh: '智能专利检索' },
  'ai.pf1Desc': {
    ru: 'ИИ анализирует миллионы патентов в реальном времени — находит аналоги, оценивает оригинальность и подбирает МПК-классы с точностью 98.4%.',
    en: 'AI analyzes millions of patents in real time — finds analogues, evaluates novelty and selects IPC classes with 98.4% accuracy.',
    zh: 'AI 实时分析数百万件专利 —— 查找同类方案、评估新颖性，并以 98.4% 的准确率推荐 IPC 分类。',
  },
  'ai.pf2Title': { ru: 'Генерация формулы и реферата', en: 'Claims and abstract generation', zh: '权利要求与摘要生成' },
  'ai.pf2Desc': {
    ru: 'Модель IQin-Patent v3 формирует независимые и зависимые пункты формулы, реферат и описание на основе технического задания.',
    en: 'The IQin-Patent v3 model drafts independent and dependent claims, the abstract and the description from your technical brief.',
    zh: 'IQin-Patent v3 模型根据技术交底书起草独立与从属权利要求、摘要及说明书。',
  },
  'ai.pf3Title': { ru: 'Анти-рисковый аудит', en: 'Risk audit', zh: '风险审计' },
  'ai.pf3Desc': {
    ru: 'Предиктивная оценка вероятности отказа Роспатента. ИИ находит слабые места заявки до подачи и предлагает доработки.',
    en: 'Predictive assessment of Rospatent refusal probability. AI finds weak spots of the application before filing and suggests improvements.',
    zh: '预测俄罗斯专利局驳回概率。AI 在递交前发现申请薄弱点并提出完善建议。',
  },
  'ai.webTitle': { ru: 'Создание сайтов с ИИ', en: 'AI-powered website creation', zh: 'AI 网站开发' },
  'ai.webTagline': {
    ru: 'Production-готовый сайт на Next.js за один день',
    en: 'A production-ready Next.js website in one day',
    zh: '一天交付可用于生产的 Next.js 网站',
  },
  'ai.webDesc': {
    ru: 'Генеративная разработка: от анализа ниши и прототипа до чистого кода на Next.js + TypeScript. Адаптивный, быстрый, SEO-оптимизированный.',
    en: 'Generative development: from niche analysis and prototype to clean Next.js + TypeScript code. Responsive, fast, SEO-optimized.',
    zh: '生成式开发：从行业分析与原型到 Next.js + TypeScript 的整洁代码。响应式、高性能、SEO 友好。',
  },
  'ai.sf1Title': { ru: 'Архитектура и UX под бизнес', en: 'Business-first architecture & UX', zh: '面向业务的架构与 UX' },
  'ai.sf1Desc': {
    ru: 'ИИ-агент анализирует нишу, целевую аудиторию и конкурентов — предлагает структуру страниц и прототип за минуты, а не недели.',
    en: 'An AI agent analyzes your niche, target audience and competitors — proposing the page structure and a prototype in minutes, not weeks.',
    zh: 'AI 智能体分析行业、目标受众与竞争对手 —— 几分钟而非数周即可给出页面结构与原型。',
  },
  'ai.sf2Title': { ru: 'Дизайн в техно-стиле', en: 'Techno-style design', zh: '科技风设计' },
  'ai.sf2Desc': {
    ru: 'Генеративные дизайн-системы создают уникальные визуальные концепции: от типографики и палитры до анимаций и микро-взаимодействий.',
    en: 'Generative design systems create unique visual concepts: from typography and palette to animations and micro-interactions.',
    zh: '生成式设计系统打造独特视觉概念：从字体与配色到动效与微交互。',
  },
  'ai.sf3Title': { ru: 'Код на Next.js + TypeScript', en: 'Next.js + TypeScript code', zh: 'Next.js + TypeScript 代码' },
  'ai.sf3Desc': {
    ru: 'Готовый production-код на современном стеке: React 19, Next.js 16, Tailwind CSS 4, shadcn/ui. SEO, адаптивность, производительность 90+.',
    en: 'Production-ready code on a modern stack: React 19, Next.js 16, Tailwind CSS 4, shadcn/ui. SEO, responsiveness, 90+ performance.',
    zh: '基于现代技术栈的生产级代码：React 19、Next.js 16、Tailwind CSS 4、shadcn/ui。SEO、响应式、性能 90+。',
  },
  'ai.statIpcAccuracy': { ru: 'Точность МПК', en: 'IPC accuracy', zh: 'IPC 准确率' },
  'ai.statPrepTime': { ru: 'Время подготовки', en: 'Preparation time', zh: '准备时间' },
  'ai.statFiling': { ru: 'До подачи заявки', en: 'To filing', zh: '至递交申请' },
  'ai.statFilingValue': { ru: '24ч', en: '24h', zh: '24 小时' },
  'ai.statMvp': { ru: 'До запуска MVP', en: 'To MVP launch', zh: '至 MVP 上线' },
  'ai.statMvpValue': { ru: '1 день', en: '1 day', zh: '1 天' },
  'ai.statCustomDesign': { ru: 'Кастомный дизайн', en: 'Custom design', zh: '全定制设计' },
  'ai.patentCta': { ru: 'Подать заявку на патент', en: 'File a patent application', zh: '递交专利申请' },
  'ai.webCta': { ru: 'Заказать сайт с ИИ', en: 'Order an AI website', zh: '订购 AI 网站' },
  'ai.demoOpen': { ru: 'Демо-доступ открыто', en: 'Demo access open', zh: '演示入口已开放' },
  'ai.comboTitle': { ru: 'Комбо: патент + сайт для стартапа', en: 'Combo: patent + website for startups', zh: '组合优惠：专利 + 网站套餐' },
  'ai.comboDesc': {
    ru: 'Запатентуйте технологию и запустите сайт для её продвижения — единым контрактом со скидкой до 25%.',
    en: 'Patent your technology and launch a website to promote it — a single contract with a discount of up to 25%.',
    zh: '为技术申请专利，同时上线推广网站 —— 一份合同，折扣高达 25%。',
  },
  'ai.comboCta': { ru: 'Получить КП', en: 'Get a proposal', zh: '获取报价' },
  'ai.priceList': { ru: 'Прайс-лист', en: 'Price list', zh: '价目表' },

  // ===== Services (карточки услуг на главной) =====
  'svc.eyebrow': { ru: 'Полный спектр услуг', en: 'Full range of services', zh: '全套服务' },
  'svc.titleA': { ru: 'Защита интеллектуальной', en: 'Turnkey protection of intellectual', zh: '知识产权' },
  'svc.titleB': { ru: 'собственности под ключ', en: 'property', zh: '一站式保护' },
  'svc.desc': {
    ru: 'Классические патентные услуги IQin, проверенные 15 годами практики. Сохранены все URL старого сайта — закладки и ссылки продолжат работать.',
    en: 'Classic IQin patent services, proven over 15 years of practice. All URLs of the old site are preserved — bookmarks and links keep working.',
    zh: 'IQin 经典专利服务，15 年实践检验。保留旧站全部 URL —— 书签与外链依然有效。',
  },
  'svc.notFound': { ru: 'Не нашли нужную услугу?', en: "Can't find the service you need?", zh: '没有找到所需服务？' },
  'svc.askExpert': { ru: 'Задайте вопрос эксперту', en: 'Ask an expert', zh: '咨询专家' },
  'svc.more': { ru: 'Подробнее', en: 'Learn more', zh: '了解更多' },
  'svc.s1Title': { ru: 'Патенты', en: 'Patents', zh: '专利' },
  'svc.s1Desc': {
    ru: 'Регистрация изобретений, полезных моделей и промышленных образцов в Роспатенте и за рубежом. Полное сопровождение от поиска до выдачи патента.',
    en: 'Registration of inventions, utility models and industrial designs with Rospatent and abroad. Full support from search to patent grant.',
    zh: '在俄罗斯专利局及海外注册发明、实用新型与外观设计。从检索到授权的全程陪跑。',
  },
  'svc.s1Tag': { ru: 'Патентование', en: 'Patenting', zh: '专利申请' },
  'svc.s1sub1': { ru: 'Изобретения', en: 'Inventions', zh: '发明' },
  'svc.s1sub2': { ru: 'Полезные модели', en: 'Utility models', zh: '实用新型' },
  'svc.s1sub3': { ru: 'Дизайн', en: 'Designs', zh: '外观设计' },
  'svc.s1sub4': { ru: 'Международные', en: 'International', zh: '国际专利' },
  'svc.s2Title': { ru: 'Бренды и товарные знаки', en: 'Brands and trademarks', zh: '品牌与商标' },
  'svc.s2Desc': {
    ru: 'Регистрация товарных знаков в России, по Мадридской системе и в Китае. Проверка уникальности, нейминг и защита от конкурентов.',
    en: 'Trademark registration in Russia, via the Madrid System and in China. Uniqueness checks, naming and protection from competitors.',
    zh: '在俄罗斯、马德里体系及中国注册商标。查重、命名与竞业防护。',
  },
  'svc.s2Tag': { ru: 'Товарные знаки', en: 'Trademarks', zh: '商标' },
  'svc.s2sub1': { ru: 'ТЗ в России', en: 'TM in Russia', zh: '俄罗斯商标' },
  'svc.s2sub2': { ru: 'Международные', en: 'International', zh: '国际商标' },
  'svc.s2sub3': { ru: 'ТЗ в Китае', en: 'TM in China', zh: '中国商标' },
  'svc.s2sub4': { ru: 'Нейминг', en: 'Naming', zh: '品牌命名' },
  'svc.s3Title': { ru: 'Авторские права', en: 'Copyright', zh: '版权' },
  'svc.s3Desc': {
    ru: 'Защита произведений науки, литературы и искусства. Депонирование, договоры отчуждения и лицензионные соглашения, судебная защита.',
    en: 'Protection of works of science, literature and art. Deposit, assignment agreements and licenses, litigation support.',
    zh: '保护科学、文学与艺术作品。存证登记、转让合同与许可协议、诉讼维权。',
  },
  'svc.s3Tag': { ru: 'Copyright', en: 'Copyright', zh: '版权登记' },
  'svc.s4Title': { ru: 'Патентные поверенные', en: 'Patent attorneys', zh: '专利代理人' },
  'svc.s4Desc': {
    ru: 'Аккредитованные Роспатентом поверенные с опытом 15+ лет. Ведение делопроизводства, ответы на запросы экспертизы, оспаривание отказов.',
    en: 'Rospatent-accredited attorneys with 15+ years of experience. Case management, office action responses, refusal appeals.',
    zh: '俄罗斯专利局认证、经验 15 年以上的代理人。案件管理、审查意见答复、驳回申诉。',
  },
  'svc.s4Tag': { ru: 'Сопровождение', en: 'Support', zh: '全程服务' },
  'svc.s5Title': { ru: 'Работа с Роспатентом', en: 'Working with Rospatent', zh: '对接俄罗斯专利局' },
  'svc.s5Desc': {
    ru: 'Прямое взаимодействие с ФИПС и Роспатентом. Электронная подача заявок, отслеживание статуса, ускоренные процедуры регистрации.',
    en: 'Direct interaction with FIPS and Rospatent. E-filing of applications, status tracking, expedited registration procedures.',
    zh: '直接对接 FIPS 与俄罗斯专利局。电子递交申请、状态跟踪、加速审查程序。',
  },
  'svc.s5Tag': { ru: 'Гос. услуги', en: 'Government services', zh: '官方服务' },
  'svc.s6Title': { ru: 'Нейминг и брендинг', en: 'Naming and branding', zh: '命名与品牌打造' },
  'svc.s6Desc': {
    ru: 'Разработка названий компаний, продуктов и доменов с проверкой патентной чистоты. Креатив и правовая защита в одном пакете.',
    en: 'Development of company, product and domain names with patent-clearance checks. Creativity and legal protection in one package.',
    zh: '为公司、产品与域名命名，并核查专利清洁性。创意与法律保护一站式完成。',
  },
  'svc.s6Tag': { ru: 'Креатив', en: 'Creative', zh: '创意' },
  'svc.s7Title': { ru: 'Международное патентование', en: 'International patenting', zh: '国际专利申请' },
  'svc.s7Desc': {
    ru: 'Защита интеллектуальной собственности по системам PCT, Евразийской и Европейской патентной конвенции. Подача в 150+ стран мира.',
    en: 'IP protection via PCT, the Eurasian and European Patent Conventions. Filing in 150+ countries worldwide.',
    zh: '通过 PCT、欧亚与欧洲专利公约保护知识产权。可向全球 150 多个国家递交。',
  },
  'svc.s7Tag': { ru: 'Global IP', en: 'Global IP', zh: '全球知识产权' },
  'svc.s8Title': { ru: 'Мастера IQin', en: 'IQin masters', zh: 'IQin 专家团队' },
  'svc.s8Desc': {
    ru: 'Команда экспертов: патентные поверенные, юристы по ИС, дизайнеры, разработчики и ИИ-инженеры — работаем над вашим проектом вместе.',
    en: 'A team of experts: patent attorneys, IP lawyers, designers, developers and AI engineers — working on your project together.',
    zh: '专家团队齐聚：专利代理人、知识产权律师、设计师、开发者与 AI 工程师 —— 共同为您的项目服务。',
  },
  'svc.s8Tag': { ru: 'Команда', en: 'Team', zh: '团队' },

  // ===== Stats =====
  'stats.1label': { ru: 'Лет на рынке ИС', en: 'Years in the IP market', zh: '年知识产权行业深耕' },
  'stats.1sub': { ru: 'с 2009 года', en: 'since 2009', zh: '自 2009 年起' },
  'stats.2label': { ru: 'Поданных заявок', en: 'Applications filed', zh: '件递交申请' },
  'stats.2sub': { ru: 'патенты и ТЗ', en: 'patents and trademarks', zh: '专利与商标' },
  'stats.3label': { ru: 'Успешных регистраций', en: 'Successful registrations', zh: '成功注册率' },
  'stats.3sub': { ru: 'по итогам 2024', en: 'as of 2024 results', zh: '2024 年度数据' },
  'stats.4label': { ru: 'Среднее время старта', en: 'Average start time', zh: '平均启动时间' },
  'stats.4sub': { ru: 'от заявки до работы', en: 'from request to work', zh: '从申请到开工' },
  'stats.4value': { ru: '24ч', en: '24h', zh: '24 小时' },

  // ===== Process =====
  'proc.eyebrow': { ru: 'Как мы работаем', en: 'How we work', zh: '工作流程' },
  'proc.titleA': { ru: 'Процесс от заявки до', en: 'The process from application to', zh: '从申请到' },
  'proc.titleB': { ru: 'выдачи патента', en: 'patent grant', zh: '授权下证的流程' },
  'proc.desc': {
    ru: 'Прозрачный pipeline с фиксацией сроков на каждом этапе. ИИ ускоряет рутину, поверенные принимают ключевые решения.',
    en: 'A transparent pipeline with fixed timelines at every stage. AI speeds up the routine, attorneys make the key decisions.',
    zh: '流程透明，各阶段时限明确。AI 提速日常事务，关键决策由代理人把关。',
  },
  'proc.s1Title': { ru: 'Брифинг и постановка задачи', en: 'Briefing and task setting', zh: '需求沟通与任务界定' },
  'proc.s1Desc': {
    ru: 'Вы заполняете короткий бриф или общаетесь с ИИ-ассистентом. Система автоматически классифицирует задачу и подбирает эксперта.',
    en: 'You fill in a short brief or chat with an AI assistant. The system automatically classifies the task and assigns an expert.',
    zh: '填写简短需求单或与 AI 助手沟通。系统自动为任务分类并匹配专家。',
  },
  'proc.s1Duration': { ru: '15 минут', en: '15 minutes', zh: '15 分钟' },
  'proc.s2Title': { ru: 'ИИ-анализ и стратегия', en: 'AI analysis and strategy', zh: 'AI 分析与策略' },
  'proc.s2Desc': {
    ru: 'ИИ проводит патентный поиск, оценивает оригинальность, формирует стратегию защиты. Проверенный поверенный подтверждает план.',
    en: 'AI runs a patent search, evaluates novelty and builds a protection strategy. A verified attorney approves the plan.',
    zh: 'AI 完成专利检索、新颖性评估并制定保护策略。资深代理人复核确认方案。',
  },
  'proc.s2Duration': { ru: '24 часа', en: '24 hours', zh: '24 小时' },
  'proc.s3Title': { ru: 'Подготовка и подача заявки', en: 'Application preparation and filing', zh: '申请准备与递交' },
  'proc.s3Desc': {
    ru: 'Генерируем формулу, описание, реферат. Подаём заявку в Роспатент в электронном виде. Вы получаете трекинг статуса в реальном времени.',
    en: 'We generate the claims, description and abstract. The application is e-filed with Rospatent. You get real-time status tracking.',
    zh: '生成权利要求、说明书与摘要，电子递交至俄罗斯专利局，并实时跟踪状态。',
  },
  'proc.s3Duration': { ru: '2–5 дней', en: '2–5 days', zh: '2–5 天' },
  'proc.s4Title': { ru: 'Сопровождение до выдачи', en: 'Support until grant', zh: '授权前全程跟进' },
  'proc.s4Desc': {
    ru: 'Ведём делопроизводство, отвечаем на запросы экспертизы, оспариваем отказы. Финальный отчёт и передача патента владельцу.',
    en: 'We handle prosecution, respond to office actions and appeal refusals. Final report and patent handover to the owner.',
    zh: '负责案件流程、答复审查意见、提起驳回申诉。最终交付报告并将专利移交权利人。',
  },
  'proc.s4Duration': { ru: 'до 12 месяцев', en: 'up to 12 months', zh: '最长 12 个月' },

  // ===== CTA =====
  'cta.badge': { ru: 'Бесплатная консультация', en: 'Free consultation', zh: '免费咨询' },
  'cta.titleA': { ru: 'Запустите свой проект', en: 'Launch your project', zh: '今天就启动您的' },
  'cta.titleB': { ru: 'с ИИ сегодня', en: 'with AI today', zh: 'AI 项目' },
  'cta.desc': {
    ru: 'Эксперт IQin свяжется с вами в течение 30 минут. Подберём стратегию защиты интеллектуальной собственности или разработки сайта — бесплатно и без обязательств.',
    en: 'An IQin expert will contact you within 30 minutes. We will suggest an IP protection or website development strategy — free of charge and with no obligations.',
    zh: 'IQin 专家将在 30 分钟内与您联系。免费且无义务地为您的知识产权保护或网站开发选定策略。',
  },
  'cta.noPrepay': { ru: 'Без предоплаты', en: 'No prepayment', zh: '无需预付' },
  'cta.nda': { ru: 'NDA по умолчанию', en: 'NDA by default', zh: '默认签署 NDA' },
  'cta.reply30': { ru: 'Ответ за 30 минут', en: 'Reply within 30 minutes', zh: '30 分钟内回复' },
  'cta.directTitle': { ru: 'Связаться напрямую', en: 'Contact directly', zh: '直接联系我们' },
  'cta.chooseChannel': { ru: 'Выберите удобный канал связи:', en: 'Choose a convenient contact channel:', zh: '请选择便捷的联系方式：' },
  'cta.phoneLabel': { ru: 'Телефон', en: 'Phone', zh: '电话' },
  'cta.whatsappValue': { ru: 'Написать в мессенджер', en: 'Message us on WhatsApp', zh: '在 WhatsApp 联系我们' },
  'cta.openForm': { ru: 'Открыть форму заявки', en: 'Open request form', zh: '打开申请表单' },

  // ===== Footer =====
  'footer.tagline': {
    ru: 'Ультрасовременная платформа интеллектуальной собственности. Патентные услуги и веб-разработка на базе искусственного интеллекта.',
    en: 'An ultra-modern intellectual property platform. Patent services and web development powered by artificial intelligence.',
    zh: '超现代知识产权平台。以人工智能驱动的专利服务与 Web 开发。',
  },
  'footer.legalEntity': { ru: 'Патентное бюро', en: 'Patent bureau', zh: '专利局' },
  'footer.colServices': { ru: 'Услуги', en: 'Services', zh: '服务' },
  'footer.colInfo': { ru: 'Информация', en: 'Information', zh: '信息' },
  'footer.colPopular': { ru: 'Популярное', en: 'Popular', zh: '热门' },
  'footer.fPatents': { ru: 'Патенты', en: 'Patents', zh: '专利' },
  'footer.fTrademarks': { ru: 'Товарные знаки', en: 'Trademarks', zh: '商标' },
  'footer.fContacts': { ru: 'Контакты', en: 'Contacts', zh: '联系方式' },
  'footer.fBrandStore': { ru: 'Магазин брендов', en: 'Brand store', zh: '品牌商店' },
  'footer.fNews': { ru: 'Новости', en: 'News', zh: '新闻' },
  'footer.phoneLabel': { ru: 'Телефон', en: 'Phone', zh: '电话' },
  'footer.whatsappChat': { ru: 'Написать в чат', en: 'Chat on WhatsApp', zh: 'WhatsApp 联系' },
  'footer.hoursLabel': { ru: 'Часы работы', en: 'Business hours', zh: '营业时间' },
  'footer.addressLabel': { ru: 'Адрес офиса', en: 'Office address', zh: '办公地址' },
  'footer.metro': { ru: 'м. «Бабушкинская»', en: 'Babushkinskaya metro', zh: '巴布什金斯卡亚地铁站' },
  'footer.scheduleLabel': { ru: 'График работы', en: 'Working hours', zh: '工作时间' },
  'footer.sitemapNote': {
    ru: '// Карта сайта — все URL сохранены',
    en: '// Sitemap — all URLs preserved',
    zh: '// 网站地图 —— 保留全部 URL',
  },
  'footer.contactUs': { ru: 'Связаться', en: 'Contact us', zh: '联系我们' },
  'footer.regLabel': { ru: 'рег.', en: 'reg.', zh: '注册号' },
  'footer.copyright': {
    ru: 'Все права защищены.',
    en: 'All rights reserved.',
    zh: '版权所有。',
  },
  'contacts.hours': { ru: 'Пн—Пт: 10:00—20:00', en: 'Mon–Fri: 10:00—20:00', zh: '周一至周五：10:00—20:00' },
  'contacts.hoursWeekend': {
    ru: 'Сб—Вс: бесплатные консультации',
    en: 'Sat–Sun: free consultations',
    zh: '周六至周日：免费咨询',
  },
  'contacts.address': {
    ru: 'Москва, м. «Бабушкинская», Анадырский проезд, д. 31/1, оф. 31',
    en: 'Moscow, Babushkinskaya metro, Anadyrsky Proezd, 31/1, office 31',
    zh: '莫斯科，巴布什金斯卡亚地铁站，阿纳德尔巷 31/1 号，31 室',
  },
  'company.description': {
    ru: 'Патентное бюро полного цикла. Аккредитованные патентные поверенные с опытом 15+ лет ведут дела в Роспатенте и международных ведомствах. Защищаем изобретения, товарные знаки, промышленные образцы и авторские права.',
    en: 'A full-cycle patent bureau. Accredited patent attorneys with 15+ years of experience handle cases with Rospatent and international offices. We protect inventions, trademarks, industrial designs and copyrights.',
    zh: '全流程专利事务所。拥有 15 年以上经验的认证专利代理人在俄罗斯专利局及国际机构代理案件。保护发明、商标、外观设计与版权。',
  },
  'attorney.roleDirector': { ru: 'Гендиректор', en: 'CEO', zh: '总经理' },
  'attorney.roleAttorney': { ru: 'Патентный поверенный', en: 'Patent attorney', zh: '专利代理人' },
  'attorney.specTrademarks': { ru: 'Патентный поверенный по товарным знакам', en: 'Patent attorney for trademarks', zh: '商标领域专利代理人' },
  'attorney.specPatents': { ru: 'Патентный поверенный по патентам', en: 'Patent attorney for patents', zh: '专利领域专利代理人' },

  // ===== Masters (сервисы и поисковые базы) =====
  'mst.title': { ru: 'Сервисы и поисковые базы', en: 'Services and search databases', zh: '服务与检索数据库' },
  'mst.lead': {
    ru: 'Бесплатные инструменты для проверки товарных знаков, патентов на изобретения, промышленных образцов, доменных имён и программ для ЭВМ. Выберите категорию поиска ниже — мы собрали проверенные сервисы с описанием каждого.',
    en: 'Free tools for checking trademarks, invention patents, industrial designs, domain names and computer programs. Choose a search category below — we have collected proven services with a description of each.',
    zh: '免费核验商标、发明专利、外观设计、域名与计算机软件的在线工具。请在下方选择检索类别 —— 我们汇总了经过验证的服务并附有逐一说明。',
  },
  'mst.nCategories': { ru: 'категорий поиска', en: 'search categories', zh: '个检索类别' },
  'mst.nDatabases': { ru: 'поисковых баз', en: 'search databases', zh: '个检索数据库' },
  'mst.freeCheck': { ru: 'Бесплатная проверка', en: 'Free verification', zh: '免费核验' },
  'mst.openService': { ru: 'Открыть сервис', en: 'Open service', zh: '打开服务' },
  'mst.goSearch': { ru: 'Перейти к поиску', en: 'Go to search', zh: '前往检索' },
  'mst.ctaTitle': { ru: 'Не нашли нужный сервис?', en: "Didn't find the right service?", zh: '没有找到所需服务？' },
  'mst.ctaDesc': {
    ru: 'Свяжитесь с нашими патентными поверенными — поможем подобрать правильный инструмент или проведём поиск за вас.',
    en: 'Contact our patent attorneys — we will help you choose the right tool or run the search for you.',
    zh: '请联系我们的专利代理人 —— 我们将帮您选择合适的工具，或直接代您完成检索。',
  },
  'mst.ctaBtn': { ru: 'Оставить заявку', en: 'Leave a request', zh: '提交申请' },
  'mst.c1Title': { ru: 'Поиск по товарным знакам', en: 'Trademark search', zh: '商标检索' },
  'mst.c1Desc': {
    ru: 'Проверьте оригинальность вашего логотипа, названия или бренда перед регистрацией. Узнайте, не занят ли знак в России и за рубежом.',
    en: 'Check the originality of your logo, name or brand before registration. Find out whether the mark is taken in Russia and abroad.',
    zh: '注册前核验您的标识、名称或品牌的原创性。了解该商标在俄罗斯及海外是否已被注册。',
  },
  'mst.c1b1': { ru: 'Российские и международные базы', en: 'Russian and international databases', zh: '俄罗斯及国际数据库' },
  'mst.c1b2': { ru: 'Проверка по 11 сервисам (LINKMARK, WIPO, USPTO, ФИПС и др.)', en: 'Checks across 11 services (LINKMARK, WIPO, USPTO, FIPS, etc.)', zh: '11 个服务交叉核验（LINKMARK、WIPO、USPTO、FIPS 等）' },
  'mst.c1b3': { ru: 'Сверка с реестром Роспатента', en: 'Verification against the Rospatent registry', zh: '与俄罗斯专利局注册簿比对' },
  'mst.c2Title': { ru: 'Поиск по патентам на изобретения', en: 'Invention patent search', zh: '发明专利检索' },
  'mst.c2Desc': {
    ru: 'Проверьте новизну вашей идеи перед подачей заявки. Найдите аналоги в российских и международных патентных базах.',
    en: 'Verify the novelty of your idea before filing. Find analogues in Russian and international patent databases.',
    zh: '递交申请前核验创意的新颖性。在俄罗斯及国际专利数据库中查找同类方案。',
  },
  'mst.c2b1': { ru: 'Яндекс.Патенты, Google Patents, Espacenet', en: 'Yandex Patents, Google Patents, Espacenet', zh: 'Yandex Patents、Google Patents、Espacenet' },
  'mst.c2b2': { ru: 'Цифровая платформа Роспатента', en: 'Rospatent digital platform', zh: '俄罗斯专利局数字平台' },
  'mst.c2b3': { ru: 'WIPO Patentscope, ЕАПТ, ФИПС', en: 'WIPO Patentscope, EAPO, FIPS', zh: 'WIPO Patentscope、欧亚专利局、FIPS' },
  'mst.c3Title': { ru: 'Поиск по промышленным образцам', en: 'Industrial design search', zh: '外观设计检索' },
  'mst.c3Desc': {
    ru: 'Проверьте оригинальность дизайна изделия. Поиск по российским и международным базам промышленных образцов.',
    en: 'Check the originality of your product design. Search across Russian and international industrial design databases.',
    zh: '核验产品外观的原创性。在俄罗斯及国际外观设计数据库中检索。',
  },
  'mst.c3b1': { ru: 'WIPO Hague Express (международная база)', en: 'WIPO Hague Express (international database)', zh: 'WIPO Hague Express（国际数据库）' },
  'mst.c3b2': { ru: 'TMview Design (европейская база)', en: 'TMview Design (European database)', zh: 'TMview Design（欧洲数据库）' },
  'mst.c3b3': { ru: 'ФИПС — реестр промобразцов РФ', en: 'FIPS — Russian design registry', zh: 'FIPS —— 俄罗斯外观设计注册簿' },
  'mst.c4Title': { ru: 'Поиск по доменным именам', en: 'Domain name search', zh: '域名检索' },
  'mst.c4Desc': {
    ru: 'Проверьте свободность доменного имени в зонах .ru, .рф, .com и других. Подберите подходящее имя для вашего проекта.',
    en: 'Check domain name availability in .ru, .рф, .com and other zones. Pick the right name for your project.',
    zh: '查询 .ru、.рф、.com 等域名的可注册性，为您的项目挑选合适的名称。',
  },
  'mst.c4b1': { ru: 'Официальные регистраторы доменов', en: 'Official domain registrars', zh: '官方域名注册商' },
  'mst.c4b2': { ru: 'Проверка в зонах .ru, .рф, .com, .net, .org', en: 'Checks in .ru, .рф, .com, .net, .org zones', zh: '支持 .ru、.рф、.com、.net、.org 域区查询' },
  'mst.c4b3': { ru: 'Стоимость от 49 ₽ до 200 ₽ за домен', en: 'Price from ₽49 to ₽200 per domain', zh: '每个域名 49 至 200 卢布' },
  'mst.c5Title': { ru: 'Поиск по программам и базам данных', en: 'Software and database search', zh: '软件与数据库检索' },
  'mst.c5Desc': {
    ru: 'Узнайте, как внести свой софт в реестр российского ПО. Проверьте, зарегистрированы ли аналогичные программы в Роспатенте.',
    en: 'Learn how to add your software to the Russian software registry. Check whether similar programs are registered with Rospatent.',
    zh: '了解如何将您的软件纳入俄罗斯软件登记簿。核验同类软件是否已在俄罗斯专利局注册。',
  },
  'mst.c5b1': { ru: 'Реестр российского ПО (Минцифры)', en: 'Russian software registry (Mintsifry)', zh: '俄罗斯软件登记簿（数字部）' },
  'mst.c5b2': { ru: 'ФИПС — реестр программ ЭВМ и баз данных', en: 'FIPS — registry of computer programs and databases', zh: 'FIPS —— 计算机软件与数据库登记簿' },
  'mst.c5b3': { ru: 'Регистрация программ для ЭВМ под ключ', en: 'Turnkey computer program registration', zh: '计算机软件著作权一站式登记' },
  'mst.c6Title': { ru: 'Патентные классификаторы', en: 'Patent classifiers', zh: '专利分类号' },
  'mst.c6Desc': {
    ru: 'Определите правильные классы МКТУ, МПК, МКПО для вашего объекта интеллектуальной собственности. Гибридный подход: ИИ + патентный поверенный.',
    en: 'Determine the correct Nice, IPC and Locarno classes for your intellectual property object. A hybrid approach: AI + patent attorney.',
    zh: '为您的知识产权对象确定正确的尼斯分类、IPC 与洛迦诺分类。混合模式：AI + 专利代理人。',
  },
  'mst.c6b1': { ru: 'МКТУ — 45 классов для товарных знаков', en: 'Nice Classification — 45 classes for trademarks', zh: '尼斯分类 —— 商标 45 个类别' },
  'mst.c6b2': { ru: 'МПК — 70 000+ подклассов для изобретений', en: 'IPC — 70,000+ subclasses for inventions', zh: 'IPC —— 发明 7 万多个子类' },
  'mst.c6b3': { ru: 'МКПО — 32 класса для промышленных образцов', en: 'Locarno — 32 classes for industrial designs', zh: '洛迦诺 —— 外观设计 32 个类别' },

  // ===== SearchDatabasesPage (общий каркас страниц поиска) =====
  'sdb.backToAll': { ru: 'Все сервисы', en: 'All services', zh: '全部服务' },
  'sdb.newTab': { ru: 'Все открываются в новой вкладке', en: 'All open in a new tab', zh: '均在新标签页打开' },
  'sdb.recommendBadge': { ru: 'рекомендуем', en: 'recommended', zh: '推荐' },
  'sdb.helpTitle': { ru: 'Нужна помощь с поиском?', en: 'Need help with a search?', zh: '需要检索帮助？' },
  'sdb.helpDesc': {
    ru: 'Патентные поверенные проведут профессиональный поиск и составят отчёт. Экономия времени и гарантия результата.',
    en: 'Patent attorneys will run a professional search and prepare a report. Time saved and a guaranteed result.',
    zh: '专利代理人为您完成专业检索并出具报告。省时省力，结果有保障。',
  },
  'sdb.orderSearch': { ru: 'Заказать поиск', en: 'Order a search', zh: '委托检索' },

  // ===== patent_poisk =====
  'pp.title': { ru: 'Поиск по патентам на изобретения', en: 'Invention patent search', zh: '发明专利检索' },
  'pp.desc': {
    ru: 'Бесплатные сервисы для проверки новизны вашей идеи перед подачей заявки на патент. 8 российских и международных баз патентов — включая наш собственный AIpat.ru с объединённым ИИ-поиском по Google, WIPO и Роспатенту.',
    en: 'Free services to verify the novelty of your idea before filing a patent application. 8 Russian and international patent databases — including our own AIpat.ru with unified AI search across Google, WIPO and Rospatent.',
    zh: '在递交专利申请前免费核验创意的新颖性。8 个俄罗斯及国际专利数据库 —— 包括自研的 AIpat.ru，一次 AI 检索同时覆盖 Google、WIPO 与俄罗斯专利局。',
  },
  'pp.intro1': {
    ru: 'Перед подачей заявки на патент на изобретение нужно проверить новизну — то есть убедиться, что аналогичного решения ещё не существует. Если аналоги есть — ваша заявка будет отклонена, а пошлина не возвращается.',
    en: 'Before filing an invention patent application you must verify novelty — i.e. make sure no similar solution exists yet. If analogues exist, your application will be rejected and the fee is non-refundable.',
    zh: '递交发明专利申请前必须核验新颖性 —— 即确认尚不存在同类方案。若存在同类方案，申请将被驳回且官费不予退还。',
  },
  'pp.intro2': {
    ru: 'Ниже — 8 проверенных баз патентов. Рекомендуем начать с AIpat.ru — это наш собственный сервис, который объединяет ИИ-поиском сразу несколько баз (Google Patents, WIPO, Роспатент) в одном запросе. Затем можно проверить результаты в каждой отдельной базе — Google Patents, Espacenet, ФИПС. Для научных идей также полезен Google Scholar — там можно найти статьи, которые ещё не стали патентами.',
    en: 'Below are 8 proven patent databases. We recommend starting with AIpat.ru — our own service that unifies AI search across several databases (Google Patents, WIPO, Rospatent) in a single query. You can then verify the results in each individual database — Google Patents, Espacenet, FIPS. For scientific ideas, Google Scholar is also useful — there you can find papers that have not yet become patents.',
    zh: '以下是 8 个经过验证的专利数据库。建议从 AIpat.ru 开始 —— 这是我们的自研服务，一次查询即可通过 AI 同时检索多个数据库（Google Patents、WIPO、俄罗斯专利局）。随后可在各个数据库中逐一复核 —— Google Patents、Espacenet、FIPS。对于科研创意，Google Scholar 也很有用 —— 可以找到尚未成为专利的论文。',
  },
  'pp.dbAipat': {
    ru: 'Объединённый ИИ-поиск патентов по базам Google Patents, WIPO и Роспатента. Один запрос — результаты из всех источников. Наша собственная разработка.',
    en: 'Unified AI patent search across Google Patents, WIPO and Rospatent. One query — results from all sources. Our own development.',
    zh: '通过 AI 统一检索 Google Patents、WIPO 与俄罗斯专利局专利库。一次查询，多源结果。我们的自研产品。',
  },
  'pp.dbGoogle': {
    ru: 'Самая полная международная база патентов, включает РФ, США, Европу, Азию.',
    en: 'The most comprehensive international patent database, covering Russia, the USA, Europe and Asia.',
    zh: '最全面的国际专利数据库，覆盖俄罗斯、美国、欧洲与亚洲。',
  },
  'pp.dbEspacenet': {
    ru: 'Европейское патентное ведомство (ЕПВ). 140+ млн патентных документов.',
    en: 'European Patent Office (EPO). 140+ million patent documents.',
    zh: '欧洲专利局（EPO）。1.4 亿多件专利文献。',
  },
  'pp.dbRosplatform': {
    ru: 'Официальная платформа ФИПС для поиска по российским патентам и знакам.',
    en: 'The official FIPS platform for searching Russian patents and trademarks.',
    zh: 'FIPS 官方平台，可检索俄罗斯专利与商标。',
  },
  'pp.dbPatentscope': {
    ru: 'Международная база ВОИС для заявок PCT и национальных патентов.',
    en: 'The WIPO international database for PCT applications and national patents.',
    zh: 'WIPO 国际数据库，覆盖 PCT 申请与国家专利。',
  },
  'pp.dbEapo': {
    ru: 'Евразийская патентная организация — патенты, действующие в РФ, Беларуси, Казахстане и др.',
    en: 'Eurasian Patent Organization — patents valid in Russia, Belarus, Kazakhstan and others.',
    zh: '欧亚专利组织 —— 适用于俄罗斯、白俄罗斯、哈萨克斯坦等国的专利。',
  },
  'pp.dbFips': {
    ru: 'Официальные реестры Роспатента: изобретения, полезные модели, промобразцы.',
    en: 'Official Rospatent registries: inventions, utility models, industrial designs.',
    zh: '俄罗斯专利局官方登记簿：发明、实用新型、外观设计。',
  },
  'pp.dbScholar': {
    ru: 'Поиск научных публикаций — полезно для проверки новизны изобретения.',
    en: 'Scientific publication search — useful for verifying the novelty of an invention.',
    zh: '学术文献检索 —— 有助于核验发明的新颖性。',
  },

  // ===== patent_poisk_design =====
  'ppd.title': { ru: 'Поиск по промышленным образцам', en: 'Industrial design search', zh: '外观设计检索' },
  'ppd.desc': {
    ru: 'Бесплатные сервисы для проверки оригинальности дизайна изделия перед регистрацией промышленного образца. 3 базы — международная WIPO Hague, европейская TMview Design и официальная база ФИПС.',
    en: 'Free services to check the originality of your product design before registering an industrial design. 3 databases — international WIPO Hague, European TMview Design and the official FIPS database.',
    zh: '在外观设计注册前免费核验产品外观的原创性。3 个数据库 —— 国际 WIPO Hague、欧洲 TMview Design 与 FIPS 官方数据库。',
  },
  'ppd.intro1': {
    ru: 'Промышленный образец — это патент на оригинальный внешний вид изделия: форму телефона, дизайн упаковки, вид мебели. Перед регистрацией нужно убедиться, что аналогичный дизайн уже не запатентован кем-то другим.',
    en: 'An industrial design is a patent for the original appearance of a product: the shape of a phone, packaging design, furniture look. Before registration you need to make sure a similar design is not already patented by someone else.',
    zh: '外观设计是针对产品原创外观的专利：手机造型、包装设计、家具样式等。注册前需确认类似外观尚未被他人申请专利。',
  },
  'ppd.intro2': {
    ru: 'Ниже — 3 проверенные базы. Начните с российской (ФИПС), затем проверьте международную WIPO Hague и европейскую TMview Design. Если похожий дизайн найден — можно изменить отличительные элементы или отказаться от регистрации.',
    en: 'Below are 3 proven databases. Start with the Russian one (FIPS), then check the international WIPO Hague and the European TMview Design. If a similar design is found, you can change the distinctive elements or abandon registration.',
    zh: '以下是 3 个经过验证的数据库。先查俄罗斯（FIPS），再查国际 WIPO Hague 与欧洲 TMview Design。若发现类似外观，可调整差异化设计要素或放弃注册。',
  },
  'ppd.dbHague': {
    ru: 'Международная база ВОИС по промышленным образцам. Самый полный источник по мировым дизайнам.',
    en: 'The WIPO international database of industrial designs. The most comprehensive source on world designs.',
    zh: 'WIPO 国际外观设计数据库。全球外观设计最全面的来源。',
  },
  'ppd.dbTmview': {
    ru: 'Европейская база промышленных образцов EUIPO. Покрывает все страны ЕС.',
    en: 'The EUIPO European database of industrial designs. Covers all EU countries.',
    zh: '欧盟知识产权局（EUIPO）外观设计数据库。覆盖所有欧盟国家。',
  },
  'ppd.dbFips': {
    ru: 'Официальный реестр Роспатента по промышленным образцам РФ.',
    en: 'The official Rospatent registry of Russian industrial designs.',
    zh: '俄罗斯专利局外观设计官方登记簿。',
  },

  // ===== poisk_soft =====
  'ps.title': { ru: 'Поиск по программам и базам данных', en: 'Software and database search', zh: '软件与数据库检索' },
  'ps.desc': {
    ru: 'Бесплатные сервисы для поиска зарегистрированных программ ЭВМ и баз данных. 3 российских реестра — Минцифры, Минсвязи и ФИПС. Проверьте, не зарегистрированы ли аналоги вашего ПО.',
    en: 'Free services for searching registered computer programs and databases. 3 Russian registries — Mintsifry, Minsvyaz and FIPS. Check whether analogues of your software are registered.',
    zh: '免费检索已登记的计算机软件与数据库。3 个俄罗斯登记簿 —— 数字部、通信部与 FIPS。核验您的软件是否已有同类登记。',
  },
  'ps.intro1': {
    ru: 'Регистрация программы для ЭВМ или базы данных в Роспатенте — это самый быстрый и недорогой способ защитить авторские права на софт (1-3 рабочих дня, от 15 000 ₽). Перед регистрацией полезно проверить, не зарегистрированы ли уже аналогичные программы.',
    en: 'Registering a computer program or database with Rospatent is the fastest and least expensive way to protect software copyrights (1–3 business days, from ₽15,000). Before registration it is useful to check whether similar programs are already registered.',
    zh: '在俄罗斯专利局登记计算机软件或数据库是保护软件版权最快、成本最低的方式（1–3 个工作日，15,000 卢布起）。登记前建议先核验是否已有同类软件登记在册。',
  },
  'ps.intro2': {
    ru: 'Ниже — 3 российских реестра. Реестр Минцифры нужен, если вы планируете участвовать в госзакупках или хотите подтвердить российское происхождение ПО. Реестр ФИПС — это база всех зарегистрированных в РФ программ и баз данных.',
    en: 'Below are 3 Russian registries. The Mintsifry registry is needed if you plan to take part in government procurement or want to confirm the Russian origin of the software. The FIPS registry is the database of all programs and databases registered in Russia.',
    zh: '以下是 3 个俄罗斯登记簿。若计划参与政府采购或需证明软件的俄罗斯原产属性，需使用数字部登记簿。FIPS 登记簿则收录了在俄登记的全部软件与数据库。',
  },
  'ps.dbMincifry': {
    ru: 'Актуальный реестр российского ПО Минцифры. Нужен для импортозамещения и госзакупок.',
    en: 'The current Mintsifry registry of Russian software. Required for import substitution and government procurement.',
    zh: '俄罗斯数字部现行软件登记簿。进口替代与政府采购所需。',
  },
  'ps.dbMinsvyaz': {
    ru: 'Старый реестр Минсвязи. Часто дублирует данные Минцифры, но бывает полезен для исторических сведений.',
    en: 'The old Minsvyaz registry. Often duplicates Mintsifry data, but can be useful for historical information.',
    zh: '原通信部旧登记簿。内容多与数字部重复，但对历史信息查询仍有价值。',
  },
  'ps.dbFips': {
    ru: 'Официальная база Роспатента по зарегистрированным программам и БД в РФ.',
    en: 'The official Rospatent database of programs and databases registered in Russia.',
    zh: '俄罗斯专利局在俄登记软件与数据库的官方数据库。',
  },

  // ===== znak_poisk =====
  'zp.title': { ru: 'Поиск по товарным знакам', en: 'Trademark search', zh: '商标检索' },
  'zp.desc': {
    ru: 'Бесплатные сервисы для проверки оригинальности вашего логотипа, названия или бренда. 12 российских и международных баз — включая наш собственный сервис NayTea.ru с ИИ-поиском по реестрам Роспатента, ВОИС и EUIPO.',
    en: 'Free services to check the originality of your logo, name or brand. 12 Russian and international databases — including our own NayTea.ru with AI search across the Rospatent, WIPO and EUIPO registries.',
    zh: '免费核验您的标识、名称或品牌的原创性。12 个俄罗斯及国际数据库 —— 包括自研的 NayTea.ru，以 AI 同时检索俄罗斯专利局、WIPO 与欧盟知识产权局注册簿。',
  },
  'zp.intro1': {
    ru: 'Перед подачей заявки на регистрацию товарного знака обязательно проверьте, не занят ли он в России и за рубежом. Это можно сделать бесплатно через официальные базы Роспатента, ВОИС и коммерческие сервисы. Если знак уже зарегистрирован кем-то другим — вашу заявку отклонят, а пошлину не вернут.',
    en: 'Before filing a trademark registration application, be sure to check whether the mark is taken in Russia and abroad. This can be done free of charge via the official Rospatent and WIPO databases and commercial services. If the mark is already registered by someone else, your application will be rejected and the fee is non-refundable.',
    zh: '递交商标注册申请前，务必核验该商标在俄罗斯及海外是否已被注册。可通过俄罗斯专利局、WIPO 官方数据库及商业服务免费完成。若商标已被他人注册，申请将被驳回且官费不予退还。',
  },
  'zp.intro2': {
    ru: 'Ниже — 12 проверенных сервисов для поиска. Рекомендуем начать с NayTea.ru — это наш собственный сервис, который с помощью ИИ проверяет сразу несколько баз (Роспатент, ВОИС, EUIPO) в одном запросе. Затем можно проверить результаты в каждой отдельной базе — LINKMARK, WIPO, USPTO. Для определения нужных классов МКТУ используйте справочники MKTU.INFO или МКТУ.рус.',
    en: 'Below are 12 proven search services. We recommend starting with NayTea.ru — our own service that uses AI to check several databases (Rospatent, WIPO, EUIPO) in a single query. You can then verify the results in each individual database — LINKMARK, WIPO, USPTO. To determine the right Nice classes, use the MKTU.INFO or MKTU.rus reference books.',
    zh: '以下是 12 个经过验证的检索服务。建议从 NayTea.ru 开始 —— 这是我们的自研服务，一次查询即可通过 AI 核验多个数据库（俄罗斯专利局、WIPO、EUIPO）。随后可在各数据库逐一复核 —— LINKMARK、WIPO、USPTO。确定尼斯分类类别可使用 MKTU.INFO 或 MKTU.рус 查询手册。',
  },
  'zp.dbNaytea': {
    ru: 'Онлайн-проверка товарного знака с помощью ИИ по российским и международным базам. Один запрос — результаты из реестров Роспатента, ВОИС, EUIPO. Наша собственная разработка.',
    en: 'Online AI-powered trademark verification across Russian and international databases. One query — results from the Rospatent, WIPO and EUIPO registries. Our own development.',
    zh: '以 AI 在线核验商标，覆盖俄罗斯及国际数据库。一次查询，同时返回俄罗斯专利局、WIPO、EUIPO 登记簿结果。我们的自研产品。',
  },
  'zp.dbLinkmark': {
    ru: 'Российский и международный поиск знаков. Удобный интерфейс, актуальная база.',
    en: 'Russian and international trademark search. Convenient interface, up-to-date database.',
    zh: '俄罗斯及国际商标检索。界面友好，数据更新及时。',
  },
  'zp.dbRbc': {
    ru: 'База российских компаний и их товарных знаков от РБК.',
    en: 'A database of Russian companies and their trademarks by RBC.',
    zh: 'RBC 旗下的俄罗斯公司及其商标数据库。',
  },
  'zp.dbWipo': {
    ru: 'Международная база ВОИС — самый полный источник по мировым брендам.',
    en: 'The WIPO international database — the most comprehensive source on global brands.',
    zh: 'WIPO 国际数据库 —— 全球品牌信息最全面的来源。',
  },
  'zp.dbTmview': {
    ru: 'Европейская база торговых знаков EUIPO. Включает все страны ЕС.',
    en: 'The EUIPO European trademark database. Covers all EU countries.',
    zh: '欧盟知识产权局（EUIPO）商标数据库。覆盖所有欧盟国家。',
  },
  'zp.dbUnibrander': {
    ru: 'Международный поиск знаков с поддержкой русского языка.',
    en: 'International trademark search with Russian language support.',
    zh: '支持俄语的国际商标检索。',
  },
  'zp.dbUspto': {
    ru: 'Официальная база патентного ведомства США. Данные по американским знакам.',
    en: 'The official database of the US patent office. Data on American trademarks.',
    zh: '美国专利商标局官方数据库。收录美国商标数据。',
  },
  'zp.dbFindtm': {
    ru: 'Российский сервис поиска товарных знаков с экспресс-проверкой.',
    en: 'A Russian trademark search service with express verification.',
    zh: '提供快速核验的俄罗斯商标检索服务。',
  },
  'zp.dbBrandsearch': {
    ru: 'Поиск по российским товарным знакам с фильтрами по классам МКТУ.',
    en: 'Search across Russian trademarks with Nice class filters.',
    zh: '俄罗斯商标检索，支持按尼斯分类筛选。',
  },
  'zp.dbGardium': {
    ru: 'Профессиональный сервис проверки знаков от патентного бюро Гардиум.',
    en: 'A professional trademark verification service by the Gardium patent bureau.',
    zh: 'Gardium 专利事务所提供的专业商标核验服务。',
  },
  'zp.dbMktuInfo': {
    ru: 'Справочник классов МКТУ с поиском по товарам и услугам.',
    en: 'A Nice Classification class reference with search across goods and services.',
    zh: '尼斯分类类别手册，支持按商品与服务检索。',
  },
  'zp.dbMktuRus': {
    ru: 'Российский справочник МКТУ с актуальной базой классов.',
    en: 'A Russian Nice Classification reference with an up-to-date class database.',
    zh: '俄罗斯尼斯分类手册，类别数据库持续更新。',
  },

  // ===== Magazine (магазин знаков) =====
  'mag.h1': { ru: 'Магазин товарных знаков', en: 'Trademark marketplace', zh: '商标交易市场' },
  'mag.lead': {
    ru: 'Каталог готовых зарегистрированных товарных знаков для вашего бизнеса. Прямые контакты продавцов, полная юридическая поддержка, безопасные сделки.',
    en: 'A catalog of ready registered trademarks for your business. Direct contacts of sellers, full legal support, secure deals.',
    zh: '适用于您业务需求的已注册商标目录。卖家直接联系、全程法律支持、交易安全有保障。',
  },
  'mag.f1Title': { ru: '760+ знаков', en: '760+ marks', zh: '760+ 枚商标' },
  'mag.f1Desc': {
    ru: 'Готовые зарегистрированные товарные знаки в каталоге',
    en: 'Ready registered trademarks in the catalog',
    zh: '目录内全部为已注册的现成商标',
  },
  'mag.f2Title': { ru: 'Проверка ФИПС', en: 'FIPS verification', zh: 'FIPS 核验' },
  'mag.f2Desc': {
    ru: 'Все знаки проверены в базе Роспатента',
    en: 'All marks are verified in the Rospatent database',
    zh: '所有商标均经俄罗斯专利局数据库核验',
  },
  'mag.f3Title': { ru: 'Прямые контакты', en: 'Direct contacts', zh: '直接联系' },
  'mag.f3Desc': {
    ru: 'Связь с продавцом без посредников и комиссий',
    en: 'Contact the seller directly, no middlemen or commissions',
    zh: '与卖家直接联系，无中间商、无佣金',
  },
  'mag.searchPlaceholder': {
    ru: 'Поиск по названию, номеру, продавцу...',
    en: 'Search by name, number, seller...',
    zh: '按名称、注册号、卖家搜索…',
  },
  'mag.classFilter': { ru: 'Класс МКТУ', en: 'Nice class', zh: '尼斯类别' },
  'mag.allClasses': { ru: 'Все классы', en: 'All classes', zh: '全部类别' },
  'mag.sortBy': { ru: 'Сортировка', en: 'Sort by', zh: '排序' },
  'mag.sortDefault': { ru: 'По умолчанию', en: 'Default', zh: '默认' },
  'mag.sortPriceAsc': { ru: 'Цена: по возрастанию', en: 'Price: low to high', zh: '价格：从低到高' },
  'mag.sortPriceDesc': { ru: 'Цена: по убыванию', en: 'Price: high to low', zh: '价格：从高到低' },
  'mag.sortName': { ru: 'По названию (А-Я)', en: 'By name (A-Z)', zh: '按名称 (A-Z)' },
  'mag.niceBadge': { ru: 'МКТУ', en: 'Nice', zh: '尼斯' },
  'mag.negotiable': { ru: 'Договорная', en: 'Negotiable', zh: '面议' },
  'mag.mlnRub': { ru: 'млн ₽', en: 'M ₽', zh: '百万 ₽' },
  'mag.kRub': { ru: 'K ₽', en: 'K ₽', zh: '千 ₽' },
  'mag.noResults': {
    ru: 'Не найдено знаков по вашим фильтрам',
    en: 'No marks match your filters',
    zh: '没有符合筛选条件的商标',
  },
  'mag.resetFilters': { ru: 'Сбросить фильтры', en: 'Reset filters', zh: '重置筛选' },
  'mag.showMore': { ru: 'Показать ещё', en: 'Show more', zh: '加载更多' },

  // ===== Logo-lab (chrome) =====
  'lab.backHome': { ru: 'На главную', en: 'Back to home', zh: '返回首页' },
  'lab.h1a': { ru: 'Пятнадцать вариантов анимации', en: 'Fifteen animation variants', zh: '十五种动画变体' },
  'lab.h1b': { ru: 'логотипа 音', en: 'of the 音 logo', zh: '音 字标' },
  'lab.lead': {
    ru: 'Полная галерея динамических вариантов в стиле Техно-Зен: Zentex — от плавного дыхания до комбо-эффектов с частицами, электрическими разрядами и сканирующими лучами. Все анимации в темпе глубокого дзен-дыхания (8–32 секунды на цикл), на чистом CSS, без JS-нагрузки.',
    en: 'The full gallery of dynamic variants in the Techno-Zen: Zentex style — from smooth breathing to combo effects with particles, electric discharges and scanning beams. All animations run at a deep zen-breathing tempo (8–32 seconds per cycle), in pure CSS, with no JS overhead.',
    zh: '「科技禅 · Zentex」风格动态变体完整图鉴 —— 从平缓呼吸到粒子、电弧与扫描光束的组合特效。所有动画均以深度禅息节奏运行（每循环 8–32 秒），纯 CSS 实现，无 JS 负担。',
  },

  // ===== Архив [...slug] =====
  'arch.breadcrumbsAria': { ru: 'Хлебные крошки', en: 'Breadcrumbs', zh: '面包屑导航' },
  'arch.source': { ru: 'Источник:', en: 'Source:', zh: '来源：' },
  'arch.symbols': { ru: 'симв.', en: 'chars', zh: '字符' },
  'arch.images': { ru: 'изображ.', en: 'images', zh: '图片' },
  'arch.links': { ru: 'ссылок', en: 'links', zh: '链接' },
  'arch.emptyComment': { ru: '// Контент страницы пуст', en: '// Page content is empty', zh: '// 页面内容为空' },
  'arch.emptyDesc': {
    ru: 'Содержимое не было извлечено из исходной страницы.',
    en: 'The content was not extracted from the source page.',
    zh: '未能从源页面提取内容。',
  },
  'arch.galleryHeading': { ru: '// Изображения на странице', en: '// Images on the page', zh: '// 页面图片' },
  'arch.moreImages': { ru: '…и ещё {n} изображений', en: '…and {n} more images', zh: '…还有 {n} 张图片' },
  'arch.tocHeading': { ru: '// Содержание', en: '// Table of contents', zh: '// 目录' },
  'arch.linksHeading': { ru: '// Ссылки по теме', en: '// Related links', zh: '// 相关链接' },
  'arch.toHome': { ru: 'На главную', en: 'Back to home', zh: '返回首页' },
  'arch.notFound': { ru: 'Страница не найдена', en: 'Page not found', zh: '页面未找到' },

  // ===== Theme toggle =====
  'tt.lightOn': { ru: 'Включить светлую тему', en: 'Switch to light theme', zh: '切换为浅色主题' },
  'tt.darkOn': { ru: 'Включить тёмную тему', en: 'Switch to dark theme', zh: '切换为深色主题' },
  'tt.light': { ru: 'Светлая тема', en: 'Light theme', zh: '浅色主题' },
  'tt.dark': { ru: 'Тёмная тема', en: 'Dark theme', zh: '深色主题' },

  // ===== Logo-showcase (варианты на главной) =====
  'show.heading': {
    ru: 'Пятнадцать вариантов анимации логотипа',
    en: 'Fifteen logo animation variants',
    zh: '十五种字标动画变体',
  },
  'show.v1Hint': { ru: 'плавное дыхание glow + zoom', en: 'smooth glow + zoom breathing', zh: '辉光与缩放的平缓呼吸' },
  'show.v2Hint': { ru: 'вращающееся кольцо с точкой', en: 'rotating ring with a dot', zh: '带光点的旋转圆环' },
  'show.v3Hint': { ru: 'RGB-сдвиг + микро-дрожание', en: 'RGB shift + micro-jitter', zh: 'RGB 偏移 + 微颤动' },
  'show.v4Hint': { ru: 'световая полоса сверху вниз', en: 'light bar top to bottom', zh: '光带自上而下扫过' },
  'show.v5Hint': { ru: '8 частиц разлетаются наружу', en: '8 particles burst outward', zh: '8 粒子向外迸发' },
  'show.v6Hint': { ru: 'высокочастотное мерцание + молнии', en: 'high-frequency flicker + lightning', zh: '高频闪烁 + 边缘闪电' },
  'show.v7Hint': { ru: 'v5 + v6 — частицы и электрические разряды', en: 'v5 + v6 — particles and electric discharges', zh: 'v5 + v6 —— 粒子与电弧' },
  'show.v8Hint': { ru: 'v3 + v4 — RGB-дрейф и сканирующий луч', en: 'v3 + v4 — RGB drift and scanning beam', zh: 'v3 + v4 —— RGB 漂移与扫描光束' },
  'show.v9Hint': { ru: 'v3+v4+v5+v6 — все четыре эффекта в одной 32с синхронизации', en: 'v3+v4+v5+v6 — all four effects in one 32s sync', zh: 'v3+v4+v5+v6 —— 四重特效 32 秒同步' },
  'show.v10Label': { ru: 'Lighthouse (Маяк)', en: 'Lighthouse', zh: '灯塔' },
  'show.v10Hint': { ru: 'вращающийся луч света — иероглиф 音 как маяк в тумане', en: 'a rotating light beam — the 音 glyph as a lighthouse in fog', zh: '旋转光束 —— 音 字标如雾中灯塔' },
  'show.v11Hint': { ru: 'луч вращается вокруг оси иероглифа — 3D-маяк, а не круговой обход', en: 'the beam rotates around the glyph axis — a 3D lighthouse, not a circular sweep', zh: '光束绕字标轴旋转 —— 3D 灯塔而非平面环绕' },
  'show.v12Hint': { ru: 'три дискретных положения луча: слева вбок → на зрителя → справа вбок (маяк-маятник)', en: 'three discrete beam positions: left → viewer → right (lighthouse pendulum)', zh: '光束三个离散位置：左 → 观者 → 右（灯塔摆锤）' },
  'show.v13Hint': { ru: 'маяк V10 без внешней рамки — сетка и уголки сохранены, 音 чисто синий', en: 'the V10 lighthouse without the outer frame — grid and corners kept, 音 pure blue', zh: '去掉外框的 V10 灯塔 —— 保留网格与四角，音 为纯蓝' },
  'show.v14Hint': { ru: 'чистый синий 音 на прозрачном фоне — только сетка и уголки, без эффектов', en: 'a pure blue 音 on a transparent background — only grid and corners, no effects', zh: '透明背景上的纯蓝 音 —— 仅网格与四角，无特效' },
  'show.v15Hint': { ru: 'минимал V14 + тонкая вертикальная линия скользит слева направо по иероглифу', en: 'minimal V14 + a thin vertical line glides left to right across the glyph', zh: '极简 V14 + 细垂直线自左向右掠过字标' },
  'show.lead': {
    ru: 'Пятнадцать динамических вариантов в стиле Техно-Зен: Zentex — темп глубокого дыхания, циклы 8–32 секунды, плавные переходы, без резких вспышек. На чистом CSS, без JS-нагрузки.',
    en: 'Fifteen dynamic variants in the Techno-Zen: Zentex style — deep-breathing tempo, 8–32 second cycles, smooth transitions, no harsh flashes. Pure CSS, no JS overhead.',
    zh: '十五种「科技禅 · Zentex」风格动态变体 —— 深呼吸节奏、8–32 秒循环、平滑过渡、无刺眼闪烁。纯 CSS 实现，无 JS 负担。',
  },

  // ===== Root metadata =====
  'meta.title': {
    ru: 'IQin — интеллектуальная собственность нового поколения | ИИ в патентовании и разработке сайтов',
    en: 'IQin — Next-Generation Intellectual Property | AI in Patenting and Web Development',
    zh: 'IQin —— 新一代知识产权 | AI 专利与网站开发',
  },
  'meta.description': {
    ru: 'IQin.ru — ультрасовременная платформа интеллектуальной собственности. Создание патентов с ИИ, разработка сайтов с ИИ, регистрация товарных знаков, патентование изобретений, защита авторских прав.',
    en: 'IQin.ru — an ultra-modern intellectual property platform. AI-powered patent creation, AI website development, trademark registration, invention patenting, copyright protection.',
    zh: 'IQin.ru —— 超现代知识产权平台。AI 专利撰写、AI 网站开发、商标注册、发明专利申请、版权保护。',
  },
  'meta.ogTitle': { ru: 'IQin — интеллектуальная собственность нового поколения', en: 'IQin — Next-Generation Intellectual Property', zh: 'IQin —— 新一代知识产权' },
  'meta.ogDesc': {
    ru: 'Создание патентов с ИИ и разработка сайтов с ИИ. Полный спектр услуг по защите интеллектуальной собственности.',
    en: 'AI-powered patent creation and AI website development. A full range of intellectual property protection services.',
    zh: 'AI 专利撰写与 AI 网站开发。全方位知识产权保护服务。',
  },

  // ===== Masters layout metadata =====
  'mst.metaTitle': { ru: 'Сервисы и поисковые базы — IQin', en: 'Services and search databases — IQin', zh: '服务与检索数据库 —— IQin' },
  'mst.metaDesc': {
    ru: 'Бесплатные сервисы для проверки товарных знаков, патентов на изобретения, промышленных образцов, доменных имён и программ для ЭВМ. 25+ поисковых баз в одном месте.',
    en: 'Free services for checking trademarks, invention patents, industrial designs, domain names and computer programs. 25+ search databases in one place.',
    zh: '免费核验商标、发明专利、外观设计、域名与计算机软件。25+ 个检索数据库一站汇集。',
  },
  'mkt.metaTitle': { ru: 'Продать или Купить готовый Товарный знак Торговую Марку Бренд Логотип', en: 'Sell or Buy a Ready-Made Trademark, Brand or Logo', zh: '出售或购买现成商标、品牌与标识' },
  'mkt.metaDesc': {
    ru: 'Продать или купить готовый зарегистрированный товарный знак, торговую марку, бренд или логотип. 760+ знаков с проверкой в Роспатенте. Прямые контакты продавцов, без комиссий.',
    en: 'Sell or buy a ready registered trademark, brand or logo. 760+ marks verified with Rospatent. Direct contacts of sellers, no commissions.',
    zh: '出售或购买已注册的现成商标、品牌或标识。760+ 枚商标经俄罗斯专利局核验。卖家直接联系，无佣金。',
  },
} as const;

export type TranslationKey = keyof typeof translations;

/** Прямое получение перевода по ключу и языку (для серверных компонентов) */
export function t(key: TranslationKey, lang: Lang): string {
  const entry = translations[key] as { ru: string; en: string; zh: string } | undefined;
  return entry ? entry[lang] : key;
}

/**
 * Разбор языка из cookie-строки ("lang=en; other=1" → 'en').
 * Принимает и чистое значение ("en"). Неизвестное — DEFAULT_LANG.
 */
export function parseLang(cookie: string | null | undefined): Lang {
  if (!cookie) return DEFAULT_LANG;
  const m = cookie.match(/(?:^|[\s;])lang=(ru|en|zh)(?:[\s;,]|$)/);
  if (!m) return DEFAULT_LANG;
  return m[1] === 'en' || m[1] === 'zh' ? (m[1] as Lang) : 'ru';
}

// ===== Плюрализаторы (RU-морфология + EN/ZH) =====

/** «N поисковых баз / база / базы» */
export function tDatabases(n: number, lang: Lang): string {
  if (lang === 'en') return `${n} search database${n === 1 ? '' : 's'}`;
  if (lang === 'zh') return `${n} 个检索数据库`;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} поисковая база`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} поисковые базы`;
  return `${n} поисковых баз`;
}

/** «N рекомендуемых / рекомендуемая / рекомендуемые» */
export function tRecommended(n: number, lang: Lang): string {
  if (lang === 'en') return `${n} recommended`;
  if (lang === 'zh') return `${n} 个推荐`;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} рекомендуемая`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} рекомендуемые`;
  return `${n} рекомендуемых`;
}

/** «Найдено: N знаков / знак / знака» (магазин) */
export function tFoundMarks(n: number, lang: Lang): string {
  if (lang === 'en') return `Found: ${n} mark${n === 1 ? '' : 's'}`;
  if (lang === 'zh') return `找到：${n} 枚商标`;
  const mod10 = n % 10;
  const mod100 = n % 100;
  let word: string;
  if (mod10 === 1 && mod100 !== 11) word = 'знак';
  else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) word = 'знака';
  else word = 'знаков';
  return `Найдено: ${n} ${word}`;
}

/** «Показать ещё N знаков» */
export function tShowMore(n: number, lang: Lang): string {
  if (lang === 'en') return `Show ${n} more`;
  if (lang === 'zh') return `加载更多 ${n} 枚`;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `Показать ещё ${n} знак`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `Показать ещё ${n} знака`;
  return `Показать ещё ${n} знаков`;
}

/** «N ссылок / ссылка / ссылки» (архив) */
export function tLinksCount(n: number, lang: Lang): string {
  if (lang === 'en') return `${n} links`;
  if (lang === 'zh') return `${n} 个链接`;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} ссылка`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} ссылки`;
  return `${n} ссылок`;
}
