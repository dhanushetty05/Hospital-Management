@echo off
echo ========================================
echo   RESTARTING FRONTEND WITH STYLES FIX
echo ========================================
echo.
echo Cleaning cache...
if exist "node_modules\.vite" rmdir /s /q "node_modules\.vite"
echo.
echo Starting development server...
echo.
echo ========================================
echo   After server starts:
echo   1. Open http://localhost:5173
echo   2. Press Ctrl+Shift+R to hard refresh
echo ========================================
echo.
npm run dev
