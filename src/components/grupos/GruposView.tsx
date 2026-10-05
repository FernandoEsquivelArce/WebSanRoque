"use client";

import React, { useState, useMemo } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Clock, 
  MapPin, 
  Building2, 
  MessageCircle, 
  X, 
  CheckCircle2, 
  Sparkles, 
  Info, 
  Calendar, 
  Layers, 
  GraduationCap 
} from "lucide-react";
import { GrupoParroquial, Filial } from "@/types/parroquia";

interface GruposViewProps {
  initialGrupos: GrupoParroquial[];
  filiales?: Filial[];
}

export function GruposView({ initialGrupos }: GruposViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [selectedSubtype, setSelectedSubtype] = useState<string>("Todos");
  const [selectedNivel, setSelectedNivel] = useState<string>("Todos");
  const [selectedFilial, setSelectedFilial] = useState<string>("Todas");
  const [selectedGrupo, setSelectedGrupo] = useState<GrupoParroquial | null>(null);

  // Categorías principales
  const categories = useMemo(() => {
    const set = new Set(initialGrupos.map((g) => g.categoria));
    return ["Todas", ...Array.from(set)];
  }, [initialGrupos]);

  // Lista de Filiales 
  const filialesList = useMemo(() => {
    const list: string[] = [];
    initialGrupos.forEach((g) => {
      if (g.filial?.nombre && !list.includes(g.filial.nombre)) {
        list.push(g.filial.nombre);
      }
    });
    return ["Todas", ...list];
  }, [initialGrupos]);

  // Subtipos según categoría seleccionada
  const subtypesList = useMemo(() => {
    const filteredByCategory = selectedCategory === "Todas"
      ? initialGrupos
      : initialGrupos.filter((g) => g.categoria === selectedCategory);

    const subtypes = new Set<string>();
    filteredByCategory.forEach((g) => {
      if (g.subtipo) {
        subtypes.add(g.subtipo);
      }
    });

    return ["Todos", ...Array.from(subtypes)];
  }, [initialGrupos, selectedCategory]);

  // Niveles / Etapas según subtipo seleccionado
  const nivelesList = useMemo(() => {
    let filtered = initialGrupos;
    if (selectedCategory !== "Todas") {
      filtered = filtered.filter((g) => g.categoria === selectedCategory);
    }
    if (selectedSubtype !== "Todos") {
      filtered = filtered.filter((g) => g.subtipo === selectedSubtype);
    }

    const niveles = new Set<string>();
    filtered.forEach((g) => {
      if (g.nivelEtapa) {
        niveles.add(g.nivelEtapa);
      }
    });

    return ["Todos", ...Array.from(niveles)];
  }, [initialGrupos, selectedCategory, selectedSubtype]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSubtype("Todos");
    setSelectedNivel("Todos");
  };

  const handleSubtypeChange = (sub: string) => {
    setSelectedSubtype(sub);
    setSelectedNivel("Todos");
  };

  // Filtrado compuesto
  const filteredGrupos = useMemo(() => {
    return initialGrupos.filter((grupo) => {
      const matchCategory = selectedCategory === "Todas" || grupo.categoria === selectedCategory;
      const matchSubtype = selectedSubtype === "Todos" || grupo.subtipo === selectedSubtype;
      const matchNivel = selectedNivel === "Todos" || grupo.nivelEtapa === selectedNivel;
      const matchFilial = selectedFilial === "Todas" || grupo.filial?.nombre === selectedFilial;
      
      const term = searchTerm.toLowerCase();
      const matchSearch =
        !term ||
        grupo.nombre.toLowerCase().includes(term) ||
        grupo.descripcionCorta.toLowerCase().includes(term) ||
        grupo.destinatarios.toLowerCase().includes(term) ||
        grupo.categoria.toLowerCase().includes(term) ||
        (grupo.subtipo && grupo.subtipo.toLowerCase().includes(term)) ||
        (grupo.nivelEtapa && grupo.nivelEtapa.toLowerCase().includes(term)) ||
        (grupo.filial?.nombre && grupo.filial.nombre.toLowerCase().includes(term));

      return matchCategory && matchSubtype && matchNivel && matchFilial && matchSearch;
    });
  }, [initialGrupos, searchTerm, selectedCategory, selectedSubtype, selectedNivel, selectedFilial]);

  return (
    <div className="space-y-8">
      {/* 1. PANEL DE CONTROL DE FILTROS */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        {/* Buscador + Selector de Filial */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          <div className="relative flex-grow max-w-lg">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar por nivel, sacramento, filial, horario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1 shrink-0">
              <Building2 className="w-4 h-4 text-red-700" />
              <span>Sede / Filial:</span>
            </span>
            <select
              value={selectedFilial}
              onChange={(e) => setSelectedFilial(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              {filialesList.map((filial) => (
                <option key={filial} value={filial}>
                  {filial === "Todas" ? "Todas las filiales" : filial}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 1er Nivel de Filtro: Área Pastoral */}
        <div className="space-y-3 border-t border-stone-100 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-stone-500" />
              <span>1. Área Pastoral / Gran Categoría:</span>
            </span>
            <span className="text-xs text-stone-400 font-medium">
              {filteredGrupos.length} {filteredGrupos.length === 1 ? "opción" : "opciones disponibles"}
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-red-800 text-white shadow-sm"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2do Nivel de Filtro: Modalidad / Subtipo */}
        {subtypesList.length > 2 && (
          <div className="space-y-2 border-t border-stone-100 pt-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-900 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-red-700" />
              <span>2. Modalidad / Programa:</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {subtypesList.map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSubtypeChange(sub)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    selectedSubtype === sub
                      ? "bg-amber-600 text-white font-semibold shadow-xs"
                      : "bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100"
                  }`}
                >
                  {sub === "Todos" ? "Todos los programas" : sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3er Nivel de Filtro: Nivel / Etapa Formativa (Ej: 1er Nivel, 2do Nivel, 3er Nivel) */}
        {nivelesList.length > 2 && (
          <div className="space-y-2 border-t border-stone-100 pt-3 bg-stone-50 -mx-6 -mb-6 p-4 rounded-b-3xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
              <span>3. Grado / Nivel Formativo ({selectedSubtype === "Todos" ? "General" : selectedSubtype}):</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {nivelesList.map((nivel) => (
                <button
                  key={nivel}
                  onClick={() => setSelectedNivel(nivel)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    selectedNivel === nivel
                      ? "bg-stone-900 text-white font-semibold shadow-xs"
                      : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {nivel === "Todos" ? "Todos los niveles" : nivel}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. REJILLA DE TARJETAS */}
      {filteredGrupos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGrupos.map((grupo) => (
            <div
              key={grupo.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs card-hover flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                <img
                  src={grupo.imagenUrl}
                  alt={grupo.nombre}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                
                {/* Badges superiores */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[90%]">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-stone-800 shadow-sm backdrop-blur-sm">
                    {grupo.categoria}
                  </span>
                  {grupo.nivelEtapa ? (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-600 text-white shadow-sm">
                      {grupo.nivelEtapa}
                    </span>
                  ) : grupo.subtipo ? (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-sm">
                      {grupo.subtipo}
                    </span>
                  ) : null}
                </div>

                {/* Badge inferior de filial */}
                {grupo.filial && (
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-900/85 text-white backdrop-blur-sm shadow">
                      <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{grupo.filial.nombre}</span>
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2 leading-snug">
                    {grupo.nombre}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                    {grupo.descripcionCorta}
                  </p>
                </div>

                <div className="space-y-2 border-t border-stone-100 pt-3 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-stone-400 shrink-0" />
                    <span className="truncate"><strong>Dirigido a:</strong> {grupo.destinatarios}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                    <span><strong>Sesión:</strong> {grupo.diaReunion} ({grupo.horaReunion})</span>
                  </div>
                  {grupo.duracion && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                      <span><strong>Ciclo:</strong> {grupo.duracion}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-stone-50 border-t border-stone-100">
                <button
                  onClick={() => setSelectedGrupo(grupo)}
                  className="w-full text-center py-2 px-3 rounded-xl bg-red-800 hover:bg-red-900 text-white text-xs font-semibold transition active:scale-95 flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Info className="w-4 h-4" />
                  <span>Ver Requisitos e Inscripción</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
          <Users className="w-12 h-12 text-stone-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-stone-900 mb-1">
            No se encontraron grupos
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto mb-4">
            No hay opciones que coincidan con la combinación de nivel, área o sede seleccionada.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("Todas");
              setSelectedSubtype("Todos");
              setSelectedNivel("Todos");
              setSelectedFilial("Todas");
              setSearchTerm("");
            }}
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition"
          >
            Restablecer todos los filtros
          </button>
        </div>
      )}

      {/* 3. MODAL DE DETALLE COMPLETO */}
      {selectedGrupo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 overflow-hidden">
            <div className="relative h-56 w-full bg-stone-900">
              <img
                src={selectedGrupo.imagenUrl}
                alt={selectedGrupo.nombre}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <button
                onClick={() => setSelectedGrupo(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-500 text-white">
                    {selectedGrupo.categoria}
                  </span>
                  {selectedGrupo.nivelEtapa && (
                    <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-amber-700 text-white">
                      {selectedGrupo.nivelEtapa}
                    </span>
                  )}
                  {selectedGrupo.filial && (
                    <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-red-800 text-white">
                      📍 {selectedGrupo.filial.nombre}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {selectedGrupo.nombre}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">
                  Objetivo y Contenido del Nivel
                </h4>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {selectedGrupo.descripcionCompleta || selectedGrupo.descripcionCorta}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
                <div className="space-y-1">
                  <span className="text-xs text-stone-400 font-medium block">Día y Hora de Clase</span>
                  <p className="text-sm font-semibold text-stone-800">
                    {selectedGrupo.diaReunion} • {selectedGrupo.horaReunion}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-stone-400 font-medium block">Sede y Salón</span>
                  <p className="text-sm font-semibold text-stone-800">
                    {selectedGrupo.lugarReunion}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-stone-400 font-medium block">Edades y Grado</span>
                  <p className="text-sm font-semibold text-stone-800">
                    {selectedGrupo.destinatarios}
                  </p>
                </div>
                {selectedGrupo.duracion && (
                  <div className="space-y-1">
                    <span className="text-xs text-stone-400 font-medium block">Duración del Ciclo</span>
                    <p className="text-sm font-semibold text-stone-800">
                      {selectedGrupo.duracion}
                    </p>
                  </div>
                )}
                {selectedGrupo.coordinador && (
                  <div className="space-y-1">
                    <span className="text-xs text-stone-400 font-medium block">Catequista / Coordinador(a)</span>
                    <p className="text-sm font-semibold text-stone-800">
                      {selectedGrupo.coordinador}
                    </p>
                  </div>
                )}
              </div>

              {selectedGrupo.actividades && selectedGrupo.actividades.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Celebraciones y Ritos Formativos</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedGrupo.actividades.map((act, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 px-3 py-2 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedGrupo.requisitos && selectedGrupo.requisitos.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-2">
                    Documentos y Requisitos de Inscripción
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-stone-600 pl-1">
                    {selectedGrupo.requisitos.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-3">
                {selectedGrupo.contactoWhatsApp ? (
                  <a
                    href={`https://wa.me/${selectedGrupo.contactoWhatsApp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold shadow transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pedir Informes por WhatsApp</span>
                  </a>
                ) : <div />}
                <button
                  onClick={() => setSelectedGrupo(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-sm font-semibold hover:bg-stone-100 transition"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
