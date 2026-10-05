import React from "react";
import { Users, Sparkles, HeartHandshake } from "lucide-react";
import { getGruposParroquiales } from "@/services/strapi";
import { GruposView } from "@/components/grupos/GruposView";

export const metadata = {
  title: "Grupos y Ministerios Parroquiales | Parroquia San Roque",
  description: "Conoce todos los grupos, pastorales, movimientos y coros de la Parroquia San Roque. ¡Únete a nuestra comunidad!",
};

export default async function GruposPage() {
  const grupos = await getGruposParroquiales();

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-20">
      {/* Header Banner */}
      <section className="relative py-16 md:py-20 bg-stone-900 text-white overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Vida en Comunidad</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Grupos y Pastorales Parroquiales
          </h1>

          <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            La fe se vive y crece en comunidad. Encuentra tu espacio de formación, amistad, música, solidaridad o servicio litúrgico.
          </p>
        </div>
      </section>

      {/* Main Interactive Groups Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <GruposView initialGrupos={grupos} />
      </section>

      {/* Invitation Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-red-50 border border-red-100 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-800 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>¿Tienes vocación de servicio?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              ¿Quieres sumarte a un grupo o iniciar uno nuevo?
            </h3>
            <p className="text-stone-600 text-sm max-w-xl">
              Acércate al término de las misas  o visita la oficina parroquial para consultar los requisitos de integración y contactar a los coordinadores.
            </p>
          </div>
          <a
            href="/horarios#despacho"
            className="shrink-0 px-6 py-3 rounded-xl bg-red-800 hover:bg-red-900 text-white text-xs font-bold uppercase tracking-wider shadow transition active:scale-95"
          >
            Información
          </a>
        </div>
      </section>
    </div>
  );
}
