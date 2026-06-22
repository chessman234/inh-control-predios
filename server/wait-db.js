// =============================================================================
// WAIT-DB - IMPORTS Y CONFIG
// Espera a que SQL Server este listo en Docker.
// =============================================================================

import dotenv from 'dotenv'
import sql from 'mssql'

dotenv.config({ path: '.env.local' })
dotenv.config()

const intentosMaximos = Number(process.env.DB_WAIT_ATTEMPTS || 30)
const esperaMs = Number(process.env.DB_WAIT_MS || 2000)

function buildConfig() {
  if (process.env.DB_CONNECTION_STRING) {
    return process.env.DB_CONNECTION_STRING
  }

  return {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_SERVER || 'localhost',
    database: 'master',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    options: {
      encrypt: process.env.DB_ENCRYPT === 'true',
      trustServerCertificate: process.env.DB_TRUST_CERT !== 'false',
    },
  }
}

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// =============================================================================
// WAIT-DB - BUCLE DE REINTENTOS
// Reintenta conexion hasta agotar intentos.
// =============================================================================

for (let intento = 1; intento <= intentosMaximos; intento += 1) {
  try {
    const conexion = await sql.connect(buildConfig())
    await conexion.request().query('SELECT 1 AS ok')
    await conexion.close()
    console.log(`SQL Server listo (intento ${intento}/${intentosMaximos})`)
    process.exit(0)
  } catch (error) {
    console.log(
      `Esperando SQL Server... (${intento}/${intentosMaximos}) ${error.message || error}`
    )
    await esperar(esperaMs)
  }
}

console.error('SQL Server no respondió a tiempo. Verifique Docker con: npm run db:up')
process.exit(1)
