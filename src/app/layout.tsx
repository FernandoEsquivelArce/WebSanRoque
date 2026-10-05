import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Parroquia San Roque | Horarios de Misa, Grupos y Comunidad",
  description: "Sitio oficial de la Parroquia San Roque. Consulta horarios de misas, confesiones, oficina parroquial y conoce nuestros grupos y pastorales.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-stone-50 text-stone-900 antialiased">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
