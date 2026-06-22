import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

function bloqueJs(titulo, descripcion = '') {
  const lineas = [
    '// =============================================================================',
    `// ${titulo}`,
  ]
  if (descripcion) lineas.push(`// ${descripcion}`)
  lineas.push('// =============================================================================', '')
  return lineas.join('\n')
}

function bloqueCss(titulo, descripcion = '') {
  const lineas = [
    '/* =============================================================================',
    `   ${titulo}`,
  ]
  if (descripcion) lineas.push(`   ${descripcion}`)
  lineas.push('   ============================================================================= */', '')
  return lineas.join('\n')
}

function yaTieneTitulo(lines, index) {
  for (let i = index - 1; i >= Math.max(0, index - 6); i -= 1) {
    const linea = lines[i]?.trim() || ''
    if (!linea) continue
    if (linea.includes('=====')) return true
    if (!linea.startsWith('//') && !linea.startsWith('/*')) return false
  }
  return false
}

function insertarPorAnclas(rutaArchivo, secciones, tipo = 'js') {
  const ruta = path.join(root, rutaArchivo)
  const lines = fs.readFileSync(ruta, 'utf8').split('\n')
  const bloque = tipo === 'css' ? bloqueCss : bloqueJs
  const inserciones = []

  for (const seccion of secciones) {
    const idx = lines.findIndex((linea) => linea.trimStart().startsWith(seccion.ancla))
    if (idx === -1) {
      console.warn(`[${rutaArchivo}] No encontrado: ${seccion.ancla}`)
      continue
    }
    if (yaTieneTitulo(lines, idx)) continue
    inserciones.push({ idx, texto: bloque(seccion.titulo, seccion.descripcion) })
  }

  inserciones.sort((a, b) => b.idx - a.idx)
  for (const ins of inserciones) {
    lines.splice(ins.idx, 0, ...ins.texto.split('\n'))
  }

  fs.writeFileSync(ruta, lines.join('\n'), 'utf8')
  console.log(`[${rutaArchivo}] ${inserciones.length} titulos agregados`)
}

const appJsx = [
  { ancla: 'import React', titulo: 'IMPORTS', descripcion: 'Dependencias React, API remota y almacenamiento local.' },
  { ancla: 'const LOGO_INH = logoInhUrl', titulo: 'CONSTANTES GLOBALES', descripcion: 'Logo, tipos de pago, comisiones y configuracion base del sistema.' },
  { ancla: 'const normalizarTipoPagoLiquidacionDeposito', titulo: 'LIQUIDACION INH - NORMALIZACION DE PAGOS', descripcion: 'Medios de pago, cuentas bancarias y validaciones INH.' },
  { ancla: 'const obtenerPropietariosContratoDeposito', titulo: 'CONTRATOS DEPOSITO - PROPIETARIOS Y BENEFICIARIOS', descripcion: 'Participacion de propietarios y beneficiarios de liquidacion.' },
  { ancla: 'const obtenerAnioInicioVigenciasPredial', titulo: 'IMPUESTO PREDIAL - VIGENCIAS Y SALDOS', descripcion: 'Anios de vigencia, extractos por propietario y saldo pendiente.' },
  { ancla: 'const obtenerIdDepositanteContrato', titulo: 'DEPOSITANTES - IDENTIFICACION Y DATOS', descripcion: 'Depositantes, documentos asociados y predios vinculados.' },
  { ancla: 'const obtenerDepositantesRegistrados', titulo: 'DEPOSITANTES - REGISTRO Y CONSULTA', descripcion: 'Listado y busqueda de depositantes registrados.' },
  { ancla: 'const normalizarPrediosJerarquia', titulo: 'PREDIOS - JERARQUIA Y NORMALIZACION', descripcion: 'Estructura organizacional y normalizacion de predios.' },
  { ancla: 'const construirCadenaOrganizacional', titulo: 'PREDIOS - CADENA ORGANIZACIONAL', descripcion: 'Niveles jerarquicos ciudad, barrio y predio.' },
  { ancla: 'const obtenerPrefijoUnidad', titulo: 'UNIDADES DE NEGOCIO - IDS Y CONSECUTIVOS', descripcion: 'Prefijos, IDs legacy y servicios por unidad.' },
  { ancla: 'const generarIdContratoDeposito', titulo: 'CONTRATOS - GENERACION DE IDENTIFICADORES', descripcion: 'IDs internos para contratos de deposito y arriendo.' },
  { ancla: 'const obtenerRecaudoPredioMes', titulo: 'LIQUIDACION DEPOSITARIO - RECAUDO MENSUAL', descripcion: 'Recaudo del predio, claves de unidad y meses liquidables.' },
  { ancla: 'const calcularMontoCanonArrendatarioMes', titulo: 'ARRIENDOS - CALCULO DE CANON Y ADMINISTRACION', descripcion: 'Canon puro, administracion y estructura del mes.' },
  { ancla: 'const construirAsignacionCanonLiquidacionPredio', titulo: 'LIQUIDACION DEPOSITARIO - ASIGNACION DE CANON', descripcion: 'Distribucion del canon entre beneficiarios del predio.' },
  { ancla: 'const calcularLiquidacionBeneficiarioPagoArriendo', titulo: 'LIQUIDACION DEPOSITARIO - PAGO POR BENEFICIARIO', descripcion: 'Comision inmobiliaria y liquidacion por pago de arriendo.' },
  { ancla: 'const generarLiquidacionesDepositoHistorial', titulo: 'LIQUIDACION DEPOSITARIO - HISTORIAL DE LIQUIDACIONES', descripcion: 'Generacion del historial mensual de liquidaciones.' },
  { ancla: 'const construirExtractosLiquidacionDepositoUnidad', titulo: 'LIQUIDACION DEPOSITARIO - EXTRACTOS POR UNIDAD', descripcion: 'Movimientos y extractos de liquidacion al depositario.' },
  { ancla: 'const calcularDeudaVigenteMesArriendo', titulo: 'ARRIENDOS - DEUDA VIGENTE POR MES', descripcion: 'Saldo del mes, gastos de cobranza y fechas de vencimiento.' },
  { ancla: 'const calcularMoraLiquidadaExtractoArriendo', titulo: 'ARRIENDOS - MORA E INTERESES DE MORA', descripcion: 'Calculo de mora proporcional y liquidada en extractos.' },
  { ancla: 'const generarIdPropietario', titulo: 'PROPIETARIOS Y DOCUMENTOS - IDs Y ADJUNTOS', descripcion: 'Generacion de IDs, limites de archivo y adjuntos de registro.' },
  { ancla: 'const leerArchivoComoDataUrl', titulo: 'DOCUMENTOS - LECTURA Y TIPOS DE ARCHIVO', descripcion: 'Lectura de archivos y catalogo de tipos documentales.' },
  { ancla: 'const ESTILOS_IMPRESION_UNA_CARTA', titulo: 'IMPRESION - ESTILOS UNA CARTA', descripcion: 'CSS embebido para impresion en una carta.' },
  { ancla: 'const ESTILOS_RECIBO_MEDIA_CARTA', titulo: 'IMPRESION - RECIBO MEDIA CARTA', descripcion: 'CSS embebido para recibos en media carta.' },
  { ancla: 'const ESTILOS_EXTRACTO_IMPRESION_BANCARIO', titulo: 'IMPRESION - EXTRACTO BANCARIO', descripcion: 'Estilos de extractos con formato bancario.' },
  { ancla: 'const ESTILOS_IMPRESION_VENTANA_BANCARIA', titulo: 'IMPRESION - VENTANA BANCARIA', descripcion: 'Estilos para impresion en ventana emergente.' },
  { ancla: 'const ESTILOS_EXTRACTO_IMPRESION_CARTA', titulo: 'IMPRESION - EXTRACTO CARTA', descripcion: 'Estilos de extractos en tamano carta.' },
  { ancla: 'const construirServiciosPublicosPendientesAlerta', titulo: 'SERVICIOS PUBLICOS - PENDIENTES Y ALERTAS', descripcion: 'Servicios sin facturar o con saldo pendiente.' },
  { ancla: 'const calcularTotalAPagarPredial', titulo: 'IMPUESTO PREDIAL - CALCULOS Y EXTRACTO', descripcion: 'Total a pagar, abonos por vigencia, intereses y descuentos.' },
  { ancla: 'const obtenerClaseEstadoCartera', titulo: 'ESTADOS Y CLASES UI - HELPERS VISUALES', descripcion: 'Clases de estado para cartera, mora y alertas.' },
  { ancla: 'function InputValor', titulo: 'COMPONENTES UI REUTILIZABLES', descripcion: 'Inputs, adjuntos, cadenas jerarquicas y paneles comunes.' },
  { ancla: 'function FormularioServicioUnidadInline', titulo: 'COMPONENTE - FORMULARIO SERVICIO POR UNIDAD', descripcion: 'Alta y edicion inline de servicios publicos en unidades.' },
  { ancla: 'function TablaEstadoCuentaArriendo', titulo: 'COMPONENTE - TABLA ESTADO DE CUENTA ARRIENDO', descripcion: 'Tabla de movimientos del estado de cuenta de arriendo.' },
  { ancla: 'function App()', titulo: 'COMPONENTE PRINCIPAL - APP', descripcion: 'Estado global, acciones y vistas de toda la aplicacion.' },
  { ancla: 'const [datosCargados, setDatosCargados]', titulo: 'ESTADO - CARGA INICIAL Y SESION', descripcion: 'Bandera de datos cargados y variables de login.' },
  { ancla: 'const [seccionActiva, setSeccionActiva]', titulo: 'ESTADO - NAVEGACION Y MENU', descripcion: 'Seccion activa, menu lateral y vista actual.' },
  { ancla: 'const [mostrarFormularioPredio, setMostrarFormularioPredio]', titulo: 'ESTADO - FORMULARIOS Y SELECCION', descripcion: 'Visibilidad de formularios y registros en edicion.' },
  { ancla: 'const [predios, setPredios]', titulo: 'ESTADO - DATOS PRINCIPALES DEL SISTEMA', descripcion: 'Arrays de predios, contratos, pagos, usuarios y demas entidades.' },
  { ancla: 'const cargarDatosEnEstado = (datos)', titulo: 'PERSISTENCIA - CARGAR DATOS EN ESTADO', descripcion: 'Hidrata el estado de React desde localStorage o API.' },
  { ancla: 'useEffect(() => {', titulo: 'PERSISTENCIA - EFECTOS DE CARGA Y GUARDADO', descripcion: 'Carga inicial, autoguardado y sincronizacion de datos.' },
  { ancla: 'const guardarAbonoDepositoContrato', titulo: 'ACCIONES - LIQUIDACION DEPOSITARIO', descripcion: 'Registrar abonos y liquidaciones al depositario.' },
  { ancla: 'const guardarContratoDeposito', titulo: 'ACCIONES - CONTRATOS DE DEPOSITO', descripcion: 'Crear y editar contratos de administracion/deposito.' },
  { ancla: 'const guardarContratante', titulo: 'ACCIONES - DEPOSITANTES', descripcion: 'Registrar y actualizar depositantes.' },
  { ancla: 'const guardarDocumento', titulo: 'ACCIONES - DOCUMENTOS', descripcion: 'Cargar y asociar documentos al sistema.' },
  { ancla: 'const guardarEdicionReciboPago', titulo: 'ACCIONES - RECIBOS DE PAGO', descripcion: 'Editar recibos y reportes de pagos recaudados.' },
  { ancla: 'const guardarPredio', titulo: 'ACCIONES - PREDIOS', descripcion: 'Registrar y editar predios e inmuebles.' },
  { ancla: 'const guardarContrato', titulo: 'ACCIONES - CONTRATOS DE ARRIENDO', descripcion: 'Registrar, renovar y terminar contratos de arriendo.' },
  { ancla: 'const guardarGestionCartera', titulo: 'ACCIONES - CARTERA DE ARRIENDOS', descripcion: 'Gestion de cobranza, llamadas y promesas de pago.' },
  { ancla: 'const guardarIncremento', titulo: 'ACCIONES - INCREMENTOS DE ARRIENDO', descripcion: 'Registrar incrementos contractuales de canon.' },
  { ancla: 'const guardarAjusteAdministracion', titulo: 'ACCIONES - ADMINISTRACION DE ARRIENDO', descripcion: 'Ajustes y pagos de administracion.' },
  { ancla: 'const guardarValorPredial', titulo: 'ACCIONES - IMPUESTO PREDIAL - VALOR ANUAL', descripcion: 'Registrar valor predial y avaluo por vigencia.' },
  { ancla: 'const guardarActualizacionPredialAnio', titulo: 'ACCIONES - IMPUESTO PREDIAL - ACTUALIZAR VIGENCIA', descripcion: 'Actualizar vigencias prediales pendientes.' },
  { ancla: 'const guardarPagoPredial', titulo: 'ACCIONES - IMPUESTO PREDIAL - REGISTRAR ABONO', descripcion: 'Abonos exclusivos por ano, intereses, descuentos y soporte.' },
  { ancla: 'const guardarFacturaServicioPublico', titulo: 'ACCIONES - SERVICIOS PUBLICOS - FACTURAS', descripcion: 'Registrar facturas de servicios por unidad.' },
  { ancla: 'const guardarPagoArriendo', titulo: 'ACCIONES - ARRIENDOS - REGISTRAR PAGO', descripcion: 'Pagos de arriendo, mora, IVA y asignacion multi-mes.' },
  { ancla: 'const iniciarSesion', titulo: 'ACCIONES - LOGIN Y SESION', descripcion: 'Inicio de sesion, cierre y restablecimiento de clave.' },
  { ancla: 'if (!usuarioActual) {', titulo: 'VISTA - PANTALLA DE LOGIN', descripcion: 'Formulario de acceso y restablecimiento de clave.' },
  { ancla: '<div className="app">', titulo: 'VISTA - LAYOUT PRINCIPAL', descripcion: 'Sidebar, barra de usuario y area de contenido.' },
  { ancla: "{vistaActiva === 'predios' &&", titulo: 'VISTA - PREDIOS', descripcion: 'Consulta, registro y detalle de predios.' },
  { ancla: "{vistaActiva === 'prediosPorPropietario' &&", titulo: 'VISTA - PREDIOS POR PROPIETARIO', descripcion: 'Extracto de predios asociados a un propietario.' },
  { ancla: "{vistaActiva === 'depositarios' && !mostrarFormularioContratante", titulo: 'VISTA - DEPOSITANTES', descripcion: 'Consulta y registro de depositantes.' },
  { ancla: "{vistaActiva === 'contratosDeposito' &&", titulo: 'VISTA - CONTRATOS DE DEPOSITO', descripcion: 'Consulta y gestion de contratos de administracion.' },
  { ancla: "{vistaActiva === 'liquidacionDeposito' && !extractoLiquidacionDepositoContexto", titulo: 'VISTA - LIQUIDACION DEPOSITARIO', descripcion: 'Liquidacion mensual al depositario o propietarios.' },
  { ancla: "{vistaActiva === 'renovacionesPendientes' &&", titulo: 'VISTA - RENOVACIONES DE CONTRATO', descripcion: 'Contratos proximos a vencer y renovacion.' },
  { ancla: "{vistaActiva === 'carteraArriendos' && !vistaCarteraDiaria", titulo: 'VISTA - CARTERA DE ARRIENDOS', descripcion: 'Cartera diaria, gestiones y contratos en mora.' },
  { ancla: "{vistaActiva === 'administracionesPendientes' &&", titulo: 'VISTA - ADMINISTRACIONES PENDIENTES', descripcion: 'Administraciones del mes sin actualizar o pagar.' },
  { ancla: "{vistaActiva === 'estadoCuentaAdministracion' &&", titulo: 'VISTA - ESTADO DE CUENTA ADMINISTRACION', descripcion: 'Extracto de administracion por contrato.' },
  { ancla: "{vistaActiva === 'unidades' && !mostrarFormularioUnidad", titulo: 'VISTA - UNIDADES DE NEGOCIO', descripcion: 'Consulta y registro de unidades.' },
  { ancla: "{vistaActiva === 'detalleContrato' && contratoSeleccionado", titulo: 'VISTA - DETALLE DE CONTRATO ARRIENDO', descripcion: 'Informacion completa del contrato seleccionado.' },
  { ancla: "{vistaActiva === 'valorPredial' && puedeRegistrar", titulo: 'VISTA - REGISTRAR VALOR PREDIAL', descripcion: 'Formulario de valor predial anual por vigencia.' },
  { ancla: "{vistaActiva === 'predialesSinActualizar' &&", titulo: 'VISTA - PREDIALES SIN ACTUALIZAR', descripcion: 'Vigencias prediales pendientes de valor anual.' },
  { ancla: "{vistaActiva === 'predialesPendientes' &&", titulo: 'VISTA - PREDIALES CON DEUDA', descripcion: 'Predios con saldo predial pendiente.' },
  { ancla: "{vistaActiva === 'pagoPredial' && puedeRegistrar", titulo: 'VISTA - REGISTRAR ABONO PREDIAL', descripcion: 'Formulario de abono predial por vigencia.' },
  { ancla: '{vistaActiva === \'verPredial\' && codigoPredialConsultaSeleccionado', titulo: 'VISTA - CONSULTAR PREDIAL', descripcion: 'Estado de cuenta predial del predio seleccionado.' },
  { ancla: 'function PanelAdministracionesPendientes', titulo: 'COMPONENTE - PANEL ADMINISTRACIONES PENDIENTES', descripcion: 'Listado de administraciones por actualizar.' },
  { ancla: 'function PanelServiciosPendientesAlerta', titulo: 'COMPONENTE - PANEL SERVICIOS PENDIENTES', descripcion: 'Alertas de servicios publicos pendientes.' },
  { ancla: 'function PanelPredialesSinActualizar', titulo: 'COMPONENTE - PANEL PREDIALES SIN ACTUALIZAR', descripcion: 'Actualizacion de vigencias prediales.' },
  { ancla: 'function CeldaSoporteAbonoPredial', titulo: 'COMPONENTE - SOPORTE DE ABONO PREDIAL', descripcion: 'Subir documento de pago junto al abono.' },
  { ancla: 'function TablaExtractoPredial', titulo: 'COMPONENTE - TABLA EXTRACTO PREDIAL', descripcion: 'Movimientos prediales por vigencia.' },
  { ancla: 'function ExtractosPrediales', titulo: 'COMPONENTE - EXTRACTOS PREDIALES', descripcion: 'Estado de cuenta predial completo para impresion.' },
  { ancla: 'function EstadoCuentaServiciosUnificado', titulo: 'COMPONENTE - ESTADO DE CUENTA SERVICIOS', descripcion: 'Extracto unificado de servicios publicos.' },
  { ancla: 'function ExtractosServicios', titulo: 'COMPONENTE - EXTRACTOS SERVICIOS PUBLICOS', descripcion: 'Vista e impresion de servicios por unidad.' },
  { ancla: 'function ExtractosAdministracion', titulo: 'COMPONENTE - EXTRACTOS ADMINISTRACION', descripcion: 'Estado de cuenta de administracion de arriendo.' },
  { ancla: 'function EncabezadoReciboArriendo', titulo: 'COMPONENTE - RECIBO DE ARRIENDO', descripcion: 'Encabezado, firmas e impresion de recibos.' },
  { ancla: 'function FormularioReciboPagoArriendo', titulo: 'COMPONENTE - FORMULARIO RECIBO PAGO ARRIENDO', descripcion: 'Captura de datos para recibo de pago.' },
  { ancla: 'function ExtractosArriendo', titulo: 'COMPONENTE - EXTRACTOS ARRIENDO', descripcion: 'Estado de cuenta de arriendo para impresion.' },
]

const appCss = [
  { ancla: '.app {', titulo: 'LAYOUT GENERAL - APP', descripcion: 'Contenedor principal de la aplicacion.' },
  { ancla: '/* SIDEBAR */', titulo: 'SIDEBAR - MENU LATERAL', descripcion: 'Menu de navegacion, logo y opciones del sistema.', reemplazar: true },
  { ancla: '/* MAIN */', titulo: 'MAIN - AREA PRINCIPAL', descripcion: 'Contenido central y paneles.', reemplazar: true },
  { ancla: '/* HERO */', titulo: 'HERO - ENCABEZADO SUPERIOR', descripcion: 'Tarjeta superior con acciones rapidas.', reemplazar: true },
  { ancla: '/* BUTTONS', titulo: 'BOTONES - SISTEMA UNIFICADO', descripcion: 'Estilos de botones primarios, secundarios y dorados.', reemplazar: true },
  { ancla: '/* ALERTAS */', titulo: 'ALERTAS Y MENSAJES', descripcion: 'Avisos, errores y estados informativos.', reemplazar: true },
  { ancla: '/* CARDS */', titulo: 'TARJETAS Y PANELES', descripcion: 'Cards del dashboard y paneles de informacion.', reemplazar: true },
  { ancla: '/* FORMULARIO */', titulo: 'FORMULARIOS', descripcion: 'Campos, grupos y acciones de formulario.', reemplazar: true },
  { ancla: '/* TABLAS */', titulo: 'TABLAS', descripcion: 'Tablas simples y tablas de extracto.', reemplazar: true },
  { ancla: '/* EXTRACTOS */', titulo: 'EXTRACTOS Y ESTADOS DE CUENTA', descripcion: 'Estilos de extractos bancarios y prediales.', reemplazar: true },
  { ancla: '/* RESPONSIVE */', titulo: 'RESPONSIVE - DISENO ADAPTABLE', descripcion: 'Ajustes para tablet y movil.', reemplazar: true },
  { ancla: '/* IMPRESIÓN */', titulo: 'IMPRESION', descripcion: 'Reglas CSS para impresion de documentos.', reemplazar: true },
  { ancla: '.login-page {', titulo: 'LOGIN - PANTALLA DE ACCESO', descripcion: 'Estilos del formulario de inicio de sesion.' },
  { ancla: '/* CAMBIO DE CLAVE */', titulo: 'CAMBIO DE CLAVE', descripcion: 'Formulario de cambio y restablecimiento de clave.', reemplazar: true },
  { ancla: '/* MODO CONSULTA */', titulo: 'MODO CONSULTA', descripcion: 'Restricciones visuales para rol consulta.', reemplazar: true },
  { ancla: '/* RECIBO DE PAGO DE ARRIENDO */', titulo: 'RECIBO DE PAGO DE ARRIENDO', descripcion: 'Estilos del recibo impreso.', reemplazar: true },
  { ancla: '/* CREACIÓN DE USUARIOS */', titulo: 'CREACION DE USUARIOS', descripcion: 'Panel de usuarios y permisos.', reemplazar: true },
  { ancla: '/* MENÚ LATERAL DESPLEGABLE */', titulo: 'MENU LATERAL DESPLEGABLE MOVIL', descripcion: 'Menu hamburguesa y barra superior movil.', reemplazar: true },
  { ancla: '/* VISOR E IMPRESIÓN DE RECIBOS', titulo: 'VISOR E IMPRESION DE RECIBOS', descripcion: 'Modal de recibos en media carta.', reemplazar: true },
  { ancla: '/* VISOR E IMPRESIÓN DE EXTRACTOS', titulo: 'VISOR E IMPRESION DE EXTRACTOS', descripcion: 'Modal de extractos en carta.', reemplazar: true },
  { ancla: '/* TABLA UNIDADES DE NEGOCIO */', titulo: 'TABLA UNIDADES DE NEGOCIO', descripcion: 'Listado y detalle de unidades.', reemplazar: true },
  { ancla: '.predial-abono-resumen {', titulo: 'IMPUESTO PREDIAL - RESUMEN DE ABONO', descripcion: 'Panel resumen al registrar abono predial.' },
  { ancla: '.unidades-disponibles-filtros {', titulo: 'UNIDADES DISPONIBLES - CONSULTA', descripcion: 'Filtros y tabla de unidades disponibles.' },
]

function insertarCssConReemplazo(rutaArchivo, secciones) {
  const ruta = path.join(root, rutaArchivo)
  let content = fs.readFileSync(ruta, 'utf8')

  for (const seccion of secciones) {
    const bloque = bloqueCss(seccion.titulo, seccion.descripcion)
    if (seccion.reemplazar) {
      const patron = new RegExp(`/\\*\\s*${seccion.ancla.replace(/[/*]/g, '').trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^*]*\\*/`)
      if (patron.test(content) && !content.includes(seccion.titulo)) {
        content = content.replace(patron, bloque.trim())
      }
      continue
    }
    const lineas = content.split('\n')
    const idx = lineas.findIndex((linea) => linea.trimStart().startsWith(seccion.ancla))
    if (idx === -1) {
      console.warn(`[${rutaArchivo}] No encontrado: ${seccion.ancla}`)
      continue
    }
    if (yaTieneTitulo(lineas, idx)) continue
    lineas.splice(idx, 0, ...bloque.split('\n'))
    content = lineas.join('\n')
  }

  fs.writeFileSync(ruta, content, 'utf8')
  console.log(`[${rutaArchivo}] titulos CSS actualizados`)
}

const otrosArchivos = [
  {
    archivo: 'src/main.jsx',
    secciones: [
      { ancla: 'import { Component', titulo: 'IMPORTS', descripcion: 'React, estilos globales y componente App.' },
      { ancla: 'class ErrorBoundary', titulo: 'ERROR BOUNDARY', descripcion: 'Captura errores de render y muestra pantalla de recuperacion.' },
      { ancla: 'createRoot', titulo: 'MONTAJE DE LA APLICACION', descripcion: 'Inicializa React en el elemento root.' },
    ],
  },
  {
    archivo: 'src/storage/datosLocales.js',
    secciones: [
      { ancla: 'export const STORAGE_KEY', titulo: 'ALMACENAMIENTO LOCAL - CONFIGURACION', descripcion: 'Clave y nombre de la base IndexedDB.' },
      { ancla: 'function abrirBaseDatos', titulo: 'INDEXEDDB - CONEXION', descripcion: 'Abre la base de datos del navegador.' },
      { ancla: 'export async function cargarDatosLocales', titulo: 'CARGAR DATOS LOCALES', descripcion: 'Lee datos desde IndexedDB o migra desde localStorage.' },
      { ancla: 'async function ejecutarGuardado', titulo: 'GUARDAR DATOS LOCALES', descripcion: 'Persiste datos con debounce y manejo de cuota.' },
      { ancla: 'export function cancelarGuardadoDatosLocalesPendiente', titulo: 'CANCELAR GUARDADO PENDIENTE', descripcion: 'Limpia temporizador de guardado diferido.' },
    ],
  },
  {
    archivo: 'src/api/datos.js',
    secciones: [
      { ancla: 'const TOKEN_KEY', titulo: 'API REMOTA - CONFIGURACION DE SESION', descripcion: 'Claves de token y usuario en sessionStorage.' },
      { ancla: 'export function usaApiRemota', titulo: 'API REMOTA - DETECCION', descripcion: 'Indica si el frontend usa backend SQL.' },
      { ancla: 'async function request', titulo: 'API REMOTA - PETICIONES HTTP', descripcion: 'Cliente fetch con token JWT.' },
      { ancla: 'export async function loginApi', titulo: 'API REMOTA - LOGIN', descripcion: 'Autenticacion contra el servidor.' },
      { ancla: 'export async function cargarDatosApi', titulo: 'API REMOTA - CARGAR DATOS', descripcion: 'Obtiene el JSON completo desde SQL Server.' },
      { ancla: 'export function programarGuardadoDatosApi', titulo: 'API REMOTA - GUARDAR DATOS', descripcion: 'Guardado diferido hacia el servidor.' },
    ],
  },
  {
    archivo: 'src/index.css',
    secciones: [
      { ancla: '/*', titulo: 'ESTILOS GLOBALES BASE', descripcion: 'Reset, body, imagenes y tipografia base.' },
    ],
  },
]

insertarPorAnclas('src/App.jsx', appJsx)
insertarCssConReemplazo('src/App.css', appCss)

for (const archivo of otrosArchivos) {
  insertarPorAnclas(archivo.archivo, archivo.secciones)
}

console.log('Listo.')
