@echo off
title Festival Hari Museum - Kiosk Launcher
color 0A

echo.
echo  ===================================================
echo   Festival Hari Museum Antarabangsa - Kiosk Launch
echo  ===================================================
echo.

:: Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    python3 --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo  ERROR: Python not found. Please install Python from python.org
        pause
        exit /b 1
    )
    set PYTHON=python3
) else (
    set PYTHON=python
)

:: Get the directory where this batch file lives
set ROOT=%~dp0

:: Kill any existing server on port 8765
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8765 " 2^>nul') do (
    taskkill /f /pid %%a >nul 2>&1
)

echo  Starting local server on http://localhost:8765
echo  Press Ctrl+C in this window to stop the server.
echo.

:: Start Python HTTP server in background
start "MHIT HTTP Server" /min cmd /c "%PYTHON% -m http.server 8765 --directory "%ROOT%" 2>&1"

:: Wait a moment for server to start
timeout /t 2 /nobreak >nul

:: Open project-02 in Chrome kiosk mode
:: Try common Chrome install locations
set CHROME=""
if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" set CHROME="C:\Program Files\Google\Chrome\Application\chrome.exe"
if exist "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" set CHROME="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
if exist "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe" set CHROME="%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"

if %CHROME%=="" (
    echo  Chrome not found. Opening in default browser...
    start http://localhost:8765/project-02-qr-payment/
) else (
    echo  Opening project-02 in Chrome kiosk mode...
    start "" %CHROME% --kiosk --app=http://localhost:8765/project-02-qr-payment/ --disable-features=TranslateUI --no-first-run --disable-pinch
)

echo.
echo  Server running. Close this window to stop everything.
echo.
pause >nul
