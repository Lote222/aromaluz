'use client'; 

import Link from 'next/link';
// FIX: Importamos hooks de React
import { useState, useEffect } from 'react'; 
import { getSorteoFortunaData } from '@/lib/supabaseClient';
import SorteoDisplay from '@/components/sorteo/SorteoDisplay';
import CountdownTimer from '@/components/sorteo/CountdownTimer';
// FIX: Importamos el nuevo modal
import TermsModal from '@/components/sorteo/TermsModal'; 

const HistoryList = ({ history }) => {
  // ... (Componente HistoryList sin cambios)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Date(dateString).toLocaleDateString('es-CO', options);
  };
  
  return (
    <div className="bg-white/5 border border-primary/20 rounded-2xl p-6 md:p-8 mt-16">
      <h3 className="text-3xl font-serif font-bold text-center text-foreground mb-8">Resultados Anteriores</h3>
      <div className="max-w-3xl mx-auto">
        {history?.length > 0 ? (
          <ul className="space-y-4">
            {history.map((sorteo) => (
              <li key={sorteo.id} className="bg-black/20 p-4 rounded-xl border border-secondary/20">
                <p className="text-sm text-muted capitalize">{formatDate(sorteo.fecha_sorteo)}</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-2 gap-4">
                    <p className="font-semibold text-primary text-lg">{sorteo.monto_premio}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                        {sorteo.numeros_ganadores?.map((num, i) => (
                            <span key={i} className="flex items-center justify-center w-8 h-8 text-sm rounded-full bg-secondary text-foreground font-semibold">{num}</span>
                        ))}
                        {sorteo.numero_suerte && (
                             <span className="flex items-center justify-center w-8 h-8 text-sm rounded-full bg-primary text-background font-semibold">{sorteo.numero_suerte}</span>
                        )}
                    </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted">Aún no hay historial de sorteos.</p>
        )}
      </div>
    </div>
  );
};

const SorteoPage = () => {
  // FIX: Usamos estados para los datos que vienen del servidor
  const [sorteoData, setSorteoData] = useState({ latestPastDraw: null, nextFutureDraw: null, history: [] });
  // FIX: Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // FIX: Hacemos la llamada a Supabase en el lado del cliente
    const fetchData = async () => {
      // Usamos el slug del entorno (asegúrate que esté disponible en cliente o pásalo de otra forma si es necesario)
      const data = await getSorteoFortunaData(process.env.NEXT_PUBLIC_WEBSITE_SLUG || 'aromaluz'); 
      setSorteoData(data);
    };
    fetchData();
  }, []); // Se ejecuta solo una vez al montar

  const { latestPastDraw, nextFutureDraw, history } = sorteoData;

  return (
    <>
      <div className="bg-background text-foreground min-h-screen">
        <section className="relative py-20 md:py-32 text-center bg-cover bg-center" style={{backgroundImage: "url('/backgroundHer.jpg')"}}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
          <div className="relative container mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary">Sorteo de la Fortuna Astral</h1>
            <p className="text-lg md:text-xl text-muted mt-4 max-w-3xl mx-auto">Por la compra de nuestros productos y servicios participa en el sorteo. ¡Eleva tu suerte!</p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            {nextFutureDraw && (
              <div className="mb-20 text-center">
                 <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Próximo Gran Sorteo</h2>
                <p className="text-2xl font-serif text-primary mb-8">{nextFutureDraw.monto_premio}</p>
                <div className="max-w-2xl mx-auto"><CountdownTimer targetDate={nextFutureDraw.fecha_sorteo} /></div>
              </div>
            )}
            {latestPastDraw ? <SorteoDisplay sorteo={latestPastDraw} /> : (
              !nextFutureDraw && (
                  <div className="text-center text-muted py-10 bg-white/5 border border-secondary/20 rounded-2xl">
                      <h2 className="text-3xl font-serif text-primary">Próximamente</h2>
                      <p className="mt-2">Los resultados de nuestros sorteos aparecerán aquí.</p>
                  </div>
              )
            )}
            <HistoryList history={history} />
            <div className="bg-white/5 border border-primary/20 rounded-2xl p-8 md:p-12 mt-16 text-center">
              <h3 className="text-3xl font-serif font-bold text-foreground mb-8">¿Cómo Participar?</h3>
              <div className="max-w-3xl mx-auto text-left space-y-4 text-muted">
                  <p><strong>1. Adquiere tu Ritual:</strong> Cada producto que compras te inscribe automáticamente.</p>
                  <p><strong>2. Recibe tu Número:</strong> Recibirás un número único de la suerte con la confirmación de tu compra.</p>
                  <p><strong>3. Sigue los Resultados:</strong> Se anuncian aquí a las 6:00 PM (hora Colombia) en las fechas programadas.</p>
              </div>
               {/* FIX: Botón para abrir el modal */}
               <button 
                  onClick={() => setIsModalOpen(true)}
                  className="mt-6 text-sm text-secondary hover:text-primary transition-colors underline"
               >
                   Ver resumen de términos y condiciones
               </button>
               <div className="text-center mt-8">
                  <Link href="/#rituales" className="btn-primary">Elegir mi Ritual y Participar</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* FIX: Renderizado condicional del modal */}
      {isModalOpen && <TermsModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default SorteoPage;