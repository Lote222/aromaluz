// src/components/sorteo/SorteoDisplay.js
"use client";

// DESIGN: Balotas rediseñadas con la paleta de Aromaluz (violeta y dorado)
const NumberBall = ({ number, isLucky, delay }) => (
  <div
    className={`flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full font-bold text-2xl md:text-3xl shadow-lg animate-fade-in-up
      ${isLucky 
        ? 'bg-primary text-background border-2 border-amber-300 shadow-primary/30' 
        : 'bg-secondary text-foreground border-2 border-violet-400 shadow-secondary/30'
      }`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {number}
  </div>
);

const SorteoDisplay = ({ sorteo }) => {
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    const date = new Date(dateString);
    return `Resultados del sorteo del ${new Intl.DateTimeFormat('es-CO', options).format(date)}`;
  };

  return (
    // DESIGN: Contenedor con fondo oscuro y borde dorado sutil.
    <div className="w-full max-w-3xl mx-auto bg-white/5 rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-primary/20">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-widest uppercase text-muted">
        {sorteo.titulo_premio}
      </h2>
      <p className="text-5xl md:text-7xl font-bold text-primary my-4 drop-shadow-sm">
        {sorteo.monto_premio}
      </p>
      <p className="text-muted/80">{sorteo.subtitulo_sorteo || formatDate(sorteo.fecha_sorteo)}</p>

      <div className="flex flex-wrap justify-center items-center gap-4 my-10">
        {sorteo.numeros_ganadores?.map((num, index) => (
          <NumberBall key={`${num}-${index}`} number={num} delay={100 * (index + 1)} />
        ))}
        {sorteo.numero_suerte && <NumberBall number={sorteo.numero_suerte} isLucky delay={600} />}
      </div>
      
      {sorteo.numero_sorteo && (
        <div className="inline-block bg-black/20 border border-primary/20 rounded-full px-6 py-2">
          <p className="text-lg font-semibold text-muted">{sorteo.numero_sorteo}</p>
        </div>
      )}
    </div>
  );
};

export default SorteoDisplay;