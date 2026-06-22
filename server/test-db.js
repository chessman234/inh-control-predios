// =============================================================================
// TEST-DB - IMPORTS
// Script de prueba de conexion a SQL Server.
// =============================================================================

import dotenv from 'dotenv'
import { getPool, initDb } from './db.js'

dotenv.config({ path: '.env.local' })
dotenv.config()

// =============================================================================
// TEST-DB - VERIFICACION
// Inicializa DB y consulta tabla DatosApp.
// =============================================================================

try {
  await initDb()
  const pool = await getPool()
  const result = await pool.request().query(`
    SELECT
      DB_NAME() AS baseDatos,
      Id,
      ActualizadoEn,
      LEN(DatosJson) AS tamanoJson
    FROM dbo.DatosApp
    WHERE Id = 1
  `)

  console.log('Conexión OK a SQL Server')
  console.log(result.recordset[0])
  process.exit(0)
} catch (error) {
  console.error('No se pudo conectar a SQL Server:')
  console.error(error.message)
  process.exit(1)
}
