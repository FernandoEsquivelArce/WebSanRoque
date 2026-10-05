export interface Filial {
  id: string;
  nombre: string;
  slug: string;
  direccion?: string;
  telefono?: string;
  esSedePrincipal?: boolean;
  descripcion?: string;
  imagenUrl?: string;
}

export interface HorarioMisa {
  id: string;
  titulo?: string;
  dia: string;
  diasSemana?: string[];
  horas: string[];
  descripcion?: string;
  lugar?: string;
  filial?: Filial;
  tipo?: 'ordinaria' | 'dominical' | 'especial' | 'fiesta_patronal';
}

export interface HorarioConfesion {
  id: string;
  dia: string;
  horario: string;
  lugar?: string;
  filial?: Filial;
  nota?: string;
}

export interface HorarioDespacho {
  id: string;
  dia: string;
  horarioManana?: string;
  horarioTarde?: string;
  servicios: string[];
  telefono?: string;
  whatsapp?: string;
  email?: string;
  ubicacion?: string;
  nota?: string;
  filial?: Filial;
}

export interface GrupoParroquial {
  id: string;
  slug: string;
  nombre: string;
  categoria: 'Catequesis' | 'Liturgia' | 'Pastoral Juvenil' | 'Accion Social' | 'Pastoral Familiar' | 'Espiritualidad' | 'Coros y Musica' | string;
  subtipo?: string;
  nivelEtapa?: string;
  filial?: Filial;
  destinatarios: string;
  duracion?: string;
  diaReunion: string;
  horaReunion: string;
  lugarReunion: string;
  coordinador?: string;
  contactoWhatsApp?: string;
  descripcionCorta: string;
  descripcionCompleta?: string;
  imagenUrl: string;
  icono?: string;
  destacado?: boolean;
  requisitos?: string[];
  actividades?: string[];
}

export interface AvisoParroquial {
  id: string;
  titulo: string;
  fecha: string;
  resumen: string;
  contenido: string;
  categoria: 'Evento' | 'Aviso' | 'Celebracion' | 'Formacion' | string;
  imagenUrl?: string;
  enlaceTexto?: string;
  enlaceUrl?: string;
}

export interface ParroquiaInfo {
  nombre: string;
  diocesis: string;
  parroco: string;
  vicario?: string;
  lema?: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  whatsapp: string;
  email: string;
  googleMapsUrl: string;
  redesSociales?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

