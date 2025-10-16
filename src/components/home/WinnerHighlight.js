import Link from 'next/link';

const LaurelWreathIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g transform="translate(100 100) scale(0.8)">
      <path
        d="M-31-69.5c-4.6-1.5-9.3-2.3-14-2.3-19.3 0-35 15.7-35 35s15.7 35 35 35c4.7 0 9.4-1 14-2.5"
        stroke="currentColor" strokeWidth="12" strokeLinecap="round" fill="none"
        transform="rotate(20)"
      />
      <path
        d="M31-69.5c-4.6-1.5 9.3-2.3 14-2.3-19.3 0 35 15.7 35 35s-15.7 35-35 35c-4.7 0-9.4-1-14-2.5"
        stroke="currentColor" strokeWidth="12" strokeLinecap="round" fill="none"
        transform="scale(-1, 1) rotate(20)"
      />
    </g>
  </svg>
);

// FIX: El componente ahora recibe y usa los datos del ganador desde las 'props'
const WinnerHighlight = ({ winner }) => {
  // Si hay un ganador, usamos sus datos. Si no, mostramos un texto por defecto.
  const winnerName = winner?.nombre_ganador || 'Próximamente';
  const prizeName = winner?.nombre_premio || 'un increíble premio';

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              Nuestra Última Ganadora
            </h2>
            <p className="text-2xl font-serif text-foreground mb-6">
              {winnerName} se llevó {prizeName}
            </p>
            <p className="text-muted mb-8 max-w-lg mx-auto md:mx-0">
              Cada compra en Herbolaria Sagrada es un boleto dorado a nuestro sorteo semanal. Tú podrías ser el próximo en recibir la magia en tu puerta.
            </p>
            <Link href="/#rituales" className="inline-block bg-primary text-white font-bold py-4 px-10 rounded-full hover:bg-yellow-300 hover:text-primary transition-all duration-300 transform hover:scale-105">
              Compra un Ritual y Participa
            </Link>
          </div>

          <div className="md:w-1/3 flex items-center justify-center">
            <div className="relative w-64 h-64">
                <LaurelWreathIcon className="text-primary/40" />
                <div className="absolute inset-0 flex items-center justify-center text-center">
                    <p className="text-4xl font-serif font-extrabold text-primary">{winnerName}</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WinnerHighlight;