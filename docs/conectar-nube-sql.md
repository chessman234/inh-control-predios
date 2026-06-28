# Conectar GitHub Pages (nube) a SQL Server

La pagina en **https://chessman234.github.io/inh-control-predios/** necesita dos piezas:

| Pieza | Donde corre | Funcion |
|-------|-------------|---------|
| Frontend | GitHub Pages | Pantalla web |
| API (`server/`) | Servidor con acceso a SQL | Lee y guarda datos en `dbo.DatosApp` |

GitHub Pages **no** puede hablar directo con SQL Server. Siempre pasa por la API.

---

## Parte A — Publicar la API en el servidor (168.197.69.84)

Haga esto **una sola vez** en el servidor donde esta SQL Server (RDP o acceso remoto).

### 1. Instalar Node.js

Descargue e instale LTS desde https://nodejs.org

### 2. Clonar el proyecto

```cmd
cd C:\
git clone https://github.com/chessman234/inh-control-predios.git
cd inh-control-predios
npm install
```

### 3. Crear archivo `.env` en la raiz del proyecto

```env
PORT=3001
JWT_SECRET=cambie-por-un-secreto-largo-y-unico
CORS_ORIGIN=https://chessman234.github.io,http://localhost:5173

DB_SERVER=168.197.69.84
DB_PORT=3002
DB_NAME=Inh_Inmobiliaria
DB_USER=Chessman
DB_PASSWORD=SU_CLAVE_SQL
DB_ENCRYPT=true
DB_TRUST_CERT=true
```

### 4. Probar la API

```cmd
npm run dev:api
```

En el navegador del servidor abra:

```
http://localhost:3001/api/health
```

Debe responder: `{"ok":true,"servicio":"inh-control-predios-api"}`

### 5. Dejar la API siempre encendida

Use el script incluido:

```cmd
scripts\iniciar-api-produccion.bat
```

O configure un **servicio de Windows** / **pm2** para que reinicie sola.

### 6. Exponer la API en internet con HTTPS

GitHub Pages usa **HTTPS**. La API tambien debe ser **HTTPS** (no `http://`).

Opciones:

- Subdominio con certificado SSL, por ejemplo: `https://api.inhconstructores.com`
- IIS o nginx en el servidor `168.197.69.84` como proxy inverso al puerto 3001
- Cloudflare Tunnel (si no tienen certificado propio)

Abra el firewall para el puerto publico de la API (443 o el que use el proxy).

Pruebe desde cualquier PC:

```
https://SU-URL-API/api/health
```

---

## Parte B — Configurar GitHub (secret)

1. Entre a https://github.com/chessman234/inh-control-predios
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**
4. Nombre: `VITE_API_URL`
5. Valor: URL **HTTPS** de su API, **sin** barra final. Ejemplo:

```
https://api.inhconstructores.com
```

6. Guarde.

Cada push a `main` recompila GitHub Pages con esa URL y `VITE_USE_API=true`.

Tambien puede relanzar manualmente: **Actions** → **Despliegue provisional (GitHub Pages)** → **Run workflow**.

---

## Parte C — Probar la nube

1. Abra https://chessman234.github.io/inh-control-predios/
2. Login: `admin` / `1234`
3. Si entra sin error rojo, la nube ya usa SQL Server.
4. Cree un cambio de prueba y verifique en SSMS:

```sql
USE Inh_Inmobiliaria;
SELECT Id, ActualizadoEn, LEN(DatosJson) AS TamanoJson
FROM dbo.DatosApp
WHERE Id = 1;
```

---

## Errores frecuentes

| Sintoma | Causa | Solucion |
|---------|-------|----------|
| "No se pudo conectar al servidor" | API apagada o URL mal en GitHub | Revise secret `VITE_API_URL` y que la API responda `/api/health` |
| Error en consola del navegador (mixed content) | API en `http://` | Use HTTPS en la API |
| Login falla con credenciales correctas | CORS | `CORS_ORIGIN` debe incluir `https://chessman234.github.io` |
| Datos no aparecen en SSMS | Base distinta | Revise `DB_NAME` en `.env` del servidor |

---

## Resumen

1. API en servidor + `.env` apuntando a `Inh_Inmobiliaria`
2. HTTPS publico para la API
3. Secret `VITE_API_URL` en GitHub
4. Push a `main` o ejecutar workflow manual
