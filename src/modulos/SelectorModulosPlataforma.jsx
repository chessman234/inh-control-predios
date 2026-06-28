// =============================================================================
// PLATAFORMA - SELECTOR DE MODULOS
// Pantalla principal tras el login con acceso a cada area del sistema.
// =============================================================================

import {
  DEFINICIONES_MODULOS,
  LISTA_MODULOS_PLATAFORMA,
  LOGO_PLATAFORMA_INH,
  MODULOS_PLATAFORMA,
} from './constantesModulos.js'
import './ModuloPlataforma.css'

// =============================================================================
// COMPONENTE - SELECTOR MODULOS PLATAFORMA
// Tres tarjetas cuadradas para ingresar a cada modulo independiente.
// =============================================================================

export default function SelectorModulosPlataforma({
  usuario,
  onSeleccionarModulo,
  onCerrarSesion,
}) {
  const manejarSeleccion = (modulo) => {
    if (!modulo.disponible) return
    onSeleccionarModulo(modulo.id)
  }

  return (
    <div className="plataforma-page">
      <div className="plataforma-shell">
        <header className="plataforma-header">
          <div className="plataforma-brand">
            <img src={LOGO_PLATAFORMA_INH} alt="INH Constructores" />
            <div>
              <h1>INH Constructores</h1>
              <p>Seleccione el módulo con el que desea trabajar</p>
            </div>
          </div>

          {usuario && (
            <div className="plataforma-session">
              <div className="plataforma-session-user">
                <strong>{usuario.nombre}</strong>
                <small>{usuario.rol}</small>
              </div>
              <button type="button" className="btn-secondary" onClick={onCerrarSesion}>
                Cerrar sesión
              </button>
            </div>
          )}
        </header>

        <div className="plataforma-modulos-grid">
          {LISTA_MODULOS_PLATAFORMA.map((modulo) => {
            const esInmobiliaria = modulo.id === MODULOS_PLATAFORMA.inmobiliaria
            const claseTarjeta = [
              'plataforma-modulo-card',
              esInmobiliaria ? 'plataforma-modulo-card--inmobiliaria' : '',
              modulo.id === MODULOS_PLATAFORMA.prestamos
                ? 'plataforma-modulo-card--prestamos'
                : '',
              modulo.id === MODULOS_PLATAFORMA.obras ? 'plataforma-modulo-card--obras' : '',
              !modulo.disponible ? 'plataforma-modulo-card--proximamente' : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <button
                key={modulo.id}
                type="button"
                className={claseTarjeta}
                onClick={() => manejarSeleccion(modulo)}
                disabled={!modulo.disponible}
                aria-label={`Ingresar a ${modulo.titulo}`}
              >
                <span className="plataforma-modulo-icono" aria-hidden="true">
                  {modulo.icono}
                </span>
                <span className="plataforma-modulo-titulo">{modulo.titulo}</span>
                <span className="plataforma-modulo-subtitulo">{modulo.subtitulo}</span>
                {!modulo.disponible && (
                  <span className="plataforma-modulo-badge">Próximamente</span>
                )}
              </button>
            )
          })}
        </div>

        <p className="plataforma-nota">
          Cada módulo es independiente. Puede cambiar de área en cualquier momento desde el
          menú del módulo activo.
        </p>
      </div>
    </div>
  )
}

export { DEFINICIONES_MODULOS, MODULOS_PLATAFORMA }
