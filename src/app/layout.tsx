import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { getLang } from "@/lib/i18n/server";
import { t } from "@/lib/i18n/translations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-tech",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-cjk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

/** Metadata ×3 по Закону №3 — язык берётся из cookie/заголовка (SSR) */
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return {
  title: t('meta.title', lang),
  description: t('meta.description', lang),
  keywords: [
    "патент",
    "товарный знак",
    "интеллектуальная собственность",
    "ИИ",
    "AI",
    "создание патентов",
    "разработка сайтов",
    "патентный поверенный",
    "Роспатент",
    "IQin",
  ],
  authors: [{ name: "IQin" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: t('meta.ogTitle', lang),
    description: t('meta.ogDesc', lang),
    url: "https://iqin.ru",
    siteName: "IQin",
    type: "website",
    locale: lang === 'ru' ? 'ru_RU' : lang === 'en' ? 'en_US' : 'zh_CN',
  },
  twitter: {
    card: "summary_large_image",
    title: t('meta.ogTitle', lang),
    description: t('meta.ogDesc', lang),
  },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLang();

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${notoSansSC.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
