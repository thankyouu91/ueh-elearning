@echo off
chcp 65001 > nul
title UEH Learning Demo
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo =========================================================
  echo  Chưa cài Node.js nên không chạy được demo.
  echo  Tải bản LTS tại https://nodejs.org , cài xong mở lại file này.
  echo =========================================================
  start https://nodejs.org
  pause
  exit /b 1
)
echo =========================================================
echo  Đang khởi động UEH Learning...
echo =========================================================
node server.js
pause
