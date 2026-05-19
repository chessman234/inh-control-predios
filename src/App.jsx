import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const anioActual = new Date().getFullYear()

  const [seccionActiva, setSeccionActiva] = useState('inicio')

  const [mostrarFormularioPredio, setMostrarFormularioPredio] = useState(false)
  const [mostrarFormularioContrato, setMostrarFormularioContrato] = useState(false)
  const [mostrarFormularioPagoArriendo, setMostrarFormularioPagoArriendo] = useState(false)
  const [mostrarFormularioIncremento, setMostrarFormularioIncremento] = useState(false)
  const [mostrarFormularioValorPredial, setMostrarFormularioValorPredial] = useState(false)
  const [mostrarFormularioPagoPredial, setMostrarFormularioPagoPredial] = useState(false)

  const [predioSeleccionado, setPredioSeleccionado] = useState(null)
  const [contratoSeleccionado, setContratoSeleccionado] = useState(null)

  const [ciudad, setCiudad] = useState('')
  const [barrio, setBarrio] = useState('')
  const [direccion, setDireccion] = useState('')
  const [matricula, setMatricula] = useState('')
  const [chip, setChip] = useState('')
  const [cedulaCatastral, setCedulaCatastral] = useState('')
  const [estadoPredio, setEstadoPredio] = useState('Activo')
  const [observacionesPredio, setObservacionesPredio] = useState('')

  const [ultimoAnioPredialPagado, setUltimoAnioPredialPagado] = useState('')
  const [reciboUltimoPredial, setReciboUltimoPredial] = useState('')
  const [fechaUltimoPagoPredial, setFechaUltimoPagoPredial] = useState('')
  const [valorImpuestoUltimoPredial, setValorImpuestoUltimoPredial] = useState('')
  const [valorPagadoUltimoPredial, setValorPagadoUltimoPredial] = useState('')

  const [nombrePropietarioTemp, setNombrePropietarioTemp] = useState('')
  const [tipoDocPropietarioTemp, setTipoDocPropietarioTemp] = useState('Cédula de ciudadanía')
  const [docPropietarioTemp, setDocPropietarioTemp] = useState('')
  const [telefonoPropietarioTemp, setTelefonoPropietarioTemp] = useState('')
  const [correoPropietarioTemp, setCorreoPropietarioTemp] = useState('')
  const [porcentajePropietarioTemp, setPorcentajePropietarioTemp] = useState('')
  const [propietariosTemporales, setPropietariosTemporales] = useState([])

  const [codigoPredioContrato, setCodigoPredioContrato] = useState('')
  const [nombreArrendatario, setNombreArrendatario] = useState('')
  const [tipoDocArrendatario, setTipoDocArrendatario] = useState('Cédula de ciudadanía')
  const [docArrendatario, setDocArrendatario] = useState('')
  const [telefonoArrendatario, setTelefonoArrendatario] = useState('')
  const [correoArrendatario, setCorreoArrendatario] = useState('')
  const [canonMensual, setCanonMensual] = useState('')
  const [incrementoAnual, setIncrementoAnual] = useState('')
  const [aplicaIva, setAplicaIva] = useState('No')
  const [fechaInicioContrato, setFechaInicioContrato] = useState('')
  const [fechaFinContrato, setFechaFinContrato] = useState('')
  const [depositoContrato, setDepositoContrato] = useState('')
  const [estadoContrato, setEstadoContrato] = useState('Activo')
  const [observacionesContrato, setObservacionesContrato] = useState('')

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
  const [anioIncremento, setAnioIncremento] = useState(anioActual)
  const [porcentajeIncremento, setPorcentajeIncremento] = useState('')
  const [observacionesIncremento, setObservacionesIncremento] = useState('')

  const [codigoPredioValorPredial, setCodigoPredioValorPredial] = useState('')
  const [anioValorPredial, setAnioValorPredial] = useState(anioActual)
  const [valorPredialAnual, setValorPredialAnual] = useState('')
  const [fechaLimitePredial, setFechaLimitePredial] = useState('')

  const [codigoPredioPagoPredial, setCodigoPredioPagoPredial] = useState('')
  const [anioPagoPredial, setAnioPagoPredial] = useState(anioActual)
  const [numeroReciboPredial, setNumeroReciboPredial] = useState('')
  const [fechaPagoPredial, setFechaPagoPredial] = useState('')
  const [descuentoPredial, setDescuentoPredial] = useState('')
  const [interesesPredial, setInteresesPredial] = useState('')
  const [valorPagadoPredial, setValorPagadoPredial] = useState('')
  const [estadoPagoPredial, setEstadoPagoPredial] = useState('Pagado')

  const [predios, setPredios] = useState([
    {
      codigo: 'BOG-FON-0001',
      ciudad: 'Bogotá',
      barrio: 'Fontibón',
      direccion: 'Ejemplo de dirección',
      matricula: '50N-123456',
      chip: 'AAA0000',
      cedulaCatastral: '110010000000000',
      estado: 'Activo',
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
      incrementoAnual: 10,
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

  const formatearDinero = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(Number(valor || 0))
  }

  const normalizarTexto = (texto) => texto.trim().toLowerCase()

  const obtenerCodigoCiudad = (texto) => {
    const ciudadLimpia = normalizarTexto(texto)

    if (ciudadLimpia === 'bogotá' || ciudadLimpia === 'bogota') return 'BOG'
    if (ciudadLimpia === 'medellín' || ciudadLimpia === 'medellin') return 'MED'
    if (ciudadLimpia === 'cali') return 'CAL'
    if (ciudadLimpia === 'barranquilla') return 'BAQ'
    if (ciudadLimpia === 'villavicencio') return 'VIL'

    return ciudadLimpia.replace(/[^a-z]/g, '').substring(0, 3).toUpperCase()
  }

  const obtenerCodigoBarrio = (texto) => {
    return normalizarTexto(texto).replace(/[^a-z]/g, '').substring(0, 3).toUpperCase()
  }

  const codigoPredioAutomatico = () => {
    if (!ciudad || !barrio) return ''

    const prefijo = `${obtenerCodigoCiudad(ciudad)}-${obtenerCodigoBarrio(barrio)}`
    const cantidad = predios.filter((predio) => predio.codigo.startsWith(prefijo)).length + 1
    return `${prefijo}-${String(cantidad).padStart(4, '0')}`
  }

  const totalPorcentajeTemporal = propietariosTemporales.reduce(
    (total, propietario) => total + Number(propietario.porcentaje || 0),
    0
  )

  const porcentajeFaltante = 100 - totalPorcentajeTemporal

  const cerrarFormularios = () => {
    setMostrarFormularioPredio(false)
    setMostrarFormularioContrato(false)
    setMostrarFormularioPagoArriendo(false)
    setMostrarFormularioIncremento(false)
    setMostrarFormularioValorPredial(false)
    setMostrarFormularioPagoPredial(false)
  }

  const cambiarSeccion = (seccion) => {
    cerrarFormularios()
    setPredioSeleccionado(null)
    setContratoSeleccionado(null)
    setSeccionActiva(seccion)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const abrirFormulario = (seccion, formulario) => {
    cambiarSeccion(seccion)

    setTimeout(() => {
      if (formulario === 'predio') setMostrarFormularioPredio(true)
      if (formulario === 'contrato') setMostrarFormularioContrato(true)
      if (formulario === 'pagoArriendo') setMostrarFormularioPagoArriendo(true)
      if (formulario === 'incremento') setMostrarFormularioIncremento(true)
      if (formulario === 'valorPredial') setMostrarFormularioValorPredial(true)
      if (formulario === 'pagoPredial') setMostrarFormularioPagoPredial(true)
    }, 50)
  }

  const contratoActivoPorPredio = (codigoPredio) => {
    return contratosArriendo.find(
      (contrato) => contrato.codigoPredio === codigoPredio && contrato.estado === 'Activo'
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
        incrementoDelAnio?.porcentaje ?? Number(contrato.incrementoAnual || 0)

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

  const contratoPagoArriendo = contratoActivoPorPredio(codigoPredioPagoArriendo)
  const canonCalculado = calcularCanonArriendo(contratoPagoArriendo, mesPagoArriendo)

  const limpiarPropietarioTemporal = () => {
    setNombrePropietarioTemp('')
    setTipoDocPropietarioTemp('Cédula de ciudadanía')
    setDocPropietarioTemp('')
    setTelefonoPropietarioTemp('')
    setCorreoPropietarioTemp('')
    setPorcentajePropietarioTemp('')
  }

  const agregarPropietarioTemporal = () => {
    if (
      !nombrePropietarioTemp ||
      !docPropietarioTemp ||
      !telefonoPropietarioTemp ||
      !correoPropietarioTemp ||
      !porcentajePropietarioTemp
    ) {
      alert('Complete todos los datos del propietario.')
      return
    }

    const porcentajeNuevo = Number(porcentajePropietarioTemp)

    if (porcentajeNuevo <= 0) {
      alert('El porcentaje debe ser mayor a 0.')
      return
    }

    if (totalPorcentajeTemporal + porcentajeNuevo > 100) {
      alert(`No se puede agregar. Solo falta ${porcentajeFaltante}%.`)
      return
    }

    setPropietariosTemporales([
      ...propietariosTemporales,
      {
        nombre: nombrePropietarioTemp,
        tipoDocumento: tipoDocPropietarioTemp,
        numeroDocumento: docPropietarioTemp,
        telefono: telefonoPropietarioTemp,
        correo: correoPropietarioTemp,
        porcentaje: porcentajeNuevo,
      },
    ])

    limpiarPropietarioTemporal()
  }

  const eliminarPropietarioTemporal = (index) => {
    setPropietariosTemporales(propietariosTemporales.filter((_, i) => i !== index))
  }

  const limpiarFormularioPredio = () => {
    setCiudad('')
    setBarrio('')
    setDireccion('')
    setMatricula('')
    setChip('')
    setCedulaCatastral('')
    setEstadoPredio('Activo')
    setObservacionesPredio('')
    setUltimoAnioPredialPagado('')
    setReciboUltimoPredial('')
    setFechaUltimoPagoPredial('')
    setValorImpuestoUltimoPredial('')
    setValorPagadoUltimoPredial('')
    setPropietariosTemporales([])
    limpiarPropietarioTemporal()
  }

  const guardarPredio = () => {
    if (!ciudad || !barrio || !direccion || !matricula || !chip || !cedulaCatastral) {
      alert('Complete ciudad, barrio, dirección, matrícula, CHIP y cédula catastral.')
      return
    }

    if (propietariosTemporales.length === 0) {
      alert('Debe registrar al menos un propietario.')
      return
    }

    if (totalPorcentajeTemporal !== 100) {
      alert(`Los propietarios deben sumar 100%. Actualmente suman ${totalPorcentajeTemporal}%.`)
      return
    }

    const nuevoCodigoPredio = codigoPredioAutomatico()
    const anioInicioPredial = ultimoAnioPredialPagado ? Number(ultimoAnioPredialPagado) : anioActual

    const nuevoPredio = {
      codigo: nuevoCodigoPredio,
      ciudad,
      barrio,
      direccion,
      matricula,
      chip,
      cedulaCatastral,
      estado: estadoPredio,
      observaciones: observacionesPredio,
      anioInicioPredial,
    }

    const nuevosPropietarios = propietariosTemporales.map((propietario) => ({
      codigoPredio: nuevoCodigoPredio,
      ...propietario,
    }))

    const nuevosValoresPrediales = []
    const nuevosPagosPrediales = []

    if (ultimoAnioPredialPagado && valorImpuestoUltimoPredial && valorPagadoUltimoPredial) {
      nuevosValoresPrediales.push({
        codigoPredio: nuevoCodigoPredio,
        anio: Number(ultimoAnioPredialPagado),
        valorImpuesto: Number(valorImpuestoUltimoPredial),
        fechaLimite: '',
      })

      nuevosPagosPrediales.push({
        codigoPredio: nuevoCodigoPredio,
        anio: Number(ultimoAnioPredialPagado),
        numeroRecibo: reciboUltimoPredial,
        fechaPago: fechaUltimoPagoPredial,
        descuento: 0,
        intereses: 0,
        valorPagado: Number(valorPagadoUltimoPredial),
        estado: 'Pagado',
      })
    }

    setPredios([nuevoPredio, ...predios])
    setPropietarios([...nuevosPropietarios, ...propietarios])
    setValoresPrediales([...nuevosValoresPrediales, ...valoresPrediales])
    setPagosPrediales([...nuevosPagosPrediales, ...pagosPrediales])
    limpiarFormularioPredio()
    setMostrarFormularioPredio(false)
  }

  const limpiarFormularioContrato = () => {
    setCodigoPredioContrato('')
    setNombreArrendatario('')
    setTipoDocArrendatario('Cédula de ciudadanía')
    setDocArrendatario('')
    setTelefonoArrendatario('')
    setCorreoArrendatario('')
    setCanonMensual('')
    setIncrementoAnual('')
    setAplicaIva('No')
    setFechaInicioContrato('')
    setFechaFinContrato('')
    setDepositoContrato('')
    setEstadoContrato('Activo')
    setObservacionesContrato('')
  }

  const guardarContrato = () => {
    if (
      !codigoPredioContrato ||
      !nombreArrendatario ||
      !docArrendatario ||
      !telefonoArrendatario ||
      !correoArrendatario ||
      !canonMensual ||
      !incrementoAnual ||
      !fechaInicioContrato
    ) {
      alert('Complete predio, arrendatario, documento, teléfono, correo, canon, incremento y fecha de inicio.')
      return
    }

    const contratoActivo = contratoActivoPorPredio(codigoPredioContrato)

    if (contratoActivo) {
      alert('Este predio ya tiene un contrato activo.')
      return
    }

    const nuevoContrato = {
      codigoPredio: codigoPredioContrato,
      arrendatario: nombreArrendatario,
      tipoDocumento: tipoDocArrendatario,
      numeroDocumento: docArrendatario,
      telefono: telefonoArrendatario,
      correo: correoArrendatario,
      canonMensual: Number(canonMensual),
      incrementoAnual: Number(incrementoAnual),
      aplicaIva,
      porcentajeIva: aplicaIva === 'Sí' ? 19 : 0,
      fechaInicio: fechaInicioContrato,
      fechaFin: fechaFinContrato,
      deposito: Number(depositoContrato || 0),
      estado: estadoContrato,
      observaciones: observacionesContrato,
    }

    setContratosArriendo([nuevoContrato, ...contratosArriendo])
    limpiarFormularioContrato()
    setMostrarFormularioContrato(false)
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

  const guardarPagoArriendo = () => {
    if (!codigoPredioPagoArriendo || !mesPagoArriendo || !fechaPagoArriendo || !valorPagadoArriendo) {
      alert('Complete predio, mes, fecha de pago y valor pagado.')
      return
    }

    const contrato = contratoActivoPorPredio(codigoPredioPagoArriendo)

    if (!contrato) {
      alert('El predio no tiene contrato activo.')
      return
    }

    const calculo = calcularCanonArriendo(contrato, mesPagoArriendo)

    const nuevoPago = {
      codigoPredio: codigoPredioPagoArriendo,
      arrendatario: contrato.arrendatario,
      mes: mesPagoArriendo,
      fechaPago: fechaPagoArriendo,
      canonBase: calculo.canonBase,
      incrementoAplicado: calculo.incrementoAplicado,
      iva: calculo.iva,
      canonCausado: calculo.canonCausado,
      valorPagado: Number(valorPagadoArriendo),
      mora: Number(moraArriendo || 0),
      descuento: Number(descuentoArriendo || 0),
      medioPago: medioPagoArriendo,
      recibo: reciboPagoArriendo,
      observaciones: observacionesPagoArriendo,
    }

    setPagosArriendo([nuevoPago, ...pagosArriendo])
    limpiarFormularioPagoArriendo()
    setMostrarFormularioPagoArriendo(false)
  }

  const guardarIncremento = () => {
    if (!codigoPredioIncremento || !anioIncremento || !porcentajeIncremento) {
      alert('Complete predio, año y porcentaje.')
      return
    }

    const nuevoIncremento = {
      codigoPredio: codigoPredioIncremento,
      anio: Number(anioIncremento),
      porcentaje: Number(porcentajeIncremento),
      observaciones: observacionesIncremento,
    }

    const sinRepetido = incrementosArriendo.filter(
      (item) =>
        !(item.codigoPredio === codigoPredioIncremento && Number(item.anio) === Number(anioIncremento))
    )

    setIncrementosArriendo([nuevoIncremento, ...sinRepetido])
    setCodigoPredioIncremento('')
    setAnioIncremento(anioActual)
    setPorcentajeIncremento('')
    setObservacionesIncremento('')
    setMostrarFormularioIncremento(false)
  }

  const guardarValorPredial = () => {
    if (!codigoPredioValorPredial || !anioValorPredial || !valorPredialAnual) {
      alert('Complete predio, año y valor predial.')
      return
    }

    const existe = valoresPrediales.some(
      (item) => item.codigoPredio === codigoPredioValorPredial && Number(item.anio) === Number(anioValorPredial)
    )

    if (existe) {
      alert('Ese año ya tiene valor predial registrado.')
      return
    }

    setValoresPrediales([
      {
        codigoPredio: codigoPredioValorPredial,
        anio: Number(anioValorPredial),
        valorImpuesto: Number(valorPredialAnual),
        fechaLimite: fechaLimitePredial,
      },
      ...valoresPrediales,
    ])

    setCodigoPredioValorPredial('')
    setAnioValorPredial(anioActual)
    setValorPredialAnual('')
    setFechaLimitePredial('')
    setMostrarFormularioValorPredial(false)
  }

  const guardarPagoPredial = () => {
    if (!codigoPredioPagoPredial || !anioPagoPredial || !valorPagadoPredial) {
      alert('Complete predio, año y valor pagado.')
      return
    }

    const existeValor = valoresPrediales.some(
      (item) => item.codigoPredio === codigoPredioPagoPredial && Number(item.anio) === Number(anioPagoPredial)
    )

    if (!existeValor) {
      alert('Primero registre el valor predial anual.')
      return
    }

    setPagosPrediales([
      {
        codigoPredio: codigoPredioPagoPredial,
        anio: Number(anioPagoPredial),
        numeroRecibo: numeroReciboPredial,
        fechaPago: fechaPagoPredial,
        descuento: Number(descuentoPredial || 0),
        intereses: Number(interesesPredial || 0),
        valorPagado: Number(valorPagadoPredial),
        estado: estadoPagoPredial,
      },
      ...pagosPrediales,
    ])

    setCodigoPredioPagoPredial('')
    setAnioPagoPredial(anioActual)
    setNumeroReciboPredial('')
    setFechaPagoPredial('')
    setDescuentoPredial('')
    setInteresesPredial('')
    setValorPagadoPredial('')
    setEstadoPagoPredial('Pagado')
    setMostrarFormularioPagoPredial(false)
  }

  const extractosPrediales = predios.map((predio) => {
    const movimientos = []
    const anioInicio = predio.anioInicioPredial || anioActual

    for (let anio = anioInicio; anio <= anioActual; anio++) {
      const valorAnual = valoresPrediales.find(
        (item) => item.codigoPredio === predio.codigo && Number(item.anio) === Number(anio)
      )

      const pagosDelAnio = pagosPrediales.filter(
        (item) => item.codigoPredio === predio.codigo && Number(item.anio) === Number(anio)
      )

      const totalPagado = pagosDelAnio.reduce((total, pago) => total + Number(pago.valorPagado || 0), 0)
      const totalDescuento = pagosDelAnio.reduce((total, pago) => total + Number(pago.descuento || 0), 0)
      const totalIntereses = pagosDelAnio.reduce((total, pago) => total + Number(pago.intereses || 0), 0)
      const ultimoPago = pagosDelAnio[0]

      let valorAPagar = null
      let saldoPendiente = null
      let estadoMovimiento = 'Falta actualizar valor'

      if (valorAnual) {
        valorAPagar = Number(valorAnual.valorImpuesto || 0)
        saldoPendiente = valorAPagar - totalDescuento + totalIntereses - totalPagado

        if (saldoPendiente <= 0) estadoMovimiento = 'Pagado / Al día'
        else if (totalPagado > 0) estadoMovimiento = 'Abono registrado'
        else estadoMovimiento = 'Pendiente de pago'
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

    const totalImpuesto = movimientos.reduce((total, item) => total + Number(item.valorAPagar || 0), 0)
    const totalDescuento = movimientos.reduce((total, item) => total + Number(item.descuento || 0), 0)
    const totalIntereses = movimientos.reduce((total, item) => total + Number(item.intereses || 0), 0)
    const totalPagado = movimientos.reduce((total, item) => total + Number(item.valorPagado || 0), 0)
    const saldoPendiente = movimientos.reduce((total, item) => total + Number(item.saldoPendiente || 0), 0)

    const propietariosDelPredio = propietarios.filter((item) => item.codigoPredio === predio.codigo)
    const totalParticipacion = propietariosDelPredio.reduce((total, item) => total + Number(item.porcentaje || 0), 0)
    const tienePendienteActualizar = movimientos.some((item) => item.estadoMovimiento === 'Falta actualizar valor')

    let estadoGeneral = 'Al día'
    if (tienePendienteActualizar) estadoGeneral = 'Pendiente de actualización'
    else if (saldoPendiente > 0) estadoGeneral = 'Con saldo pendiente'

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

  const extractosArriendo = contratosArriendo.map((contrato) => {
    const pagosContrato = pagosArriendo
      .filter((item) => item.codigoPredio === contrato.codigoPredio)
      .sort((a, b) => a.mes.localeCompare(b.mes))

    const movimientos = pagosContrato.map((pago) => {
      const canonBase = Number(pago.canonBase || 0)
      const incrementoAplicado = Number(pago.incrementoAplicado || 0)
      const iva = Number(pago.iva || 0)
      const canonCausado = Number(pago.canonCausado || canonBase + iva)
      const pagado = Number(pago.valorPagado || 0)
      const mora = Number(pago.mora || 0)
      const descuento = Number(pago.descuento || 0)
      const saldoDeuda = canonCausado + mora - descuento - pagado

      let estadoMovimiento = 'Pagado'
      if (saldoDeuda > 0 && pagado > 0) estadoMovimiento = 'Abono registrado'
      if (saldoDeuda > 0 && pagado === 0) estadoMovimiento = 'Pendiente'

      return {
        mes: pago.mes,
        fechaPago: pago.fechaPago,
        recibo: pago.recibo || 'Sin recibo',
        canonBase,
        incrementoAplicado,
        iva,
        canonCausado,
        pagado,
        mora,
        descuento,
        saldoDeuda,
        estadoMovimiento,
      }
    })

    const totalCanonBase = movimientos.reduce((total, item) => total + Number(item.canonBase || 0), 0)
    const totalIva = movimientos.reduce((total, item) => total + Number(item.iva || 0), 0)
    const totalCanonCausado = movimientos.reduce((total, item) => total + Number(item.canonCausado || 0), 0)
    const totalPagado = movimientos.reduce((total, item) => total + Number(item.pagado || 0), 0)
    const totalMora = movimientos.reduce((total, item) => total + Number(item.mora || 0), 0)
    const totalDescuento = movimientos.reduce((total, item) => total + Number(item.descuento || 0), 0)
    const saldoDeudaTotal = movimientos.reduce((total, item) => total + Number(item.saldoDeuda || 0), 0)

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

  const totalPagadoPredial = pagosPrediales.reduce((total, pago) => total + Number(pago.valorPagado || 0), 0)
  const totalPagadoArriendos = pagosArriendo.reduce((total, pago) => total + Number(pago.valorPagado || 0), 0)
  const totalCanonActivo = contratosArriendo
    .filter((contrato) => contrato.estado === 'Activo')
    .reduce((total, contrato) => total + Number(contrato.canonMensual || 0), 0)

  const saldoPendienteArriendos = extractosArriendo.reduce(
    (total, extracto) => total + Number(extracto.resumen.saldoDeudaTotal || 0),
    0
  )

  const saldoPendientePredial = extractosPrediales.reduce(
    (total, extracto) => total + Number(extracto.resumen.saldoPendiente || 0),
    0
  )

  const alertasPrediales = extractosPrediales
    .filter((extracto) => extracto.resumen.estadoGeneral !== 'Al día')
    .map((extracto) => ({
      codigo: extracto.predio.codigo,
      barrio: extracto.predio.barrio,
      mensaje: extracto.resumen.estadoGeneral,
    }))

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
          <button type="button" className={seccionActiva === 'inicio' ? 'menu-item active' : 'menu-item'} onClick={() => cambiarSeccion('inicio')}>
            <span>⌂</span>Inicio
          </button>

          <button type="button" className={seccionActiva === 'predios' ? 'menu-item active' : 'menu-item'} onClick={() => cambiarSeccion('predios')}>
            <span>▦</span>Predios
          </button>

          <button type="button" className={seccionActiva === 'predial' ? 'menu-item active' : 'menu-item'} onClick={() => cambiarSeccion('predial')}>
            <span>▣</span>Predial
          </button>

          <button type="button" className={seccionActiva === 'arriendos' ? 'menu-item active' : 'menu-item'} onClick={() => cambiarSeccion('arriendos')}>
            <span>≡</span>Arriendos
          </button>

          <button type="button" className={seccionActiva === 'estados' ? 'menu-item active' : 'menu-item'} onClick={() => cambiarSeccion('estados')}>
            <span>□</span>Estados de cuenta
          </button>

          <button type="button" className={seccionActiva === 'reportes' ? 'menu-item active' : 'menu-item'} onClick={() => cambiarSeccion('reportes')}>
            <span>▥</span>Reportes
          </button>
        </nav>
      </aside>

      <main className="main">
        <section className="hero-card no-print">
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
            <button className="btn-primary" onClick={() => abrirFormulario('predios', 'predio')}>
              <span>+</span>Nuevo predio
            </button>

            <button className="btn-gold" onClick={() => abrirFormulario('arriendos', 'contrato')}>
              <span>+</span>Contrato arriendo
            </button>

            <button className="btn-gold" onClick={() => abrirFormulario('arriendos', 'pagoArriendo')}>
              <span>+</span>Pago arriendo
            </button>

            <button className="btn-gold" onClick={() => abrirFormulario('arriendos', 'incremento')}>
              <span>+</span>Actualizar incremento
            </button>

            <button className="btn-gold" onClick={() => abrirFormulario('predial', 'valorPredial')}>
              <span>+</span>Valor anual predial
            </button>

            <button className="btn-gold" onClick={() => abrirFormulario('predial', 'pagoPredial')}>
              <span>+</span>Pago predial
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
              <h3>Predios existentes</h3>
              <strong>{predios.length}</strong>
              <p>Total de predios registrados</p>
            </div>

            <div className="stat-card pending-card">
              <div className="stat-icon">$</div>
              <h3>Saldo arriendos</h3>
              <strong className="money">{formatearDinero(saldoPendienteArriendos)}</strong>
              <p>Pendiente por cobrar</p>
            </div>

            <div className="stat-card pending-card">
              <div className="stat-icon">▣</div>
              <h3>Saldo predial</h3>
              <strong className="money">{formatearDinero(saldoPendientePredial)}</strong>
              <p>Pendiente por pagar o actualizar</p>
            </div>

            <div className="stat-card pending-card">
              <div className="stat-icon">!</div>
              <h3>Prediales sin actualizar</h3>
              <strong>
                {
                  extractosPrediales.filter(
                    (extracto) =>
                      extracto.resumen.estadoGeneral === 'Pendiente de actualización'
                  ).length
                }
              </strong>
              <p>Predios que requieren actualizar valor anual</p>
            </div>
          </section>
        )}

        {mostrarPredios && (
          <>
            {mostrarFormularioPredio && (
              <section className="form-panel no-print">
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
                    <input type="text" value={codigoPredioAutomatico()} readOnly placeholder="Se genera automáticamente" />
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
                    <input type="text" value={nombrePropietarioTemp} onChange={(e) => setNombrePropietarioTemp(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Tipo documento</label>
                    <select value={tipoDocPropietarioTemp} onChange={(e) => setTipoDocPropietarioTemp(e.target.value)}>
                      <option>Cédula de ciudadanía</option>
                      <option>NIT</option>
                      <option>Cédula de extranjería</option>
                      <option>Pasaporte</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Número documento</label>
                    <input type="text" value={docPropietarioTemp} onChange={(e) => setDocPropietarioTemp(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Teléfono</label>
                    <input type="text" value={telefonoPropietarioTemp} onChange={(e) => setTelefonoPropietarioTemp(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Correo</label>
                    <input type="email" value={correoPropietarioTemp} onChange={(e) => setCorreoPropietarioTemp(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label>Porcentaje</label>
                    <input type="number" value={porcentajePropietarioTemp} onChange={(e) => setPorcentajePropietarioTemp(e.target.value)} />
                  </div>

                  <div className="form-actions full">
                    <button type="button" className="btn-gold" onClick={agregarPropietarioTemporal}>
                      Agregar propietario
                    </button>
                  </div>

                  <div className="temp-owners full">
                    <h3>Propietarios agregados</h3>
                    <p>Total asignado: <strong>{totalPorcentajeTemporal}%</strong></p>
                    <p>Falta por asignar: <strong>{100 - totalPorcentajeTemporal}%</strong></p>

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
                    <textarea value={observacionesPredio} onChange={(e) => setObservacionesPredio(e.target.value)}></textarea>
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

            <section className="panel no-print">
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
                      <th>Acción</th>
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
                        <td>
                          <button type="button" className="btn-small" onClick={() => setPredioSeleccionado(predio)}>
                            Ver predio
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {predioSeleccionado && (
              <section className="panel no-print">
                <div className="section-title">
                  <div className="section-icon">▦</div>
                  <h2>Detalle del predio</h2>
                </div>

                <div className="detail-grid">
                  <div>
                    <span>Código del predio</span>
                    <strong>{predioSeleccionado.codigo}</strong>
                  </div>
                  <div>
                    <span>Ciudad</span>
                    <strong>{predioSeleccionado.ciudad}</strong>
                  </div>
                  <div>
                    <span>Barrio</span>
                    <strong>{predioSeleccionado.barrio}</strong>
                  </div>
                  <div>
                    <span>Dirección</span>
                    <strong>{predioSeleccionado.direccion}</strong>
                  </div>
                  <div>
                    <span>Matrícula inmobiliaria</span>
                    <strong>{predioSeleccionado.matricula || 'Sin registrar'}</strong>
                  </div>
                  <div>
                    <span>CHIP</span>
                    <strong>{predioSeleccionado.chip || 'Sin registrar'}</strong>
                  </div>
                  <div>
                    <span>Cédula catastral</span>
                    <strong>{predioSeleccionado.cedulaCatastral || 'Sin registrar'}</strong>
                  </div>
                  <div>
                    <span>Estado</span>
                    <strong>{predioSeleccionado.estado}</strong>
                  </div>
                  <div>
                    <span>Año inicio predial</span>
                    <strong>{predioSeleccionado.anioInicioPredial || 'Sin registrar'}</strong>
                  </div>
                  <div className="full-detail">
                    <span>Observaciones</span>
                    <strong>{predioSeleccionado.observaciones || 'Sin observaciones'}</strong>
                  </div>
                </div>

                <div className="section-title">
                  <div className="section-icon">◎</div>
                  <h2>Propietarios del predio</h2>
                </div>

                <div className="simple-table-wrapper">
                  <table className="simple-table">
                    <thead>
                      <tr>
                        <th>Propietario</th>
                        <th>Documento</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Participación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {propietarios
                        .filter((propietario) => propietario.codigoPredio === predioSeleccionado.codigo)
                        .map((propietario, index) => (
                          <tr key={index}>
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

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setPredioSeleccionado(null)}>
                    Cerrar detalle
                  </button>
                </div>
              </section>
            )}

            <section className="panel no-print">
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
          <section className="panel no-print">
            <div className="section-title">
              <div className="section-icon">≡</div>
              <h2>Módulo de arriendos</h2>
            </div>
            <p className="form-description">
              Este módulo conserva contratos, pagos, incrementos y estados de cuenta de arriendos.
            </p>
          </section>
        )}

        {mostrarPredial && (
          <section className="panel no-print">
            <div className="section-title">
              <div className="section-icon">▣</div>
              <h2>Módulo predial</h2>
            </div>
            <p className="form-description">
              Aquí se registran valores anuales, pagos prediales e historial predial.
            </p>
          </section>
        )}

        {mostrarEstados && (
          <>
            <ExtractosPrediales
              extractosPrediales={extractosPrediales}
              formatearDinero={formatearDinero}
            />
            <ExtractosArriendo
              extractosArriendo={extractosArriendo}
              formatearDinero={formatearDinero}
            />
          </>
        )}

        {mostrarReportes && (
          <section className="panel no-print">
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

              <div className="stat-card pending-card">
                <div className="stat-icon">$</div>
                <h3>Saldo arriendos</h3>
                <strong className="money">{formatearDinero(saldoPendienteArriendos)}</strong>
                <p>Arriendos pendientes por pagar</p>
              </div>

              <div className="stat-card pending-card">
                <div className="stat-icon">▣</div>
                <h3>Saldo predial</h3>
                <strong className="money">{formatearDinero(saldoPendientePredial)}</strong>
                <p>Prediales pendientes por pagar o actualizar</p>
              </div>
            </div>
          </section>
        )}

        <div className="floating-menu no-print">
          <button type="button" onClick={() => cambiarSeccion('inicio')}>
            Inicio
          </button>
        </div>
      </main>
    </div>
  )
}

function ExtractosPrediales({ extractosPrediales, formatearDinero }) {
  return (
    <section className="extracts-container">
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
                    <td>{movimiento.valorAPagar === null ? 'Sin registrar' : formatearDinero(movimiento.valorAPagar)}</td>
                    <td>{formatearDinero(movimiento.descuento)}</td>
                    <td>{formatearDinero(movimiento.intereses)}</td>
                    <td>{formatearDinero(movimiento.valorPagado)}</td>
                    <td>{movimiento.saldoPendiente === null ? 'Sin registrar' : formatearDinero(movimiento.saldoPendiente)}</td>
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
  )
}

function ExtractosArriendo({ extractosArriendo, formatearDinero }) {
  return (
    <section className="extracts-container">
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
            <div><span>Incremento defecto</span><strong>{extracto.contrato.incrementoAnual}%</strong></div>
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
                      <span
                        className={
                          movimiento.estadoMovimiento === 'Pagado'
                            ? 'status active'
                            : movimiento.estadoMovimiento === 'Pendiente'
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
  )
}

export default App