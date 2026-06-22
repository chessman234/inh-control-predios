// =============================================================================
// RUTAS AUTH - IMPORTS
// Router Express y dependencias de login.
// =============================================================================

import { Router } from 'express'
import { signToken } from '../auth.js'
import { buscarUsuarioLogin, obtenerDatosCompletos } from '../db.js'

const router = Router()

// =============================================================================
// RUTAS AUTH - LOGIN
// Autentica usuario y devuelve token con datos.
// =============================================================================

router.post('/login', async (req, res) => {
  try {
    const { usuario, clave } = req.body || {}
    const usuarioEncontrado = await buscarUsuarioLogin(usuario, clave)

    if (!usuarioEncontrado) {
      return res.status(401).json({ error: 'ID de usuario o clave incorrectos.' })
    }

    const token = signToken(usuarioEncontrado)
    const datos = await obtenerDatosCompletos()

    res.json({
      token,
      usuario: usuarioEncontrado,
      datos,
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ error: 'No se pudo iniciar sesión' })
  }
})

export default router
