// =============================================================================
// ALMACENAMIENTO LOCAL - CONFIGURACION
// Clave y nombre de la base IndexedDB.
// =============================================================================

export const STORAGE_KEY = 'inh-control-predios-v1'

const DB_NAME = 'inh-control-predios-db'
const DB_VERSION = 1
const STORE_NAME = 'datos'

let guardadoPendiente = null
let temporizadorGuardado = null

// =============================================================================
// INDEXEDDB - CONEXION
// Abre la base de datos del navegador.
// =============================================================================

function abrirBaseDatos() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB no disponible'))
      return
    }

    const solicitud = indexedDB.open(DB_NAME, DB_VERSION)
    solicitud.onerror = () =>
      reject(solicitud.error || new Error('No se pudo abrir el almacenamiento local'))
    solicitud.onsuccess = () => resolve(solicitud.result)
    solicitud.onupgradeneeded = (evento) => {
      const db = evento.target.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
  })
}

function leerIndexedDB() {
  return abrirBaseDatos().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaccion = db.transaction(STORE_NAME, 'readonly')
        const almacen = transaccion.objectStore(STORE_NAME)
        const solicitud = almacen.get(STORAGE_KEY)

        solicitud.onsuccess = () => resolve(solicitud.result ?? null)
        solicitud.onerror = () => reject(solicitud.error)
        transaccion.oncomplete = () => db.close()
        transaccion.onerror = () => {
          db.close()
          reject(transaccion.error)
        }
      })
  )
}

function escribirIndexedDB(datos) {
  return abrirBaseDatos().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaccion = db.transaction(STORE_NAME, 'readwrite')
        const almacen = transaccion.objectStore(STORE_NAME)
        const solicitud = almacen.put(datos, STORAGE_KEY)

        solicitud.onsuccess = () => resolve()
        solicitud.onerror = () => reject(solicitud.error)
        transaccion.oncomplete = () => db.close()
        transaccion.onerror = () => {
          db.close()
          reject(transaccion.error)
        }
      })
  )
}

function leerLocalStorage() {
  const datosGuardados = localStorage.getItem(STORAGE_KEY)
  if (!datosGuardados) return null

  try {
    return JSON.parse(datosGuardados)
  } catch (error) {
    console.warn('Datos locales corruptos, se descartan:', error)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignorar si el navegador bloquea el borrado.
    }
    return null
  }
}

function escribirLocalStorage(datos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(datos))
}

function marcarMigracionLocalStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.setItem(`${STORAGE_KEY}-almacen`, 'indexeddb')
  } catch {
    // Si no cabe ni el marcador, no bloquea el flujo principal.
  }
}

// =============================================================================
// CARGAR DATOS LOCALES
// Lee datos desde IndexedDB o migra desde localStorage.
// =============================================================================

export async function cargarDatosLocales() {
  try {
    const datosIndexedDB = await leerIndexedDB()
    if (datosIndexedDB) return datosIndexedDB
  } catch (error) {
    console.warn('No se pudo leer IndexedDB, se intentará localStorage:', error)
  }

  try {
    const datosLocalStorage = leerLocalStorage()
    if (!datosLocalStorage) return null

    try {
      await escribirIndexedDB(datosLocalStorage)
      marcarMigracionLocalStorage()
    } catch (error) {
      console.warn('No se pudo migrar a IndexedDB:', error)
    }

    return datosLocalStorage
  } catch (error) {
    console.error('Error al leer localStorage:', error)
    throw error
  }
}

// =============================================================================
// GUARDAR DATOS LOCALES
// Persiste datos con debounce y manejo de cuota.
// =============================================================================

async function ejecutarGuardado(datos) {
  try {
    await escribirIndexedDB(datos)
    marcarMigracionLocalStorage()
    return { ok: true, almacen: 'indexeddb' }
  } catch (errorIndexedDB) {
    console.warn('IndexedDB falló, se intentará localStorage:', errorIndexedDB)
  }

  try {
    escribirLocalStorage(datos)
    return { ok: true, almacen: 'localstorage' }
  } catch (errorLocal) {
    const mensajeCuota =
      errorLocal?.name === 'QuotaExceededError' ||
      /quota/i.test(String(errorLocal?.message || errorLocal))

    return {
      ok: false,
      error: errorLocal,
      mensaje: mensajeCuota
        ? 'El navegador se quedó sin espacio para guardar todos los datos (documentos adjuntos, historial, etc.). ' +
          'Vaya a Reportes y respaldos, descargue un respaldo y elimine archivos muy pesados. ' +
          'Luego recargue la página.'
        : 'No se pudieron guardar los datos en este navegador. Descargue un respaldo y recargue la página.',
    }
  }
}

export function guardarDatosLocales(datos, opciones = {}) {
  const { inmediato = false } = opciones

  if (inmediato) {
    return ejecutarGuardado(datos)
  }

  guardadoPendiente = datos
  clearTimeout(temporizadorGuardado)

  return new Promise((resolve) => {
    temporizadorGuardado = setTimeout(async () => {
      const datosAGuardar = guardadoPendiente
      guardadoPendiente = null
      resolve(await ejecutarGuardado(datosAGuardar))
    }, 400)
  })
}

// =============================================================================
// CANCELAR GUARDADO PENDIENTE
// Limpia temporizador de guardado diferido.
// =============================================================================

export function cancelarGuardadoDatosLocalesPendiente() {
  clearTimeout(temporizadorGuardado)
  guardadoPendiente = null
}
