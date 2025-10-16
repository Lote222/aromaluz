'use client';

import Link from 'next/link';
import { Twitter, Instagram, Facebook, Youtube } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';

// ... (SocialIcon component sin cambios)

const Footer = () => {
  const siteConfig = useSiteConfig();
  
  const email = siteConfig?.email_contact || '';
  const phone = siteConfig?.phone_contact || '';

  return (
    <footer className="bg-background border-t border-secondary/10 mt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="md:col-span-1">
            {/* FIX: Nombre actualizado */}
            <h3 className="text-xl font-serif font-bold text-foreground mb-3">Aromaluz Esotéric</h3>
            <p className="text-muted max-w-sm mx-auto md:mx-0">
              Conectando con la sabiduría ancestral para manifestar un futuro radiante.
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">Contacto Directo</h4>
            <div className="space-y-2 text-muted">
              <p>Email: <a href={`mailto:${email}`} className="hover:text-secondary transition-colors">{email}</a></p>
              <p>Teléfono: <span className="hover:text-secondary transition-colors">{phone}</span></p>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-serif text-lg font-semibold text-foreground mb-4">Síguenos</h4>
            {/* ... (Social icons sin cambios) */}
          </div>
        </div>
        <div className="border-t border-primary/20 mt-12 pt-8 text-center">
          {/* ... (Links del footer sin cambios) */}
          {/* FIX: Copyright actualizado */}
          <p className="text-muted/80">&copy; {new Date().getFullYear()} Aromaluz Esotéric. Todos los derechos reservados.</p>
          <p className="text-sm mt-2 text-muted/60">Diseñado con intención y magia.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  