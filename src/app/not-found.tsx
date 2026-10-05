import React from "react";
import Link from "next/link";
import { Church, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-800 flex items-center justify-center mx-auto shadow-sm">
          <Church className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-stone-900 tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-stone-800">Página no encontrada</h2>
          <p className="text-sm text-stone-600">
            La página que buscas no existe o ha sido movida. Te invitamos a regresar al inicio o consultar los horarios parroquiales.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-800 hover:bg-red-900 text-white text-xs font-semibold shadow transition"
          >
            <Home className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

