import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { AiServices } from "@/components/site/ai-services";
import { Services } from "@/components/site/services";
import { Stats } from "@/components/site/stats";
import { Process } from "@/components/site/process";
import { Cta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";
import { SkipLink } from "@/components/site/skip-link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background bg-grid-mm-page">
      {/* Skip to content (a11y) */}
      <SkipLink />

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
