import React from "react";
import Link from "next/link";
import { 
  Church, 
  Clock, 
  Users, 
  Calendar, 
  MapPin, 
  Phone, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  Bell,
  Building2,
  FileText
} from "lucide-react";
import { 
  getGruposParroquiales, 
  getHorariosMisas, 
  getHorariosConfesiones,
  getHorariosDespacho,
  //getAvisosParroquiales, 
  getInformacionContacto 
} from "@/services/strapi";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [grupos, misas, confesiones, despachos, /*avisos,*/ info] = await Promise.all([
    getGruposParroquiales(),
    getHorariosMisas(),
    getHorariosConfesiones(),
    getHorariosDespacho(),
    //getAvisosParroquiales(),
    getInformacionContacto(),
  ]);

  const gruposDestacados = grupos.slice(0, 3);

  // Misas entre semana
  const misaSemana = misas.find((m) => 
    m.dia.toLowerCase().includes("lunes") || 
    m.dia.toLowerCase().includes("semana") ||
    (m.diasSemana && m.diasSemana.some((d) => d.toLowerCase().includes("lunes")))
  );
  const horasSemana = misaSemana?.horas && misaSemana.horas.length > 0
    ? misaSemana.horas
    : ["8:00 a.m.", "6:00 p.m."];
  const textoHeroSemana = horasSemana.join(" y ");

  // Misas dominicales
  const misaDomingo = misas.find((m) => 
    m.tipo === "dominical" || 
    m.dia.toLowerCase().includes("domingo") ||
    (m.diasSemana && m.diasSemana.some((d) => d.toLowerCase().includes("domingo")))
  );
  const horasDomingo = misaDomingo?.horas && misaDomingo.horas.length > 0
    ? misaDomingo.horas
    : ["7:30 a.m.", "10:00 a.m.", "11:30 a.m.", "4:00 p.m.", "6:00 p.m."];
  const textoHeroDomingo = horasDomingo.length > 3
    ? `${horasDomingo.slice(0, 3).join(", ")}...`
    : horasDomingo.join(", ");

  // Confesiones
  const diasConfesiones = confesiones.length > 0
    ? confesiones.map((c) => c.dia).filter(Boolean)
    : ["Jueves", "Sábados"];
  const textoHeroConfesiones = diasConfesiones.slice(0, 2).join(" y ");

  const notaConfesiones = confesiones.find((c) => c.nota?.trim())?.nota || "Regálese un momento para reconciliarse con Dios.";

  // Despacho Parroquial / Oficina Parroquial
  const despachoPrincipal = despachos.find((d) => 
    (d.horarioManana && !d.horarioManana.toLowerCase().includes("cerrado")) ||
    (d.horarioTarde && !d.horarioTarde.toLowerCase().includes("cerrado"))
  ) || despachos[0];

  const horariosDespachoTexto = despachoPrincipal
    ? [despachoPrincipal.horarioManana, despachoPrincipal.horarioTarde]
        .filter(Boolean)
        .filter((h) => !h?.toLowerCase().includes("cerrado"))
        .join(" / ")
    : "09:00 AM - 01:00 PM / 04:00 PM - 07:00 PM";

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center bg-stone-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1548625361-1959779df52c?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-parroquia-burgundy-950/70" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-parroquia-gold-500/20 border border-parroquia-gold-400/40 text-parroquia-gold-300 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bienvenidos a Nuestra Casa de Fe</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight max-w-4xl">
            Parroquia <span className="text-transparent bg-clip-text bg-gradient-to-r from-parroquia-gold-300 via-parroquia-gold-400 to-amber-200">San Roque</span>
          </h1>


          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/horarios"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-parroquia-burgundy-700 hover:bg-parroquia-burgundy-600 text-white font-semibold text-sm sm:text-base shadow-lg transition-all duration-200 active:scale-95 group"
            >
              <Clock className="w-5 h-5 text-parroquia-gold-300 group-hover:rotate-12 transition-transform" />
              <span>Horarios</span>
              <ChevronRight className="w-4 h-4 text-parroquia-gold-300/80" />
            </Link>

            <Link
              href="/grupos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm sm:text-base backdrop-blur-sm transition-all duration-200 active:scale-95"
            >
              <Users className="w-5 h-5 text-parroquia-gold-300" />
              <span>Conoce los grupos</span>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 text-left">
            <div className="flex items-center gap-3 p-2">
              <div className="p-2.5 rounded-lg bg-parroquia-burgundy-600/30 text-parroquia-gold-400">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-400 uppercase font-bold tracking-wider block">
                  {misaSemana?.dia ? `Misas (${misaSemana.dia})` : "Misas Diarias"}
                </span>
                <span className="text-sm font-medium text-white">{textoHeroSemana}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 sm:border-l sm:border-white/10">
              <div className="p-2.5 rounded-lg bg-parroquia-burgundy-600/30 text-parroquia-gold-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-400 uppercase font-bold tracking-wider block">
                  {misaDomingo?.titulo || "Misas Dominicales"}
                </span>
                <span className="text-sm font-medium text-white">{textoHeroDomingo}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 sm:border-l sm:border-white/10">
              <div className="p-2.5 rounded-lg bg-parroquia-burgundy-600/30 text-parroquia-gold-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-400 uppercase font-bold tracking-wider block">Confesiones</span>
                <span className="text-sm font-medium text-white">{textoHeroConfesiones}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECCIÓN DE HORARIOS DESTACADOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-parroquia-burgundy-700 font-semibold text-xs uppercase tracking-wider mb-2">
              <Clock className="w-4 h-4" />
              <span>Vida Litúrgica y Sacramentos</span>
            </div>
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
              Horarios de Celebraciones
            </h2>
          </div>
          <Link
            href="/horarios"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-parroquia-burgundy-700 hover:text-parroquia-burgundy-800 transition"
          >
            <span>Ver programa completo de horarios</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Misas Diarias */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm card-hover flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <Church className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                {misaSemana?.dia || "Lunes a Viernes"}
              </span>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                {misaSemana?.titulo || "Misas Diarias"}
              </h3>
              <p className="text-stone-600 text-xs mb-4 leading-relaxed">
                {misaSemana?.descripcion || "Comienza o concluye tu jornada en la presencia del Señor. Eucaristía comunitaria y oración por las intenciones de los fieles."}
              </p>
              <div className="space-y-2 border-t border-stone-100 pt-3">
                {horasSemana.map((hora, index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span className="text-stone-600">{index === 0 ? "Matutina:" : index === 1 ? "Vespertina:" : `Horario ${index + 1}:`}</span>
                    <span className="font-semibold text-stone-900">{hora}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100">
              <Link href="/horarios#misas" className="text-xs font-semibold text-parroquia-burgundy-700 hover:underline inline-flex items-center gap-1">
                <span>Más detalles</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Eucaristías Dominicales */}
          <div className="bg-gradient-to-br from-parroquia-burgundy-900 to-stone-900 text-white rounded-2xl p-6 shadow-md card-hover flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 text-parroquia-gold-300 flex items-center justify-center mb-4 backdrop-blur-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-parroquia-gold-400 uppercase tracking-wider block mb-1">
                {misaDomingo?.dia || "Día del Señor"}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                {misaDomingo?.titulo || "Eucaristías Dominicales"}
              </h3>
              <p className="text-stone-300 text-xs mb-4 leading-relaxed">
                {misaDomingo?.descripcion || "Celebración solemne en comunidad con coros parroquiales y catequesis."}
              </p>
              <div className="space-y-1.5 border-t border-white/10 pt-3 text-xs">
                <span className="text-stone-400 block mb-1 font-semibold">Horarios:</span>
                <span className="font-semibold text-parroquia-gold-300 block leading-relaxed">{horasDomingo.join(", ")}</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10">
              <Link href="/horarios#misas" className="text-xs font-semibold text-parroquia-gold-300 hover:text-white inline-flex items-center gap-1">
                <span>Ver programa dominical</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Confesiones */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm card-hover flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block mb-1">
                Reconciliación Sacramental
              </span>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Confesiones
              </h3>
              <p className="text-stone-600 text-xs mb-4 leading-relaxed italic bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                &quot;{notaConfesiones}&quot;
              </p>
              <div className="space-y-2 border-t border-stone-100 pt-3 text-xs">
                {confesiones.length > 0 ? (
                  confesiones.map((conf, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5">
                      <span className="font-semibold text-stone-800">{conf.dia}:</span>
                      <span className="text-stone-600 font-medium">{conf.horario}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-stone-600">Jueves y Sábados durante las celebraciones</div>
                )}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100">
              <Link href="/horarios#confesiones" className="text-xs font-semibold text-parroquia-burgundy-700 hover:underline inline-flex items-center gap-1">
                <span>Ver confesiones</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Oficina Parroquial */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm card-hover flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-1">
                Atención y Trámites
              </span>
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Oficina Parroquial
              </h3>
              <p className="text-stone-600 text-xs mb-4 leading-relaxed">
                Atención para trámites sacramentales, solicitud de partidas, intenciones de misa e informaciones.
              </p>
              <div className="space-y-2 border-t border-stone-100 pt-3 text-xs">
                <div className="font-semibold text-stone-900">
                  {despachoPrincipal?.dia || "Martes a Viernes"}
                </div>
                {despachoPrincipal?.horarioManana && !despachoPrincipal.horarioManana.toLowerCase().includes("cerrado") && (
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Mañana:</span>
                    <span className="font-semibold text-stone-900">{despachoPrincipal.horarioManana}</span>
                  </div>
                )}
                {despachoPrincipal?.horarioTarde && !despachoPrincipal.horarioTarde.toLowerCase().includes("cerrado") && (
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Tarde:</span>
                    <span className="font-semibold text-stone-900">{despachoPrincipal.horarioTarde}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100">
              <Link href="/horarios#despacho" className="text-xs font-semibold text-parroquia-burgundy-700 hover:underline inline-flex items-center gap-1">
                <span>Horarios de oficina</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECCIÓN DE GRUPOS Y PASTORALES */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-parroquia-burgundy-700 font-semibold text-xs uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" />
                <span>Comunidad y Vida en Cristo</span>
              </div>
              <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
                Grupos y Ministerios Parroquiales
              </h2>
              <p className="text-stone-600 text-sm mt-1 max-w-xl">
                Hay un lugar para ti en nuestra comunidad. Descubre nuestros grupos pastorales.
              </p>
            </div>
            <Link
              href="/grupos"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-parroquia-burgundy-700 hover:text-parroquia-burgundy-800 transition"
            >
              <span>Ver todos los grupos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gruposDestacados.map((grupo) => (
              <div
                key={grupo.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm card-hover flex flex-col justify-between"
              >
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={grupo.imagenUrl}
                    alt={grupo.nombre}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-stone-800 shadow-sm backdrop-blur-sm">
                      {grupo.categoria}
                    </span>
                  </div>
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

                  <div className="space-y-1.5 border-t border-stone-100 pt-3 text-xs text-stone-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{grupo.diaReunion} ({grupo.horaReunion})</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-stone-50 border-t border-stone-100">
                  <Link
                    href="/grupos"
                    className="w-full text-center py-2 px-3 rounded-xl bg-white border border-stone-200 hover:border-stone-300 text-stone-800 text-xs font-semibold transition active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>Conocer más y participar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN DE AVISOS PARROQUIALES */}
      {/* {avisos.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-parroquia-burgundy-700 font-semibold text-xs uppercase tracking-wider mb-2">
              <Bell className="w-4 h-4" />
              <span>Noticias y Comunicados</span>
            </div>
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight">
              Avisos Parroquiales
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {avisos.map((aviso) => (
              <div 
                key={aviso.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      {aviso.categoria}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {aviso.fecha}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">
                    {aviso.titulo}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">
                    {aviso.resumen}
                  </p>
                </div>

                {aviso.enlaceUrl && (
                  <div className="border-t border-stone-100 pt-3">
                    <Link
                      href={aviso.enlaceUrl}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-parroquia-burgundy-700 hover:text-parroquia-burgundy-900 transition"
                    >
                      <span>{aviso.enlaceTexto || "Ver más información"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )} */}

      {/* 5. BANNER DE CONTACTO Y DESPACHO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-parroquia-burgundy-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              ¿Necesitas información o realizar un trámite sacramental?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
              Visita nuestra oficina parroquial para partidas de bautismo, trámites de matrimonio, intenciones de misa o agenda una cita con nuestro párroco.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/horarios#despacho"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-parroquia-gold-500 hover:bg-parroquia-gold-400 text-stone-950 text-xs font-bold uppercase tracking-wider transition active:scale-95 shadow"
              >
                <span>Horarios de Atención</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm transition active:scale-95"
              >
                <span>Escríbenos por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
