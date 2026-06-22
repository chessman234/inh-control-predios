// =============================================================================
// DATOS INICIALES - USUARIOS
// Usuarios de prueba admin, operador y consulta.
// =============================================================================

export const usuariosInicialesDb = [
  {
    id: 'admin',
    usuario: 'admin',
    clave: '1234',
    nombre: 'Administrador General',
    rol: 'Administrador',
    activo: true,
  },
  {
    id: 'operador',
    usuario: 'operador',
    clave: '1234',
    nombre: 'Usuario Operador',
    rol: 'Operador',
    activo: true,
  },
  {
    id: 'consulta',
    usuario: 'consulta',
    clave: '1234',
    nombre: 'Usuario Consulta',
    rol: 'Consulta',
    activo: true,
  },
]

// =============================================================================
// DATOS INICIALES - ESTRUCTURA VACIA
// Plantilla JSON inicial para nueva instalacion.
// =============================================================================

export const datosInicialesDb = {
  predios: [],
  propietarios: [],
  predioPropietarios: [],
  documentos: [],
  historialCambios: [],
  unidadesNegocio: [],
  contratosArriendo: [],
  incrementosArriendo: [],
  ajustesAdministracion: [],
  pagosArriendo: [],
  pagosAdministracion: [],
  gestionesCartera: [],
  facturasServiciosPublicos: [],
  pagosServiciosPublicos: [],
  valoresPrediales: [],
  pagosPrediales: [],
  contratosDeposito: [],
  pagosLiquidacionDeposito: [],
  usuariosSistema: usuariosInicialesDb,
}
