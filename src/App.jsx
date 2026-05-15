import './App.css'

function App() {
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
            <p>Sistema web para administrar predios, propietarios, arriendos, pagos y estados de cuenta.</p>
          </div>

          <button className="btn-primary">Nuevo predio</button>
        </header>

        <section className="cards">
          <div className="card">
            <h3>Total predios</h3>
            <p className="number">0</p>
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
                <td><span className="status">Activo</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  )
}

export default App