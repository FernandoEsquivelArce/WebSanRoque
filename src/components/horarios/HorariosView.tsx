"use client";

import React, { useState, useMemo } from "react";
import { 
  Clock, 
  Church, 
  Heart, 
  FileText, 
  MapPin, 
  Building2, 
  Phone, 
  CheckCircle2, 
  MessageCircle
} from "lucide-react";
import { HorarioMisa, HorarioConfesion, HorarioDespacho, Filial, ParroquiaInfo } from "@/types/parroquia";

interface HorariosViewProps {
  initialMisas: HorarioMisa[];
  initialConfesiones: HorarioConfesion[];
  initialDespacho: HorarioDespacho[];
  filiales: Filial[];
  info: ParroquiaInfo;
}

export function HorariosView({
  initialMisas,
  initialConfesiones,
  initialDespacho,
  filiales,
  info,
}: HorariosViewProps) {
  const [selectedFilial, setSelectedFilial] = useState<string>("Todas");

  // Lista de Filiales para el selector dropdown
  const filialesList = useMemo(() => {
    const list: string[] = [];
    filiales.forEach((f) => {
      if (f.nombre && !list.includes(f.nombre)) list.push(f.nombre);
    });
    [...initialMisas, ...initialConfesiones, ...initialDespacho].forEach((item) => {
      if (item.filial?.nombre && !list.includes(item.filial.nombre)) {
        list.push(item.filial.nombre);
      }
    });
    return ["Todas", ...list];
  }, [filiales, initialMisas, initialConfesiones, initialDespacho]);

  // Verificar si la filial seleccionada corresponde a la sede principal
  const isSelectedSedePrincipal = useMemo(() => {
    if (selectedFilial === "Todas") return true;
    const filialObj = filiales.find(
      (f) => f.nombre.trim().toLowerCase() === selectedFilial.trim().toLowerCase()
    );
    return filialObj?.esSedePrincipal || selectedFilial.toLowerCase().includes("roque");
  }, [selectedFilial, filiales]);

  // Misas filtradas por filial
  const filteredMisas = useMemo(() => {
    if (selectedFilial === "Todas") return initialMisas;
    return initialMisas.filter((m) => {
      if (m.filial?.nombre) {
        return m.filial.nombre.trim().toLowerCase() === selectedFilial.trim().toLowerCase();
      }
      return isSelectedSedePrincipal;
    });
  }, [initialMisas, selectedFilial, isSelectedSedePrincipal]);

  // Confesiones filtradas por filial
  const filteredConfesiones = useMemo(() => {
    if (selectedFilial === "Todas") return initialConfesiones;
    return initialConfesiones.filter((c) => {
      if (c.filial?.nombre) {
        return c.filial.nombre.trim().toLowerCase() === selectedFilial.trim().toLowerCase();
      }
      return isSelectedSedePrincipal;
    });
  }, [initialConfesiones, selectedFilial, isSelectedSedePrincipal]);

  // Despacho filtrado por filial
  const filteredDespacho = useMemo(() => {
    if (selectedFilial === "Todas") return initialDespacho;
    return initialDespacho.filter((d) => {
      if (d.filial?.nombre) {
        return d.filial.nombre.trim().toLowerCase() === selectedFilial.trim().toLowerCase();
      }
      return isSelectedSedePrincipal;
    });
  }, [initialDespacho, selectedFilial, isSelectedSedePrincipal]);

  return (
    <div className="space-y-16">
      {/* 1. SECCIÓN: SANTA MISA POR FILIAL */}
      <section id="misas" className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-red-800 text-amber-300 shadow">
              <Church className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-red-800 uppercase tracking-wider">
                <span>Eucaristías Comunitarias</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
                Horarios de la Santa Misa
              </h2>
            </div>
          </div>

          {/* Selector Dropdown de Filial */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1 shrink-0">
              <Building2 className="w-4 h-4 text-red-700" />
              <span>Ver por Filial:</span>
            </span>
            <select
              value={selectedFilial}
              onChange={(e) => setSelectedFilial(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-stone-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-600 shadow-xs cursor-pointer"
            >
              {filialesList.map((f) => (
                <option key={f} value={f}>
                  {f === "Todas" ? "Todas las filiales" : f}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rejilla de Horarios de Misa */}
        {filteredMisas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMisas.map((misa) => {
              const isDominical = misa.tipo === "dominical";
              const isEspecial = misa.tipo === "especial";

              return (
                <div
                  key={misa.id}
                  className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs card-hover flex flex-col justify-between"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          isDominical
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : isEspecial
                            ? "bg-purple-100 text-purple-900 border border-purple-200"
                            : "bg-red-50 text-red-800 border border-red-100"
                        }`}
                      >
                        {misa.dia}
                      </span>

                      {misa.filial && (
                        <span className="text-[11px] font-medium text-stone-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-700 shrink-0" />
                          <span className="truncate max-w-[140px]">{misa.filial.nombre}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-stone-900 mb-3">
                      {misa.titulo || misa.dia}
                    </h3>

                    {/* Lista de Horas */}
                    <div className="space-y-2 mb-4 bg-stone-50 border border-stone-100 rounded-xl p-3.5">
                      {misa.horas.map((hora, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 font-bold text-sm sm:text-base text-stone-900"
                        >
                          <Clock className="w-4 h-4 shrink-0 text-red-800" />
                          <span>{hora}</span>
                        </div>
                      ))}
                    </div>

                    {misa.descripcion && (
                      <p className="text-xs sm:text-sm leading-relaxed text-stone-600">
                        {misa.descripcion}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-100 text-xs text-stone-500 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{misa.lugar || misa.filial?.nombre || "Templo Parroquial"}</span>
                    </span>
                    {isDominical && (
                      <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        Día del Señor
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-8 text-center max-w-2xl mx-auto">
            <Church className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <p className="text-stone-600 font-medium text-sm">
              No hay horarios de Santa Misa registrados para <strong className="text-stone-800">{selectedFilial}</strong>.
            </p>
          </div>
        )}
      </section>

      {/* 2. SECCIÓN: SACRAMENTO DE LA CONFESIÓN */}
      <section id="confesiones" className="space-y-8">
        <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
          <div className="p-3 rounded-2xl bg-amber-600 text-white shadow">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
              <span>Sacramento del Perdón y la Misericordia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Horarios de Confesiones
            </h2>
          </div>
        </div>

        {filteredConfesiones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConfesiones.map((conf) => (
              <div
                key={conf.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between card-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 uppercase tracking-wider">
                      {conf.dia}
                    </span>
                    {conf.filial && (
                      <span className="text-xs text-stone-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-600" />
                        <span>{conf.filial.nombre}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                    <span>{conf.horario}</span>
                  </h3>

                  <div className="text-xs text-stone-600 mb-3">
                    <span className="font-semibold text-stone-700">Lugar: </span>
                    <span>{conf.lugar}</span>
                  </div>

                  {conf.nota && (
                    <p className="text-xs text-stone-600 leading-relaxed italic border-t border-stone-100 pt-3 bg-stone-50 p-2.5 rounded-xl">
                      &quot;{conf.nota}&quot;
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-8 text-center max-w-2xl mx-auto">
            <Heart className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <p className="text-stone-600 font-medium text-sm">
              No hay horarios de confesiones registrados para <strong className="text-stone-800">{selectedFilial}</strong>.
            </p>
          </div>
        )}
      </section>

      {/* 3. SECCIÓN: OFICINA PARROQUIAL */}
      <section id="despacho" className="space-y-8">
        <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
          <div className="p-3 rounded-2xl bg-blue-700 text-white shadow">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
              <span>Atención Administrativa y Trámites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
              Oficina Parroquial
            </h2>
          </div>
        </div>

        {filteredDespacho.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredDespacho.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between card-hover"
              >
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200 uppercase tracking-wider inline-block mb-3">
                    {item.dia}
                  </span>

                  <div className="space-y-1.5 mb-4 text-sm">
                    {item.horarioManana && (
                      <div className="flex items-center gap-2 text-stone-900 font-bold">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Mañana: {item.horarioManana}</span>
                      </div>
                    )}
                    {item.horarioTarde && (
                      <div className="flex items-center gap-2 text-stone-900 font-bold">
                        <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Tarde: {item.horarioTarde}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-stone-100 pt-3">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                      Trámites y Servicios:
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-600">
                      {item.servicios.map((srv, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {item.telefono && (
                  <div className="mt-6 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>{item.telefono}</span>
                    </span>
                    {item.whatsapp && (
                      <a
                        href={`https://wa.me/${item.whatsapp.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-8 text-center max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              Atención Centralizada en Sede Parroquial
            </h3>
            <p className="text-sm text-stone-600 mb-6 leading-relaxed">
              La filial <strong className="text-stone-800">{selectedFilial}</strong> no cuenta con oficina física presencial. Todos los trámites sacramentales, solicitudes de partidas e intenciones se atienden en la Oficina Parroquial de la Sede Central.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedFilial("Todas")}
                className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
              >
                Ver todos los horarios
              </button>
              {info?.whatsapp && (
                <a
                  href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-semibold inline-flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Consultar por WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
