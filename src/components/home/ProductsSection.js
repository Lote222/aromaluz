'use client';
import { products } from '@/lib/mockData';
import AnimatedProductCard from '@/components/ui/AnimatedProductCard';
import Link from 'next/link'; // Importamos Link para el botón

const ProductsSection = () => {
  // FIX: Seleccionamos solo los primeros 6 productos para la home.
  const featuredProducts = products.slice(0, 6);

  return (
    <section id="rituales" className="py-20 bg-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Nuestros Rituales Sagrados
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Cada kit es una puerta a la transformación, preparado con ingredientes consagrados y una intención pura.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.map((product, index) => (
            <AnimatedProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        {/* FIX: Se añade el botón para ver todos los rituales */}
        <div className="text-center mt-16">
          <Link href="/rituales" className="bg-primary text-background font-bold text-lg py-4 px-10 rounded-full hover:bg-emerald-600 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 inline-block cursor-pointer">
            Ver Todos los Rituales
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;