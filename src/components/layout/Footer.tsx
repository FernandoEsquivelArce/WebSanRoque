import React from "react";
import Link from "next/link";
import { 
  Church, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Users, 
  MessageCircle 
} from "lucide-react";
import { getInformacionContacto, getHorariosMisas, getHorariosDespacho } from "@/services/strapi";

export async function Footer() {
  const [info, misas, despachos] = await Promise.all([
    getInformacionContacto(),
    getHorariosMisas(),
    getHorariosDespacho(),
  ]);

  // Misas entre semana (Lunes a Viernes)
  const misaSemana = misas.find((m) => 
    m.dia.toLowerCase().includes("lunes") || 
    m.dia.toLowerCase().includes("semana") ||
    (m.diasSemana && m.diasSemana.some((d) => d.toLowerCase().includes("lunes")))
  );
  const textoMisaSemana = misaSemana?.horas && misaSemana.horas.length > 0
    ? misaSemana.horas.join(" y ")
    : "8:00 a.m. y 6:00 p.m.";

  // Misas dominicales
  const misaDomingo = misas.find((m) => 
    m.tipo === "dominical" || 
    m.dia.toLowerCase().includes("domingo") ||
    (m.diasSemana && m.diasSemana.some((d) => d.toLowerCase().includes("domingo")))
  );
  const textoMisaDomingo = misaDomingo?.horas && misaDomingo.horas.length > 0
    ? misaDomingo.horas.join(", ")
    : "7:30 a.m., 10:00 a.m., 11:30 a.m., 4:00 p.m., 6:00 p.m.";

  // Oficina Parroquial
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

  const textoDespacho = despachoPrincipal
    ? `${despachoPrincipal.dia}: ${horariosDespachoTexto}`
    : "Martes a Viernes: 09:00 AM - 01:00 PM / 04:00 PM - 07:00 PM";

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Parroquia Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-800 flex items-center justify-center text-amber-300 shadow">
                <Church className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-tight block">
                  {info.nombre}
                </span>
                <span className="text-xs text-amber-400 font-medium block">
                  Diócesis de {info.diocesis}
                </span>
              </div>
            </div>
            {info.parroco && (
              <div className="text-xs text-stone-400 space-y-0.5 pt-1">
                <span className="text-stone-400 font-medium">Párroco: </span>
                <span className="text-stone-200">{info.parroco}</span>
              </div>
            )}
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <Church className="w-4 h-4 text-stone-500" />
                  <span>Inicio / Bienvenida</span>
                </Link>
              </li>
              <li>
                <Link href="/horarios" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stone-500" />
                  <span>Horarios de Misas y Confesiones</span>
                </Link>
              </li>
              <li>
                <Link href="/horarios#despacho" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stone-500" />
                  <span>Oficina Parroquial</span>
                </Link>
              </li>
              <li>
                <Link href="/grupos" className="hover:text-amber-300 transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4 text-stone-500" />
                  <span>Grupos y Ministerios</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Schedule */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Horarios Clave
            </h3>
            <div className="space-y-2.5 text-sm text-stone-400">
              <div>
                <span className="text-stone-200 font-medium block">
                  {misaSemana?.dia ? `Misas Diarias (${misaSemana.dia}):` : "Misas Diarias (Lun - Vie):"}
                </span>
                <span>{textoMisaSemana}</span>
              </div>
              <div>
                <span className="text-stone-200 font-medium block">
                  {misaDomingo?.titulo || "Misa Dominical"}:
                </span>
                <span>{textoMisaDomingo}</span>
              </div>
              <div>
                <span className="text-stone-200 font-medium block">Oficina Parroquial:</span>
                <span>{textoDespacho}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-stone-800 pb-2">
              Contacto y Ubicación
            </h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {info.direccion}
                  {info.ciudad ? `, ${info.ciudad}` : ""}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{info.telefono}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">{info.email}</span>
              </li>
              <li className="pt-2">
                <a
                  href={`https://wa.me/${info.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-medium transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Parroquial</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-stone-950 py-4 px-4 border-t border-stone-800 text-xs text-stone-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Parroquia San Roque. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 text-amber-400/80">
            <span>&quot;San Roque bendito, protector y amigo, ruega por nuestra comunidad&quot;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

