import { Lora, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { getWebsiteConfig } from "@/lib/supabaseClient";
import { SiteConfigProvider } from "@/context/SiteConfigContext";

const lora = Lora({
  subsets: ["latin"],
  weight: ["600"],
  variable: '--font-serif',
  display: 'swap',
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: "Aromaluz Esotéric Santuario & Esencias",
  description: "Descubre el poder de la magia y la energía. Rituales, esencias y herramientas para manifestar, sanar y proteger tu espíritu.",
  // FIX: Se añade el favicon de Aromaluz
  icons: {
    icon: '/aromaluzicon.png',
  },
};

export default async function RootLayout({ children }) {
  const siteConfig = await getWebsiteConfig(process.env.WEBSITE_SLUG);
  
  return (
    <html lang="es" className={`${lato.variable} ${lora.variable}`}>
      <body className="font-sans bg-background text-foreground">
        <SiteConfigProvider value={siteConfig}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SiteConfigProvider>
      </body>
    </html>
  );
}