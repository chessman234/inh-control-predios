@echo off
chcp 65001 >nul
title INH - Servidor (no cerrar)
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

echo.
echo  Servidor INH Control de Predios
echo  ================================
echo  URL: http://localhost:5173/
echo  Login: admin / 1234
echo.
echo  NO cierre esta ventana mientras usa el programa.
echo  Para detener: Ctrl+C
echo.

set VITE_USE_API=false
set VITE_API_URL=

call npm run dev:simple

if errorlevel 1 (
  echo.
  echo [ERROR] No se pudo iniciar Vite.
  pause
)
