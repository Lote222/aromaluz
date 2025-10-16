import HeroSection from "@/components/home/HeroSection";
import ProductsSection from "@/components/home/ProductsSection";
import WinnerHighlight from "@/components/home/WinnerHighlight";
import TrustSection from "@/components/home/TrustSection";
import FaqSection from "@/components/home/FaqSection";
import Link from 'next/link';
// FIX: Se importa la nueva función para obtener el ganador
import { getLatestWinnerForSite, getRitualsForSite } from "@/lib/supabaseClient";


const KnowledgeSection = () => (
  <section className="py-20 bg-background">
    <div className="container mx-auto px-6 text-center">
       <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
        Conocimiento Ancestral
      </h2>
      <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
        Explora nuestros consejos y secretos para potenciar tu práctica espiritual y atraer la buena fortuna a tu vida.
      </p>
      <Link href="/tips">
        <span className="border border-primary text-primary font-bold text-lg py-3 px-8 rounded-full hover:bg-primary hover:text-background hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 cursor-pointer">
          Leer Nuestros Tips
        </span>
      </Link>
    </div>
  </section>
);

// FIX: La página ahora es 'async' para poder buscar los datos
export default async function HomePage() {
  // Se obtiene el último ganador usando el slug del .env
  const winner = await getLatestWinnerForSite(process.env.WEBSITE_SLUG);
  const rituals = await getRitualsForSite(process.env.WEBSITE_SLUG);

  return (
    <>
    <HeroSection />
      {/* FIX: Pasamos los rituales obtenidos como prop */}
      <ProductsSection rituals={rituals} />
      <WinnerHighlight winner={winner} />
      <TrustSection />
      <KnowledgeSection />
      <FaqSection />
    </>
  );
}