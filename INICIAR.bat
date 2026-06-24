@echo off
chcp 65001 >nul
title INH Control de Predios
cd /d "%~dp0"

echo.
echo  ============================================
echo   INH Control de Predios - Iniciar sistema
echo  ============================================
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js no esta instalado.
  echo Descarguelo desde https://nodejs.org e intente de nuevo.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Instalando dependencias por primera vez...
  call npm install
  if errorlevel 1 (
    echo [ERROR] No se pudieron instalar las dependencias.
    pause
    exit /b 1
  )
)

echo.
echo IMPORTANTE:
echo - La URL correcta es:  http://localhost:5173/
echo   (escriba "localhost", no "localhome")
echo - No abra index.html desde el explorador de archivos
echo - Deje abierta la ventana del servidor mientras usa el programa
echo.
echo Usuarios de prueba: admin / 1234
echo.

echo Iniciando servidor local...
echo.

start "INH - Servidor (no cerrar)" cmd /k "cd /d "%~dp0" && npm run dev"

echo Esperando a que el servidor arranque...
timeout /t 4 /nobreak >nul

echo Abriendo navegador en http://localhost:5173/
start "" http://localhost:5173/

echo.
echo Listo. Si la pagina no carga:
echo   1. Espere unos segundos y actualice F5
echo   2. Revise la ventana "INH - Servidor" — debe decir Local: http://localhost:5173/
echo   3. Si el puerto cambio (5174, 5175...), use esa URL que muestre Vite
echo.
echo Puede cerrar ESTA ventana. NO cierre "INH - Servidor".
echo.
pause
