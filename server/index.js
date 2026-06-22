// =============================================================================
// API - IMPORTS Y CONFIGURACION
// Express, CORS, variables de entorno y puerto.
// =============================================================================

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool, initDb } from './db.js'
import authRoutes from './routes/auth.js'
import datosRoutes from './routes/datos.js'

dotenv.config({ path: '.env.local' })
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : true

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
)
app.use(express.json({ limit: '50mb' }))

// =============================================================================
// API - HEALTH CHECK
// Verifica conexion a SQL Server.
// =============================================================================

app.get('/api/health', async (_req, res) => {
// =============================================================================
// API - INICIO DEL SERVIDOR
// Inicializa base de datos y escucha peticiones.
// =============================================================================

  try {
    await pool.query('SELECT 1')
    res.json({ ok: true, servicio: 'inh-control-predios-api' })
  } catch (error) {
    console.error('Health check falló:', error)
    res.status(503).json({ ok: false, error: 'Base de datos no disponible' })
  }
})

// =============================================================================
// API - RUTAS DE AUTENTICACION
// Montaje del router de login.
// =============================================================================

app.use('/api/auth', authRoutes)
app.use('/api/datos', datosRoutes)

try {
  await initDb()
  app.listen(PORT, () => {
    console.log(`API INH Control Predios: http://localhost:${PORT}`)
  })
} catch (error) {
  console.error('No se pudo iniciar el servidor:', error)
  process.exit(1)
}
