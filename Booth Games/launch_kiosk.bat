@echo off
set "ROOT=%~dp0"

:: Auto-detect Chrome from common install locations
set "CHROME="
for %%G in (
  "C:\Program Files\Google\Chrome\Application\chrome.exe"
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
  "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
) do ( if not defined CHROME if exist %%G set "CHROME=%%~G" )
if not defined CHROME (
  echo Chrome not found. Please install Google Chrome.
  pause
  exit /b
)

echo BNM Museum Booth Launcher
echo.
echo Select project to launch:
echo.
echo  1. P01  - project-01-scam-game
echo  2. P01b - project-01b-scam-game
echo  3. P02  - project-02-qr-payment
echo  4. P03  - project-03-mhit-planner
echo  5. P04  - project-04-islamic-finance
echo  6. P05  - project-05-ar-puzzle
echo  7. P06  - project-06-savings-viz
echo  8. P07  - project-07-interactive-map
echo  9. P08  - project-08-intro
echo  10. P08b - project-08b-intro
echo.
set /p choice=Enter number:

set "FLAGS=--kiosk --disable-pinch --overscroll-history-navigation=0 --disable-features=TranslateUI --noerrdialogs --disable-infobars --allow-file-access-from-files"

if "%choice%"=="1"  start "" "%CHROME%" %FLAGS% "%ROOT%P01\index.html"
if "%choice%"=="2"  start "" "%CHROME%" %FLAGS% "%ROOT%P01b\index.html"
if "%choice%"=="3"  start "" "%CHROME%" %FLAGS% "%ROOT%P02\index.html"
if "%choice%"=="4"  start "" "%CHROME%" %FLAGS% "%ROOT%P03\index.html"
if "%choice%"=="5"  start "" "%CHROME%" %FLAGS% "%ROOT%P04\index.html"
if "%choice%"=="6"  start "" "%CHROME%" %FLAGS% "%ROOT%P05\index.html"
if "%choice%"=="7"  start "" "%CHROME%" %FLAGS% "%ROOT%P06\index.html"
if "%choice%"=="8"  start "" "%CHROME%" %FLAGS% "%ROOT%P07\index.html"
if "%choice%"=="9"  start "" "%CHROME%" %FLAGS% "%ROOT%P08\index.html"
if "%choice%"=="10" start "" "%CHROME%" %FLAGS% "%ROOT%P08b\index.html"
pause
