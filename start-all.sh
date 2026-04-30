#!/bin/bash

echo "========================================"
echo "  Starting MediCare Application"
echo "========================================"
echo ""

echo "[1/3] Starting MongoDB..."
mongod &
sleep 3

echo "[2/3] Starting Backend Server..."
cd backend && npm run dev &
sleep 5

echo "[3/3] Starting Frontend..."
cd ../frontend && npm run dev &

echo ""
echo "========================================"
echo "  All services started!"
echo "========================================"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop all services"

wait
