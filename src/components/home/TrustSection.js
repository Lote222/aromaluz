import Image from 'next/image';

const TrustSection = () => {
  return (
    <section className="py-20 bg-background/70">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Nuestra Misión
            </h2>
            <p className="text-lg text-muted mb-6 leading-relaxed">
              &quot;Mi camino en el esoterismo comenzó como una búsqueda personal de paz y propósito. Hoy, mi misión es compartir la sabiduría ancestral que transformó mi vida, ofreciendo herramientas auténticas y poderosas para que tú también puedas manifestar tus sueños y proteger tu energía. Cada ritual es una extensión de mi compromiso contigo.&quot;
            </p>
            <p className="font-serif text-xl text-primary font-semibold">
              - Isabella &quot;Luna&quot; Valeriano
            </p>
            <p className="text-muted">
              Fundadora de Aromaluz Esotéric
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-secondary/30 shadow-2xl shadow-secondary/20">
              <Image
                src="/Luna.png" // Placeholder for founder's image
                alt="Fundadora de Herbolaria Sagrada"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;