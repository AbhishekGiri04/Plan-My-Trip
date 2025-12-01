#!/bin/bash

# EduTrip AI - Development Startup Script
echo "Starting EduTrip AI - Smart Budget Travel Planner for Students"
echo "=============================================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Function to kill processes on port
kill_port() {
    local port=$1
    local pids=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pids" ]; then
        echo "Killing processes on port $port..."
        echo $pids | xargs kill -9 2>/dev/null
        sleep 1
    fi
}

# Kill any existing processes on required ports
echo "Cleaning up ports..."
kill_port 8000
kill_port 3000
echo "Ports cleaned up successfully!"

# Create logs directory
mkdir -p logs

# Start Backend
echo "Starting Backend Server (FastAPI)..."
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Skip dependency installation - assume already installed
echo "Skipping dependency installation..."

# Check if .env file exists
if [ ! -f "../.env" ]; then
    echo "WARNING: .env file not found. Creating from template..."
    cp ../.env.example ../.env
    echo "Please edit .env file with your API keys before running the application."
fi

# Start backend server in background
echo "Starting FastAPI server on http://localhost:8000"
uvicorn app:app --host 0.0.0.0 --port 8000 --reload > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait for backend to start with faster check
echo "Waiting for backend to start..."
for i in {1..10}; do
    if curl -s http://localhost:8000/health > /dev/null 2>&1; then
        break
    fi
    sleep 1
done

# Final check if backend is running
if ! curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo "ERROR: Backend failed to start. Check logs/backend.log for details."
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo "Backend started successfully!"

# Start Frontend
echo "Starting Frontend Server (React)..."
cd ../frontend

# Skip dependency installation - assume already installed
echo "Skipping frontend dependency installation..."

# Check if .env.local exists for frontend
if [ ! -f ".env.local" ]; then
    echo "REACT_APP_API_URL=http://localhost:8000/api/v1" > .env.local
fi

# Start frontend server in background
echo "Starting React development server on http://localhost:3000"
npm start > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

# Wait for frontend to start
echo "Waiting for frontend to start..."
sleep 5

echo ""
# Check if processes are still running
if ! kill -0 $BACKEND_PID 2>/dev/null || ! kill -0 $FRONTEND_PID 2>/dev/null; then
    echo "ERROR: One or more servers failed to start properly. Check logs for details."
    cleanup
    exit 1
fi

echo "EduTrip AI is now running!"
echo "==========================="
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:8000"
echo "API Docs: http://localhost:8000/docs"
echo "Health Check: http://localhost:8000/health"
echo ""
echo "Logs:"
echo "   Backend: logs/backend.log"
echo "   Frontend: logs/frontend.log"
echo ""
echo "To stop the servers:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo "   or press Ctrl+C and run: pkill -f 'uvicorn\\|npm'"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "Servers stopped successfully!"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Keep script running and show logs
echo "Showing live logs (Ctrl+C to stop):"
echo "===================================="

# Show logs from both servers
tail -f logs/backend.log logs/frontend.log