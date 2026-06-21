const TOKEN_KEY = 'inh-api-token'
const USER_KEY = 'inh-api-user'

export function usaApiRemota() {
  return (
    import.meta.env.VITE_USE_API === 'true' ||
    Boolean(import.meta.env.VITE_API_URL)
  )
}

function getApiBase() {
  return (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
}

export function apiUrl(path) {
  const base = getApiBase()
  return base ? `${base}${path}` : path
}

export function getTokenSesion() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setTokenSesion(token) {
  if (token) sessionStorage.setItem(TOKEN_KEY, token)
  else sessionStorage.removeItem(TOKEN_KEY)
}

export function setSesionApi(token, usuario) {
  setTokenSesion(token)
  if (usuario) sessionStorage.setItem(USER_KEY, JSON.stringify(usuario))
  else sessionStorage.removeItem(USER_KEY)
}

export function getUsuarioSesion() {
  const raw = sessionStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function limpiarTokenSesion() {
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(USER_KEY)
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  const token = getTokenSesion()
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(apiUrl(path), { ...options, headers })
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || `Error ${response.status}`)
  }

  return data
}

export async function loginApi(usuario, clave) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ usuario, clave }),
  })
}

export async function cargarDatosApi() {
  const result = await request('/api/datos')
  return result.datos
}

let saveTimer = null
let savePending = null

export function programarGuardadoDatosApi(datos) {
  savePending = datos
  clearTimeout(saveTimer)
  saveTimer = setTimeout(async () => {
    const payload = savePending
    savePending = null
    if (!payload) return

    try {
      await request('/api/datos', {
        method: 'PUT',
        body: JSON.stringify({ datos: payload }),
      })
    } catch (error) {
      console.error('Error al guardar en el servidor:', error)
    }
  }, 1500)
}

export async function verificarSaludApi() {
  if (!usaApiRemota()) return true

  try {
    await request('/api/health')
    return true
  } catch {
    return false
  }
}
