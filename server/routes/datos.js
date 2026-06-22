// =============================================================================
// RUTAS DATOS - IMPORTS
// Router Express, auth y acceso a SQL.
// =============================================================================

import { Router } from 'express'
import { authMiddleware, puedeModificarDatos } from '../auth.js'
import { guardarDatosCompletos, obtenerDatosCompletos } from '../db.js'

const router = Router()

// =============================================================================
// RUTAS DATOS - OBTENER DATOS
// GET protegido del JSON completo.
// =============================================================================

router.get('/', authMiddleware, async (req, res) => {
  try {
    const datos = await obtenerDatosCompletos()
    res.json({ datos })
  } catch (error) {
    console.error('Error al cargar datos:', error)
    res.status(500).json({ error: 'No se pudieron cargar los datos' })
  }
})

// =============================================================================
// RUTAS DATOS - GUARDAR DATOS
// PUT protegido con validacion de rol.
// =============================================================================

router.put('/', authMiddleware, async (req, res) => {
  try {
    if (!puedeModificarDatos(req.user.rol)) {
      return res.status(403).json({
        error: 'Su rol solo permite consultar. No puede guardar cambios.',
      })
    }

    const { datos } = req.body || {}

    if (!datos || typeof datos !== 'object') {
      return res.status(400).json({ error: 'Datos inválidos' })
    }

    await guardarDatosCompletos(datos)
    res.json({ ok: true, actualizadoEn: new Date().toISOString() })
  } catch (error) {
    console.error('Error al guardar datos:', error)
    res.status(500).json({ error: 'No se pudieron guardar los datos' })
  }
})

export default router
