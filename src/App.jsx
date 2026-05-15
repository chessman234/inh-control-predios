import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const [ciudad, setCiudad] = useState('')
  const [barrio, setBarrio] = useState('')
  const [direccion, setDireccion] = useState('')
  const [matricula, setMatricula] = useState('')
  const [chip, setChip] = useState('')
  const [cedulaCatastral, setCedulaCatastral] = useState('')
  const [saldoInicial, setSaldoInicial] = useState('')
  const [estado, setEstado] = useState('Activo')
  const [observaciones, setObservaciones] = useState('')

  const [predios, setPredios] = useState([
    {
      codigo: 'BOG-FON-0001',
      ciudad: 'Bogotá',
      barrio: 'Fontibón',
      direccion: 'Ejemplo de dirección',
      estado: 'Activo',
      saldoInicial: 0,
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

  const limpiarFormulario = () => {
    setCiudad('')
    setBarrio('')
    setDireccion('')
    setMatricula('')
    setChip('')
    setCedulaCatastral('')
    setSaldoInicial('')
    setEstado('Activo')
    setObservaciones('')
  }

  const guardarPredio = () => {
    if (!ciudad || !barrio || !direccion) {
      alert('Por favor complete como mínimo ciudad, barrio y dirección.')
      return
    }

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
    }

    setPredios([nuevoPredio, ...predios])
    limpiarFormulario()
    setMostrarFormulario(false)
  }

  const totalPredios = predios.length
  const arriendosActivos = 0
  const pagosDelMes = 0

  const saldosPendientes = predios.reduce(
    (total, predio) => total + (Number(predio.saldoInicial) || 0),
    0
  )

  const formatearDinero = (valor) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(valor)
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand-box">
          <img src="/logo-inh.png" alt="INH Constructores" className="brand-logo" />
          <p>Control Predial</p>
        </div>

        <nav className="menu">
          <a href="#" className="menu-item active">
            <span>⌂</span>
            Inicio
          </a>

          <a href="#" className="menu-item">
            <span>▦</span>
            Predios
          </a>

          <a href="#" className="menu-item">
            <span>◎</span>
            Propietarios
          </a>

          <a href="#" className="menu-item">
            <span>≡</span>
            Arriendos
          </a>

          <a href="#" className="menu-item">
            <span>$</span>
            Pagos
          </a>

          <a href="#" className="menu-item">
            <span>□</span>
            Estados de cuenta
          </a>

          <a href="#" className="menu-item">
            <span>▥</span>
            Reportes
          </a>

          <a href="#" className="menu-item">
            <span>◌</span>
            Usuarios
          </a>
        </nav>
      </aside>

      <main className="main">
        <section className="hero-card">
          <div className="hero-content">
            <div className="hero-logo-box">
              <img src="/logo-inh.png" alt="Logo INH" />
            </div>

            <div>
              <h1>INH Control de Predios y Arriendos</h1>
              <p>
                Sistema web para administrar predios, propietarios, arriendos,
                pagos y estados de cuenta.
              </p>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            <span>+</span>
            {mostrarFormulario ? 'Cerrar' : 'Nuevo predio'}
          </button>
        </section>

        <section className="cards">
          <div className="stat-card">
            <div className="stat-icon">▦</div>
            <h3>Total predios</h3>
            <strong>{totalPredios}</strong>
            <p>Predios registrados</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⇄</div>
            <h3>Arriendos activos</h3>
            <strong>{arriendosActivos}</strong>
            <p>Contratos vigentes</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">$</div>
            <h3>Pagos del mes</h3>
            <strong className="money">{formatearDinero(pagosDelMes)}</strong>
            <p>Ingresos registrados</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon">¤</div>
            <h3>Saldos pendientes</h3>
            <strong className="money">{formatearDinero(saldosPendientes)}</strong>
            <p>Cuentas por cobrar</p>
          </div>
        </section>

        {mostrarFormulario && (
          <section className="form-panel">
            <div className="section-title">
              <div className="section-icon">▦</div>
              <h2>Registro de predio</h2>
            </div>

            <p className="form-description">
              Capture la información principal del inmueble. El código del predio se genera automáticamente con ciudad, barrio y consecutivo.
            </p>

            <div className="property-form">
              <div className="form-group">
                <label>Código del predio</label>
                <input type="text" value={codigoPredio} readOnly placeholder="Se genera automáticamente" />
              </div>

              <div className="form-group">
                <label>Ciudad</label>
                <input type="text" placeholder="Ej: Bogotá" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Barrio</label>
                <input type="text" placeholder="Ej: Fontibón" value={barrio} onChange={(e) => setBarrio(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Dirección</label>
                <input type="text" placeholder="Ej: Calle 100 # 10-20" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Matrícula inmobiliaria</label>
                <input type="text" placeholder="Número de matrícula" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
              </div>

              <div className="form-group">
                <label>CHIP</label>
                <input type="text" placeholder="Código CHIP" value={chip} onChange={(e) => setChip(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Cédula catastral</label>
                <input type="text" placeholder="Cédula catastral" value={cedulaCatastral} onChange={(e) => setCedulaCatastral(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Saldo inicial</label>
                <input type="number" placeholder="0" value={saldoInicial} onChange={(e) => setSaldoInicial(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Estado</label>
                <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                  <option>Activo</option>
                  <option>Inactivo</option>
                  <option>Arrendado</option>
                  <option>Disponible</option>
                </select>
              </div>

              <div className="form-group full">
                <label>Observaciones</label>
                <textarea placeholder="Escriba observaciones del predio" value={observaciones} onChange={(e) => setObservaciones(e.target.value)}></textarea>
              </div>

              <div className="form-actions full">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    limpiarFormulario()
                    setMostrarFormulario(false)
                  }}
                >
                  Cancelar
                </button>

                <button type="button" className="btn-primary" onClick={guardarPredio}>
                  Guardar predio
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="table-panel">
          <div className="section-title">
            <div className="section-icon">▦</div>
            <h2>Vista general del sistema</h2>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Ciudad</th>
                  <th>Barrio</th>
                  <th>Dirección</th>
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
      </main>
    </div>
  )
}

export default App