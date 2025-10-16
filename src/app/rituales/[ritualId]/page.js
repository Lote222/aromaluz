// src/app/rituales/[ritualId]/page.js
// FIX: Eliminamos mockData y importamos getRitualsForSite
// import { products } from '@/lib/mockData';
import { getRitualsForSite, getWebsiteConfig } from '@/lib/supabaseClient'; 
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

// FIX: generateStaticParams debe ser asíncrona y usar datos reales
export async function generateStaticParams() {
  const rituals = await getRitualsForSite(process.env.WEBSITE_SLUG);
  return rituals.map((ritual) => ({
    ritualId: ritual.id.toString(),
  }));
}

// FIX: getProductData ahora buscará en la base de datos
const getRitualData = async (id) => {
  const websiteSlug = process.env.WEBSITE_SLUG;
  const { data: websiteData, error: websiteError } = await getWebsiteConfig(websiteSlug);

  if (websiteError || !websiteData) {
    console.error('Error fetching website ID for ritual detail:', websiteError?.message);
    return null;
  }

  const { data: ritual, error } = await supabase
    .from('rituales')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching single ritual:', error.message);
    return null;
  }
  return ritual;
};

const WhatsAppButton = ({ productName, whatsappNumber }) => {
  const message = `Hola, estoy interesado en el "${productName}". Quisiera más información.`;
  const encodedMessage = encodeURIComponent(message);
  const link = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 w-full text-center bg-primary text-background font-bold text-xl py-4 px-8 rounded-full hover:bg-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1"
    >
      <span>💬</span>
      <span>Solicita este paquete por WhatsApp</span>
    </a>
  );
};

const ProductDetailPage = async ({ params }) => {
  const { ritualId } = params;
  // FIX: Usamos la función actualizada para obtener los datos
  const ritual = await getRitualData(ritualId);
  
  const siteConfig = await getWebsiteConfig(process.env.WEBSITE_SLUG);
  const whatsappNumber = siteConfig?.whatsapp_number || '';

  if (!ritual) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="sticky top-28">
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-primary/20 shadow-lg">
            <Image
              src={ritual.image_url} // FIX: Usamos image_url de los datos reales
              alt={`Imagen del ${ritual.name}`}
              fill
              style={{ objectFit: 'cover' }}
            />
             <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent"></div>
          </div>
          {/* Placeholder for multiple images */}
          <div className="flex justify-center space-x-4 mt-4">
            <div className="w-20 h-20 border-2 border-primary rounded-md bg-cover bg-center" style={{backgroundImage: `url(${ritual.image_url})`}}></div>
            <div className="w-20 h-20 border-2 border-secondary/20 rounded-md bg-background/50"></div>
            <div className="w-20 h-20 border-2 border-secondary/20 rounded-md bg-background/50"></div>
          </div>
        </div>

        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            {ritual.name}
          </h1>
          <p className="text-lg text-muted mb-6 leading-relaxed">
            {ritual.description}
          </p>

          <div className="bg-background/50 border border-primary/20 rounded-lg p-6 mb-6">
            <h3 className="font-serif text-2xl text-primary font-semibold mb-4">
              Ingredientes Sagrados
            </h3>
            {/* FIX: Si tienes una columna 'ingredients' en Supabase, la usas aquí. 
                Por ahora, si no existe o está vacía, mostramos el mensaje predeterminado.
                Si tu tabla de rituales tiene una columna 'ingredients' como JSONB,
                puedes adaptarlo para renderizarla. */}
            {ritual.ingredients && ritual.ingredients.length > 0 ? (
              <ul className="space-y-3">
                {ritual.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center text-muted">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted italic">Consulta por WhatsApp para conocer los ingredientes específicos de este paquete.</p>
            )}
          </div>

          <div className="mb-8">
            <h3 className="font-serif text-2xl text-primary font-semibold mb-4">
              Testimonios de Clientes
            </h3>
            <div className="bg-background/50 border border-primary/20 rounded-lg p-6 text-center italic text-muted">
              <p>&quot;Este ritual cambió mi vida. Sentí una paz y una claridad que no había experimentado antes.&quot;</p>
              <p className="font-semibold text-primary mt-2">- Cliente Satisfecho</p>
            </div>
          </div>

          <div className="sticky bottom-6">
             <WhatsAppButton productName={ritual.name} whatsappNumber={whatsappNumber} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;