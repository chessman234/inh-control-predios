import { useMemo, useRef, useState } from 'react'
import './App.css'

function App() {
  const anioActual = new Date().getFullYear()

  const [seccionActiva, setSeccionActiva] = useState('inicio')

  const inicioRef = useRef(null)
  const predioRef = useRef(null)
  const arriendoRef = useRef(null)
  const pagoArriendoRef = useRef(null)
  const incrementoArriendoRef = useRef(null)
  const valorAnualRef = useRef(null)
  const pagoPredialRef = useRef(null)

  const [mostrarFormularioPredio, setMostrarFormularioPredio] = useState(false)
  const [mostrarFormularioArriendo, setMostrarFormularioArriendo] = useState(false)
  const [mostrarFormularioPagoArriendo, setMostrarFormularioPagoArriendo] = useState(false)
  const [mostrarFormularioIncrementoArriendo, setMostrarFormularioIncrementoArriendo] = useState(false)
  const [mostrarFormularioValorPredial, setMostrarFormularioValorPredial] = useState(false)
  const [mostrarFormularioPredial, setMostrarFormularioPredial] = useState(false)
  const [contratoSeleccionado, setContratoSeleccionado] = useState(null)

  const [ciudad, setCiudad] = useState('')
  const [barrio, setBarrio] = useState('')
  const [direccion, setDireccion] = useState('')
  const [matricula, setMatricula] = useState('')
  const [chip, setChip] = useState('')
  const [cedulaCatastral, setCedulaCatastral] = useState('')
  const [estado, setEstado] = useState('Activo')
  const [observaciones, setObservaciones] = useState('')

  const [ultimoAnioPredialPagado, setUltimoAnioPredialPagado] = useState('')
  const [reciboUltimoPredial, setReciboUltimoPredial] = useState('')
  const [fechaUltimoPagoPredial, setFechaUltimoPagoPredial] = useState('')
  const [valorImpuestoUltimoPredial, setValorImpuestoUltimoPredial] = useState('')
  const [valorPagadoUltimoPredial, setValorPagadoUltimoPredial] = useState('')

  const [nombreTempPropietario, setNombreTempPropietario] = useState('')
  const [tipoDocTempPropietario, setTipoDocTempPropietario] = useState('Cédula de ciudadanía')
  const [docTempPropietario, setDocTempPropietario] = useState('')
  const [telTempPropietario, setTelTempPropietario] = useState('')
  const [correoTempPropietario, setCorreoTempPropietario] = useState('')
  const [porcentajeTempPropietario, setPorcentajeTempPropietario] = useState('')
  const [propietariosTemporales, setPropietariosTemporales] = useState([])

  const [codigoPredioArriendo, setCodigoPredioArriendo] = useState('')
  const [nombreArrendatario, setNombreArrendatario] = useState('')
  const [tipoDocumentoArrendatario, setTipoDocumentoArrendatario] = useState('Cédula de ciudadanía')
  const [documentoArrendatario, setDocumentoArrendatario] = useState('')
  const [telefonoArrendatario, setTelefonoArrendatario] = useState('')
  const [correoArrendatario, setCorreoArrendatario] = useState('')
  const [canonMensual, setCanonMensual] = useState('')
  const [porcentajeIncrementoAnual, setPorcentajeIncrementoAnual] = useState('')
  const [aplicaIva, setAplicaIva] = useState('No')
  const [fechaInicioContrato, setFechaInicioContrato] = useState('')
  const [fechaFinContrato, setFechaFinContrato] = useState('')
  const [depositoArriendo, setDepositoArriendo] = useState('')
  const [estadoContrato, setEstadoContrato] = useState('Activo')
  const [observacionesArriendo, setObservacionesArriendo] = useState('')

  const [codigoPredioPagoArriendo, setCodigoPredioPagoArriendo] = useState('')
  const [mesPagoArriendo, setMesPagoArriendo] = useState('')
  const [fechaPagoArriendo, setFechaPagoArriendo] = useState('')
  const [valorPagadoArriendo, setValorPagadoArriendo] = useState('')
  const [moraArriendo, setMoraArriendo] = useState('')
  const [descuentoArriendo, setDescuentoArriendo] = useState('')
  const [medioPagoArriendo, setMedioPagoArriendo] = useState('Transferencia')
  const [reciboPagoArriendo, setReciboPagoArriendo] = useState('')
  const [observacionesPagoArriendo, setObservacionesPagoArriendo] = useState('')

  const [codigoPredioIncremento, setCodigoPredioIncremento] = useState('')
  const [anioIncrementoArriendo, setAnioIncrementoArriendo] = useState(anioActual)
  const [porcentajeNuevoIncremento, setPorcentajeNuevoIncremento] = useState('')
  const [observacionesIncrementoArriendo, setObservacionesIncrementoArriendo] = useState('')

  const [codigoPredioValor, setCodigoPredioValor] = useState('')
  const [anioValorPredial, setAnioValorPredial] = useState(anioActual)
  const [valorAnualPredial, setValorAnualPredial] = useState('')
  const [fechaLimitePredial, setFechaLimitePredial] = useState('')

  const [codigoPredioPago, setCodigoPredioPago] = useState('')
  const [anioPredial, setAnioPredial] = useState(anioActual)
  const [numeroRecibo, setNumeroRecibo] = useState('')
  const [fechaPago, setFechaPago] = useState('')
  const [descuento, setDescuento] = useState('')
  const [intereses, setIntereses] = useState('')
  const [valorPagado, setValorPagado] = useState('')
  const [estadoPagoPredial, setEstadoPagoPredial] = useState('Pagado')

  const [predios, setPredios] = useState([
    {
      codigo: 'BOG-FON-0001',
      ciudad: 'Bogotá',
      barrio: 'Fontibón',
      direccion: 'Ejemplo de dirección',
      estado: 'Activo',
      matricula: '50N-123456',
      chip: 'AAA0000',
      cedulaCatastral: '110010000000000',
      observaciones: 'Predio de ejemplo',
      anioInicioPredial: 2025,
    },
  ])

  const [propietarios, setPropietarios] = useState([
    {
      codigoPredio: 'BOG-FON-0001',
      nombre: 'Propietario de ejemplo',
      tipoDocumento: 'Cédula de ciudadanía',
      numeroDocumento: '1000000000',
      telefono: '3000000000',
      correo: 'correo@ejemplo.com',
      porcentaje: 100,
    },
  ])

  const [contratosArriendo, setContratosArriendo] = useState([
    {
      codigoPredio: 'BOG-FON-0001',
      arrendatario: 'Arrendatario de ejemplo',
      tipoDocumento: 'Cédula de ciudadanía',
      numeroDocumento: '900000000',
      telefono: '3100000000',
      correo: 'arrendatario@ejemplo.com',
      canonMensual: 1500000,
      porcentajeIncrementoAnual: 10,
      aplicaIva: 'Sí',
      porcentajeIva: 19,
      fechaInicio: '2026-01-01',
      fechaFin: '2026-12-31',
      deposito: 1500000,
      estado: 'Activo',
      observaciones: 'Contrato de ejemplo',
    },
  ])

  const [incrementosArriendo, setIncrementosArriendo] = useState([
    {
      codigoPredio: 'BOG-FON-0001',
      anio: 2027,
      porcentaje: 10,
      observaciones: 'Incremento inicial registrado',
    },
  ])

  const [pagosArriendo, setPagosArriendo] = useState([
    {
      codigoPredio: 'BOG-FON-0001',
      arrendatario: 'Arrendatario de ejemplo',
      mes: '2026-01',
      fechaPago: '2026-01-05',
      canonBase: 1500000,
      incrementoAplicado: 0,
      iva: 285000,
      canonCausado: 1785000,
      valorPagado: 1785000,
      mora: 0,
      descuento: 0,
      medioPago: 'Transferencia',
      recibo: 'ARR-001',
      observaciones: 'Pago de ejemplo',
    },
  ])

  const [valoresPrediales, setValoresPrediales] = useState([
    {
      codigoPredio: 'BOG-FON-0001',
      anio: 2025,
      valorImpuesto: 1200000,
      fechaLimite: '2025-06-30',
    },
  ])

  const [pagosPrediales, setPagosPrediales] = useState([
    {
      codigoPredio: 'BOG-FON-0001',
      anio: 2025,
      numeroRecibo: 'REC-001',
      fechaPago: '2025-04-15',
      descuento: 0,
      intereses: 0,
      valorPagado: 1200000,
      estado: 'Pagado',
    },
  ])

  const normalizarTexto = (texto) => texto.trim().toLowerCase()

  const obtenerCodigoCiudad = (nombreCiudad) => {
    const ciudadLimpia = normalizarTexto(nombreCiudad)

    if (ciudadLimpia === 'bogotá' || ciudadLimpia === 'bogota') return 'BOG'
    if (ciudadLimpia === 'villavicencio') return 'VIL'
    if (ciudadLimpia === 'medellín' || ciudadLimpia === 'medellin') return 'MED'
    if (ciudadLimpia === 'cali') return 'CAL'
    if (ciudadLimpia === 'barranquilla') return 'BAQ'

    return ciudadLimpia.replace(/[^a-z]/g, '').substring(0, 3).toUpperCase()
  }

  const obtenerCodigoBarrio = (nombreBarrio) => {
    return normalizarTexto(nombreBarrio)
      .replace(/[^a-z]/g, '')
      .substring(0, 3)
      .toUpperCase()
  }

  const codigoPredio = useMemo(() => {
    if (!ciudad || !barrio) return ''

    const codigoCiudad = obtenerCodigoCiudad(ciudad)
    const codigoBarrio = obtenerCodigoBarrio(barrio)

    if (!codigoCiudad || !codigoBarrio) return ''

    const prefijo = `${codigoCiudad}-${codigoBarrio}`

    const prediosSimilares = predios.filter((predio) =>
      predio.codigo.startsWith(prefijo)
    )

    const consecutivo = String(prediosSimilares.length + 1).padStart(4, '0')

    return `${prefijo}-${consecutivo}`
  }, [ciudad, barrio, predios])

  const formatearDinero = (valor) => {
    if (valor === null || valor === undefined) return 'Sin registrar'

    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(valor || 0)
  }

  const cerrarFormularios = () => {
    setMostrarFormularioPredio(false)
    setMostrarFormularioArriendo(false)
    setMostrarFormularioPagoArriendo(false)
    setMostrarFormularioIncrementoArriendo(false)
    setMostrarFormularioValorPredial(false)
    setMostrarFormularioPredial(false)
  }

  const cambiarSeccion = (seccion) => {
    cerrarFormularios()
    setSeccionActiva(seccion)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const irASeccion = (referencia) => {
    setTimeout(() => {
      referencia.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 150)
  }

  const totalTemporalPropietarios = propietariosTemporales.reduce(
    (total, propietario) => total + Number(propietario.porcentaje || 0),
    0
  )

  const porcentajeFaltante = 100 - totalTemporalPropietarios

  const obtenerContratoActivoPorPredio = (codigoPredio) => {
    return contratosArriendo.find(
      (contrato) =>
        contrato.codigoPredio === codigoPredio && contrato.estado === 'Activo'
    )
  }

  const calcularCanonArriendo = (contrato, mes) => {
    if (!contrato || !mes) {
      return {
        canonBase: 0,
        incrementoAplicado: 0,
        iva: 0,
        canonCausado: 0,
      }
    }

    const anioPago = Number(mes.substring(0, 4))
    const anioInicio = Number(contrato.fechaInicio.substring(0, 4))
    let canonBase = Number(contrato.canonMensual || 0)
    let incrementoAplicado = 0

    for (let anio = anioInicio + 1; anio <= anioPago; anio++) {
      const incrementoDelAnio = incrementosArriendo.find(
        (incremento) =>
          incremento.codigoPredio === contrato.codigoPredio &&
          Number(incremento.anio) === Number(anio)
      )

      const porcentaje =
        incrementoDelAnio?.porcentaje ??
        Number(contrato.porcentajeIncrementoAnual || 0)

      canonBase = Math.round(canonBase * (1 + porcentaje / 100))

      if (anio === anioPago) {
        incrementoAplicado = porcentaje
      }
    }

    const iva = contrato.aplicaIva === 'Sí' ? Math.round(canonBase * 0.19) : 0
    const canonCausado = canonBase + iva

    return {
      canonBase,
      incrementoAplicado,
      iva,
      canonCausado,
    }
  }

  const contratoSeleccionadoPagoArriendo = useMemo(() => {
    return obtenerContratoActivoPorPredio(codigoPredioPagoArriendo)
  }, [codigoPredioPagoArriendo, contratosArriendo])

  const canonCalculadoPagoArriendo = useMemo(() => {
    return calcularCanonArriendo(
      contratoSeleccionadoPagoArriendo,
      mesPagoArriendo
    )
  }, [contratoSeleccionadoPagoArriendo, mesPagoArriendo, incrementosArriendo])

  const limpiarPropietarioTemporal = () => {
    setNombreTempPropietario('')
    setTipoDocTempPropietario('Cédula de ciudadanía')
    setDocTempPropietario('')
    setTelTempPropietario('')
    setCorreoTempPropietario('')
    setPorcentajeTempPropietario('')
  }

  const limpiarFormularioPredio = () => {
    setCiudad('')
    setBarrio('')
    setDireccion('')
    setMatricula('')
    setChip('')
    setCedulaCatastral('')
    setEstado('Activo')
    setObservaciones('')
    setUltimoAnioPredialPagado('')
    setReciboUltimoPredial('')
    setFechaUltimoPagoPredial('')
    setValorImpuestoUltimoPredial('')
    setValorPagadoUltimoPredial('')
    setPropietariosTemporales([])
    limpiarPropietarioTemporal()
  }

  const limpiarFormularioArriendo = () => {
    setCodigoPredioArriendo('')
    setNombreArrendatario('')
    setTipoDocumentoArrendatario('Cédula de ciudadanía')
    setDocumentoArrendatario('')
    setTelefonoArrendatario('')
    setCorreoArrendatario('')
    setCanonMensual('')
    setPorcentajeIncrementoAnual('')
    setAplicaIva('No')
    setFechaInicioContrato('')
    setFechaFinContrato('')
    setDepositoArriendo('')
    setEstadoContrato('Activo')
    setObservacionesArriendo('')
  }

  const limpiarFormularioPagoArriendo = () => {
    setCodigoPredioPagoArriendo('')
    setMesPagoArriendo('')
    setFechaPagoArriendo('')
    setValorPagadoArriendo('')
    setMoraArriendo('')
    setDescuentoArriendo('')
    setMedioPagoArriendo('Transferencia')
    setReciboPagoArriendo('')
    setObservacionesPagoArriendo('')
  }

  const agregarPropietarioTemporal = () => {
    if (
      !nombreTempPropietario ||
      !docTempPropietario ||
      !telTempPropietario ||
      !correoTempPropietario ||
      !porcentajeTempPropietario
    ) {
      alert('Complete todos los datos del propietario.')
      return
    }

    const porcentajeNuevo = Number(porcentajeTempPropietario)

    if (porcentajeNuevo <= 0) {
      alert('El porcentaje debe ser mayor a 0.')
      return
    }

    if (totalTemporalPropietarios + porcentajeNuevo > 100) {
      alert(
        `No se puede agregar. Ya tiene ${totalTemporalPropietarios}% asignado y solo falta ${porcentajeFaltante}%.`
      )
      return
    }

    setPropietariosTemporales([
      ...propietariosTemporales,
      {
        nombre: nombreTempPropietario,
        tipoDocumento: tipoDocTempPropietario,
        numeroDocumento: docTempPropietario,
        telefono: telTempPropietario,
        correo: correoTempPropietario,
        porcentaje: porcentajeNuevo,
      },
    ])

    limpiarPropietarioTemporal()
  }

  const eliminarPropietarioTemporal = (index) => {
    const nuevaLista = propietariosTemporales.filter((_, i) => i !== index)
    setPropietariosTemporales(nuevaLista)
  }

  const guardarPredio = () => {
    if (
      !ciudad ||
      !barrio ||
      !direccion ||
      !matricula ||
      !chip ||
      !cedulaCatastral
    ) {
      alert(
        'Para guardar el predio complete ciudad, barrio, dirección, matrícula, CHIP y cédula catastral.'
      )
      return
    }

    if (propietariosTemporales.length === 0) {
      alert('Debe registrar al menos un propietario del inmueble.')
      return
    }

    if (totalTemporalPropietarios !== 100) {
      alert(
        `No se puede guardar el predio. Los propietarios deben sumar exactamente 100%. Actualmente suman ${totalTemporalPropietarios}%.`
      )
      return
    }

    const anioInicial = ultimoAnioPredialPagado
      ? Number(ultimoAnioPredialPagado)
      : anioActual

    const nuevoPredio = {
      codigo: codigoPredio,
      ciudad,
      barrio,
      direccion,
      estado,
      matricula,
      chip,
      cedulaCatastral,
      observaciones,
      anioInicioPredial: anioInicial,
    }

    const propietariosDelNuevoPredio = propietariosTemporales.map(
      (propietario) => ({
        codigoPredio,
        ...propietario,
      })
    )

    const nuevosValoresPrediales = []
    const nuevosPagosPrediales = []

    if (
      ultimoAnioPredialPagado &&
      valorImpuestoUltimoPredial &&
      valorPagadoUltimoPredial
    ) {
      nuevosValoresPrediales.push({
        codigoPredio,
        anio: Number(ultimoAnioPredialPagado),
        valorImpuesto: Number(valorImpuestoUltimoPredial) || 0,
        fechaLimite: '',
      })

      nuevosPagosPrediales.push({
        codigoPredio,
        anio: Number(ultimoAnioPredialPagado),
        numeroRecibo: reciboUltimoPredial,
        fechaPago: fechaUltimoPagoPredial,
        descuento: 0,
        intereses: 0,
        valorPagado: Number(valorPagadoUltimoPredial) || 0,
        estado: 'Pagado',
      })
    }

    setPredios([nuevoPredio, ...predios])
    setPropietarios([...propietariosDelNuevoPredio, ...propietarios])
    setValoresPrediales([...nuevosValoresPrediales, ...valoresPrediales])
    setPagosPrediales([...nuevosPagosPrediales, ...pagosPrediales])

    limpiarFormularioPredio()
    setMostrarFormularioPredio(false)
  }

  const guardarContratoArriendo = () => {
    if (
      !codigoPredioArriendo ||
      !nombreArrendatario ||
      !documentoArrendatario ||
      !telefonoArrendatario ||
      !correoArrendatario ||
      !canonMensual ||
      !porcentajeIncrementoAnual ||
      !fechaInicioContrato
    ) {
      alert(
        'Complete predio, arrendatario, documento, teléfono, correo, canon mensual, incremento anual y fecha de inicio.'
      )
      return
    }

    const existeContratoActivo = contratosArriendo.some(
      (contrato) =>
        contrato.codigoPredio === codigoPredioArriendo &&
        contrato.estado === 'Activo'
    )

    if (existeContratoActivo) {
      alert('Este predio ya tiene un contrato de arriendo activo.')
      return
    }

    const nuevoContrato = {
      codigoPredio: codigoPredioArriendo,
      arrendatario: nombreArrendatario,
      tipoDocumento: tipoDocumentoArrendatario,
      numeroDocumento: documentoArrendatario,
      telefono: telefonoArrendatario,
      correo: correoArrendatario,
      canonMensual: Number(canonMensual) || 0,
      porcentajeIncrementoAnual: Number(porcentajeIncrementoAnual) || 0,
      aplicaIva,
      porcentajeIva: aplicaIva === 'Sí' ? 19 : 0,
      fechaInicio: fechaInicioContrato,
      fechaFin: fechaFinContrato,
      deposito: Number(depositoArriendo) || 0,
      estado: estadoContrato,
      observaciones: observacionesArriendo,
    }

    setContratosArriendo([nuevoContrato, ...contratosArriendo])
    limpiarFormularioArriendo()
    setMostrarFormularioArriendo(false)
  }

  const guardarPagoArriendo = () => {
    if (
      !codigoPredioPagoArriendo ||
      !mesPagoArriendo ||
      !fechaPagoArriendo ||
      !valorPagadoArriendo
    ) {
      alert('Complete predio, mes, fecha de pago y valor pagado.')
      return
    }

    const contratoActivo = obtenerContratoActivoPorPredio(
      codigoPredioPagoArriendo
    )

    if (!contratoActivo) {
      alert('Este predio no tiene contrato de arriendo activo.')
      return
    }

    const { canonBase, incrementoAplicado, iva, canonCausado } =
      calcularCanonArriendo(contratoActivo, mesPagoArriendo)

    const nuevoPagoArriendo = {
      codigoPredio: codigoPredioPagoArriendo,
      arrendatario: contratoActivo.arrendatario,
      mes: mesPagoArriendo,
      fechaPago: fechaPagoArriendo,
      canonBase,
      incrementoAplicado,
      iva,
      canonCausado,
      valorPagado: Number(valorPagadoArriendo) || 0,
      mora: Number(moraArriendo) || 0,
      descuento: Number(descuentoArriendo) || 0,
      medioPago: medioPagoArriendo,
      recibo: reciboPagoArriendo,
      observaciones: observacionesPagoArriendo,
    }

    setPagosArriendo([nuevoPagoArriendo, ...pagosArriendo])
    limpiarFormularioPagoArriendo()
    setMostrarFormularioPagoArriendo(false)
  }

  const guardarIncrementoArriendo = () => {
    if (
      !codigoPredioIncremento ||
      !anioIncrementoArriendo ||
      !porcentajeNuevoIncremento
    ) {
      alert('Complete predio, año y porcentaje de incremento.')
      return
    }

    const nuevoIncremento = {
      codigoPredio: codigoPredioIncremento,
      anio: Number(anioIncrementoArriendo),
      porcentaje: Number(porcentajeNuevoIncremento),
      observaciones: observacionesIncrementoArriendo,
    }

    const listaSinRepetido = incrementosArriendo.filter(
      (incremento) =>
        !(
          incremento.codigoPredio === codigoPredioIncremento &&
          Number(incremento.anio) === Number(anioIncrementoArriendo)
        )
    )

    setIncrementosArriendo([nuevoIncremento, ...listaSinRepetido])
    setCodigoPredioIncremento('')
    setAnioIncrementoArriendo(anioActual)
    setPorcentajeNuevoIncremento('')
    setObservacionesIncrementoArriendo('')
    setMostrarFormularioIncrementoArriendo(false)
  }

  const guardarValorPredialAnual = () => {
    if (!codigoPredioValor || !anioValorPredial || !valorAnualPredial) {
      alert('Complete predio, año y valor predial anual.')
      return
    }

    const yaExiste = valoresPrediales.some(
      (valor) =>
        valor.codigoPredio === codigoPredioValor &&
        Number(valor.anio) === Number(anioValorPredial)
    )

    if (yaExiste) {
      alert('Este predio ya tiene registrado el valor predial para ese año.')
      return
    }

    setValoresPrediales([
      {
        codigoPredio: codigoPredioValor,
        anio: Number(anioValorPredial),
        valorImpuesto: Number(valorAnualPredial) || 0,
        fechaLimite: fechaLimitePredial,
      },
      ...valoresPrediales,
    ])

    setCodigoPredioValor('')
    setAnioValorPredial(anioActual)
    setValorAnualPredial('')
    setFechaLimitePredial('')
    setMostrarFormularioValorPredial(false)
  }

  const guardarPagoPredial = () => {
    if (!codigoPredioPago || !anioPredial || !valorPagado) {
      alert('Complete predio, año y valor pagado.')
      return
    }

    const existeValorAnual = valoresPrediales.some(
      (valor) =>
        valor.codigoPredio === codigoPredioPago &&
        Number(valor.anio) === Number(anioPredial)
    )

    if (!existeValorAnual) {
      alert('Antes de registrar el pago, registre el valor predial anual.')
      return
    }

    setPagosPrediales([
      {
        codigoPredio: codigoPredioPago,
        anio: Number(anioPredial),
        numeroRecibo,
        fechaPago,
        descuento: Number(descuento) || 0,
        intereses: Number(intereses) || 0,
        valorPagado: Number(valorPagado) || 0,
        estado: estadoPagoPredial,
      },
      ...pagosPrediales,
    ])

    setCodigoPredioPago('')
    setAnioPredial(anioActual)
    setNumeroRecibo('')
    setFechaPago('')
    setDescuento('')
    setIntereses('')
    setValorPagado('')
    setEstadoPagoPredial('Pagado')
    setMostrarFormularioPredial(false)
  }

  const totalPagadoPredial = pagosPrediales.reduce(
    (total, pago) => total + (Number(pago.valorPagado) || 0),
    0
  )

  const totalCanonActivo = contratosArriendo
    .filter((contrato) => contrato.estado === 'Activo')
    .reduce((total, contrato) => total + Number(contrato.canonMensual || 0), 0)

  const totalPagadoArriendos = pagosArriendo.reduce(
    (total, pago) => total + (Number(pago.valorPagado) || 0),
    0
  )

  const alertasPrediales = useMemo(() => {
    const alertas = []

    predios.forEach((predio) => {
      const anioInicio = predio.anioInicioPredial || anioActual

      for (let anio = anioInicio + 1; anio <= anioActual; anio++) {
        const existeValor = valoresPrediales.some(
          (valor) =>
            valor.codigoPredio === predio.codigo &&
            Number(valor.anio) === Number(anio)
        )

        if (!existeValor) {
          alertas.push({
            codigo: predio.codigo,
            barrio: predio.barrio,
            mensaje: `Falta registrar el valor predial del año ${anio}`,
          })
        }
      }
    })

    return alertas
  }, [predios, valoresPrediales, anioActual])

  const extractosPrediales = useMemo(() => {
    return predios.map((predio) => {
      const movimientos = []
      const anioInicial = predio.anioInicioPredial || anioActual

      for (let anio = anioInicial; anio <= anioActual; anio++) {
        const valorAnual = valoresPrediales.find(
          (valor) =>
            valor.codigoPredio === predio.codigo &&
            Number(valor.anio) === Number(anio)
        )

        const pagosDelAnio = pagosPrediales.filter(
          (pago) =>
            pago.codigoPredio === predio.codigo &&
            Number(pago.anio) === Number(anio)
        )

        const totalPagado = pagosDelAnio.reduce(
          (total, pago) => total + Number(pago.valorPagado || 0),
          0
        )

        const totalDescuento = pagosDelAnio.reduce(
          (total, pago) => total + Number(pago.descuento || 0),
          0
        )

        const totalIntereses = pagosDelAnio.reduce(
          (total, pago) => total + Number(pago.intereses || 0),
          0
        )

        const ultimoPago = pagosDelAnio[0]

        let valorAPagar = null
        let saldoPendiente = null
        let estadoMovimiento = 'Falta actualizar valor'

        if (valorAnual) {
          valorAPagar = Number(valorAnual.valorImpuesto) || 0
          saldoPendiente =
            valorAPagar - totalDescuento + totalIntereses - totalPagado

          if (saldoPendiente <= 0) {
            estadoMovimiento = 'Pagado / Al día'
          } else if (totalPagado > 0) {
            estadoMovimiento = 'Abono registrado'
          } else {
            estadoMovimiento = 'Pendiente de pago'
          }
        }

        movimientos.push({
          anio,
          fechaLimite: valorAnual?.fechaLimite || 'Sin registrar',
          fechaPago: ultimoPago?.fechaPago || 'Sin pago',
          recibo: ultimoPago?.numeroRecibo || 'Sin recibo',
          valorAPagar,
          descuento: totalDescuento,
          intereses: totalIntereses,
          valorPagado: totalPagado,
          saldoPendiente,
          estadoMovimiento,
        })
      }

      const totalImpuesto = movimientos.reduce(
        (total, mov) => total + (Number(mov.valorAPagar) || 0),
        0
      )

      const totalDescuento = movimientos.reduce(
        (total, mov) => total + (Number(mov.descuento) || 0),
        0
      )

      const totalIntereses = movimientos.reduce(
        (total, mov) => total + (Number(mov.intereses) || 0),
        0
      )

      const totalPagado = movimientos.reduce(
        (total, mov) => total + (Number(mov.valorPagado) || 0),
        0
      )

      const saldoPendiente = movimientos.reduce(
        (total, mov) => total + (Number(mov.saldoPendiente) || 0),
        0
      )

      const propietariosDelPredio = propietarios.filter(
        (propietario) => propietario.codigoPredio === predio.codigo
      )

      const totalParticipacion = propietariosDelPredio.reduce(
        (total, propietario) => total + Number(propietario.porcentaje),
        0
      )

      const tienePendientesActualizar = movimientos.some(
        (mov) => mov.estadoMovimiento === 'Falta actualizar valor'
      )

      let estadoGeneral = 'Al día'

      if (tienePendientesActualizar) {
        estadoGeneral = 'Pendiente de actualización'
      } else if (saldoPendiente > 0) {
        estadoGeneral = 'Con saldo pendiente'
      }

      return {
        predio,
        propietarios: propietariosDelPredio,
        totalParticipacion,
        movimientos: movimientos.sort((a, b) => b.anio - a.anio),
        resumen: {
          totalImpuesto,
          totalDescuento,
          totalIntereses,
          totalPagado,
          saldoPendiente,
          estadoGeneral,
        },
      }
    })
  }, [predios, valoresPrediales, pagosPrediales, propietarios, anioActual])

  const extractosArriendo = useMemo(() => {
    return contratosArriendo.map((contrato) => {
      const pagosDelContrato = pagosArriendo
        .filter((pago) => pago.codigoPredio === contrato.codigoPredio)
        .sort((a, b) => a.mes.localeCompare(b.mes))

      const movimientos = pagosDelContrato.map((pago) => {
        const canonBase = Number(pago.canonBase || pago.valorCanon || 0)
        const incrementoAplicado = Number(pago.incrementoAplicado || 0)
        const iva = Number(pago.iva || 0)
        const canonCausado = Number(pago.canonCausado || canonBase + iva)
        const valorPagado = Number(pago.valorPagado || 0)
        const mora = Number(pago.mora || 0)
        const descuento = Number(pago.descuento || 0)
        const saldoDeuda = canonCausado + mora - descuento - valorPagado

        let estadoMovimiento = 'Pagado'

        if (saldoDeuda > 0 && valorPagado > 0) {
          estadoMovimiento = 'Abono registrado'
        }

        if (saldoDeuda > 0 && valorPagado === 0) {
          estadoMovimiento = 'Pendiente'
        }

        return {
          mes: pago.mes,
          fechaPago: pago.fechaPago,
          recibo: pago.recibo || 'Sin recibo',
          canonBase,
          incrementoAplicado,
          iva,
          canonCausado,
          pagado: valorPagado,
          mora,
          descuento,
          saldoDeuda,
          estadoMovimiento,
        }
      })

      const totalCanonBase = movimientos.reduce(
        (total, mov) => total + Number(mov.canonBase || 0),
        0
      )

      const totalIva = movimientos.reduce(
        (total, mov) => total + Number(mov.iva || 0),
        0
      )

      const totalCanonCausado = movimientos.reduce(
        (total, mov) => total + Number(mov.canonCausado || 0),
        0
      )

      const totalPagado = movimientos.reduce(
        (total, mov) => total + Number(mov.pagado || 0),
        0
      )

      const totalMora = movimientos.reduce(
        (total, mov) => total + Number(mov.mora || 0),
        0
      )

      const totalDescuento = movimientos.reduce(
        (total, mov) => total + Number(mov.descuento || 0),
        0
      )

      const saldoDeudaTotal = movimientos.reduce(
        (total, mov) => total + Number(mov.saldoDeuda || 0),
        0
      )

      return {
        contrato,
        movimientos: movimientos.sort((a, b) => b.mes.localeCompare(a.mes)),
        resumen: {
          totalCanonBase,
          totalIva,
          totalCanonCausado,
          totalPagado,
          totalMora,
          totalDescuento,
          saldoDeudaTotal,
          estadoGeneral: saldoDeudaTotal > 0 ? 'Con deuda' : 'Al día',
        },
      }
    })
  }, [contratosArriendo, pagosArriendo])

  const mostrarInicio = seccionActiva === 'inicio'
  const mostrarPredios = seccionActiva === 'predios'
  const mostrarPredial = seccionActiva === 'predial'
  const mostrarArriendos = seccionActiva === 'arriendos'
  const mostrarEstados = seccionActiva === 'estados'
  const mostrarReportes = seccionActiva === 'reportes'

  return (
    <div className="app">
      <aside className="sidebar no-print">
        <div className="brand-box">
          <img src="/logo-inh.png" alt="INH Constructores" className="brand-logo" />
          <p>Control Predial</p>
        </div>

        <nav className="menu">
          <button
            type="button"
            className={seccionActiva === 'inicio' ? 'menu-item active' : 'menu-item'}
            onClick={() => cambiarSeccion('inicio')}
          >
            <span>⌂</span>
            Inicio
          </button>

          <button
            type="button"
            className={seccionActiva === 'predios' ? 'menu-item active' : 'menu-item'}
            onClick={() => cambiarSeccion('predios')}
          >
            <span>▦</span>
            Predios
          </button>

          <button
            type="button"
            className={seccionActiva === 'predial' ? 'menu-item active' : 'menu-item'}
            onClick={() => cambiarSeccion('predial')}
          >
            <span>▣</span>
            Predial
          </button>

          <button
            type="button"
            className={seccionActiva === 'arriendos' ? 'menu-item active' : 'menu-item'}
            onClick={() => cambiarSeccion('arriendos')}
          >
            <span>≡</span>
            Arriendos
          </button>

          <button
            type="button"
            className={seccionActiva === 'estados' ? 'menu-item active' : 'menu-item'}
            onClick={() => cambiarSeccion('estados')}
          >
            <span>□</span>
            Estados de cuenta
          </button>

          <button
            type="button"
            className={seccionActiva === 'reportes' ? 'menu-item active' : 'menu-item'}
            onClick={() => cambiarSeccion('reportes')}
          >
            <span>▥</span>
            Reportes
          </button>
        </nav>
      </aside>

      <main className="main">
        <section ref={inicioRef} className="hero-card no-print">
          <div className="hero-content">
            <div className="hero-logo-box">
              <img src="/logo-inh.png" alt="Logo INH" />
            </div>

            <div>
              <h1>INH Control de Predios y Arriendos</h1>
              <p>
                Sistema para administrar predios, propietarios, predial,
                contratos, pagos de arriendo, IVA, incrementos y estados de cuenta.
              </p>
            </div>
          </div>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => {
                cerrarFormularios()
                setSeccionActiva('predios')
                setMostrarFormularioPredio(true)
                irASeccion(predioRef)
              }}
            >
              <span>+</span>
              Nuevo predio
            </button>

            <button
              className="btn-gold"
              onClick={() => {
                cerrarFormularios()
                setSeccionActiva('arriendos')
                setMostrarFormularioArriendo(true)
                irASeccion(arriendoRef)
              }}
            >
              <span>+</span>
              Contrato arriendo
            </button>

            <button
              className="btn-gold"
              onClick={() => {
                cerrarFormularios()
                setSeccionActiva('arriendos')
                setMostrarFormularioPagoArriendo(true)
                irASeccion(pagoArriendoRef)
              }}
            >
              <span>+</span>
              Pago arriendo
            </button>

            <button
              className="btn-gold"
              onClick={() => {
                cerrarFormularios()
                setSeccionActiva('arriendos')
                setMostrarFormularioIncrementoArriendo(true)
                irASeccion(incrementoArriendoRef)
              }}
            >
              <span>+</span>
              Actualizar incremento
            </button>

            <button
              className="btn-gold"
              onClick={() => {
                cerrarFormularios()
                setSeccionActiva('predial')
                setMostrarFormularioValorPredial(true)
                irASeccion(valorAnualRef)
              }}
            >
              <span>+</span>
              Valor anual predial
            </button>

            <button
              className="btn-gold"
              onClick={() => {
                cerrarFormularios()
                setSeccionActiva('predial')
                setMostrarFormularioPredial(true)
                irASeccion(pagoPredialRef)
              }}
            >
              <span>+</span>
              Pago predial
            </button>
          </div>
        </section>

        {alertasPrediales.length > 0 && (mostrarInicio || mostrarPredial) && (
          <section className="alert-panel no-print">
            <h2>Alertas de actualización predial</h2>
            {alertasPrediales.map((alerta, index) => (
              <div className="alert-item" key={index}>
                <strong>{alerta.codigo}</strong> - {alerta.barrio}: {alerta.mensaje}
              </div>
            ))}
          </section>
        )}

        {mostrarInicio && (
          <section className="cards no-print">
            <div className="stat-card">
              <div className="stat-icon">▦</div>
              <h3>Total predios</h3>
              <strong>{predios.length}</strong>
              <p>Predios registrados</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">◎</div>
              <h3>Propietarios</h3>
              <strong>{propietarios.length}</strong>
              <p>Propietarios registrados</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">≡</div>
              <h3>Arriendos activos</h3>
              <strong>{contratosArriendo.filter((c) => c.estado === 'Activo').length}</strong>
              <p>{formatearDinero(totalCanonActivo)} canon base</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">$</div>
              <h3>Pagos arriendo</h3>
              <strong className="money">{formatearDinero(totalPagadoArriendos)}</strong>
              <p>Total pagado por arriendos</p>
            </div>

            <div className="stat-card">
              <div className="stat-icon">▣</div>
              <h3>Pagos prediales</h3>
              <strong className="money">{formatearDinero(totalPagadoPredial)}</strong>
              <p>Total pagado</p>
            </div>
          </section>
        )}

        {mostrarPredios && (
          <>
            {mostrarFormularioPredio && (
              <section ref={predioRef} className="form-panel no-print">
                <div className="section-title">
                  <div className="section-icon">▦</div>
                  <h2>Registro de nuevo inmueble</h2>
                </div>

                <p className="form-description">
                  Para guardar el inmueble, los propietarios deben sumar exactamente 100%.
                </p>

                <div className="property-form">
                  <div className="form-section-title full">Datos principales del predio</div>

                  <div className="form-group">
                    <label>Código del predio</label>
                    <input type="text" value={codigoPredio} readOnly placeholder="Se genera automáticamente" />
                  </div>

                  <div className="form-group">
                    <label>Ciudad</label>
                    <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Barrio</label>
                    <input type="text" value={barrio} onChange={(e) => setBarrio(e.target.value)} />
                  </div>

                  <div className="form-group full">
                    <label>Dirección</label>
                    <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                  </div>

                  <div className="form-section-title full">Información jurídica y catastral</div>

                  <div className="form-group">
                    <label>Matrícula inmobiliaria</label>
                    <input type="text" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>CHIP</label>
                    <input type="text" value={chip} onChange={(e) => setChip(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Cédula catastral</label>
                    <input type="text" value={cedulaCatastral} onChange={(e) => setCedulaCatastral(e.target.value)} />
                  </div>

                  <div className="form-section-title full">Propietarios del inmueble</div>

                  <div className="form-group">
                    <label>Nombre propietario</label>
                    <input type="text" value={nombreTempPropietario} onChange={(e) => setNombreTempPropietario(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Tipo documento</label>
                    <select value={tipoDocTempPropietario} onChange={(e) => setTipoDocTempPropietario(e.target.value)}>
                      <option>Cédula de ciudadanía</option>
                      <option>NIT</option>
                      <option>Cédula de extranjería</option>
                      <option>Pasaporte</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Número documento</label>
                    <input type="text" value={docTempPropietario} onChange={(e) => setDocTempPropietario(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Teléfono</label>
                    <input type="text" value={telTempPropietario} onChange={(e) => setTelTempPropietario(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Correo</label>
                    <input type="email" value={correoTempPropietario} onChange={(e) => setCorreoTempPropietario(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Porcentaje</label>
                    <input type="number" value={porcentajeTempPropietario} onChange={(e) => setPorcentajeTempPropietario(e.target.value)} />
                  </div>

                  <div className="form-actions full">
                    <button type="button" className="btn-gold" onClick={agregarPropietarioTemporal}>
                      Agregar propietario
                    </button>
                  </div>

                  <div className="temp-owners full">
                    <h3>Propietarios agregados</h3>
                    <p>Total asignado: <strong>{totalTemporalPropietarios}%</strong></p>
                    <p>Falta por asignar: <strong>{porcentajeFaltante}%</strong></p>

                    {propietariosTemporales.length === 0 && (
                      <p>No hay propietarios agregados todavía.</p>
                    )}

                    {propietariosTemporales.map((propietario, index) => (
                      <div className="temp-owner-row" key={index}>
                        <span>{propietario.nombre}</span>
                        <span>{propietario.numeroDocumento}</span>
                        <span>{propietario.porcentaje}%</span>
                        <button type="button" onClick={() => eliminarPropietarioTemporal(index)}>
                          Eliminar
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="form-section-title full">Información inicial de predial</div>

                  <div className="form-group">
                    <label>Último año predial pagado</label>
                    <input type="number" value={ultimoAnioPredialPagado} onChange={(e) => setUltimoAnioPredialPagado(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Recibo último pago</label>
                    <input type="text" value={reciboUltimoPredial} onChange={(e) => setReciboUltimoPredial(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Fecha último pago</label>
                    <input type="date" value={fechaUltimoPagoPredial} onChange={(e) => setFechaUltimoPagoPredial(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Valor impuesto último año</label>
                    <input type="number" value={valorImpuestoUltimoPredial} onChange={(e) => setValorImpuestoUltimoPredial(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Valor pagado último año</label>
                    <input type="number" value={valorPagadoUltimoPredial} onChange={(e) => setValorPagadoUltimoPredial(e.target.value)} />
                  </div>

                  <div className="form-section-title full">Observaciones</div>

                  <div className="form-group full">
                    <label>Observaciones del predio</label>
                    <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)}></textarea>
                  </div>

                  <div className="form-actions full">
                    <button type="button" className="btn-secondary" onClick={() => setMostrarFormularioPredio(false)}>
                      Cancelar
                    </button>

                    <button type="button" className="btn-primary" onClick={guardarPredio}>
                      Guardar inmueble
                    </button>
                  </div>
                </div>
              </section>
            )}

            <section className="rent-increments-panel no-print">
              <div className="section-title">
                <div className="section-icon">▦</div>
                <h2>Predios registrados</h2>
              </div>

              <div className="simple-table-wrapper">
                <table className="simple-table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Ciudad</th>
                      <th>Barrio</th>
                      <th>Dirección</th>
                      <th>Matrícula</th>
                      <th>CHIP</th>
                      <th>Estado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {predios.map((predio, index) => (
                      <tr key={index}>
                        <td>{predio.codigo}</td>
                        <td>{predio.ciudad}</td>
                        <td>{predio.barrio}</td>
                        <td>{predio.direccion}</td>
                        <td>{predio.matricula}</td>
                        <td>{predio.chip}</td>
                        <td>
                          <span className={predio.estado === 'Activo' ? 'status active' : 'status inactive'}>
                            {predio.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rent-increments-panel no-print">
              <div className="section-title">
                <div className="section-icon">◎</div>
                <h2>Propietarios por predio</h2>
              </div>

              <div className="simple-table-wrapper">
                <table className="simple-table">
                  <thead>
                    <tr>
                      <th>Predio</th>
                      <th>Propietario</th>
                      <th>Documento</th>
                      <th>Teléfono</th>
                      <th>Correo</th>
                      <th>Porcentaje</th>
                    </tr>
                  </thead>

                  <tbody>
                    {propietarios.map((propietario, index) => (
                      <tr key={index}>
                        <td>{propietario.codigoPredio}</td>
                        <td>{propietario.nombre}</td>
                        <td>{propietario.tipoDocumento} - {propietario.numeroDocumento}</td>
                        <td>{propietario.telefono}</td>
                        <td>{propietario.correo}</td>
                        <td><span className="status active">{propietario.porcentaje}%</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {mostrarArriendos && (
          <>
            {mostrarFormularioArriendo && (
              <section ref={arriendoRef} className="form-panel no-print">
                <div className="section-title">
                  <div className="section-icon">≡</div>
                  <h2>Registro de contrato de arriendo</h2>
                </div>

                <p className="form-description">
                  Registre el canon inicial, el incremento anual y si el contrato aplica IVA del 19%.
                </p>

                <div className="property-form">
                  <div className="form-section-title full">Datos del predio</div>

                  <div className="form-group">
                    <label>Predio</label>
                    <select value={codigoPredioArriendo} onChange={(e) => setCodigoPredioArriendo(e.target.value)}>
                      <option value="">Seleccione un predio</option>
                      {predios.map((predio, index) => (
                        <option key={index} value={predio.codigo}>{predio.codigo} - {predio.barrio}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-section-title full">Datos del arrendatario</div>

                  <div className="form-group">
                    <label>Nombre del arrendatario</label>
                    <input type="text" value={nombreArrendatario} onChange={(e) => setNombreArrendatario(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Tipo documento</label>
                    <select value={tipoDocumentoArrendatario} onChange={(e) => setTipoDocumentoArrendatario(e.target.value)}>
                      <option>Cédula de ciudadanía</option>
                      <option>NIT</option>
                      <option>Cédula de extranjería</option>
                      <option>Pasaporte</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Número documento</label>
                    <input type="text" value={documentoArrendatario} onChange={(e) => setDocumentoArrendatario(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Teléfono</label>
                    <input type="text" value={telefonoArrendatario} onChange={(e) => setTelefonoArrendatario(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Correo</label>
                    <input type="email" value={correoArrendatario} onChange={(e) => setCorreoArrendatario(e.target.value)} />
                  </div>

                  <div className="form-section-title full">Datos económicos del contrato</div>

                  <div className="form-group">
                    <label>Canon mensual inicial</label>
                    <input type="number" value={canonMensual} onChange={(e) => setCanonMensual(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Incremento anual por defecto (%)</label>
                    <input type="number" value={porcentajeIncrementoAnual} onChange={(e) => setPorcentajeIncrementoAnual(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>¿Aplica IVA?</label>
                    <select value={aplicaIva} onChange={(e) => setAplicaIva(e.target.value)}>
                      <option>No</option>
                      <option>Sí</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>IVA aplicado</label>
                    <input type="text" value={aplicaIva === 'Sí' ? '19%' : 'No aplica'} readOnly />
                  </div>

                  <div className="form-group">
                    <label>Depósito</label>
                    <input type="number" value={depositoArriendo} onChange={(e) => setDepositoArriendo(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Fecha inicio</label>
                    <input type="date" value={fechaInicioContrato} onChange={(e) => setFechaInicioContrato(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Fecha finalización</label>
                    <input type="date" value={fechaFinContrato} onChange={(e) => setFechaFinContrato(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Estado del contrato</label>
                    <select value={estadoContrato} onChange={(e) => setEstadoContrato(e.target.value)}>
                      <option>Activo</option>
                      <option>Finalizado</option>
                      <option>Suspendido</option>
                    </select>
                  </div>

                  <div className="form-group full">
                    <label>Observaciones</label>
                    <textarea value={observacionesArriendo} onChange={(e) => setObservacionesArriendo(e.target.value)}></textarea>
                  </div>

                  <div className="form-actions full">
                    <button type="button" className="btn-secondary" onClick={() => setMostrarFormularioArriendo(false)}>Cancelar</button>
                    <button type="button" className="btn-primary" onClick={guardarContratoArriendo}>Guardar contrato</button>
                  </div>
                </div>
              </section>
            )}

            {mostrarFormularioPagoArriendo && (
              <section ref={pagoArriendoRef} className="form-panel no-print">
                <div className="section-title">
                  <div className="section-icon">$</div>
                  <h2>Registro de pago de arriendo</h2>
                </div>

                <p className="form-description">
                  El canon base, el IVA y el canon causado se calculan automáticamente según el año del pago.
                </p>

                <div className="property-form">
                  <div className="form-section-title full">Datos del pago</div>

                  <div className="form-group">
                    <label>Predio</label>
                    <select value={codigoPredioPagoArriendo} onChange={(e) => setCodigoPredioPagoArriendo(e.target.value)}>
                      <option value="">Seleccione un predio</option>
                      {contratosArriendo.filter((contrato) => contrato.estado === 'Activo').map((contrato, index) => (
                        <option key={index} value={contrato.codigoPredio}>{contrato.codigoPredio} - {contrato.arrendatario}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Mes pagado</label>
                    <input type="month" value={mesPagoArriendo} onChange={(e) => setMesPagoArriendo(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Fecha de pago</label>
                    <input type="date" value={fechaPagoArriendo} onChange={(e) => setFechaPagoArriendo(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Canon base calculado</label>
                    <input type="text" value={formatearDinero(canonCalculadoPagoArriendo.canonBase)} readOnly />
                  </div>

                  <div className="form-group">
                    <label>Incremento aplicado</label>
                    <input type="text" value={`${canonCalculadoPagoArriendo.incrementoAplicado}%`} readOnly />
                  </div>

                  <div className="form-group">
                    <label>IVA 19%</label>
                    <input type="text" value={formatearDinero(canonCalculadoPagoArriendo.iva)} readOnly />
                  </div>

                  <div className="form-group">
                    <label>Canon causado</label>
                    <input type="text" value={formatearDinero(canonCalculadoPagoArriendo.canonCausado)} readOnly />
                  </div>

                  <div className="form-group">
                    <label>Valor pagado</label>
                    <input type="number" value={valorPagadoArriendo} onChange={(e) => setValorPagadoArriendo(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Mora</label>
                    <input type="number" value={moraArriendo} onChange={(e) => setMoraArriendo(e.target.value)} placeholder="0" />
                  </div>

                  <div className="form-group">
                    <label>Descuento</label>
                    <input type="number" value={descuentoArriendo} onChange={(e) => setDescuentoArriendo(e.target.value)} placeholder="0" />
                  </div>

                  <div className="form-group">
                    <label>Medio de pago</label>
                    <select value={medioPagoArriendo} onChange={(e) => setMedioPagoArriendo(e.target.value)}>
                      <option>Transferencia</option>
                      <option>Efectivo</option>
                      <option>Consignación</option>
                      <option>Nequi</option>
                      <option>Daviplata</option>
                      <option>Otro</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Número de recibo</label>
                    <input type="text" value={reciboPagoArriendo} onChange={(e) => setReciboPagoArriendo(e.target.value)} />
                  </div>

                  <div className="form-group full">
                    <label>Observaciones</label>
                    <textarea value={observacionesPagoArriendo} onChange={(e) => setObservacionesPagoArriendo(e.target.value)}></textarea>
                  </div>

                  <div className="form-actions full">
                    <button type="button" className="btn-secondary" onClick={() => setMostrarFormularioPagoArriendo(false)}>Cancelar</button>
                    <button type="button" className="btn-primary" onClick={guardarPagoArriendo}>Guardar pago de arriendo</button>
                  </div>
                </div>
              </section>
            )}

            {mostrarFormularioIncrementoArriendo && (
              <section ref={incrementoArriendoRef} className="form-panel no-print">
                <div className="section-title">
                  <div className="section-icon">%</div>
                  <h2>Actualizar incremento anual de arriendo</h2>
                </div>

                <p className="form-description">
                  Registre el porcentaje de incremento para un año específico. Este cambio no modifica años anteriores.
                </p>

                <div className="property-form">
                  <div className="form-section-title full">Incremento por año</div>

                  <div className="form-group">
                    <label>Predio</label>
                    <select value={codigoPredioIncremento} onChange={(e) => setCodigoPredioIncremento(e.target.value)}>
                      <option value="">Seleccione un predio</option>
                      {contratosArriendo.map((contrato, index) => (
                        <option key={index} value={contrato.codigoPredio}>{contrato.codigoPredio} - {contrato.arrendatario}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Año de aplicación</label>
                    <input type="number" value={anioIncrementoArriendo} onChange={(e) => setAnioIncrementoArriendo(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Nuevo porcentaje de incremento</label>
                    <input type="number" value={porcentajeNuevoIncremento} onChange={(e) => setPorcentajeNuevoIncremento(e.target.value)} placeholder="Ej: 12" />
                  </div>

                  <div className="form-group full">
                    <label>Observaciones</label>
                    <textarea value={observacionesIncrementoArriendo} onChange={(e) => setObservacionesIncrementoArriendo(e.target.value)}></textarea>
                  </div>

                  <div className="form-actions full">
                    <button type="button" className="btn-secondary" onClick={() => setMostrarFormularioIncrementoArriendo(false)}>Cancelar</button>
                    <button type="button" className="btn-primary" onClick={guardarIncrementoArriendo}>Guardar incremento</button>
                  </div>
                </div>
              </section>
            )}

            <section className="rent-increments-panel no-print">
              <div className="section-title">
                <div className="section-icon">≡</div>
                <h2>Contratos de arriendo</h2>
              </div>

              <div className="simple-table-wrapper">
                <table className="simple-table">
                  <thead>
                    <tr>
                      <th>Predio</th>
                      <th>Arrendatario</th>
                      <th>Documento</th>
                      <th>Teléfono</th>
                      <th>Canon inicial</th>
                      <th>Inicio</th>
                      <th>Fin</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>

                  <tbody>
                    {contratosArriendo.map((contrato, index) => (
                      <tr key={index}>
                        <td>{contrato.codigoPredio}</td>
                        <td>{contrato.arrendatario}</td>
                        <td>{contrato.tipoDocumento} - {contrato.numeroDocumento}</td>
                        <td>{contrato.telefono}</td>
                        <td>{formatearDinero(contrato.canonMensual)}</td>
                        <td>{contrato.fechaInicio}</td>
                        <td>{contrato.fechaFin || 'Sin fecha'}</td>
                        <td>
                          <span className={contrato.estado === 'Activo' ? 'status active' : 'status inactive'}>
                            {contrato.estado}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn-small"
                            onClick={() => setContratoSeleccionado(contrato)}
                          >
                            Ver contrato
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {contratoSeleccionado && (
              <section className="contract-detail-panel no-print">
                <div className="section-title">
                  <div className="section-icon">≡</div>
                  <h2>Detalle del contrato de arriendo</h2>
                </div>

                <div className="contract-detail-grid">
                  <div>
                    <span>Predio</span>
                    <strong>{contratoSeleccionado.codigoPredio}</strong>
                  </div>

                  <div>
                    <span>Arrendatario</span>
                    <strong>{contratoSeleccionado.arrendatario}</strong>
                  </div>

                  <div>
                    <span>Documento</span>
                    <strong>{contratoSeleccionado.tipoDocumento} - {contratoSeleccionado.numeroDocumento}</strong>
                  </div>

                  <div>
                    <span>Teléfono</span>
                    <strong>{contratoSeleccionado.telefono}</strong>
                  </div>

                  <div>
                    <span>Correo</span>
                    <strong>{contratoSeleccionado.correo}</strong>
                  </div>

                  <div>
                    <span>Canon mensual inicial</span>
                    <strong>{formatearDinero(contratoSeleccionado.canonMensual)}</strong>
                  </div>

                  <div>
                    <span>Incremento anual por defecto</span>
                    <strong>{contratoSeleccionado.porcentajeIncrementoAnual || 0}%</strong>
                  </div>

                  <div>
                    <span>IVA</span>
                    <strong>{contratoSeleccionado.aplicaIva === 'Sí' ? 'Sí - 19%' : 'No aplica'}</strong>
                  </div>

                  <div>
                    <span>Depósito</span>
                    <strong>{formatearDinero(contratoSeleccionado.deposito)}</strong>
                  </div>

                  <div>
                    <span>Fecha de inicio</span>
                    <strong>{contratoSeleccionado.fechaInicio}</strong>
                  </div>

                  <div>
                    <span>Fecha de finalización</span>
                    <strong>{contratoSeleccionado.fechaFin || 'Sin fecha'}</strong>
                  </div>

                  <div>
                    <span>Estado</span>
                    <strong>{contratoSeleccionado.estado}</strong>
                  </div>

                  <div className="full-detail">
                    <span>Observaciones</span>
                    <strong>{contratoSeleccionado.observaciones || 'Sin observaciones'}</strong>
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setContratoSeleccionado(null)}
                  >
                    Cerrar detalle
                  </button>
                </div>
              </section>
            )}

            <section className="rent-increments-panel no-print">
              <div className="section-title">
                <div className="section-icon">%</div>
                <h2>Historial de incrementos de arriendo</h2>
              </div>

              <div className="simple-table-wrapper">
                <table className="simple-table">
                  <thead>
                    <tr>
                      <th>Predio</th>
                      <th>Año</th>
                      <th>Incremento</th>
                      <th>Observaciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {incrementosArriendo.map((incremento, index) => (
                      <tr key={index}>
                        <td>{incremento.codigoPredio}</td>
                        <td>{incremento.anio}</td>
                        <td>{incremento.porcentaje}%</td>
                        <td>{incremento.observaciones || 'Sin observaciones'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rent-increments-panel no-print">
              <div className="section-title">
                <div className="section-icon">$</div>
                <h2>Historial de pagos de arriendo</h2>
              </div>

              <div className="simple-table-wrapper">
                <table className="simple-table">
                  <thead>
                    <tr>
                      <th>Predio</th>
                      <th>Arrendatario</th>
                      <th>Mes</th>
                      <th>Fecha pago</th>
                      <th>Canon causado</th>
                      <th>Pagado</th>
                      <th>Mora</th>
                      <th>Descuento</th>
                      <th>Medio</th>
                      <th>Recibo</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pagosArriendo.map((pago, index) => (
                      <tr key={index}>
                        <td>{pago.codigoPredio}</td>
                        <td>{pago.arrendatario}</td>
                        <td>{pago.mes}</td>
                        <td>{pago.fechaPago}</td>
                        <td>{formatearDinero(pago.canonCausado)}</td>
                        <td>{formatearDinero(pago.valorPagado)}</td>
                        <td>{formatearDinero(pago.mora)}</td>
                        <td>{formatearDinero(pago.descuento)}</td>
                        <td>{pago.medioPago}</td>
                        <td>{pago.recibo || 'Sin recibo'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {mostrarPredial && (
          <>
            {mostrarFormularioValorPredial && (
              <section ref={valorAnualRef} className="form-panel no-print">
                <div className="section-title">
                  <div className="section-icon">□</div>
                  <h2>Registrar valor predial anual</h2>
                </div>

                <div className="property-form">
                  <div className="form-group">
                    <label>Predio</label>
                    <select value={codigoPredioValor} onChange={(e) => setCodigoPredioValor(e.target.value)}>
                      <option value="">Seleccione un predio</option>
                      {predios.map((predio, index) => (
                        <option key={index} value={predio.codigo}>
                          {predio.codigo} - {predio.barrio}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Año</label>
                    <input type="number" value={anioValorPredial} onChange={(e) => setAnioValorPredial(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Valor a pagar</label>
                    <input type="number" value={valorAnualPredial} onChange={(e) => setValorAnualPredial(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Fecha límite</label>
                    <input type="date" value={fechaLimitePredial} onChange={(e) => setFechaLimitePredial(e.target.value)} />
                  </div>

                  <div className="form-actions full">
                    <button type="button" className="btn-primary" onClick={guardarValorPredialAnual}>
                      Guardar valor anual
                    </button>
                  </div>
                </div>
              </section>
            )}

            {mostrarFormularioPredial && (
              <section ref={pagoPredialRef} className="form-panel no-print">
                <div className="section-title">
                  <div className="section-icon">▣</div>
                  <h2>Registro de pago predial</h2>
                </div>

                <div className="property-form">
                  <div className="form-group">
                    <label>Predio</label>
                    <select value={codigoPredioPago} onChange={(e) => setCodigoPredioPago(e.target.value)}>
                      <option value="">Seleccione un predio</option>
                      {predios.map((predio, index) => (
                        <option key={index} value={predio.codigo}>
                          {predio.codigo} - {predio.barrio}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Año</label>
                    <input type="number" value={anioPredial} onChange={(e) => setAnioPredial(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Número recibo</label>
                    <input type="text" value={numeroRecibo} onChange={(e) => setNumeroRecibo(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Fecha pago</label>
                    <input type="date" value={fechaPago} onChange={(e) => setFechaPago(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Descuento</label>
                    <input type="number" value={descuento} onChange={(e) => setDescuento(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Intereses</label>
                    <input type="number" value={intereses} onChange={(e) => setIntereses(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Valor pagado</label>
                    <input type="number" value={valorPagado} onChange={(e) => setValorPagado(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Estado pago</label>
                    <select value={estadoPagoPredial} onChange={(e) => setEstadoPagoPredial(e.target.value)}>
                      <option>Pagado</option>
                      <option>Pendiente</option>
                      <option>En mora</option>
                    </select>
                  </div>

                  <div className="form-actions full">
                    <button type="button" className="btn-primary" onClick={guardarPagoPredial}>
                      Guardar pago
                    </button>
                  </div>
                </div>
              </section>
            )}

            <section className="rent-increments-panel no-print">
              <div className="section-title">
                <div className="section-icon">▣</div>
                <h2>Pagos prediales registrados</h2>
              </div>

              <div className="simple-table-wrapper">
                <table className="simple-table">
                  <thead>
                    <tr>
                      <th>Predio</th>
                      <th>Año</th>
                      <th>Recibo</th>
                      <th>Fecha pago</th>
                      <th>Valor pagado</th>
                      <th>Estado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {pagosPrediales.map((pago, index) => (
                      <tr key={index}>
                        <td>{pago.codigoPredio}</td>
                        <td>{pago.anio}</td>
                        <td>{pago.numeroRecibo}</td>
                        <td>{pago.fechaPago}</td>
                        <td>{formatearDinero(pago.valorPagado)}</td>
                        <td>
                          <span className={pago.estado === 'Pagado' ? 'status active' : 'status warning'}>
                            {pago.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {(mostrarEstados || mostrarPredial) && (
          <section className="rent-extracts-container">
            <div className="section-title no-print">
              <div className="section-icon">□</div>
              <h2>Estados de cuenta predial</h2>
            </div>

            {extractosPrediales.map((extracto, index) => (
              <article className="extracto-card" key={index}>
                <div className="extracto-header">
                  <div>
                    <h2>Estado de Cuenta Predial</h2>
                    <h3>Predio: {extracto.predio.codigo}</h3>
                    <p>Fecha de generación: <strong>{new Date().toLocaleDateString('es-CO')}</strong></p>
                  </div>

                  <div className="extracto-logo-box">
                    <img src="/logo-inh.png" alt="INH Constructores" />
                  </div>
                </div>

                <div className="extracto-info">
                  <div><span>Ciudad</span><strong>{extracto.predio.ciudad}</strong></div>
                  <div><span>Barrio</span><strong>{extracto.predio.barrio}</strong></div>
                  <div><span>Dirección</span><strong>{extracto.predio.direccion}</strong></div>
                  <div><span>Matrícula</span><strong>{extracto.predio.matricula || 'Sin registrar'}</strong></div>
                  <div><span>CHIP</span><strong>{extracto.predio.chip || 'Sin registrar'}</strong></div>
                  <div><span>Cédula catastral</span><strong>{extracto.predio.cedulaCatastral || 'Sin registrar'}</strong></div>
                </div>

                <div className="extracto-propietarios">
                  <h3>Propietarios del inmueble</h3>

                  <table className="propietarios-extracto-table">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Participación</th>
                      </tr>
                    </thead>

                    <tbody>
                      {extracto.propietarios.map((propietario, propietarioIndex) => (
                        <tr key={propietarioIndex}>
                          <td>{propietario.nombre}</td>
                          <td>{propietario.tipoDocumento} - {propietario.numeroDocumento}</td>
                          <td>{propietario.telefono}</td>
                          <td>{propietario.correo}</td>
                          <td>{propietario.porcentaje}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <p className="total-participacion">
                    Total participación registrada: <strong>{extracto.totalParticipacion}%</strong>
                  </p>
                </div>

                <div className="resumen-extracto">
                  <div><span>Total impuesto</span><strong>{formatearDinero(extracto.resumen.totalImpuesto)}</strong></div>
                  <div><span>Total descuentos</span><strong>{formatearDinero(extracto.resumen.totalDescuento)}</strong></div>
                  <div><span>Total intereses</span><strong>{formatearDinero(extracto.resumen.totalIntereses)}</strong></div>
                  <div><span>Total pagado</span><strong>{formatearDinero(extracto.resumen.totalPagado)}</strong></div>
                  <div><span>Saldo pendiente</span><strong>{formatearDinero(extracto.resumen.saldoPendiente)}</strong></div>
                  <div><span>Estado general</span><strong>{extracto.resumen.estadoGeneral}</strong></div>
                </div>

                <div className="extracto-actions no-print">
                  <button className="btn-primary" onClick={() => window.print()}>
                    Imprimir estado de cuenta predial
                  </button>
                </div>

                <div className="extracto-table-wrapper">
                  <table className="extracto-table">
                    <thead>
                      <tr>
                        <th>Año</th>
                        <th>Fecha límite</th>
                        <th>Fecha pago</th>
                        <th>Recibo</th>
                        <th>Valor a pagar</th>
                        <th>Descuento</th>
                        <th>Intereses</th>
                        <th>Valor pagado</th>
                        <th>Saldo</th>
                        <th>Estado</th>
                      </tr>
                    </thead>

                    <tbody>
                      {extracto.movimientos.map((movimiento, movIndex) => (
                        <tr key={movIndex}>
                          <td>{movimiento.anio}</td>
                          <td>{movimiento.fechaLimite}</td>
                          <td>{movimiento.fechaPago}</td>
                          <td>{movimiento.recibo}</td>
                          <td>{formatearDinero(movimiento.valorAPagar)}</td>
                          <td>{formatearDinero(movimiento.descuento)}</td>
                          <td>{formatearDinero(movimiento.intereses)}</td>
                          <td>{formatearDinero(movimiento.valorPagado)}</td>
                          <td>{formatearDinero(movimiento.saldoPendiente)}</td>
                          <td>
                            <span
                              className={
                                movimiento.estadoMovimiento === 'Pagado / Al día'
                                  ? 'status active'
                                  : movimiento.estadoMovimiento === 'Falta actualizar valor'
                                  ? 'status inactive'
                                  : 'status warning'
                              }
                            >
                              {movimiento.estadoMovimiento}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            ))}
          </section>
        )}

        {(mostrarEstados || mostrarArriendos) && (
          <section className="rent-extracts-container">
            <div className="section-title no-print">
              <div className="section-icon">$</div>
              <h2>Estados de cuenta de arriendos</h2>
            </div>

            {extractosArriendo.map((extracto, index) => (
              <article className="extracto-card" key={index}>
                <div className="extracto-header">
                  <div>
                    <h2>Estado de Cuenta de Arriendo</h2>
                    <h3>Predio: {extracto.contrato.codigoPredio}</h3>
                    <p>Fecha de generación: <strong>{new Date().toLocaleDateString('es-CO')}</strong></p>
                  </div>

                  <div className="extracto-logo-box">
                    <img src="/logo-inh.png" alt="INH Constructores" />
                  </div>
                </div>

                <div className="extracto-info">
                  <div><span>Arrendatario</span><strong>{extracto.contrato.arrendatario}</strong></div>
                  <div><span>Documento</span><strong>{extracto.contrato.tipoDocumento} - {extracto.contrato.numeroDocumento}</strong></div>
                  <div><span>Teléfono</span><strong>{extracto.contrato.telefono}</strong></div>
                  <div><span>Correo</span><strong>{extracto.contrato.correo}</strong></div>
                  <div><span>Canon inicial</span><strong>{formatearDinero(extracto.contrato.canonMensual)}</strong></div>
                  <div><span>Incremento defecto</span><strong>{extracto.contrato.porcentajeIncrementoAnual}%</strong></div>
                  <div><span>IVA</span><strong>{extracto.contrato.aplicaIva === 'Sí' ? 'Sí - 19%' : 'No aplica'}</strong></div>
                  <div><span>Fecha inicio</span><strong>{extracto.contrato.fechaInicio}</strong></div>
                  <div><span>Fecha finalización</span><strong>{extracto.contrato.fechaFin || 'Sin fecha'}</strong></div>
                </div>

                <div className="resumen-extracto">
                  <div><span>Total canon base</span><strong>{formatearDinero(extracto.resumen.totalCanonBase)}</strong></div>
                  <div><span>Total IVA</span><strong>{formatearDinero(extracto.resumen.totalIva)}</strong></div>
                  <div><span>Total causado</span><strong>{formatearDinero(extracto.resumen.totalCanonCausado)}</strong></div>
                  <div><span>Total pagado</span><strong>{formatearDinero(extracto.resumen.totalPagado)}</strong></div>
                  <div><span>Saldo deuda</span><strong>{formatearDinero(extracto.resumen.saldoDeudaTotal)}</strong></div>
                  <div><span>Estado general</span><strong>{extracto.resumen.estadoGeneral}</strong></div>
                </div>

                <div className="extracto-actions no-print">
                  <button className="btn-primary" onClick={() => window.print()}>
                    Imprimir estado de cuenta de arriendo
                  </button>
                </div>

                <div className="extracto-table-wrapper">
                  <table className="extracto-table">
                    <thead>
                      <tr>
                        <th>Mes</th>
                        <th>Fecha pago</th>
                        <th>Recibo</th>
                        <th>Canon base</th>
                        <th>Incremento</th>
                        <th>IVA</th>
                        <th>Canon causado</th>
                        <th>Pagado</th>
                        <th>Mora</th>
                        <th>Descuento</th>
                        <th>Saldo deuda</th>
                        <th>Estado</th>
                      </tr>
                    </thead>

                    <tbody>
                      {extracto.movimientos.map((movimiento, movIndex) => (
                        <tr key={movIndex}>
                          <td>{movimiento.mes}</td>
                          <td>{movimiento.fechaPago}</td>
                          <td>{movimiento.recibo}</td>
                          <td>{formatearDinero(movimiento.canonBase)}</td>
                          <td>{movimiento.incrementoAplicado}%</td>
                          <td>{formatearDinero(movimiento.iva)}</td>
                          <td>{formatearDinero(movimiento.canonCausado)}</td>
                          <td>{formatearDinero(movimiento.pagado)}</td>
                          <td>{formatearDinero(movimiento.mora)}</td>
                          <td>{formatearDinero(movimiento.descuento)}</td>
                          <td>{formatearDinero(movimiento.saldoDeuda)}</td>
                          <td>
                            <span className={movimiento.estadoMovimiento === 'Pagado' ? 'status active' : movimiento.estadoMovimiento === 'Pendiente' ? 'status inactive' : 'status warning'}>
                              {movimiento.estadoMovimiento}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            ))}
          </section>
        )}

       {mostrarReportes && (
  <section className="rent-increments-panel no-print">
    <div className="section-title">
      <div className="section-icon">▥</div>
      <h2>Reportes de saldos pendientes</h2>
    </div>

    <p className="form-description">
      En esta sección se muestran los predios existentes y los saldos pendientes
      por arriendos y prediales.
    </p>

    <div className="cards">
      <div className="stat-card">
        <div className="stat-icon">▦</div>
        <h3>Predios existentes</h3>
        <strong>{predios.length}</strong>
        <p>Total de predios registrados</p>
      </div>

      <div className="stat-card">
        <div className="stat-icon">$</div>
        <h3>Saldo arriendos</h3>
        <strong className="money">
          {formatearDinero(
            extractosArriendo.reduce(
              (total, extracto) =>
                total + Number(extracto.resumen.saldoDeudaTotal || 0),
              0
            )
          )}
        </strong>
        <p>Arriendos pendientes por pagar</p>
      </div>

      <div className="stat-card">
        <div className="stat-icon">▣</div>
        <h3>Saldo predial</h3>
        <strong className="money">
          {formatearDinero(
            extractosPrediales.reduce(
              (total, extracto) =>
                total + Number(extracto.resumen.saldoPendiente || 0),
              0
            )
          )}
        </strong>
        <p>Prediales pendientes por pagar</p>
      </div>
    </div>

    <div className="section-title report-section-title">
      <div className="section-icon">$</div>
      <h2>Saldos pendientes de arriendo</h2>
    </div>

    <div className="simple-table-wrapper">
      <table className="simple-table">
        <thead>
          <tr>
            <th>Predio</th>
            <th>Arrendatario</th>
            <th>Canon inicial</th>
            <th>Total causado</th>
            <th>Total pagado</th>
            <th>Saldo deuda</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {extractosArriendo
            .filter(
              (extracto) =>
                Number(extracto.resumen.saldoDeudaTotal || 0) > 0
            )
            .map((extracto, index) => (
              <tr key={index}>
                <td>{extracto.contrato.codigoPredio}</td>
                <td>{extracto.contrato.arrendatario}</td>
                <td>{formatearDinero(extracto.contrato.canonMensual)}</td>
                <td>{formatearDinero(extracto.resumen.totalCanonCausado)}</td>
                <td>{formatearDinero(extracto.resumen.totalPagado)}</td>
                <td>{formatearDinero(extracto.resumen.saldoDeudaTotal)}</td>
                <td>
                  <span className="status inactive">
                    {extracto.resumen.estadoGeneral}
                  </span>
                </td>
              </tr>
            ))}

          {extractosArriendo.filter(
            (extracto) =>
              Number(extracto.resumen.saldoDeudaTotal || 0) > 0
          ).length === 0 && (
            <tr>
              <td colSpan="7">No hay saldos pendientes de arriendo.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="section-title report-section-title">
      <div className="section-icon">▣</div>
      <h2>Saldos pendientes de predial</h2>
    </div>

    <div className="simple-table-wrapper">
      <table className="simple-table">
        <thead>
          <tr>
            <th>Predio</th>
            <th>Ciudad</th>
            <th>Barrio</th>
            <th>Total impuesto</th>
            <th>Total pagado</th>
            <th>Saldo pendiente</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {extractosPrediales
            .filter(
              (extracto) =>
                Number(extracto.resumen.saldoPendiente || 0) > 0 ||
                extracto.resumen.estadoGeneral !== 'Al día'
            )
            .map((extracto, index) => (
              <tr key={index}>
                <td>{extracto.predio.codigo}</td>
                <td>{extracto.predio.ciudad}</td>
                <td>{extracto.predio.barrio}</td>
                <td>{formatearDinero(extracto.resumen.totalImpuesto)}</td>
                <td>{formatearDinero(extracto.resumen.totalPagado)}</td>
                <td>{formatearDinero(extracto.resumen.saldoPendiente)}</td>
                <td>
                  <span className="status warning">
                    {extracto.resumen.estadoGeneral}
                  </span>
                </td>
              </tr>
            ))}

          {extractosPrediales.filter(
            (extracto) =>
              Number(extracto.resumen.saldoPendiente || 0) > 0 ||
              extracto.resumen.estadoGeneral !== 'Al día'
          ).length === 0 && (
            <tr>
              <td colSpan="7">No hay saldos pendientes de predial.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </section>
)}

        <div className="floating-menu no-print">
          <button
            type="button"
            onClick={() => {
              cambiarSeccion('inicio')
            }}
          >
            Inicio
          </button>
        </div>
      </main>
    </div>
  )
}

export default App