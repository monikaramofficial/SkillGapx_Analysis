#!/usr/bin/env bash

# ==============================================================================
# SkillGapX - Launch Both Backend & Frontend Simultaneously
# MCA Project: AI-Based Student Skill Verification & Placement Readiness System
# ==============================================================================

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=================================================================="
echo "  🚀 Starting SkillGapX Full Stack Platform (MCA Project)"
echo "=================================================================="

# Function to stop background processes on exit
cleanup() {
  echo ""
  echo "Stopping SkillGapX services..."
  if [ -n "$BACKEND_PID" ]; then
    kill "$BACKEND_PID" 2>/dev/null
  fi
  if [ -n "$FRONTEND_PID" ]; then
    kill "$FRONTEND_PID" 2>/dev/null
  fi
  exit 0
}

trap cleanup SIGINT SIGTERM EXIT

# 1. Start Java Spring Boot Backend
echo ""
echo "📦 [1/2] Starting Spring Boot REST Backend on port 8081..."
cd "$PROJECT_ROOT/skillgapx-backend"
if [ -f "target/skillgapx-backend-1.0.0.jar" ]; then
  java -jar target/skillgapx-backend-1.0.0.jar &
  BACKEND_PID=$!
else
  mvn spring-boot:run &
  BACKEND_PID=$!
fi

# Wait briefly for backend to initialize
sleep 3

# 2. Start Next.js Frontend
echo ""
echo "🌐 [2/2] Starting Next.js Frontend on port 3000..."
cd "$PROJECT_ROOT/skillgapx-frontend"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "=================================================================="
echo "  ✅ Both services launched successfully!"
echo ""
echo "  🌐 Frontend URL: http://localhost:3000"
echo "  ⚙️  Backend API:  http://localhost:8081/api"
echo "  📊 H2 Console:   http://localhost:8081/h2-console"
echo ""
echo "  Demo Credentials:"
echo "  Email:    student@mca.edu"
echo "  Password: password123"
echo "=================================================================="
echo "Press Ctrl+C to stop all services."

# Keep script running
wait
