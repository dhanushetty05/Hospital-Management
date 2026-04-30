@echo off
echo ========================================
echo   Starting MediCare Application
echo ========================================
echo.

echo [1/3] Starting MongoDB...
start "MongoDB" cmd /k "mongod"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Backend Server...
start "Backend" cmd /k "cd backend && npm run dev"
timeout /t 5 /nobreak >nul

echo [3/3] Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   All services started!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window...
pause >nul
