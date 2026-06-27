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
    const anclaTrim = seccion.ancla.trimStart()
    if (anclaTrim.startsWith('{') || anclaTrim.startsWith('<')) {
      console.warn(`[${rutaArchivo}] Omitido en JSX: ${seccion.ancla}`)
      continue
    }
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
  { ancla: 'const LOGO_INH = `${import.meta.env.BASE_URL}logo-inh.png`', titulo: 'CONSTANTES GLOBALES', descripcion: 'Logo, tipos de pago, comisiones y configuracion base del sistema.' },
  { ancla: 'const normalizarTipoPagoLiquidacionDeposito', titulo: 'LIQUIDACION INH - NORMALIZACION DE PAGOS', descripcion: 'Medios de pago, cuentas bancarias y validaciones INH.' },
  { ancla: 'const obtenerPropietariosContratoDeposito', titulo: 'CONTRATOS DEPOSITO - PROPIETARIOS Y BENEFICIARIOS', descripcion: 'Participacion de propietarios y beneficiarios de liquidacion.' },
  { ancla: 'const obtenerAnioInicioVigenciasPredial', titulo: 'IMPUESTO PREDIAL - VIGENCIAS Y SALDOS', descripcion: 'Anios de vigencia, extractos por propietario y saldo pendiente.' },
  { ancla: 'const obtenerPredialPendientePredioExtracto', titulo: 'PREDIAL - EXTRACTO PREDIOS POR PROPIETARIO', descripcion: 'Saldo pendiente y vigencias sin actualizar para la columna Predial pendiente.' },
  { ancla: 'const obtenerAvaluoPredioExtractoPropietario', titulo: 'PREDIAL - AVALUO EN EXTRACTO PREDIOS POR PROPIETARIO', descripcion: 'Avaluo del ultimo ano vigente actualizado o pendiente por actualizar.' },
  { ancla: 'const construirExtractoPrediosPorPropietario', titulo: 'PREDIAL - FILAS EXTRACTO PREDIOS PROPIETARIO', descripcion: 'Detalle de inmuebles, avaluo y predial pendiente por participacion del propietario.' },
  { ancla: 'const formatearCeldaPredialPendienteExtractoPropietario', titulo: 'PREDIAL - FORMATO CELDA PREDIAL PENDIENTE', descripcion: 'Muestra Por actualizar o el saldo adeudado en extracto de predios.' },
  { ancla: 'const formatearCeldaAvaluoExtractoPropietario', titulo: 'PREDIAL - FORMATO CELDA AVALUO EXTRACTO PROPIETARIO', descripcion: 'Muestra Pendiente por actualizar o el avaluo del ultimo ano vigente actualizado.' },
  { ancla: 'const obtenerIdDepositanteContrato', titulo: 'DEPOSITANTES - IDENTIFICACION Y DATOS', descripcion: 'Depositantes, documentos asociados y predios vinculados.' },
  { ancla: 'const obtenerDepositantesRegistrados', titulo: 'DEPOSITANTES - REGISTRO Y CONSULTA', descripcion: 'Listado y busqueda de depositantes registrados.' },
  { ancla: 'const normalizarPrediosJerarquia', titulo: 'PREDIOS - JERARQUIA Y NORMALIZACION', descripcion: 'Estructura organizacional y normalizacion de predios.' },
  { ancla: 'const construirCadenaOrganizacional', titulo: 'PREDIOS - CADENA ORGANIZACIONAL', descripcion: 'Niveles jerarquicos ciudad, barrio y predio.' },
  { ancla: 'const obtenerPrefijoUnidad', titulo: 'UNIDADES DE NEGOCIO - IDS Y CONSECUTIVOS', descripcion: 'Prefijos, IDs legacy y servicios por unidad.' },
  { ancla: 'const generarIdContratoDeposito', titulo: 'CONTRATOS - GENERACION DE IDENTIFICADORES', descripcion: 'IDs internos para contratos de deposito y arriendo.' },
  { ancla: 'const obtenerRecaudoPredioMes', titulo: 'LIQUIDACION DEPOSITARIO - RECAUDO MENSUAL', descripcion: 'Recaudo del predio, claves de unidad y meses liquidables.' },
  { ancla: 'const calcularMontoCanonArrendatarioMes', titulo: 'ARRIENDOS - CALCULO DE CANON Y ADMINISTRACION', descripcion: 'Canon puro, administracion y estructura del mes.' },
  { ancla: 'const calcularBaseLiquidacionEstadoCuentaArriendoMes', titulo: 'ARRIENDOS - BASE LIQUIDACION ESTADO DE CUENTA', descripcion: 'Canon e IVA del canon sin administracion (modulo aparte).' },
  { ancla: 'const construirMovimientoVirtualLiquidacionMesArriendo', titulo: 'ARRIENDO - MOVIMIENTO VIRTUAL LIQUIDACION', descripcion: 'Simula un mes con abonos asignados para calcular saldo pendiente a una fecha.' },
  { ancla: 'const calcularObligacionBrutaLiquidacionPeriodoArriendo', titulo: 'ARRIENDO - OBLIGACION BRUTA LIQUIDACION PERIODO', descripcion: 'Total causado del periodo a una fecha sin reducir mora por abonos asignados.' },
  { ancla: 'const calcularSaldoPendienteAsignacionLiquidacionPeriodoArriendo', titulo: 'ARRIENDO - SALDO PENDIENTE CASCADA LIQUIDACION', descripcion: 'Saldo liquidado del periodo a una fecha menos abonos ya asignados en cascada.' },
  { ancla: 'const asignarPagosLiquidacionPeriodoContratoMultimes', titulo: 'ARRIENDO - ASIGNACION LIQUIDACION POR PERIODO', descripcion: 'Cascada del valor pagado contra el total liquidado de cada periodo (mas antiguo primero).' },
  { ancla: 'const esPagoFijoLiquidacionCanonDeposito', titulo: 'CONTRATOS DEPOSITO - CRITERIO PAGO FIJO', descripcion: 'Indica si el contrato liquida canon con pago fijo mensual al depositante.' },
  { ancla: 'const esPagosParcialesLiquidacionCanonDeposito', titulo: 'CONTRATOS DEPOSITO - CRITERIO PAGOS PARCIALES', descripcion: 'Indica si la liquidacion al depositante depende del recaudo del arrendatario.' },
  { ancla: 'const calcularAsignacionCanonDepositoDesdeAbonoParcial', titulo: 'LIQUIDACION DEPOSITO - ASIGNACION PROPORCIONAL PAGOS PARCIALES', descripcion: 'Canon e IVA liquidables segun proporcion del abono sobre obligacion total del periodo.' },
  { ancla: 'const registrarAsignacionCanonLiquidacionDepositoMes', titulo: 'LIQUIDACION DEPOSITARIO - REGISTRO ASIGNACION CANON MES', descripcion: 'Registra una asignacion de abono sobre canon + IVA liquidable de un corte.' },
  { ancla: 'const asignarPagosCanonLiquidacionContratoMultimes', titulo: 'LIQUIDACION DEPOSITARIO - CANON DESDE CASCADA PERIODO', descripcion: 'Aplica abonos del arrendatario en cascada sobre canon + IVA liquidable por mes.' },
  { ancla: 'const normalizarCriterioLiquidacionCanonDeposito', titulo: 'CONTRATOS DEPOSITO - CRITERIO LIQUIDACION CANON', descripcion: 'Pago fijo mensual o liquidacion segun recaudo del arrendatario.' },
  { ancla: 'const obtenerMesesLiquidacionContratoDeposito', titulo: 'LIQUIDACION DEPOSITO - MESES LIQUIDABLES CONTRATO', descripcion: 'Meses a liquidar segun criterio fijo o recaudo parcial del arrendatario.' },
  { ancla: 'const construirDetallePagoFijoLiquidacionDepositoMes', titulo: 'LIQUIDACION DEPOSITO - DETALLE PAGO FIJO MENSUAL', descripcion: 'Liquidacion mensual al depositante sin depender del recaudo del arrendatario.' },
  { ancla: 'const calcularPorcentajeAbonoCanonMesLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - PORCENTAJE CANON LIQUIDABLE CUBIERTO', descripcion: 'Porcentaje del canon liquidable al depositario cubierto en el corte mensual.' },
  { ancla: 'const construirServiciosPublicosFijosLiquidacionDepositoCorte', titulo: 'LIQUIDACION DEPOSITO - SERVICIOS PUBLICOS FIJOS POR CORTE', descripcion: 'Recaudo de servicios con cobro fijo mensual liquidable al depositante.' },
  { ancla: 'const construirDesgloseCargosCorteLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - DESGLOSE CARGOS POR CORTE', descripcion: 'Canon base, IVA, comision INH y servicios fijos discriminados cargo a cargo.' },
  { ancla: 'const ordenarMovimientosExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - ORDEN MOVIMIENTOS EXTRACTO', descripcion: 'Orden cronologico por corte y fecha para saldos y tabla mes a mes.' },
  { ancla: 'const aplicarAbonosInhCascadaExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - ABONOS INH EN CASCADA', descripcion: 'Aplica pagos al depositante del corte mas antiguo al mas reciente.' },
  { ancla: 'const construirAsignacionCanonLiquidacionPredio', titulo: 'LIQUIDACION DEPOSITARIO - ASIGNACION DE CANON', descripcion: 'Agrupa por predio las asignaciones de canon liquidable por unidad.' },
  { ancla: 'const calcularLiquidacionBeneficiarioPagoArriendo', titulo: 'LIQUIDACION DEPOSITARIO - PAGO POR BENEFICIARIO', descripcion: 'Comision inmobiliaria y liquidacion por pago de arriendo.' },
  { ancla: 'const generarLiquidacionesDepositoHistorial', titulo: 'LIQUIDACION DEPOSITARIO - HISTORIAL DE LIQUIDACIONES', descripcion: 'Generacion del historial mensual de liquidaciones.' },
  { ancla: 'const obtenerClaveUnidadLiquidacion', titulo: 'LIQUIDACION DEPOSITARIO - CLAVE UNIDAD', descripcion: 'Clave estable para liquidar y filtrar una unidad de negocio.' },
  { ancla: 'const coincidePagoContratoArriendo', titulo: 'LIQUIDACION DEPOSITO - COINCIDENCIA PAGO Y UNIDAD', descripcion: 'Empareja pagos y liquidaciones aunque la clave de unidad difiera del recibo.' },
  { ancla: 'const obtenerLiquidacionesDepositoUnidadExtracto', titulo: 'LIQUIDACION DEPOSITO - LIQUIDACIONES UNIDAD EXTRACTO', descripcion: 'Regenera y consolida liquidaciones de la unidad para el extracto depositante.' },
  { ancla: 'const construirExtractosLiquidacionDepositoUnidad', titulo: 'LIQUIDACION DEPOSITARIO - EXTRACTOS POR UNIDAD', descripcion: 'Movimientos y extractos de liquidacion al depositario.' },
  { ancla: 'const obtenerMesesCortesVigentesExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - MESES CORTES EXTRACTO', descripcion: 'Todos los meses vigentes del contrato de deposito para el detalle por corte.' },
  { ancla: 'const construirCorteCeroExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - CORTE CERO EXTRACTO', descripcion: 'Periodo sin liquidacion: valores en ceros en el detalle por corte.' },
  { ancla: 'const completarCortesExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - COMPLETAR CORTES EXTRACTO', descripcion: 'Inserta cortes en cero para todos los meses del contrato sin liquidacion.' },
  { ancla: 'const construirCortesExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITARIO - CORTES EXTRACTO', descripcion: 'Agrupa liquidaciones y movimientos por mes causado (corte mensual).' },
  { ancla: 'const liquidacionDepositoTieneRecaudoArrendatario', titulo: 'LIQUIDACION DEPOSITARIO - RECAUDO ARRENDATARIO', descripcion: 'Valida que exista recaudo del arrendatario antes de liquidar al depositante.' },
  { ancla: 'const formatearRecibosArrendatarioReferencia', titulo: 'LIQUIDACION DEPOSITARIO - REFERENCIA PAGOS ARRENDATARIO', descripcion: 'Texto y detalle de los recibos del arrendatario vinculados al pago INH.' },
  { ancla: 'const construirPagosArrendatarioDetalleLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITARIO - PAGOS ARRENDATARIO POR CORTE', descripcion: 'Detalle de cada pago del arrendatario que alimenta la liquidacion por corte.' },
  { ancla: 'const obtenerDeudaPendienteCorteLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITARIO - DEUDA PENDIENTE POR CORTE', descripcion: 'Deuda al depositario de un corte mensual del extracto.' },
  { ancla: 'const obtenerDeudaPendienteLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITARIO - SALDO PENDIENTE UNIFICADO', descripcion: 'Fuente unica de deuda al depositario (abonos INH y comision provisional).' },
  { ancla: 'const construirDeudaDiscriminadaCortesExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITARIO - DEUDA DISCRIMINADA POR CORTE', descripcion: 'Total de deuda desglosado por mes causado y pago del arrendatario.' },
  { ancla: 'const obtenerValorNetoPagoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITARIO - VALOR NETO PAGO INH', descripcion: 'Importe abonado en un pago al depositario (campos legacy incluidos).' },
  { ancla: 'const coincidePagoInhLiquidacionDepositoBeneficiario', titulo: 'LIQUIDACION DEPOSITARIO - COINCIDENCIA PAGO INH', descripcion: 'Empareja pagos INH con liquidacion por predio, mes, contrato y unidad flexible.' },
  { ancla: 'const coincidePagoInhLiquidacionDepositoBeneficiarioBase', titulo: 'LIQUIDACION DEPOSITARIO - COINCIDENCIA PAGO INH SIN MES', descripcion: 'Empareja pagos INH por predio, beneficiario y unidad (sin filtrar mes causado).' },
  { ancla: 'const distribuirAbonosInhCascadaLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITARIO - CASCADA ABONOS INH LIQUIDACION', descripcion: 'Reparte pagos al depositario del corte mas antiguo al mas reciente en liquidaciones.' },
  { ancla: 'const aplicarAbonosInhALiquidacionDepositoBeneficiarioMes', titulo: 'LIQUIDACION DEPOSITARIO - APLICAR ABONOS INH A LIQUIDACION', descripcion: 'Actualiza deuda, estado y detalle tras asignar abonos INH en cascada.' },
  { ancla: 'const obtenerPagosInhMesLiquidacionDepositoBeneficiario', titulo: 'LIQUIDACION DEPOSITARIO - PAGOS INH DEL MES', descripcion: 'Lista ordenada de pagos al depositario registrados en el corte.' },
  { ancla: 'const obtenerAbonosInhMesLiquidacionDepositoBeneficiario', titulo: 'LIQUIDACION DEPOSITARIO - ABONOS INH DEL MES', descripcion: 'Suma de pagos INH que reducen el saldo del corte mensual.' },
  { ancla: 'const aplicarAbonosInhADetallePagosLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITARIO - ABONOS INH EN DETALLE', descripcion: 'Distribuye abonos INH en cascada sobre lineas del detalle de pagos.' },
  { ancla: 'const obtenerLiquidacionesPendientesUnidadBeneficiarioDeposito', titulo: 'LIQUIDACION DEPOSITARIO - DEUDA PENDIENTE POR UNIDAD Y BENEFICIARIO', descripcion: 'Liquidaciones pendientes filtradas por contrato, unidad y beneficiario.' },
  { ancla: 'const obtenerDeudaCortesAnterioresPagoDepositante', titulo: 'LIQUIDACION DEPOSITARIO - DEUDA CORTES ANTERIORES PAGO', descripcion: 'Suma de liquidaciones pendientes con mes anterior al corte seleccionado.' },
  { ancla: 'const obtenerMesesCausadosLiquidacionPagoDepositante', titulo: 'LIQUIDACION DEPOSITARIO - MESES CAUSADOS FORMULARIO PAGO', descripcion: 'Meses con liquidacion por unidad y beneficiario (pagados y pendientes).' },
  { ancla: 'const resolverMesCausadoPagoDepositante', titulo: 'LIQUIDACION DEPOSITARIO - RESOLVER MES CAUSADO PAGO', descripcion: 'Mantiene el mes elegido o selecciona el primer corte pendiente al cambiar unidad o beneficiario.' },
  { ancla: 'const obtenerDeudaPendienteCorteMesPagoDepositante', titulo: 'LIQUIDACION DEPOSITARIO - DEUDA DEL CORTE SELECCIONADO', descripcion: 'Saldo pendiente INH unicamente del mes causado elegido en el pago.' },
  { ancla: 'const obtenerDeudaHastaCortePagoDepositante', titulo: 'LIQUIDACION DEPOSITARIO - DEUDA HASTA CORTE PAGO', descripcion: 'Cortes anteriores mas el corte seleccionado (sin meses posteriores).' },
  { ancla: 'const calcularValorPendienteFormularioPagoDepositante', titulo: 'LIQUIDACION DEPOSITARIO - VALOR PENDIENTE FORMULARIO PAGO', descripcion: 'Texto numerico del saldo hasta corte para precargar el valor del pago INH.' },
  { ancla: 'const resolverMesCausadoTrasAbonoPagoDepositante', titulo: 'LIQUIDACION DEPOSITARIO - MES CAUSADO TRAS ABONO', descripcion: 'Mantiene el mes con saldo o pasa al siguiente pendiente despues de registrar un pago.' },
  { ancla: 'const resolverLiquidacionPagoDepositante', titulo: 'LIQUIDACION DEPOSITARIO - RESOLVER LIQUIDACION PAGO', descripcion: 'Localiza la liquidacion pendiente del mes o del corte mas antiguo para registrar el pago.' },
  { ancla: 'const formatearRangoCortesLiquidacion', titulo: 'LIQUIDACION DEPOSITO - RANGO DE CORTES', descripcion: 'Etiqueta desde-hasta para cortes pendientes del extracto.' },
  { ancla: 'const formatearFechaExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - FORMATO FECHA EXTRACTO', descripcion: 'Fecha dd/mm/aaaa para movimientos del estado de cuenta.' },
  { ancla: 'const construirResumenExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - RESUMEN ESTADO DE CUENTA', descripcion: 'Totales pendientes por concepto para el extracto tipo arriendo.' },
  { ancla: 'const restarMesesCalendarioISO', titulo: 'CALENDARIO - RESTAR MESES ISO', descripcion: 'Resta meses a una fecha YYYY-MM sin cambiar el dia.' },
  { ancla: 'const obtenerMesUltimoCortePagadoExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - ULTIMO CORTE PAGADO EXTRACTO', descripcion: 'Mes del corte mas reciente con pago INH completo al depositante.' },
  { ancla: 'const obtenerMesesCortesPendientesVentanaMovimientosExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - CORTES PENDIENTES VENTANA MOVIMIENTOS', descripcion: 'Meses con saldo o pago pendiente al depositante en el extracto.' },
  { ancla: 'const obtenerMesesVentanaMovimientosExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - VENTANA MOVIMIENTOS EXTRACTO', descripcion: 'Tres meses atras del ultimo corte pagado mas todos los cortes pendientes.' },
  { ancla: 'const construirFilasVentanaMovimientosExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - FILAS VENTANA MOVIMIENTOS', descripcion: 'Filas de la ventana de movimientos: historico reciente y cortes pendientes.' },
  { ancla: 'const obtenerCanonIvaBeneficiarioLiquidacionDepositoMes', titulo: 'LIQUIDACION DEPOSITO - CANON E IVA BENEFICIARIO POR MES', descripcion: 'Canon completo e IVA del mes para extracto y desglose (pago fijo mensual).' },
  { ancla: 'const construirFilasEstadoCuentaLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - FILAS ESTADO DE CUENTA', descripcion: 'Movimientos mes a mes con el mismo formato que el extracto de arriendo.' },
  { ancla: 'const construirConsolidadoPendienteExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - PENDIENTE CONSOLIDADO EXTRACTO', descripcion: 'Agrupa en un solo bloque todo lo no pagado al depositante o beneficiario.' },
  { ancla: 'const formatearMesCorteLiquidacion', titulo: 'LIQUIDACION DEPOSITO - ETIQUETA MES CORTE', descripcion: 'Convierte YYYY-MM a nombre de mes y anio para el extracto.' },
  { ancla: 'const construirUltimosCortesPagadosExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - ULTIMOS CORTES PAGADOS EXTRACTO', descripcion: 'Los dos cortes mas recientes liquidados con detalle de pagos INH al depositante.' },
  { ancla: 'const construirInformacionContratosExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITARIO - INFORMACION CONTRACTUAL EXTRACTO', descripcion: 'Datos del contrato de deposito, arriendo y canon por corte para el extracto.' },
  { ancla: 'function PanelInformacionContratosExtractoLiquidacion', titulo: 'COMPONENTE - INFORMACION CONTRACTUAL EXTRACTO LIQUIDACION', descripcion: 'Contrato de deposito, arriendo, canon por corte y condiciones de liquidacion.' },
  { ancla: 'function PanelInformacionInicialPredialFormulario', titulo: 'COMPONENTE - INFORMACION INICIAL PREDIAL FORMULARIO', descripcion: 'Campos del ultimo pago predial en registro de inmueble y contrato de deposito.' },
  { ancla: 'const calcularGastosCobranza', titulo: 'ARRIENDOS - GASTOS DE COBRANZA', descripcion: 'Porcentaje y calculo de gastos de cobranza sobre canon del periodo en mora.' },
  { ancla: 'const calcularSancionGastosCobranzaPeriodoArriendo', titulo: 'ARRIENDOS - GASTOS DE COBRANZA POR PERIODO', descripcion: 'Causacion sobre el canon base del periodo cuando hay mora (no sobre saldo pendiente).' },
  { ancla: 'const calcularDeudaVigenteMesArriendo', titulo: 'ARRIENDOS - DEUDA VIGENTE POR MES', descripcion: 'Saldo del mes, gastos de cobranza y fechas de vencimiento.' },
  { ancla: 'const calcularMoraLiquidadaExtractoArriendo', titulo: 'ARRIENDOS - MORA E INTERESES DE MORA', descripcion: 'Calculo de mora proporcional y liquidada en extractos.' },
  { ancla: 'const calcularCargosLiquidadosPeriodoExtractoArriendo', titulo: 'ARRIENDOS - CARGOS LIQUIDADOS EXTRACTO', descripcion: 'Canon, mora, cobranza e IVA por periodo a fecha de corte.' },
  { ancla: 'const calcularSaldoDeudaPeriodoArriendo', titulo: 'ARRIENDOS - SALDO DEUDA POR PERIODO', descripcion: 'Saldo pendiente de liquidacion mes a mes (canon, mora, cobranza, IVA, abonos).' },
  { ancla: 'const generarMesesContrato', titulo: 'ARRIENDOS - MESES DEL CONTRATO Y MOVIMIENTO MENSUAL', descripcion: 'Generacion de meses y movimientos con pagos y fecha de corte explicitos.' },
  { ancla: 'const construirExtractosArriendoContratos', titulo: 'ARRIENDOS - EXTRACTOS PARA ALERTAS Y CARTERA', descripcion: 'Consolida saldos de arriendo con pagos y fecha de corte del recibo.' },
  { ancla: 'const calcularSaldosReciboPagoArriendo', titulo: 'ARRIENDOS - SALDOS RECIBO DE PAGO', descripcion: 'Solo deuda de arriendo; administracion y servicios van aparte.' },
  { ancla: 'const obtenerFechaLocalISO', titulo: 'ARRIENDOS - ROLES Y FECHA RECIBO PAGO', descripcion: 'Fecha local, limite de 20 dias para Digitador y validacion del recibo.' },
  { ancla: 'const construirEntradaHistorialModificacionReciboPagoArriendo', titulo: 'ARRIENDOS - HISTORIAL MODIFICACION RECIBO', descripcion: 'Entrada inmutable de auditoria al editar recibos de arriendo.' },
  { ancla: 'function BloqueAuditoriaLiquidacionReciboArriendo', titulo: 'COMPONENTE - AUDITORIA LIQUIDACION RECIBO ARRIENDO', descripcion: 'Trazabilidad de fechas y recalculo de mora/cobranza al registrar el pago.' },
  { ancla: 'function BloqueHistorialModificacionesReciboArriendo', titulo: 'COMPONENTE - HISTORIAL MODIFICACIONES RECIBO ARRIENDO', descripcion: 'Registro inmutable de cambios administrativos sobre el recibo.' },
  { ancla: 'const construirHtmlAuditoriaLiquidacionReciboArriendoImpresion', titulo: 'IMPRESION - AUDITORIA LIQUIDACION RECIBO ARRIENDO', descripcion: 'Bloque HTML de trazabilidad en recibo impreso de arriendo.' },
  { ancla: 'const generarIdPropietario', titulo: 'PROPIETARIOS Y DOCUMENTOS - IDs Y ADJUNTOS', descripcion: 'Generacion de IDs, limites de archivo y adjuntos de registro.' },
  { ancla: 'const leerArchivoComoDataUrl', titulo: 'DOCUMENTOS - LECTURA Y TIPOS DE ARCHIVO', descripcion: 'Lectura de archivos y catalogo de tipos documentales.' },
  { ancla: 'const ESTILOS_IMPRESION_UNA_CARTA', titulo: 'IMPRESION - ESTILOS UNA CARTA', descripcion: 'CSS embebido para impresion en una carta.' },
  { ancla: 'const ESTILOS_IMPRESION_EXTRACTO_PREDIOS_PROPIETARIO', titulo: 'IMPRESION - EXTRACTO PREDIOS POR PROPIETARIO', descripcion: 'Plantilla dedicada en carta, independiente del visor de extractos general.' },
  { ancla: 'const ESTILOS_RECIBO_MEDIA_CARTA', titulo: 'IMPRESION - RECIBO MEDIA CARTA', descripcion: 'CSS embebido para recibos en media carta.' },
  { ancla: 'const ESTILOS_EXTRACTO_IMPRESION_BANCARIO', titulo: 'IMPRESION - EXTRACTO BANCARIO', descripcion: 'Estilos de extractos con formato bancario.' },
  { ancla: 'const ESTILOS_IMPRESION_VENTANA_BANCARIA', titulo: 'IMPRESION - VENTANA BANCARIA', descripcion: 'Estilos para impresion en ventana emergente.' },
  { ancla: 'const ESTILOS_EXTRACTO_IMPRESION_CARTA', titulo: 'IMPRESION - EXTRACTO CARTA', descripcion: 'Estilos de extractos en tamano carta.' },
  { ancla: 'const construirServiciosPublicosPendientesAlerta', titulo: 'SERVICIOS PUBLICOS - PENDIENTES Y ALERTAS', descripcion: 'Servicios sin facturar o con saldo pendiente.' },
  { ancla: 'const calcularTotalAPagarPredial', titulo: 'IMPUESTO PREDIAL - CALCULOS Y EXTRACTO', descripcion: 'Total a pagar, abonos por vigencia, intereses y descuentos.' },
  { ancla: 'const obtenerClaseEstadoCartera', titulo: 'ESTADOS Y CLASES UI - HELPERS VISUALES', descripcion: 'Clases de estado para cartera, mora y alertas.' },
  { ancla: 'function InputValor', titulo: 'COMPONENTES UI REUTILIZABLES', descripcion: 'Inputs, adjuntos, cadenas jerarquicas y paneles comunes.' },
  { ancla: 'function FormularioServicioUnidadInline', titulo: 'COMPONENTE - FORMULARIO SERVICIO POR UNIDAD', descripcion: 'Alta y edicion inline de servicios publicos en unidades.' },
  { ancla: 'const calcularResumenDeudaEstadoCuentaArriendo', titulo: 'ARRIENDOS - RESUMEN DEUDA ESTADO DE CUENTA', descripcion: 'Totales pendientes por concepto y deuda consolidada.' },
  { ancla: 'const obtenerValorServiciosPublicosResumenDeuda', titulo: 'ARRIENDOS - SERVICIOS PUBLICOS RESUMEN DEUDA', descripcion: 'Valor en deuda o pendiente para servicios publicos de la unidad.' },
  { ancla: 'const enriquecerResumenDeudaServiciosPublicosExtractoArriendo', titulo: 'ARRIENDOS - ENRIQUECER RESUMEN CON SERVICIOS', descripcion: 'Agrega servicios publicos al resumen de deuda del extracto.' },
  { ancla: 'function ResumenEstadoCuentaArriendo', titulo: 'COMPONENTE - RESUMEN ESTADO DE CUENTA ARRIENDO', descripcion: 'Totales en deuda por concepto y estado general del contrato.' },
  { ancla: 'function EstadoCuentaArrendamiento', titulo: 'COMPONENTE - ESTADO DE CUENTA ARRENDAMIENTO', descripcion: 'Vista e impresion unificadas del estado de cuenta de arriendo.' },
  { ancla: 'const construirResumenCuadreCorteLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - RESUMEN CUADRE POR CORTE', descripcion: 'Totales de cargos, descuentos y saldo alineados con el extracto de movimientos.' },
  { ancla: 'const formatearPorcentajeCanonLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - PORCENTAJE CANON RESUMEN', descripcion: 'Etiqueta legible del % liquidable cubierto en el resumen por mes.' },
  { ancla: 'const esComisionProvisionalLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - COMISION PROVISIONAL POR ABONO', descripcion: 'Detecta comision e IVA provisionales cuando el canon no esta al 100%.' },
  { ancla: 'const obtenerSufijoComisionProvisionalLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - SUFIJO COMISION PROVISIONAL', descripcion: 'Texto — provisional (% abono canon) para conceptos de comision en extracto.' },
  { ancla: 'const obtenerEtiquetaEstadoResumenMesLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - ETIQUETA ESTADO RESUMEN MES', descripcion: 'Texto de estado por fila del resumen (como hoja Excel del extracto).' },
  { ancla: 'const obtenerClaseEstadoResumenMesLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - CLASE ESTADO RESUMEN MES', descripcion: 'Color del badge alineado con la etiqueta visible del resumen por mes.' },
  { ancla: 'const obtenerSaldoFinalMovimientosExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - SALDO FINAL MOVIMIENTOS', descripcion: 'Saldo acumulado al cierre segun la tabla mes a mes del extracto.' },
  { ancla: 'const obtenerTotalPendienteDesdeCortesExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - TOTAL PENDIENTE DESDE CORTES', descripcion: 'Suma de saldoPendienteCorte de cada corte mensual.' },
  { ancla: 'const obtenerTotalPendienteExtractoLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - TOTAL PENDIENTE EXTRACTO', descripcion: 'Suma de saldos pendientes por corte (fuente unica para el resumen).' },
  { ancla: 'const obtenerTipoBannerRecaudoCorteLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - BANNER RECAUDO POR CORTE', descripcion: 'Define si y como mostrar el recaudo del arrendatario en cada corte.' },
  { ancla: 'const construirFilasResumenPorMesExtractoLiquidacionDeposito', titulo: 'DERIVADOS - FILAS RESUMEN POR MES EXTRACTO DEPOSITO', descripcion: 'Una fila por corte con canon, IVA, comision y neto al depositario.' },
  { ancla: 'const obtenerMovimientosVisiblesCorteExtractoLiquidacionDeposito', titulo: 'DERIVADOS - MOVIMIENTOS VISIBLES POR CORTE', descripcion: 'Lineas con cargo, abono y saldo acumulado (sin referencias informativas).' },
  { ancla: 'const construirFilasMovimientosCorteExtractoLiquidacionDeposito', titulo: 'DERIVADOS - FILAS MOVIMIENTOS POR CORTE', descripcion: 'Numeracion, cargo, abono y saldo acumulado por mes (formato extracto Excel).' },
  { ancla: 'const obtenerClaseEstadoCorteLiquidacionDeposito', titulo: 'LIQUIDACION DEPOSITO - CLASE ESTADO CORTE', descripcion: 'Estilos visuales segun estado de pago del corte mensual.' },
  { ancla: 'function TablaReferenciaPagosArrendatarioLiquidacionDeposito', titulo: 'COMPONENTE - TABLA REFERENCIA PAGOS ARRENDATARIO', descripcion: 'Recibos del arrendatario con valor corte, saldos anteriores y neto a pagar INH.' },
  { ancla: 'function TablaResumenPorMesExtractoLiquidacionDeposito', titulo: 'COMPONENTE - TABLA RESUMEN POR MES EXTRACTO DEPOSITO', descripcion: 'Resumen consolidado tipo Excel: canon, IVA, comision y neto por mes.' },
  { ancla: 'function DetalleCortesExtractoLiquidacionDeposito', titulo: 'COMPONENTE - DETALLE CORTES EXTRACTO LIQUIDACION DEPOSITO', descripcion: 'Movimientos por corte con cargo, abono y saldo acumulado.' },
  { ancla: 'function TablaEstadoCuentaLiquidacionDeposito', titulo: 'COMPONENTE - TABLA ESTADO DE CUENTA LIQUIDACION DEPOSITO', descripcion: 'Movimientos mes a mes con columnas del extracto de arriendo.' },
  { ancla: 'function VistaExtractoLiquidacionDeposito', titulo: 'COMPONENTE - VISTA EXTRACTO LIQUIDACION DEPOSITO', descripcion: 'Pantalla del extracto: contrato deposito, cortes, movimientos e impresion.' },
  { ancla: 'function App()', titulo: 'COMPONENTE PRINCIPAL - APP', descripcion: 'Estado global, acciones y vistas de toda la aplicacion.' },
  { ancla: 'const [datosCargados, setDatosCargados]', titulo: 'ESTADO - CARGA INICIAL Y SESION', descripcion: 'Bandera de datos cargados y variables de login.' },
  { ancla: 'const [seccionActiva, setSeccionActiva]', titulo: 'ESTADO - NAVEGACION Y MENU', descripcion: 'Seccion activa, menu lateral y vista actual.' },
  { ancla: 'const [mostrarFormularioPredio, setMostrarFormularioPredio]', titulo: 'ESTADO - FORMULARIOS Y SELECCION', descripcion: 'Visibilidad de formularios y registros en edicion.' },
  { ancla: 'const [idContratoPagoDepositante, setIdContratoPagoDepositante]', titulo: 'ESTADO - PAGO A DEPOSITANTES', descripcion: 'Contrato, beneficiario, medio de pago y documento soporte.' },
  { ancla: 'const [predios, setPredios]', titulo: 'ESTADO - DATOS PRINCIPALES DEL SISTEMA', descripcion: 'Arrays de predios, contratos, pagos, usuarios y demas entidades.' },
  { ancla: 'const cargarDatosEnEstado = (datos)', titulo: 'PERSISTENCIA - CARGAR DATOS EN ESTADO', descripcion: 'Hidrata el estado de React desde localStorage o API.' },
  { ancla: 'const construirDatosParaGuardar = (parches = {})', titulo: 'PERSISTENCIA - ARMAR PAYLOAD Y GUARDADO INMEDIATO', descripcion: 'Construye el objeto completo y permite guardar sin esperar el debounce.' },
  { ancla: 'useEffect(() => {', titulo: 'PERSISTENCIA - EFECTOS DE CARGA Y GUARDADO', descripcion: 'Carga inicial, autoguardado y sincronizacion de datos.' },
  { ancla: 'const limpiarFormularioPagoDepositante', titulo: 'ACCIONES - PAGO A DEPOSITANTES', descripcion: 'Formulario, validaciones y registro de pagos al depositante.' },
  { ancla: 'const textoBusquedaContratoPagoDepositante', titulo: 'DERIVADOS - PAGO A DEPOSITANTES', descripcion: 'Contratos filtrados, seleccion y datos del formulario de pago.' },
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
  { ancla: 'const prepararEdicionServicioServicioPendiente', titulo: 'ACCIONES - SERVICIOS PUBLICOS - EDICION DESDE PENDIENTES', descripcion: 'Abre el formulario de edicion del servicio en la unidad correspondiente.' },
  { ancla: 'const guardarPagoArriendo', titulo: 'ACCIONES - ARRIENDOS - REGISTRAR PAGO', descripcion: 'Pagos de arriendo, mora, IVA y asignacion multi-mes.' },
  { ancla: 'const iniciarSesion', titulo: 'ACCIONES - LOGIN Y SESION', descripcion: 'Inicio de sesion, cierre y restablecimiento de clave.' },
  { ancla: 'if (!usuarioActual) {', titulo: 'VISTA - PANTALLA DE LOGIN', descripcion: 'Formulario de acceso y restablecimiento de clave.' },
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
  { ancla: 'const normalizarContratosDeposito =', titulo: 'CONTRATOS DEPOSITO - NORMALIZACION', descripcion: 'Estructura y validacion de contratos de administracion.' },
  { ancla: 'const construirFilasEstadoCuentaArriendo', titulo: 'ARRIENDOS - FILAS ESTADO DE CUENTA', descripcion: 'Movimientos, mora y saldos por mes en arriendo.' },
  { ancla: 'const construirHtmlTablaEstadoCuentaArriendo', titulo: 'IMPRESION - TABLA ESTADO DE CUENTA ARRIENDO', descripcion: 'Regenera filas con la misma logica de liquidacion que la vista en pantalla.' },
  { ancla: 'const aplicarTablaEstadoCuentaArriendoImpresion', titulo: 'IMPRESION - SINCRONIZAR TABLA ARRIENDO', descripcion: 'Actualiza la tabla del extracto antes de imprimir con liquidacion y abonos en cascada.' },
  { ancla: 'const generarFilasExtractoArriendo', titulo: 'ARRIENDOS - FILAS DE EXTRACTO', descripcion: 'Detalle de cargos y abonos para extracto de arriendo.' },
  { ancla: 'const construirFilasEstadoCuentaAdministracion', titulo: 'ADMINISTRACION - FILAS ESTADO DE CUENTA', descripcion: 'Movimientos de administracion por contrato.' },
  { ancla: 'const construirFilasEstadoCuentaServicio', titulo: 'SERVICIOS PUBLICOS - FILAS ESTADO DE CUENTA', descripcion: 'Facturas y pagos por servicio publico.' },
  { ancla: 'function DetalleCondicionesPagoInh', titulo: 'COMPONENTE - CONDICIONES DE PAGO INH', descripcion: 'Detalle de condiciones y medios de pago INH.' },
  { ancla: 'function TablaEstadoCuentaServicio', titulo: 'COMPONENTE - TABLA ESTADO CUENTA SERVICIOS', descripcion: 'Tabla de movimientos de servicios publicos.' },
  { ancla: 'const descargarRespaldo =', titulo: 'ACCIONES - RESPALDOS DEL SISTEMA', descripcion: 'Descargar y restaurar copias de seguridad JSON.' },
  { ancla: 'const crearUsuarioSistema =', titulo: 'ACCIONES - CREAR USUARIO DEL SISTEMA', descripcion: 'Alta de usuarios con rol y permisos.' },
  { ancla: 'const imprimirVentanaUnaCarta', titulo: 'IMPRESION - VENTANA UNA CARTA', descripcion: 'Abre y dispara impresion en ventana emergente.' },
  { ancla: 'const imprimirReciboPagoArriendo =', titulo: 'IMPRESION - RECIBO PAGO ARRIENDO', descripcion: 'Genera HTML e imprime recibo de arriendo.' },
  { ancla: 'const construirHtmlImpresionExtractoPrediosPropietario', titulo: 'IMPRESION - EXTRACTO PREDIOS PROPIETARIO (HTML)', descripcion: 'Genera la plantilla de impresion desde los datos del extracto.' },
  { ancla: 'const abrirVisorImpresionExtractoPrediosPropietario', titulo: 'IMPRESION - VISOR EXTRACTO PREDIOS PROPIETARIO', descripcion: 'Modal e impresion dedicada en carta para predios por propietario.' },
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
  { ancla: '.recibo-auditoria-liquidacion {', titulo: 'RECIBO ARRIENDO - AUDITORIA LIQUIDACION', descripcion: 'Trazabilidad de fechas y recalculo de mora/cobranza en recibo de pago.' },
  { ancla: '.recibo-historial-modificaciones {', titulo: 'RECIBO ARRIENDO - HISTORIAL MODIFICACIONES', descripcion: 'Registro inmutable de cambios administrativos sobre el recibo.' },
  { ancla: '/* CREACIÓN DE USUARIOS */', titulo: 'CREACION DE USUARIOS', descripcion: 'Panel de usuarios y permisos.', reemplazar: true },
  { ancla: '/* MENÚ LATERAL DESPLEGABLE */', titulo: 'MENU LATERAL DESPLEGABLE MOVIL', descripcion: 'Menu hamburguesa y barra superior movil.', reemplazar: true },
  { ancla: '/* VISOR E IMPRESIÓN DE RECIBOS', titulo: 'VISOR E IMPRESION DE RECIBOS', descripcion: 'Modal de recibos en media carta.', reemplazar: true },
  { ancla: '/* VISOR E IMPRESIÓN DE EXTRACTOS', titulo: 'VISOR E IMPRESION DE EXTRACTOS', descripcion: 'Modal de extractos en carta.', reemplazar: true },
  { ancla: '/* VISOR E IMPRESION - EXTRACTO PREDIOS POR PROPIETARIO', titulo: 'VISOR E IMPRESION - EXTRACTO PREDIOS POR PROPIETARIO', descripcion: 'Modal e impresion dedicada en carta (plantilla propia).', reemplazar: true },
  { ancla: '/* TABLA UNIDADES DE NEGOCIO */', titulo: 'TABLA UNIDADES DE NEGOCIO', descripcion: 'Listado y detalle de unidades.', reemplazar: true },
  { ancla: '.predial-abono-resumen {', titulo: 'IMPUESTO PREDIAL - RESUMEN DE ABONO', descripcion: 'Panel resumen al registrar abono predial.' },
  { ancla: '.bloque-condiciones-pago-inh {', titulo: 'CONDICIONES DE PAGO INH - BLOQUE', descripcion: 'Contenedor de condiciones de pago en formularios.' },
  { ancla: '.bloque-forma-pago-liquidacion {', titulo: 'LIQUIDACION - MEDIO DE PAGO ACORDADO', descripcion: 'Bloque visual de condiciones y medio de pago INH.' },
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

function normalizarComentariosCssCortos(rutaArchivo) {
  const ruta = path.join(root, rutaArchivo)
  let lines = fs.readFileSync(ruta, 'utf8').split('\n')
  let cambios = 0

  for (let i = 0; i < lines.length - 2; i += 1) {
    const l1 = lines[i].trim()
    const l2 = lines[i + 1]?.trim() || ''
    const l3 = lines[i + 2]?.trim() || ''
    if (
      /^\/\* =+\s*\*\/$/.test(l1) &&
      /^\/\*.+\*\/$/.test(l2) &&
      !l2.includes('=====') &&
      /^\/\* =+\s*\*\/$/.test(l3)
    ) {
      const titulo = l2.replace(/^\/\*\s*/, '').replace(/\s*\*\/$/, '').trim().toUpperCase()
      const bloque = bloqueCss(titulo).split('\n')
      lines.splice(i, 3, ...bloque)
      cambios += 1
      i += bloque.length - 1
      continue
    }
  }

  for (let i = 0; i < lines.length; i += 1) {
    const linea = lines[i]
    const m = linea.match(/^(\s*)\/\*\s*(.+?)\s*\*\/\s*$/)
    if (!m) continue
    if (m[2].includes('=====') || m[2].includes('===')) continue
    if (/^[a-záéíóúñ]/.test(m[2].trim())) continue
    if (yaTieneTitulo(lines, i)) continue
    const titulo = m[2].trim().toUpperCase()
    const bloque = bloqueCss(titulo).split('\n')
    lines.splice(i, 1, ...bloque)
    cambios += 1
    i += bloque.length - 1
  }

  fs.writeFileSync(ruta, lines.join('\n'), 'utf8')
  console.log(`[${rutaArchivo}] ${cambios} comentarios CSS cortos normalizados`)
}

function limpiarSeparadoresCssHuerfanos(rutaArchivo) {
  const ruta = path.join(root, rutaArchivo)
  let content = fs.readFileSync(ruta, 'utf8')
  const antes = content
  content = content.replace(/^\s*\/\* =+\s*\*\/\r?\n/gm, '')
  content = content.replace(/\}\s*\/\* =+\s*\*\/\s*\r?\n/g, '}\n')
  if (content !== antes) {
    fs.writeFileSync(ruta, content, 'utf8')
    console.log(`[${rutaArchivo}] separadores CSS huerfanos eliminados`)
  }
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
      { ancla: 'export function cancelarGuardadoDatosLocalesPendiente', titulo: 'CANCELAR GUARDADO PENDIENTE', descripcion: 'Detiene el temporizador sin descartar datos en cola.' },
      { ancla: 'export function flushGuardadoDatosLocalesPendiente', titulo: 'FLUSH GUARDADO PENDIENTE', descripcion: 'Escribe de inmediato lo que quedo en cola al cerrar la pestana.' },
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
    archivo: 'server/index.js',
    secciones: [
      { ancla: 'import express', titulo: 'API - IMPORTS Y CONFIGURACION', descripcion: 'Express, CORS, variables de entorno y puerto.' },
      { ancla: 'app.get(\'/api/health\'', titulo: 'API - HEALTH CHECK', descripcion: 'Verifica conexion a SQL Server.' },
      { ancla: 'app.use(\'/api/auth\'', titulo: 'API - RUTAS DE AUTENTICACION', descripcion: 'Montaje del router de login.' },
      { ancla: 'try {', titulo: 'API - INICIO DEL SERVIDOR', descripcion: 'Inicializa base de datos y escucha peticiones.' },
    ],
  },
  {
    archivo: 'server/db.js',
    secciones: [
      { ancla: 'import sql', titulo: 'BASE DE DATOS - IMPORTS', descripcion: 'Driver mssql y datos iniciales.' },
      { ancla: 'const NOMBRE_BASE_DATOS', titulo: 'BASE DE DATOS - CONFIGURACION', descripcion: 'Nombre de base y cadena de conexion.' },
      { ancla: 'function buildConfig', titulo: 'BASE DE DATOS - CONSTRUIR CONFIG', descripcion: 'Variables de entorno y opciones de conexion.' },
      { ancla: 'export async function getPool', titulo: 'BASE DE DATOS - POOL DE CONEXION', descripcion: 'Singleton del pool mssql.' },
      { ancla: 'async function asegurarBaseDatos', titulo: 'BASE DE DATOS - CREAR BASE', descripcion: 'Crea la base si no existe en SQL Server.' },
      { ancla: 'async function asegurarTablaDatosApp', titulo: 'BASE DE DATOS - ESQUEMA DATOSAPP', descripcion: 'Tabla principal con JSON de la aplicacion.' },
      { ancla: 'export async function initDb', titulo: 'BASE DE DATOS - INICIALIZACION', descripcion: 'Asegura esquema y datos iniciales.' },
      { ancla: 'export async function obtenerDatosCompletos', titulo: 'BASE DE DATOS - LEER DATOS', descripcion: 'Obtiene el JSON completo de la aplicacion.' },
      { ancla: 'export async function guardarDatosCompletos', titulo: 'BASE DE DATOS - GUARDAR DATOS', descripcion: 'Persiste el JSON completo en SQL Server.' },
      { ancla: 'export async function buscarUsuarioLogin', titulo: 'BASE DE DATOS - LOGIN DE USUARIO', descripcion: 'Valida credenciales contra usuarios del JSON.' },
    ],
  },
  {
    archivo: 'server/auth.js',
    secciones: [
      { ancla: 'import jwt', titulo: 'AUTENTICACION - IMPORTS', descripcion: 'JWT y secreto de firma.' },
      { ancla: 'export function signToken', titulo: 'AUTENTICACION - FIRMAR TOKEN', descripcion: 'Genera JWT con id, usuario y rol.' },
      { ancla: 'export function authMiddleware', titulo: 'AUTENTICACION - MIDDLEWARE', descripcion: 'Valida Bearer token en peticiones protegidas.' },
      { ancla: 'export function puedeModificarDatos', titulo: 'AUTENTICACION - PERMISOS DE ESCRITURA', descripcion: 'Roles autorizados para guardar cambios.' },
    ],
  },
  {
    archivo: 'server/defaultData.js',
    secciones: [
      { ancla: 'export const usuariosInicialesDb', titulo: 'DATOS INICIALES - USUARIOS', descripcion: 'Usuarios de prueba admin, operador y consulta.' },
      { ancla: 'export const datosInicialesDb', titulo: 'DATOS INICIALES - ESTRUCTURA VACIA', descripcion: 'Plantilla JSON inicial para nueva instalacion.' },
    ],
  },
  {
    archivo: 'server/routes/auth.js',
    secciones: [
      { ancla: 'import { Router }', titulo: 'RUTAS AUTH - IMPORTS', descripcion: 'Router Express y dependencias de login.' },
      { ancla: "router.post('/login'", titulo: 'RUTAS AUTH - LOGIN', descripcion: 'Autentica usuario y devuelve token con datos.' },
    ],
  },
  {
    archivo: 'server/routes/datos.js',
    secciones: [
      { ancla: 'import { Router }', titulo: 'RUTAS DATOS - IMPORTS', descripcion: 'Router Express, auth y acceso a SQL.' },
      { ancla: "router.get('/'", titulo: 'RUTAS DATOS - OBTENER DATOS', descripcion: 'GET protegido del JSON completo.' },
      { ancla: "router.put('/'", titulo: 'RUTAS DATOS - GUARDAR DATOS', descripcion: 'PUT protegido con validacion de rol.' },
    ],
  },
  {
    archivo: 'server/wait-db.js',
    secciones: [
      { ancla: 'import dotenv', titulo: 'WAIT-DB - IMPORTS Y CONFIG', descripcion: 'Espera a que SQL Server este listo en Docker.' },
      { ancla: 'for (let intento', titulo: 'WAIT-DB - BUCLE DE REINTENTOS', descripcion: 'Reintenta conexion hasta agotar intentos.' },
    ],
  },
  {
    archivo: 'server/test-db.js',
    secciones: [
      { ancla: 'import dotenv', titulo: 'TEST-DB - IMPORTS', descripcion: 'Script de prueba de conexion a SQL Server.' },
      { ancla: 'try {', titulo: 'TEST-DB - VERIFICACION', descripcion: 'Inicializa DB y consulta tabla DatosApp.' },
    ],
  },
  {
    archivo: 'vite.config.js',
    secciones: [
      { ancla: 'import { defineConfig }', titulo: 'VITE - IMPORTS', descripcion: 'Configuracion del bundler y plugin React.' },
      { ancla: 'export default defineConfig', titulo: 'VITE - CONFIGURACION', descripcion: 'Base path, proxy API y servidor de desarrollo.' },
    ],
  },
  {
    archivo: 'eslint.config.js',
    secciones: [
      { ancla: 'import js', titulo: 'ESLINT - IMPORTS', descripcion: 'Plugins React Hooks, Refresh y globals.' },
      { ancla: 'export default defineConfig', titulo: 'ESLINT - CONFIGURACION FLAT', descripcion: 'Reglas recomendadas para JS y JSX.' },
    ],
  },
]

insertarPorAnclas('src/App.jsx', appJsx)
insertarCssConReemplazo('src/App.css', appCss)
normalizarComentariosCssCortos('src/App.css')
limpiarSeparadoresCssHuerfanos('src/App.css')

for (const archivo of otrosArchivos) {
  insertarPorAnclas(archivo.archivo, archivo.secciones)
}

function verificarComentariosEnJsx(rutaArchivo) {
  const ruta = path.join(root, rutaArchivo)
  const lines = fs.readFileSync(ruta, 'utf8').split('\n')
  let inApp = false
  let inReturn = false
  let depth = 0
  const errores = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const t = line.trim()

    if (line.match(/^function App\(/)) inApp = true
    if (!inApp) continue

    if (t === 'return (') {
      inReturn = true
      depth = 1
      continue
    }
    if (!inReturn) continue

    depth += (line.match(/\(/g) || []).length
    depth -= (line.match(/\)/g) || []).length

    if (t.startsWith('//')) errores.push(i + 1)

    if (depth <= 0) inReturn = false
  }

  if (errores.length) {
    console.error(
      `[${rutaArchivo}] Comentarios // dentro del JSX (visibles en pantalla): ${errores.join(', ')}`
    )
    process.exitCode = 1
    return
  }

  console.log(`[${rutaArchivo}] OK: comentarios solo en codigo, no en la interfaz`)
}

verificarComentariosEnJsx('src/App.jsx')

console.log('Listo.')
