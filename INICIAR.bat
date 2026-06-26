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

echo Liberando puerto 5173 si quedo ocupado...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173" ^| findstr "LISTENING"') do (
  taskkill /F /PID %%a >nul 2>&1
)

echo.
echo IMPORTANTE:
echo - URL local:     http://localhost:5173/
echo - URL nube:      https://chessman234.github.io/inh-control-predios/
echo   (es "localhost", NO "localhome")
echo - No abra index.html desde archivos; use el navegador con localhost
echo - Deje abierta la ventana "INH - Servidor"
echo.
echo Usuario de prueba: admin / 1234
echo.

echo Iniciando servidor...
start "INH - Servidor (no cerrar)" "%~dp0scripts\iniciar-servidor.bat"

echo Esperando al servidor...
timeout /t 6 /nobreak >nul

echo Abriendo http://localhost:5173/
start "" http://localhost:5173/

echo.
echo Si no carga la pagina:
echo   1. Mire la ventana "INH - Servidor" — debe decir: Local: http://localhost:5173/
echo   2. Si el puerto es otro (5174...), use esa URL
echo   3. Presione F5 en el navegador
echo.
echo Puede cerrar ESTA ventana. NO cierre "INH - Servidor".
echo.
pause
