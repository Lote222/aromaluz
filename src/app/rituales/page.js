// src/app/rituales/page.js
// FIX: Eliminamos la importación de mockData
// import { products } from '@/lib/mockData';
// FIX: Importamos la función para obtener rituales
import { getRitualsForSite } from '@/lib/supabaseClient';
import ProductCard from '@/components/ui/ProductCard';
import Image from 'next/image';

const AllRitualsPage = async () => {
  // FIX: Obtenemos los rituales desde Supabase
  const rituals = await getRitualsForSite(process.env.WEBSITE_SLUG);

  return (
    <div>
      <section className="relative py-20 md:py-32 text-center overflow-hidden">
        <Image
          src="/backgroundHer.jpg"
          alt="Fondo de la página de rituales"
          fill
          style={{ objectFit: 'cover' }}
          quality={75}
          className="-z-10"
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm -z-10"></div>
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary">
            Todos Nuestros Rituales
          </h1>
          <p className="text-lg md:text-xl text-muted mt-4 max-w-3xl mx-auto">
            Encuentra la herramienta sagrada perfecta para tu intención. Cada paquete está consagrado y listo para transformar tu energía.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* FIX: Mapeamos los datos reales de 'rituals' */}
            {rituals.map((ritual) => (
              <ProductCard 
                key={ritual.id} 
                product={{
                  id: ritual.id,
                  name: ritual.name,
                  description: ritual.description,
                  imageSrc: ritual.image_url,
                  ingredients: ritual.ingredients || [] // Aseguramos que 'ingredients' exista
                }} 
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllRitualsPage;