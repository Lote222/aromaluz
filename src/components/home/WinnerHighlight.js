// src/components/home/WinnerHighlight.js
'use client';

import Link from 'next/link';
import CountdownTimer from '@/components/sorteo/CountdownTimer';

// DESIGN: Balotas temáticas de Aromaluz
const NumberBall = ({ number, isLucky, delay }) => (
  <div
    className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full font-bold text-xl md:text-2xl shadow-lg border-2 animate-fade-in-up ${
      isLucky 
        ? 'bg-primary text-background border-amber-300 shadow-primary/30' 
        : 'bg-secondary text-foreground border-violet-400 shadow-secondary/30'
    }`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {number}
  </div>
);

const WinnerHighlight = ({ latestPastDraw, nextFutureDraw }) => {
  if (!latestPastDraw && !nextFutureDraw) {
    return (
      <section className="bg-white/5 py-20 md:py-28 text-center">
       <div className="container mx-auto px-6">
         <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
           Sorteo de la Fortuna Astral
         </h2>
         <p className="text-lg text-muted max-w-2xl mx-auto">
           Próximamente anunciaremos nuestro gran sorteo. ¡Cada compra te dará una oportunidad de ganar!
         </p>
       </div>
     </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {latestPastDraw && (
            <div className="lg:col-span-3 bg-white/5 p-8 rounded-2xl text-center border border-primary/10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                Último Sorteo Realizado
              </h2>
              <p className="text-muted mb-6">
                {new Date(latestPastDraw.fecha_sorteo + 'T00:00:00').toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' })}
              </p>
              <div className="flex flex-wrap justify-center items-center gap-3 my-6">
                {latestPastDraw.numeros_ganadores?.map((num, i) => (
                  <NumberBall key={i} number={num} delay={150 * (i + 1)} />
                ))}
                {latestPastDraw.numero_suerte && (
                  <NumberBall number={latestPastDraw.numero_suerte} isLucky delay={150 * (latestPastDraw.numeros_ganadores.length + 1)} />
                )}
              </div>
              <p className="text-2xl font-serif font-bold text-foreground mt-6">
                  El premio fue de <span className="text-primary">{latestPastDraw.monto_premio}</span>
              </p>
              <div className="mt-8">
                  <Link href="/circulo-de-la-suerte" className="font-semibold text-secondary hover:text-primary transition-colors">
                      Ver Historial de Sorteos →
                  </Link>
              </div>
            </div>
          )}
          {nextFutureDraw && (
            <div className={`lg:col-span-2 text-center ${!latestPastDraw && 'lg:col-span-5'}`}>
              <h3 className="text-3xl font-serif font-bold text-foreground mb-4">
                Próximo Sorteo
              </h3>
              <p className="text-2xl font-serif text-primary mb-6">
                {nextFutureDraw.monto_premio}
              </p>
              <div className="max-w-md mx-auto">
                <CountdownTimer targetDate={nextFutureDraw.fecha_sorteo} />
              </div>
              <p className="text-muted mt-8 max-w-xs mx-auto">
                Cada compra de un ritual te asigna un número para participar. ¡El próximo podrías ser tú!
              </p>
              <div className="mt-8">
                <Link href="/#rituales" className="btn-primary">
                  Elegir mi Ritual
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WinnerHighlight;