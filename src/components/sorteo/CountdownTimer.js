// src/components/sorteo/CountdownTimer.js
'use client';
import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  const calculateTimeLeft = () => {
    const targetTime = new Date(`${targetDate}T18:00:00-05:00`);
    const difference = +targetTime - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!isClient) return;
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  });

  if (!isClient) {
    return <div className="h-[96px] w-full max-w-lg mx-auto bg-white/10 rounded-lg animate-pulse"></div>;
  }

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
    if (isNaN(value)) return null;
    return (
      <div key={interval} className="text-center">
        {/* DESIGN: Se usan los colores del tema Aromaluz */}
        <span className="text-4xl md:text-5xl font-bold text-foreground">{String(value).padStart(2, '0')}</span>
        <span className="block text-sm uppercase text-muted">{interval}</span>
      </div>
    );
  });
  
  return (
    <div className="flex justify-center gap-6 md:gap-10">
      {timerComponents.length ? timerComponents : <span className="text-2xl font-serif text-primary">¡El sorteo ha comenzado!</span>}
    </div>
  );
};

export default CountdownTimer;