// =============================================================================
// PLATAFORMA - MODULOS DEL SISTEMA
// Identificadores y metadatos de cada area de negocio INH.
// =============================================================================

export const MODULOS_PLATAFORMA = {
  inmobiliaria: 'inmobiliaria',
  prestamos: 'prestamos',
  obras: 'obras',
}

export const DEFINICIONES_MODULOS = {
  [MODULOS_PLATAFORMA.inmobiliaria]: {
    id: MODULOS_PLATAFORMA.inmobiliaria,
    titulo: 'Inmobiliaria',
    subtitulo: 'Finca raíz',
    descripcion:
      'Predios, arriendos, depositarios, cartera, liquidaciones y estados de cuenta.',
    icono: '🏢',
    disponible: true,
  },
  [MODULOS_PLATAFORMA.prestamos]: {
    id: MODULOS_PLATAFORMA.prestamos,
    titulo: 'Préstamos y créditos',
    subtitulo: 'Cartera crediticia',
    descripcion:
      'Gestión de préstamos, desembolsos, pagos y seguimiento de créditos.',
    icono: '💳',
    disponible: true,
  },
  [MODULOS_PLATAFORMA.obras]: {
    id: MODULOS_PLATAFORMA.obras,
    titulo: 'Manejo de obras',
    subtitulo: 'Construcción',
    descripcion:
      'Control de proyectos, avances, contratistas y costos de obra.',
    icono: '🏗️',
    disponible: true,
  },
}

export const LISTA_MODULOS_PLATAFORMA = [
  DEFINICIONES_MODULOS[MODULOS_PLATAFORMA.inmobiliaria],
  DEFINICIONES_MODULOS[MODULOS_PLATAFORMA.prestamos],
  DEFINICIONES_MODULOS[MODULOS_PLATAFORMA.obras],
]

export const LOGO_PLATAFORMA_INH = `${import.meta.env.BASE_URL}logo-inh.png`
