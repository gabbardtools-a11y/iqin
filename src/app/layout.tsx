import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

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

export const metadata: Metadata = {
  title: "IQin — Патентные технологии нового поколения | ИИ в патентовании и разработке сайтов",
  description:
    "IQin.ru — ультрасовременная платформа интеллектуальной собственности. Создание патентов с ИИ, разработка сайтов с ИИ, регистрация товарных знаков, патентование изобретений, защита авторских прав.",
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
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "IQin — Патентные технологии нового поколения",
    description:
      "Создание патентов с ИИ и разработка сайтов с ИИ. Полный спектр услуг по защите интеллектуальной собственности.",
    url: "https://iqin.ru",
    siteName: "IQin",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "IQin — Патентные технологии нового поколения",
    description:
      "Создание патентов с ИИ и разработка сайтов с ИИ. Полный спектр услуг по защите интеллектуальной собственности.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
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
