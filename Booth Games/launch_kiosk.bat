@echo off
echo BNM Museum Booth Launcher
echo.
echo Select project to launch:
echo.
echo  1. P01 - project-01-scam-game
echo  2. P01b - project-01b-scam-game
echo  3. P02 - project-02-qr-payment
echo  4. P03 - project-03-mhit-planner
echo  5. P04 - project-04-islamic-finance
echo  6. P05 - project-05-ar-puzzle
echo  7. P06 - project-06-savings-viz
echo  8. P07 - project-07-interactive-map
echo  9. P08 - project-08-intro
echo  10. P08b - project-08b-intro
echo.
set /p choice=Enter number: 
if "%choice%"=="1" start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --disable-pinch --overscroll-history-navigation=0 --disable-features=TranslateUI --noerrdialogs --disable-infobars "file:///F:/Projects/External/Festival%%20Hari%%20Museum%%20Antarabangsa/Booth%%20Games/P01/index.html"
if "%choice%"=="2" start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --disable-pinch --overscroll-history-navigation=0 --disable-features=TranslateUI --noerrdialogs --disable-infobars "file:///F:/Projects/External/Festival%%20Hari%%20Museum%%20Antarabangsa/Booth%%20Games/P01b/index.html"
if "%choice%"=="3" start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --disable-pinch --overscroll-history-navigation=0 --disable-features=TranslateUI --noerrdialogs --disable-infobars "file:///F:/Projects/External/Festival%%20Hari%%20Museum%%20Antarabangsa/Booth%%20Games/P02/index.html"
if "%choice%"=="4" start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --disable-pinch --overscroll-history-navigation=0 --disable-features=TranslateUI --noerrdialogs --disable-infobars "file:///F:/Projects/External/Festival%%20Hari%%20Museum%%20Antarabangsa/Booth%%20Games/P03/index.html"
if "%choice%"=="5" start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --disable-pinch --overscroll-history-navigation=0 --disable-features=TranslateUI --noerrdialogs --disable-infobars "file:///F:/Projects/External/Festival%%20Hari%%20Museum%%20Antarabangsa/Booth%%20Games/P04/index.html"
if "%choice%"=="6" start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --disable-pinch --overscroll-history-navigation=0 --disable-features=TranslateUI --noerrdialogs --disable-infobars "file:///F:/Projects/External/Festival%%20Hari%%20Museum%%20Antarabangsa/Booth%%20Games/P05/index.html"
if "%choice%"=="7" start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --disable-pinch --overscroll-history-navigation=0 --disable-features=TranslateUI --noerrdialogs --disable-infobars "file:///F:/Projects/External/Festival%%20Hari%%20Museum%%20Antarabangsa/Booth%%20Games/P06/index.html"
if "%choice%"=="8" start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --disable-pinch --overscroll-history-navigation=0 --disable-features=TranslateUI --noerrdialogs --disable-infobars "file:///F:/Projects/External/Festival%%20Hari%%20Museum%%20Antarabangsa/Booth%%20Games/P07/index.html"
if "%choice%"=="9" start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --disable-pinch --overscroll-history-navigation=0 --disable-features=TranslateUI --noerrdialogs --disable-infobars "file:///F:/Projects/External/Festival%%20Hari%%20Museum%%20Antarabangsa/Booth%%20Games/P08/index.html"
if "%choice%"=="10" start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --disable-pinch --overscroll-history-navigation=0 --disable-features=TranslateUI --noerrdialogs --disable-infobars "file:///F:/Projects/External/Festival%%20Hari%%20Museum%%20Antarabangsa/Booth%%20Games/P08b/index.html"
pause