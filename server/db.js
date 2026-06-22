// =============================================================================
// BASE DE DATOS - IMPORTS
// Driver mssql y datos iniciales.
// =============================================================================

import sql from 'mssql'
import { datosInicialesDb } from './defaultData.js'

// =============================================================================
// BASE DE DATOS - CONFIGURACION
// Nombre de base y cadena de conexion.
// =============================================================================

const NOMBRE_BASE_DATOS = process.env.DB_NAME || 'InhControlPredios'

// =============================================================================
// BASE DE DATOS - CONSTRUIR CONFIG
// Variables de entorno y opciones de conexion.
// =============================================================================

function buildConfig(opciones = {}) {
  const { database } = opciones

  if (process.env.DB_CONNECTION_STRING) {
    return process.env.DB_CONNECTION_STRING
  }

  return {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_SERVER || 'localhost',
    database: database || NOMBRE_BASE_DATOS,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    options: {
      encrypt: process.env.DB_ENCRYPT === 'true',
      trustServerCertificate: process.env.DB_TRUST_CERT !== 'false',
    },
  }
}

let poolPromise = null

function reiniciarPool() {
  poolPromise = null
}

// =============================================================================
// BASE DE DATOS - POOL DE CONEXION
// Singleton del pool mssql.
// =============================================================================

export async function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(buildConfig())
  }
  return poolPromise
}

export const pool = {
  query: async (text) => {
    const connection = await getPool()
    return connection.request().query(text)
  },
}

function escaparIdentificadorSql(identificador) {
  return String(identificador).replace(/\]/g, ']]')
}

// =============================================================================
// BASE DE DATOS - CREAR BASE
// Crea la base si no existe en SQL Server.
// =============================================================================

async function asegurarBaseDatos() {
  const configMaster = buildConfig({ database: 'master' })
  const conexionMaster = await sql.connect(configMaster)

  try {
    const nombreSeguro = escaparIdentificadorSql(NOMBRE_BASE_DATOS)
    await conexionMaster.request().query(`
      IF NOT EXISTS (SELECT 1 FROM sys.databases WHERE name = N'${nombreSeguro.replace(/'/g, "''")}')
      BEGIN
        CREATE DATABASE [${nombreSeguro}];
      END
    `)
  } finally {
    await conexionMaster.close()
    reiniciarPool()
  }
}

// =============================================================================
// BASE DE DATOS - ESQUEMA DATOSAPP
// Tabla principal con JSON de la aplicacion.
// =============================================================================

async function asegurarTablaDatosApp() {
  const connection = await getPool()

  await connection.request().query(`
    IF NOT EXISTS (SELECT 1 FROM sys.tables WHERE name = N'DatosApp' AND schema_id = SCHEMA_ID(N'dbo'))
    BEGIN
      CREATE TABLE dbo.DatosApp (
        Id INT NOT NULL CONSTRAINT PK_DatosApp PRIMARY KEY,
        DatosJson NVARCHAR(MAX) NOT NULL,
        ActualizadoEn DATETIME2 NOT NULL CONSTRAINT DF_DatosApp_ActualizadoEn DEFAULT SYSUTCDATETIME(),
        CONSTRAINT CK_DatosApp_SingleRow CHECK (Id = 1),
        CONSTRAINT CK_DatosApp_Json CHECK (ISJSON(DatosJson) = 1)
      );
    END
  `)
}

function parseDatosJson(raw) {
  if (!raw) return null
  try {
    return typeof raw === 'string' ? JSON.parse(raw) : raw
  } catch {
    return null
  }
}

async function necesitaDatosIniciales(datosActuales) {
  if (!datosActuales || Object.keys(datosActuales).length === 0) return true
  return !Array.isArray(datosActuales.usuariosSistema)
}

// =============================================================================
// BASE DE DATOS - INICIALIZACION
// Asegura esquema y datos iniciales.
// =============================================================================

export async function initDb() {
  await asegurarBaseDatos()
  await asegurarTablaDatosApp()
  const connection = await getPool()

  const existente = await connection
    .request()
    .query('SELECT DatosJson FROM dbo.DatosApp WHERE Id = 1')

  if (existente.recordset.length === 0) {
    await connection
      .request()
      .input('datos', sql.NVarChar(sql.MAX), JSON.stringify(datosInicialesDb))
      .query('INSERT INTO dbo.DatosApp (Id, DatosJson) VALUES (1, @datos)')
    return
  }

  const datosActuales = parseDatosJson(existente.recordset[0].DatosJson)
  if (await necesitaDatosIniciales(datosActuales)) {
    await connection
      .request()
      .input('datos', sql.NVarChar(sql.MAX), JSON.stringify(datosInicialesDb))
      .query(
        'UPDATE dbo.DatosApp SET DatosJson = @datos, ActualizadoEn = SYSUTCDATETIME() WHERE Id = 1'
      )
  }
}

// =============================================================================
// BASE DE DATOS - LEER DATOS
// Obtiene el JSON completo de la aplicacion.
// =============================================================================

export async function obtenerDatosCompletos() {
  const connection = await getPool()
  const result = await connection
    .request()
    .query('SELECT DatosJson FROM dbo.DatosApp WHERE Id = 1')

  const datos = parseDatosJson(result.recordset[0]?.DatosJson)

  if (!datos || Object.keys(datos).length === 0) {
    return { ...datosInicialesDb }
  }

  if (!Array.isArray(datos.usuariosSistema) || datos.usuariosSistema.length === 0) {
    return {
      ...datos,
      usuariosSistema: datosInicialesDb.usuariosSistema,
    }
  }

  return datos
}

// =============================================================================
// BASE DE DATOS - GUARDAR DATOS
// Persiste el JSON completo en SQL Server.
// =============================================================================

export async function guardarDatosCompletos(datos) {
  const connection = await getPool()
  await connection
    .request()
    .input('datos', sql.NVarChar(sql.MAX), JSON.stringify(datos))
    .query(
      'UPDATE dbo.DatosApp SET DatosJson = @datos, ActualizadoEn = SYSUTCDATETIME() WHERE Id = 1'
    )
}

// =============================================================================
// BASE DE DATOS - LOGIN DE USUARIO
// Valida credenciales contra usuarios del JSON.
// =============================================================================

export async function buscarUsuarioLogin(usuarioIngresado, claveIngresada) {
  const datos = await obtenerDatosCompletos()
  const loginId = String(usuarioIngresado || '')
    .trim()
    .toLowerCase()
  const clave = String(claveIngresada || '').trim()

  return (datos.usuariosSistema || []).find(
    (usuario) =>
      (usuario.usuario?.toLowerCase() === loginId ||
        usuario.id?.toLowerCase() === loginId) &&
      usuario.clave === clave &&
      usuario.activo !== false
  )
}
