@echo off
set "ROOT=%~dp0"
set "CHROME="
for %%G in (
  "C:\Program Files\Google\Chrome\Application\chrome.exe"
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
  "%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
) do ( if not defined CHROME if exist %%G set "CHROME=%%~G" )
if not defined CHROME ( echo Chrome not found. Please install Google Chrome. & pause & exit /b )
start "" "%CHROME%" --kiosk --disable-pinch --overscroll-history-navigation=0 --disable-features=TranslateUI --noerrdialogs --disable-infobars --allow-file-access-from-files "%ROOT%P01b\index.html"
