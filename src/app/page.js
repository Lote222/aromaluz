// src/app/page.js
import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";
import WinnerHighlight from "@/components/home/WinnerHighlight";
import TrustSection from "@/components/home/TrustSection";
import FaqSection from "@/components/home/FaqSection";
import Link from 'next/link';
// FIX: Se importan las funciones correctas
import { getSorteoFortunaData, getRitualsForSite } from "@/lib/supabaseClient";

const KnowledgeSection = () => (
    <section className="py-20 bg-background text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Conocimiento Astral</h2>
        <p className="text-lg text-muted max-w-2xl mx-auto mb-8">Explora nuestros consejos y secretos para potenciar tu práctica espiritual.</p>
        <Link href="/tips" className="border border-secondary text-foreground font-bold text-lg py-3 px-8 rounded-full hover:bg-secondary hover:text-background transition-all duration-300">
            Leer Nuestros Tips
        </Link>
    </section>
);

export default async function HomePage() {
  // FIX: Se obtienen los datos del nuevo sorteo y los rituales
  const { latestPastDraw, nextFutureDraw } = await getSorteoFortunaData(process.env.WEBSITE_SLUG);
  const rituals = await getRitualsForSite(process.env.WEBSITE_SLUG);

  return (
    <>
      <HeroSection />
      <ProductsSection rituals={rituals} />
      {/* FIX: Se pasan los datos del sorteo al componente del home */}
      <WinnerHighlight latestPastDraw={latestPastDraw} nextFutureDraw={nextFutureDraw} />
      <TrustSection />
      <KnowledgeSection />
      <FaqSection />
    </>
  );
}