import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const anioActual = new Date().getFullYear()

  const [mostrarFormularioPredio, setMostrarFormularioPredio] = useState(false)
  const [mostrarFormularioValorPredial, setMostrarFormularioValorPredial] =
    useState(false)
  const [mostrarFormularioPredial, setMostrarFormularioPredial] = useState(false)

  const [ciudad, setCiudad] = useState('')
  const [barrio, setBarrio] = useState('')
  const [direccion, setDireccion] = useState('')
  const [matricula, setMatricula] = useState('')
  const [chip, setChip] = useState('')
  const [cedulaCatastral, setCedulaCatastral] = useState('')
  const [saldoInicial, setSaldoInicial] = useState('')
  const [estado, setEstado] = useState('Activo')
  const [observaciones, setObservaciones] = useState('')

  const [ultimoAnioPredialPagado, setUltimoAnioPredialPagado] = useState('')
  const [reciboUltimoPredial, setReciboUltimoPredial] = useState('')
  const [fechaUltimoPagoPredial, setFechaUltimoPagoPredial] = useState('')
  const [valorImpuestoUltimoPredial, setValorImpuestoUltimoPredial] =
    useState('')
  const [valorPagadoUltimoPredial, setValorPagadoUltimoPredial] = useState('')

  const [nombreTempPropietario, setNombreTempPropietario] = useState('')
  const [tipoDocTempPropietario, setTipoDocTempPropietario] = useState(
    'Cédula de ciudadanía'
  )
  const [docTempPropietario, setDocTempPropietario] = useState('')
  const [telTempPropietario, setTelTempPropietario] = useState('')
  const [correoTempPropietario, setCorreoTempPropietario] = useState('')
  const [porcentajeTempPropietario, setPorcentajeTempPropietario] = useState('')
  const [propietariosTemporales, setPropietariosTemporales] = useState([])

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
      saldoInicial: 0,
      matricula: '50N-123456',
      chip: 'AAA0000',
      cedulaCatastral: '110010000000000',
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

  const totalTemporalPropietarios = propietariosTemporales.reduce(
    (total, propietario) => total + Number(propietario.porcentaje),
    0
  )

  const porcentajeFaltante = 100 - totalTemporalPropietarios

  const formatearDinero = (valor) => {
    if (valor === null || valor === undefined) return 'Sin registrar'

    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(valor || 0)
  }

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
    setSaldoInicial('')
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

    const nuevoPropietarioTemporal = {
      nombre: nombreTempPropietario,
      tipoDocumento: tipoDocTempPropietario,
      numeroDocumento: docTempPropietario,
      telefono: telTempPropietario,
      correo: correoTempPropietario,
      porcentaje: porcentajeNuevo,
    }

    setPropietariosTemporales([
      ...propietariosTemporales,
      nuevoPropietarioTemporal,
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
      saldoInicial: Number(saldoInicial) || 0,
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

      const tienePendientesActualizar = movimientos.some(
        (mov) => mov.estadoMovimiento === 'Falta actualizar valor'
      )

      let estadoGeneral = 'Al día'

      if (tienePendientesActualizar) {
        estadoGeneral = 'Pendiente de actualización'
      } else if (saldoPendiente > 0) {
        estadoGeneral = 'Con saldo pendiente'
      }

      const propietariosDelPredio = propietarios.filter(
        (propietario) => propietario.codigoPredio === predio.codigo
      )

      const totalParticipacion = propietariosDelPredio.reduce(
        (total, propietario) => total + Number(propietario.porcentaje),
        0
      )

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

  const cerrarFormularios = () => {
    setMostrarFormularioPredio(false)
    setMostrarFormularioValorPredial(false)
    setMostrarFormularioPredial(false)
  }

  return (
    <div className="app">
      <aside className="sidebar no-print">
        <div className="brand-box">
          <img
            src="/logo-inh.png"
            alt="INH Constructores"
            className="brand-logo"
          />
          <p>Control Predial</p>
        </div>

        <nav className="menu">
          <a href="#" className="menu-item active">
            <span>⌂</span>Inicio
          </a>
          <a href="#" className="menu-item">
            <span>▦</span>Predios
          </a>
          <a href="#" className="menu-item">
            <span>◎</span>Propietarios
          </a>
          <a href="#" className="menu-item">
            <span>▣</span>Pagos Prediales
          </a>
          <a href="#" className="menu-item">
            <span>□</span>Estados de cuenta
          </a>
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
                Sistema para administrar predios, propietarios obligatorios,
                porcentajes, valores prediales y estados de cuenta.
              </p>
            </div>
          </div>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => {
                cerrarFormularios()
                setMostrarFormularioPredio(!mostrarFormularioPredio)
              }}
            >
              <span>+</span>
              Nuevo predio
            </button>

            <button
              className="btn-gold"
              onClick={() => {
                cerrarFormularios()
                setMostrarFormularioValorPredial(!mostrarFormularioValorPredial)
              }}
            >
              <span>+</span>
              Valor anual
            </button>

            <button
              className="btn-gold"
              onClick={() => {
                cerrarFormularios()
                setMostrarFormularioPredial(!mostrarFormularioPredial)
              }}
            >
              <span>+</span>
              Pago predial
            </button>
          </div>
        </section>

        {alertasPrediales.length > 0 && (
          <section className="alert-panel no-print">
            <h2>Alertas de actualización predial</h2>
            {alertasPrediales.map((alerta, index) => (
              <div className="alert-item" key={index}>
                <strong>{alerta.codigo}</strong> - {alerta.barrio}:{' '}
                {alerta.mensaje}
              </div>
            ))}
          </section>
        )}

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
            <div className="stat-icon">▣</div>
            <h3>Pagos prediales</h3>
            <strong className="money">
              {formatearDinero(totalPagadoPredial)}
            </strong>
            <p>Total pagado</p>
          </div>
        </section>

        {mostrarFormularioPredio && (
          <section className="form-panel no-print">
            <div className="section-title">
              <div className="section-icon">▦</div>
              <h2>Registro de nuevo inmueble</h2>
            </div>

            <p className="form-description">
              Para guardar el inmueble, los propietarios deben sumar exactamente
              100%.
            </p>

            <div className="property-form">
              <div className="form-section-title full">
                Datos principales del predio
              </div>

              <div className="form-group">
                <label>Código del predio</label>
                <input
                  type="text"
                  value={codigoPredio}
                  readOnly
                  placeholder="Se genera automáticamente"
                />
              </div>

              <div className="form-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  placeholder="Ej: Bogotá"
                />
              </div>

              <div className="form-group">
                <label>Barrio</label>
                <input
                  type="text"
                  value={barrio}
                  onChange={(e) => setBarrio(e.target.value)}
                  placeholder="Ej: Fontibón"
                />
              </div>

              <div className="form-group full">
                <label>Dirección</label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Ej: Calle 100 # 10-20"
                />
              </div>

              <div className="form-section-title full">
                Información jurídica y catastral
              </div>

              <div className="form-group">
                <label>Matrícula inmobiliaria</label>
                <input
                  type="text"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>CHIP</label>
                <input
                  type="text"
                  value={chip}
                  onChange={(e) => setChip(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Cédula catastral</label>
                <input
                  type="text"
                  value={cedulaCatastral}
                  onChange={(e) => setCedulaCatastral(e.target.value)}
                />
              </div>

              <div className="form-section-title full">
                Propietarios del inmueble
              </div>

              <div className="form-group">
                <label>Nombre propietario</label>
                <input
                  type="text"
                  value={nombreTempPropietario}
                  onChange={(e) => setNombreTempPropietario(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Tipo documento</label>
                <select
                  value={tipoDocTempPropietario}
                  onChange={(e) => setTipoDocTempPropietario(e.target.value)}
                >
                  <option>Cédula de ciudadanía</option>
                  <option>NIT</option>
                  <option>Cédula de extranjería</option>
                  <option>Pasaporte</option>
                </select>
              </div>

              <div className="form-group">
                <label>Número documento</label>
                <input
                  type="text"
                  value={docTempPropietario}
                  onChange={(e) => setDocTempPropietario(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  value={telTempPropietario}
                  onChange={(e) => setTelTempPropietario(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Correo</label>
                <input
                  type="email"
                  value={correoTempPropietario}
                  onChange={(e) => setCorreoTempPropietario(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Porcentaje</label>
                <input
                  type="number"
                  value={porcentajeTempPropietario}
                  onChange={(e) => setPorcentajeTempPropietario(e.target.value)}
                />
              </div>

              <div className="form-actions full">
                <button
                  type="button"
                  className="btn-gold"
                  onClick={agregarPropietarioTemporal}
                >
                  Agregar propietario
                </button>
              </div>

              <div className="temp-owners full">
                <h3>Propietarios agregados</h3>
                <p>
                  Total asignado: <strong>{totalTemporalPropietarios}%</strong>
                </p>
                <p>
                  Falta por asignar: <strong>{porcentajeFaltante}%</strong>
                </p>

                {propietariosTemporales.length === 0 && (
                  <p>No hay propietarios agregados todavía.</p>
                )}

                {propietariosTemporales.map((propietario, index) => (
                  <div className="temp-owner-row" key={index}>
                    <span>{propietario.nombre}</span>
                    <span>{propietario.numeroDocumento}</span>
                    <span>{propietario.porcentaje}%</span>
                    <button
                      type="button"
                      onClick={() => eliminarPropietarioTemporal(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>

              <div className="form-section-title full">
                Información inicial de predial
              </div>

              <div className="form-group">
                <label>Último año predial pagado</label>
                <input
                  type="number"
                  value={ultimoAnioPredialPagado}
                  onChange={(e) => setUltimoAnioPredialPagado(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Recibo último pago</label>
                <input
                  type="text"
                  value={reciboUltimoPredial}
                  onChange={(e) => setReciboUltimoPredial(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Fecha último pago</label>
                <input
                  type="date"
                  value={fechaUltimoPagoPredial}
                  onChange={(e) => setFechaUltimoPagoPredial(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Valor impuesto último año</label>
                <input
                  type="number"
                  value={valorImpuestoUltimoPredial}
                  onChange={(e) =>
                    setValorImpuestoUltimoPredial(e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Valor pagado último año</label>
                <input
                  type="number"
                  value={valorPagadoUltimoPredial}
                  onChange={(e) => setValorPagadoUltimoPredial(e.target.value)}
                />
              </div>

              <div className="form-section-title full">Observaciones</div>

              <div className="form-group full">
                <label>Observaciones del predio</label>
                <textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                ></textarea>
              </div>

              <div className="form-actions full">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setMostrarFormularioPredio(false)}
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={guardarPredio}
                >
                  Guardar inmueble
                </button>
              </div>
            </div>
          </section>
        )}

        {mostrarFormularioValorPredial && (
          <section className="form-panel no-print">
            <div className="section-title">
              <div className="section-icon">□</div>
              <h2>Registrar valor predial anual</h2>
            </div>

            <div className="property-form">
              <div className="form-group">
                <label>Predio</label>
                <select
                  value={codigoPredioValor}
                  onChange={(e) => setCodigoPredioValor(e.target.value)}
                >
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
                <input
                  type="number"
                  value={anioValorPredial}
                  onChange={(e) => setAnioValorPredial(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Valor a pagar</label>
                <input
                  type="number"
                  value={valorAnualPredial}
                  onChange={(e) => setValorAnualPredial(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Fecha límite</label>
                <input
                  type="date"
                  value={fechaLimitePredial}
                  onChange={(e) => setFechaLimitePredial(e.target.value)}
                />
              </div>

              <div className="form-actions full">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={guardarValorPredialAnual}
                >
                  Guardar valor anual
                </button>
              </div>
            </div>
          </section>
        )}

        {mostrarFormularioPredial && (
          <section className="form-panel no-print">
            <div className="section-title">
              <div className="section-icon">▣</div>
              <h2>Registro de pago predial</h2>
            </div>

            <div className="property-form">
              <div className="form-group">
                <label>Predio</label>
                <select
                  value={codigoPredioPago}
                  onChange={(e) => setCodigoPredioPago(e.target.value)}
                >
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
                <input
                  type="number"
                  value={anioPredial}
                  onChange={(e) => setAnioPredial(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Número recibo</label>
                <input
                  type="text"
                  value={numeroRecibo}
                  onChange={(e) => setNumeroRecibo(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Fecha pago</label>
                <input
                  type="date"
                  value={fechaPago}
                  onChange={(e) => setFechaPago(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Descuento</label>
                <input
                  type="number"
                  value={descuento}
                  onChange={(e) => setDescuento(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Intereses</label>
                <input
                  type="number"
                  value={intereses}
                  onChange={(e) => setIntereses(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Valor pagado</label>
                <input
                  type="number"
                  value={valorPagado}
                  onChange={(e) => setValorPagado(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Estado pago</label>
                <select
                  value={estadoPagoPredial}
                  onChange={(e) => setEstadoPagoPredial(e.target.value)}
                >
                  <option>Pagado</option>
                  <option>Pendiente</option>
                  <option>En mora</option>
                </select>
              </div>

              <div className="form-actions full">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={guardarPagoPredial}
                >
                  Guardar pago
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="owners-panel no-print">
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
                    <td>
                      {propietario.tipoDocumento} -{' '}
                      {propietario.numeroDocumento}
                    </td>
                    <td>{propietario.telefono}</td>
                    <td>{propietario.correo}</td>
                    <td>
                      <span className="status active">
                        {propietario.porcentaje}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="extractos-container">
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
                  <p>
                    Fecha de generación:{' '}
                    <strong>{new Date().toLocaleDateString('es-CO')}</strong>
                  </p>
                </div>

                <div className="extracto-logo-box">
                  <img src="/logo-inh.png" alt="INH Constructores" />
                </div>
              </div>

              <div className="extracto-info">
                <div>
                  <span>Ciudad</span>
                  <strong>{extracto.predio.ciudad}</strong>
                </div>

                <div>
                  <span>Barrio</span>
                  <strong>{extracto.predio.barrio}</strong>
                </div>

                <div>
                  <span>Dirección</span>
                  <strong>{extracto.predio.direccion}</strong>
                </div>

                <div>
                  <span>Matrícula</span>
                  <strong>{extracto.predio.matricula || 'Sin registrar'}</strong>
                </div>

                <div>
                  <span>CHIP</span>
                  <strong>{extracto.predio.chip || 'Sin registrar'}</strong>
                </div>

                <div>
                  <span>Cédula catastral</span>
                  <strong>
                    {extracto.predio.cedulaCatastral || 'Sin registrar'}
                  </strong>
                </div>
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
                        <td>
                          {propietario.tipoDocumento} -{' '}
                          {propietario.numeroDocumento}
                        </td>
                        <td>{propietario.telefono}</td>
                        <td>{propietario.correo}</td>
                        <td>{propietario.porcentaje}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="total-participacion">
                  Total participación registrada:{' '}
                  <strong>{extracto.totalParticipacion}%</strong>
                </p>
              </div>

              <div className="resumen-extracto">
                <div>
                  <span>Total impuesto</span>
                  <strong>{formatearDinero(extracto.resumen.totalImpuesto)}</strong>
                </div>

                <div>
                  <span>Total descuentos</span>
                  <strong>
                    {formatearDinero(extracto.resumen.totalDescuento)}
                  </strong>
                </div>

                <div>
                  <span>Total intereses</span>
                  <strong>
                    {formatearDinero(extracto.resumen.totalIntereses)}
                  </strong>
                </div>

                <div>
                  <span>Total pagado</span>
                  <strong>{formatearDinero(extracto.resumen.totalPagado)}</strong>
                </div>

                <div>
                  <span>Saldo pendiente</span>
                  <strong>
                    {formatearDinero(extracto.resumen.saldoPendiente)}
                  </strong>
                </div>

                <div>
                  <span>Estado general</span>
                  <strong>{extracto.resumen.estadoGeneral}</strong>
                </div>
              </div>

              <div className="extracto-actions no-print">
                <button className="btn-primary" onClick={() => window.print()}>
                  Imprimir estado de cuenta
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
                                : movimiento.estadoMovimiento ===
                                  'Falta actualizar valor'
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

              <div className="extracto-footer">
                <p>
                  Este estado de cuenta es generado por el sistema INH Control
                  Predial con base en los registros ingresados.
                </p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App