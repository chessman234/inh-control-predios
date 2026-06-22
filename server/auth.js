// =============================================================================
// AUTENTICACION - IMPORTS
// JWT y secreto de firma.
// =============================================================================

import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'inh-dev-secret-change-in-production'

// =============================================================================
// AUTENTICACION - FIRMAR TOKEN
// Genera JWT con id, usuario y rol.
// =============================================================================

export function signToken(user) {
  return jwt.sign(
    {
      id: user.id,
      usuario: user.usuario,
      rol: user.rol,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// =============================================================================
// AUTENTICACION - MIDDLEWARE
// Valida Bearer token en peticiones protegidas.
// =============================================================================

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado' })
  }

  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Sesión expirada o inválida' })
  }
}

// =============================================================================
// AUTENTICACION - PERMISOS DE ESCRITURA
// Roles autorizados para guardar cambios.
// =============================================================================

export function puedeModificarDatos(rol) {
  return rol === 'Administrador' || rol === 'Operador' || rol === 'Digitador'
}
