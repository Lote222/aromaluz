import WinnerDisplay from '@/components/sorteo/WinnerDisplay';
import Link from 'next/link';
// FIX: Importamos la función getWinnersForSite que ya filtra por fecha y límite
import { getWinnersForSite } from '@/lib/supabaseClient';
import { ShieldCheck } from 'lucide-react';

const WinnersList = ({ winners }) => {
  return (
    <div className="bg-background/50 border border-primary/20 rounded-lg p-8 mt-16">
      <h3 className="text-3xl font-serif font-bold text-center text-primary mb-8">
        Muro de Ganadores
      </h3>
      <div className="max-w-2xl mx-auto">
        {winners && winners.length > 0 ? (
          <ul className="space-y-4">
            {winners.map((winner, index) => (
              <li key={index} className="flex items-center bg-background/30 p-4 rounded-md transition-all duration-200 ease-in-out hover:bg-secondary/20 hover:scale-105">
                <ShieldCheck className="w-6 h-6 text-primary mr-4 flex-shrink-0" />
                <div className="flex-grow">
                  <p className="font-semibold text-foreground">{winner.nombre_ganador}</p>
                  <p className="text-sm text-muted">{winner.nombre_premio}</p>
                </div>
                {/* FIX: Formato de fecha corregido y simplificado */}
                <p className="text-sm text-muted">{new Date(winner.fecha_sorteo).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted">Aún no hay ganadores registrados para este sitio.</p>
        )}
      </div>
    </div>
  );
};

const LotteryPage = async () => {
  // FIX: getWinnersForSite ya viene filtrado y limitado
  const winners = await getWinnersForSite(process.env.WEBSITE_SLUG);
  const latestWinner = winners?.[0] || null; // El más reciente será el primero en la lista ya ordenada

  return (
    <div>
      <section className="relative py-20 md:py-32 text-center bg-cover bg-center" style={{backgroundImage: "url('/mystical-background.jpg')"}}>
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary">
            Círculo de la Suerte
          </h1>
          <p className="text-lg md:text-xl text-muted mt-4 max-w-3xl mx-auto">
            Celebramos la confianza y la energía que depositas en nuestro universo. Cada semana, un cliente afortunado es elegido.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <WinnerDisplay winner={latestWinner} />
          <WinnersList winners={winners} />

          <div className="text-center mt-20">
            <h2 className="text-4xl font-serif font-bold text-primary mb-4">
              ¿Quieres ser el próximo?
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              Cada ritual que adquieres no solo te acerca a tus metas, sino que también te inscribe automáticamente en nuestro Círculo de la Suerte semanal.
            </p>
            <Link href="/#rituales">
              <span className="bg-primary text-background font-bold text-lg py-4 px-8 rounded-full hover:bg-secondary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 inline-block cursor-pointer">
                Compra tu Ritual y Participa
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LotteryPage;