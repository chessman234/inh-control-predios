// =============================================================================
// PLATAFORMA - MODULO EN DESARROLLO
// Pantalla provisional para modulos que aun no estan implementados.
// =============================================================================

import { LOGO_PLATAFORMA_INH } from './constantesModulos.js'
import './ModuloPlataforma.css'

// =============================================================================
// COMPONENTE - MODULO EN DESARROLLO
// Placeholder con volver al selector y cierre de sesion.
// =============================================================================

export default function ModuloEnDesarrollo({
  modulo,
  usuario,
  onVolverModulos,
  onCerrarSesion,
}) {
  return (
    <div className="plataforma-page plataforma-page--modulo">
      <div className="plataforma-modulo-placeholder">
        <div className="plataforma-modulo-placeholder-brand">
          <img src={LOGO_PLATAFORMA_INH} alt="INH Constructores" />
        </div>

        <span className="plataforma-modulo-placeholder-icono" aria-hidden="true">
          {modulo?.icono || '⏳'}
        </span>

        <h1>{modulo?.titulo || 'Módulo'}</h1>
        <p className="plataforma-modulo-placeholder-lead">
          Este módulo se encuentra en preparación y estará disponible en una próxima versión de la
          plataforma.
        </p>
        <p className="plataforma-modulo-placeholder-desc">{modulo?.descripcion}</p>

        {usuario && (
          <p className="plataforma-modulo-placeholder-usuario">
            Sesión: <strong>{usuario.nombre}</strong> ({usuario.rol})
          </p>
        )}

        <div className="plataforma-modulo-placeholder-actions">
          <button type="button" className="btn-primary" onClick={onVolverModulos}>
            Volver a módulos
          </button>
          <button type="button" className="btn-secondary" onClick={onCerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}
