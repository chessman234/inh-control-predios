import { useState } from 'react'
import './App.css'

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [ciudad, setCiudad] = useState('')
  const [barrio, setBarrio] = useState('')

  const obtenerCodigoCiudad = (nombreCiudad) => {
    const ciudadLimpia = nombreCiudad.trim().toLowerCase()

    if (ciudadLimpia === 'bogotá' || ciudadLimpia === 'bogota') return 'BOG'
    if (ciudadLimpia === 'villavicencio') return 'VIL'
    if (ciudadLimpia === 'medellín' || ciudadLimpia === 'medellin') return 'MED'
    if (ciudadLimpia === 'cali') return 'CAL'
    if (ciudadLimpia === 'barranquilla') return 'BAQ'

    return ciudadLimpia.substring(0, 3).toUpperCase()
  }

  const obtenerCodigoBarrio = (nombreBarrio) => {
    return nombreBarrio.trim().substring(0, 3).toUpperCase()
  }

  const codigoPredio =
    ciudad && barrio
      ? `${obtenerCodigoCiudad(ciudad)}-${obtenerCodigoBarrio(barrio)}-0001`
      : ''

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <h2>INH</h2>
          <p>Control Predial</p>
        </div>

        <nav className="menu">
          <a href="#">Inicio</a>
          <a href="#">Predios</a>
          <a href="#">Propietarios</a>
          <a href="#">Arriendos</a>
          <a href="#">Pagos</a>
          <a href="#">Estados de cuenta</a>
          <a href="#">Reportes</a>
          <a href="#">Usuarios</a>
        </nav>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <h1>INH Control de Predios y Arriendos</h1>
            <p>
              Sistema web para administrar predios, propietarios, arriendos,
              pagos y estados de cuenta.
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? 'Cerrar formulario' : 'Nuevo predio'}
          </button>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Total predios</h3>
            <p className="number">1</p>
            <span>Predios registrados</span>
          </div>

          <div className="card">
            <h3>Arriendos activos</h3>
            <p className="number">0</p>
            <span>Contratos vigentes</span>
          </div>

          <div className="card">
            <h3>Pagos del mes</h3>
            <p className="number">$0</p>
            <span>Ingresos registrados</span>
          </div>

          <div className="card">
            <h3>Saldos pendientes</h3>
            <p className="number">$0</p>
            <span>Cuentas por cobrar</span>
          </div>
        </section>

        {mostrarFormulario && (
          <section className="form-panel">
            <h2>Registro de predio</h2>
            <p className="form-description">
              Capture la información principal del inmueble. El código del
              predio se genera automáticamente con ciudad, barrio y consecutivo.
            </p>

            <form className="property-form">
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
                  placeholder="Ej: Bogotá"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Barrio</label>
                <input
                  type="text"
                  placeholder="Ej: Fontibón"
                  value={barrio}
                  onChange={(e) => setBarrio(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Dirección</label>
                <input type="text" placeholder="Ej: Calle 123 # 45-67" />
              </div>

              <div className="form-group">
                <label>Matrícula inmobiliaria</label>
                <input type="text" placeholder="Número de matrícula" />
              </div>

              <div className="form-group">
                <label>CHIP</label>
                <input type="text" placeholder="Código CHIP" />
              </div>

              <div className="form-group">
                <label>Cédula catastral</label>
                <input type="text" placeholder="Cédula catastral" />
              </div>

              <div className="form-group">
                <label>Saldo inicial</label>
                <input type="number" placeholder="0" />
              </div>

              <div className="form-group">
                <label>Estado</label>
                <select>
                  <option>Activo</option>
                  <option>Inactivo</option>
                  <option>Arrendado</option>
                  <option>Disponible</option>
                </select>
              </div>

              <div className="form-group full">
                <label>Observaciones</label>
                <textarea placeholder="Escriba observaciones del predio"></textarea>
              </div>

              <div className="form-actions full">
                <button type="button" className="btn-secondary">
                  Cancelar
                </button>

                <button type="button" className="btn-primary">
                  Guardar predio
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="panel">
          <h2>Vista general del sistema</h2>

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
              <tr>
                <td>BOG-FON-0001</td>
                <td>Bogotá</td>
                <td>Fontibón</td>
                <td>Ejemplo de dirección</td>
                <td>
                  <span className="status">Activo</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  )
}

export default App