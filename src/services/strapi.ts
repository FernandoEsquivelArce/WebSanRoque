import { 
  GrupoParroquial, 
  HorarioMisa, 
  HorarioConfesion, 
  HorarioDespacho, 
  AvisoParroquial, 
  ParroquiaInfo,
  Filial 
} from '@/types/parroquia';
import { 
  gruposParroquiales as defaultGrupos, 
  horariosMisas as defaultMisas, 
  horariosConfesiones as defaultConfesiones, 
  horariosDespacho as defaultDespacho, 
  avisosParroquiales as defaultAvisos, 
  parroquiaInfo as defaultInfo,
  filialesData as defaultFiliales 
} from '@/data/parroquiaData';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export async function getFiliales(): Promise<Filial[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/filiales?populate=*`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return defaultFiliales;
    const text = await res.text();
    if (!text || text.trim() === '') return defaultFiliales;
    const data = JSON.parse(text);
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      return defaultFiliales;
    }
    return data.data.map((item: any) => {
      const attr = item.attributes || item;
      return {
        id: item.documentId || item.id?.toString() || attr.id,
        nombre: attr.nombre,
        slug: attr.slug || attr.nombre?.toLowerCase().replace(/\s+/g, '-'),
        direccion: attr.direccion,
        telefono: attr.telefono,
        esSedePrincipal: attr.esSedePrincipal || false,
        descripcion: attr.descripcion,
        imagenUrl: attr.imagen?.url || attr.imagen?.data?.attributes?.url
          ? `${STRAPI_URL}${attr.imagen.url || attr.imagen.data.attributes.url}`
          : defaultFiliales[0]?.imagenUrl,
      };
    });
  } catch (error) {
    return defaultFiliales;
  }
}

export async function getGruposParroquiales(): Promise<GrupoParroquial[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/grupos-parroquiales?populate=*`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return defaultGrupos;
    const text = await res.text();
    if (!text || text.trim() === '') return defaultGrupos;
    const data = JSON.parse(text);
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      return defaultGrupos;
    }
    return data.data.map((item: any) => {
      const attributes = item.attributes || item;
      const filialData = attributes.filial?.data?.attributes || attributes.filial;
      return {
        id: item.documentId || item.id?.toString() || attributes.id,
        slug: attributes.slug || attributes.nombre?.toLowerCase().replace(/\s+/g, '-'),
        nombre: attributes.nombre,
        categoria: attributes.categoria,
        subtipo: attributes.subtipo,
        nivelEtapa: attributes.nivelEtapa,
        filial: filialData ? {
          id: filialData.id?.toString() || filialData.documentId,
          nombre: filialData.nombre,
          slug: filialData.slug,
          direccion: filialData.direccion,
          esSedePrincipal: filialData.esSedePrincipal,
        } : undefined,
        destinatarios: attributes.destinatarios || 'Comunidad parroquial',
        duracion: attributes.duracion,
        diaReunion: attributes.diaReunion || 'Por definir',
        horaReunion: attributes.horaReunion || 'Por definir',
        lugarReunion: attributes.lugarReunion || 'Templo Parroquial',
        coordinador: attributes.coordinador,
        contactoWhatsApp: attributes.contactoWhatsApp,
        imagenUrl: attributes.imagen?.url || attributes.imagen?.data?.attributes?.url 
          ? `${STRAPI_URL}${attributes.imagen.url || attributes.imagen.data.attributes.url}`
          : defaultGrupos[0]?.imagenUrl,
        icono: attributes.icono,
        destacado: attributes.destacado || false,
        requisitos: attributes.requisitos || [],
        actividades: attributes.actividades || [],
        descripcionCorta: attributes.descripcionCorta || attributes.descripcion || '',
        descripcionCompleta: attributes.descripcionCompleta || attributes.descripcion || '',
      };
    });
  } catch (error) {
    return defaultGrupos;
  }
}

export async function getGrupoBySlug(slug: string): Promise<GrupoParroquial | undefined> {
  const grupos = await getGruposParroquiales();
  return grupos.find((g) => g.slug === slug || g.id === slug);
}

export async function getHorariosMisas(): Promise<HorarioMisa[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/horarios-misas?populate=*`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return defaultMisas;
    const text = await res.text();
    if (!text || text.trim() === '') return defaultMisas;
    const data = JSON.parse(text);
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) return defaultMisas;
    return data.data.map((item: any) => {
      const attr = item.attributes || item;
      const filialData = attr.filial?.data?.attributes || attr.filial;
      return {
        id: item.documentId || item.id?.toString() || attr.id,
        titulo: attr.titulo || attr.nombre || attr.dia,
        dia: attr.dia,
        diasSemana: attr.diasSemana || [attr.dia],
        horas: attr.horas || [],
        tipo: attr.tipo || 'ordinaria',
        lugar: attr.lugar || filialData?.nombre || 'Templo Parroquial',
        descripcion: attr.descripcion,
        filial: filialData ? {
          id: filialData.id?.toString() || filialData.documentId,
          nombre: filialData.nombre,
          slug: filialData.slug,
          direccion: filialData.direccion,
          esSedePrincipal: filialData.esSedePrincipal,
        } : undefined,
      };
    });
  } catch (error) {
    return defaultMisas;
  }
}

export async function getHorariosConfesiones(): Promise<HorarioConfesion[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/horarios-confesiones?populate=*`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return defaultConfesiones;
    const text = await res.text();
    if (!text || text.trim() === '') return defaultConfesiones;
    const data = JSON.parse(text);
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) return defaultConfesiones;
    return data.data.map((item: any) => {
      const attr = item.attributes || item;
      const filialData = attr.filial?.data?.attributes || attr.filial;
      return {
        id: item.documentId || item.id?.toString() || attr.id,
        dia: attr.dia,
        horario: attr.horario,
        lugar: attr.lugar || filialData?.nombre || 'Templo Parroquial',
        nota: attr.nota,
        filial: filialData ? {
          id: filialData.id?.toString() || filialData.documentId,
          nombre: filialData.nombre,
          slug: filialData.slug,
        } : undefined,
      };
    });
  } catch (error) {
    return defaultConfesiones;
  }
}

export async function getHorariosDespacho(): Promise<HorarioDespacho[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/horarios-despacho?populate=*`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return defaultDespacho;
    const text = await res.text();
    if (!text || text.trim() === '') return defaultDespacho;
    const data = JSON.parse(text);
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) return defaultDespacho;
    return data.data.map((item: any) => {
      const attr = item.attributes || item;
      const filialData = attr.filial?.data?.attributes || attr.filial;
      return {
        id: item.documentId || item.id?.toString() || attr.id,
        dia: attr.dia,
        horarioManana: attr.horarioManana,
        horarioTarde: attr.horarioTarde,
        servicios: attr.servicios || [],
        telefono: attr.telefono || defaultInfo.telefono,
        whatsapp: attr.whatsapp || defaultInfo.whatsapp,
        email: attr.email || defaultInfo.email,
        ubicacion: attr.ubicacion || defaultInfo.direccion,
        nota: attr.nota,
        filial: filialData ? {
          id: filialData.id?.toString() || filialData.documentId,
          nombre: filialData.nombre,
          slug: filialData.slug,
          direccion: filialData.direccion,
          esSedePrincipal: filialData.esSedePrincipal,
        } : undefined,
      };
    });
  } catch (error) {
    return defaultDespacho;
  }
}

// export async function getAvisosParroquiales(): Promise<AvisoParroquial[]> {
//   try {
//     const res = await fetch(`${STRAPI_URL}/api/avisos-parroquiales?populate=*`, {
//       cache: 'no-store',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!res.ok) return defaultAvisos;
//     const text = await res.text();
//     if (!text || text.trim() === '') return defaultAvisos;
//     const data = JSON.parse(text);
//     if (!data.data || !Array.isArray(data.data) || data.data.length === 0) return defaultAvisos;
//     return defaultAvisos;
//   } catch (error) {
//     return defaultAvisos;
//   }
// }

export async function getInformacionContacto(): Promise<ParroquiaInfo> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/informacion-contacto`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return defaultInfo;
    const text = await res.text();
    if (!text || text.trim() === '') return defaultInfo;
    const data = JSON.parse(text);
    if (!data.data) return defaultInfo;

    const attr = data.data.attributes || data.data;
    if (!attr) return defaultInfo;

    return {
      ...defaultInfo,
      nombre: attr.nombre || defaultInfo.nombre,
      diocesis: attr.diocesis || defaultInfo.diocesis,
      parroco: attr.parroco || defaultInfo.parroco,
      direccion: attr.direccion || defaultInfo.direccion,
      ciudad: attr.ciudad || defaultInfo.ciudad,
      telefono: attr.telefono || defaultInfo.telefono,
      whatsapp: attr.whatsapp || defaultInfo.whatsapp,
      email: attr.email || defaultInfo.email,
      googleMapsUrl: attr.googleMapsUrl || defaultInfo.googleMapsUrl,
    };
  } catch (error) {
    return defaultInfo;
  }
}

export function getParroquiaInfo(): ParroquiaInfo {
  return defaultInfo;
}

