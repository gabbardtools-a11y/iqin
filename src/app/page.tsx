import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { AiServices } from "@/components/site/ai-services";
import { Services } from "@/components/site/services";
import { Stats } from "@/components/site/stats";
import { Process } from "@/components/site/process";
import { Cta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background bg-grid-mm-page">
      {/* Skip to content (a11y) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-neon focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Перейти к содержимому
      </a>

      <Header />

      <main id="main" className="flex-1">
        <Hero />
        <AiServices />
        <Services />
        <Stats />
        <Process />
        <Cta />
      </main>

      <Footer />
    </div>
  );
}
