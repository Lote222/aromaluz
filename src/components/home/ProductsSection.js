// FIX: Ya no es un 'use client' component
import AnimatedProductCard from '@/components/ui/AnimatedProductCard';
import Link from 'next/link';

// FIX: El componente ahora recibe 'rituals' como prop
const ProductsSection = ({ rituals }) => {
  // FIX: Seleccionamos los primeros 6 rituales de los datos recibidos
  const featuredRituals = rituals.slice(0, 6);

  if (!featuredRituals || featuredRituals.length === 0) {
     return (
      <section id="rituales" className="py-20 bg-background text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
          Nuestros Rituales Sagrados
        </h2>
        <p className="text-lg text-muted mt-4 max-w-2xl mx-auto">
          No hay rituales disponibles en este momento.
        </p>
      </section>
    );
  }

  return (
    <section id="rituales" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">
            Nuestros Rituales Sagrados
          </h2>
          <p className="text-lg text-muted mt-4 max-w-2xl mx-auto">
            Cada kit es una puerta a la transformación, preparado con ingredientes consagrados y una intención pura.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredRituals.map((ritual, index) => (
            <AnimatedProductCard 
              key={ritual.id} 
              product={{
                id: ritual.id,
                name: ritual.name,
                description: ritual.description,
                imageSrc: ritual.image_url,
              }} 
              index={index} 
            />
          ))}
        </div>
        <div className="text-center mt-16">
          <Link href="/rituales" className="bg-primary text-background font-bold text-lg py-4 px-10 rounded-full hover:bg-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 inline-block cursor-pointer">
            Ver Todos los Rituales
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;