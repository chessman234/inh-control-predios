@echo off
chcp 65001 >nul
title INH - API produccion (no cerrar)
cd /d "%~dp0\.."

where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js no esta instalado. Instale desde https://nodejs.org
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Instalando dependencias...
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install fallo.
    pause
    exit /b 1
  )
)

if not exist ".env" (
  if exist ".env.local" (
    echo Usando .env.local como configuracion...
  ) else (
    echo [ERROR] Cree .env con DB_SERVER, DB_USER, DB_PASSWORD y CORS_ORIGIN.
    echo Vea docs/conectar-nube-sql.md
    pause
    exit /b 1
  )
)

echo.
echo  API INH Control de Predios - produccion
echo  =======================================
echo  Puerto: %PORT%
echo  Health: http://localhost:3001/api/health
echo.
echo  NO cierre esta ventana mientras la nube use la API.
echo  Para detener: Ctrl+C
echo.

node server/index.js

if errorlevel 1 (
  echo.
  echo [ERROR] La API no pudo iniciar. Revise .env y conexion SQL.
  pause
)
