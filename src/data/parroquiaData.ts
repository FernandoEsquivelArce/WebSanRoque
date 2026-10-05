import { ParroquiaInfo, HorarioMisa, HorarioConfesion, HorarioDespacho, GrupoParroquial, AvisoParroquial, Filial } from '@/types/parroquia';

export const parroquiaInfo: ParroquiaInfo = {
  nombre: 'Parroquia San Roque',
  diocesis: 'Ciudad Quesada',
  parroco: 'Pbro. Camilo Clarke',
  direccion: 'Barrio San Roque',
  ciudad: 'Ciudad Quesada',
  telefono: '8989-8338',
  whatsapp: '+506 8989-8338',
  email: 'contacto@parroquiasanroque.org',
  googleMapsUrl: 'https://maps.google.com/?q=Parroquia+San+Roque',
};

export const filialesData: Filial[] = [
  {
    id: 'sede-san-roque',
    nombre: 'Parroquia San Roque',
    slug: 'sede-san-roque',
    direccion: 'Barrio San Roque',
    telefono: '8989-8338',
    esSedePrincipal: true,
    descripcion: 'Centro Parroquial',
    imagenUrl: 'https://images.unsplash.com/photo-1548625361-1959779df52c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'filial-san-pablo',
    nombre: 'San Pablo',
    slug: 'filial-san-pablo',
    direccion: '200 metros sur del gimnasio Xtreme',
    esSedePrincipal: false,
    descripcion: 'Filial de San Pablo',
    imagenUrl: 'https://images.unsplash.com/photo-1548625361-1959779df52c?auto=format&fit=crop&w=800&q=80',
  }
];

export const horariosMisas: HorarioMisa[] = [
  // SEDE SAN ROQUE
  {
    id: 'misa-sede-semana',
    titulo: 'Misas Diarias (Lunes a Viernes)',
    dia: 'Lunes a Viernes',
    diasSemana: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    horas: ['8:00 a.m.', '6:00 p.m.'],
    filial: filialesData[0],
    lugar: 'Templo Parroquial San Roque',
    tipo: 'ordinaria',
    descripcion: 'Eucaristía diaria en el altar mayor e intenciones por los fieles.',
  },
  {
    id: 'misa-sede-sabado',
    titulo: 'Misas de Sábados',
    dia: 'Sábados',
    diasSemana: ['Sábado'],
    horas: ["8:00 a.m.**", "4:00 p.m.", "7:00 p.m."],
    filial: filialesData[0],
    lugar: 'Templo Parroquial San Roque',
    tipo: 'ordinaria',
    descripcion: '**Excepto los primeros sábados de cada mes. Misa se realiza después del Rosario de la Aurora a las 6:00 a.m.',
  },
  {
    id: 'misa-sede-domingos',
    titulo: 'Eucaristías Dominicales (Día del Señor)',
    dia: 'Domingos',
    diasSemana: ['Domingo'],
    horas: ["7:30 a.m.", "10:00 a.m.", "11:30 a.m.", "4:00 p.m.", "6:00 p.m."],
    filial: filialesData[0],
    lugar: 'Templo Parroquial San Roque',
    tipo: 'dominical',
    descripcion: 'Celebración solemne con participación de coros parroquiales y catequesis.',
  },
  // FILIAL SAN PABLO
  {
    id: 'misa-san-pablo-sabado',
    titulo: 'Misa de sábado',
    dia: 'Sábado',
    diasSemana: ['Sábado'],
    horas: ['5:30 p.m.'],
    filial: filialesData[1],
    lugar: 'Barrio San Pablo',
    tipo: 'dominical',
    descripcion: 'Santa Misa en barrio San Pablo',
  }
];

export const horariosConfesiones: HorarioConfesion[] = [
  {
    id: 'confesion-1',
    dia: 'Lunes, Martes, Jueves y Viernes',
    horario: '09:30 a.m. a 11:30 a.m. / 03:30 p.m. a 5:00 p.m.',
    lugar: 'Templo Parroquial San Roque',
    filial: filialesData[0],
    nota: 'Regálese un momento para reconciliarse con Dios.',
  },
  {
    id: 'confesion-2',
    dia: 'Viernes (Horario Nocturno)',
    horario: '06:00 p.m. a 7:30 p.m.',
    lugar: 'Templo Parroquial San Roque',
    filial: filialesData[0],
    nota: 'Regálese un momento para reconciliarse con Dios.',
  }
];

export const horariosDespacho: HorarioDespacho[] = [
  {
    id: 'despacho-1',
    dia: 'Martes a Viernes',
    horarioManana: '09:00 AM - 01:00 PM',
    horarioTarde: '04:00 PM - 07:00 PM',
    servicios: [
      'Trámite de partidas de Bautismo, Confirmación y Matrimonio',
      'Inscripciones para Catequesis (Infantil, Confirmación, Matrimonial, Prebautismal)',
      'Anotación de intenciones y estipendios para las Santas Misas',
      'Apertura y trámite de expedientes matrimoniales',
      'Solicitud de visita a enfermos y Unción sacramental',
      'Agendar citas con el Señor Párroco o Vicario',
    ],
    telefono: '+50689898338',
    whatsapp: '+50689898338',
    email: 'despacho@parroquiasanroque.org',
    ubicacion: 'Oficina Parroquial (Costado del Templo San Roque)',
    nota: 'Para partidas y constancias se requiere nombre completo y fecha aproximada del sacramento.',
    filial: filialesData[0],
  },
  {
    id: 'despacho-2',
    dia: 'Sábados',
    horarioManana: '09:00 AM - 01:00 PM',
    horarioTarde: 'Cerrado por la tarde',
    servicios: [
      'Inscripciones de Catequesis y sacramentos',
      'Intenciones para misas del fin de semana',
      'Información general y constancias',
    ],
    telefono: '+50689898338',
    whatsapp: '+50689898338',
    email: 'despacho@parroquiasanroque.org',
    ubicacion: 'Oficina Parroquial',
    nota: 'Atención especial para padres de familia de catequesis.',
    filial: filialesData[0],
  },
  {
    id: 'despacho-3',
    dia: 'Domingos y Lunes',
    horarioManana: 'Cerrado para trámites administrativos',
    horarioTarde: 'Cerrado para trámites administrativos',
    servicios: [
      'Atención pastoral en templos durante las Misas',
      'Urgencias de Unción de Enfermos vía teléfono parroquial de guardia',
    ],
    telefono: '+50689898338',
    whatsapp: '+50689898338',
    email: 'despacho@parroquiasanroque.org',
    ubicacion: 'Templo Parroquial',
    nota: 'El despacho administrativo permanece cerrado. Para emergencias de salud comuníquese al teléfono.',
    filial: filialesData[0],
  }
];

export const gruposParroquiales: GrupoParroquial[] = [];
export const avisosParroquiales: AvisoParroquial[] = [];

