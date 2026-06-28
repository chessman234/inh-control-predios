# Guía: base de datos para pruebas

La aplicación puede guardar datos en **SQL Server** mediante la API (`server/`).  
En el navegador (GitHub Pages) sigue usando almacenamiento local; con la API activada, todo queda en la base.

---

## Opción A — SQL Server en Docker (recomendada en tu PC)

### Requisitos
1. Instalar [Docker Desktop](https://www.docker.com/products/docker-desktop/) y reiniciar el PC.
2. Tener Node.js instalado.

### Pasos

```powershell
cd "C:\Users\chess\OneDrive\Escritorio\inh-control-predios"

# Configuración local (solo la primera vez)
Copy-Item .env.local.example .env.local

# Levantar SQL Server
npm run db:up

# Esperar y crear base + tabla + usuarios de prueba
npm run db:setup
```

**Terminal 1 — API:**
```powershell
npm run dev:api
```

**Terminal 2 — Frontend:**
```powershell
npm run dev
```

Abra **http://localhost:5173/** e ingrese con:
- `admin` / `1234`
- `operador` / `1234`
- `consulta` / `1234`

### Detener la base
```powershell
npm run db:down
```

---

## Opción B — SQL Server remoto (168.197.69.84)

Si ya tienen SQL Server en el hosting:

1. Abrir **SSMS** y conectarse a `168.197.69.84,3002`.
2. Ejecutar el script: `database/instalar-inh-control-predios.sql`
3. Crear `.env.local` con sus credenciales:

```env
VITE_USE_API=true
VITE_API_URL=http://localhost:3001

PORT=3001
JWT_SECRET=su-secreto-seguro
CORS_ORIGIN=http://localhost:5173

DB_SERVER=168.197.69.84
DB_PORT=3002
DB_NAME=InhControlPredios
DB_USER=su_usuario
DB_PASSWORD=su_clave
DB_ENCRYPT=true
DB_TRUST_CERT=true
```

4. Probar conexión:
```powershell
npm run db:test
```

5. Iniciar API y frontend (igual que en la opción A).

> La API puede crearse sola la tabla `DatosApp` si la base ya existe; el script SQL es la forma más segura en producción.

---

## Estructura de la base

| Elemento | Descripción |
|----------|-------------|
| Base | `InhControlPredios` |
| Tabla | `dbo.DatosApp` (una fila, JSON con toda la app) |
| Usuarios iniciales | admin, operador, consulta (clave `1234`) |

---

## Comandos útiles

| Comando | Qué hace |
|---------|----------|
| `npm run db:up` | Inicia SQL Server en Docker |
| `npm run db:wait` | Espera a que SQL Server responda |
| `npm run db:test` | Verifica conexión y muestra tamaño del JSON |
| `npm run db:setup` | Espera + inicializa base |
| `npm run dev:api` | API en http://localhost:3001 |
| `npm run dev` | Frontend en http://localhost:5173 |

---

## GitHub Pages y la nube

El workflow `.github/workflows/deploy-pages.yml` compila GitHub Pages con:

- `VITE_USE_API=true`
- `VITE_API_URL` = secret de GitHub **`VITE_API_URL`**

Pasos completos: **`docs/conectar-nube-sql.md`**

Resumen:

1. Publicar la API (`npm run dev:api` o `scripts/iniciar-api-produccion.bat`) en un servidor con acceso a SQL.
2. Exponer la API con **HTTPS** (obligatorio: GitHub Pages es HTTPS).
3. En GitHub → **Settings → Secrets → Actions** → crear `VITE_API_URL` con la URL pública de la API.
4. Push a `main` o ejecutar el workflow manualmente.
