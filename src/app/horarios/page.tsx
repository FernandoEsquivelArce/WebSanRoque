import React from "react";
import { Clock } from "lucide-react";
import { 
  getHorariosMisas, 
  getHorariosConfesiones, 
  getHorariosDespacho, 
  getFiliales, 
  getParroquiaInfo 
} from "@/services/strapi";
import { HorariosView } from "@/components/horarios/HorariosView";

export const metadata = {
  title: "Horarios de Misa por Filial, Confesiones y Oficina | Parroquia San Roque",
  description: "Consulta los horarios actualizados de Eucaristías por filial, confesiones y atención en secretaría de la Parroquia San Roque.",
};

export default async function HorariosPage() {
  const misas = await getHorariosMisas();
  const confesiones = await getHorariosConfesiones();
  const despacho = await getHorariosDespacho();
  const filiales = await getFiliales();
  const info = getParroquiaInfo();

  return (
    <div className="flex flex-col gap-12 md:gap-16 pb-20">
      {/* Header Banner */}
      <section className="relative py-16 md:py-20 bg-stone-900 text-white overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>Liturgia, Sacramentos y Atención</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
            Horarios Parroquiales por Filial
          </h1>

          <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Consulta los horarios de Santa Misa en cada una de nuestras filiales, los días de confesión sacramental y la atención en la oficina parroquial.
          </p>
        </div>
      </section>

      {/* Main Horarios Component */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <HorariosView 
          initialMisas={misas}
          initialConfesiones={confesiones}
          initialDespacho={despacho}
          filiales={filiales}
          info={info}
        />
      </section>
    </div>
  );
}
