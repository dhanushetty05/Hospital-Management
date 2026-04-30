# 🎯 Command Reference - MediCare Project

## 🚀 Essential Commands

### Start MongoDB
```bash
mongod
```

### Backend Commands
```bash
# Navigate to backend
cd backend

# Install dependencies (first time only)
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start

# Seed sample data (first time only)
npm run seed
```

### Frontend Commands
```bash
# Navigate to frontend
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Admin Commands
```bash
# Navigate to admin
cd admin

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

---

## 📊 Testing Commands

### Test Backend API
```bash
# Health check
curl http://localhost:5000

# Get all doctors
curl http://localhost:5000/api/doctors

# Get all services
curl http://localhost:5000/api/services

# Get all appointments
curl http://localhost:5000/api/appointments

# Get appointment stats
curl http://localhost:5000/api/appointments/stats
```

### Test MongoDB
```bash
# Connect to MongoDB shell
mongosh

# Switch to medicare database
use medicare

# Show all collections
show collections

# Count doctors
db.doctors.countDocuments()

# Find all doctors
db.doctors.find().pretty()

# Count appointments
db.appointments.countDocuments()

# Find all services
db.services.find().pretty()
```

---

## 🔧 Development Commands

### Backend Development
```bash
# Watch for changes (nodemon)
npm run dev

# Check for errors
npm run lint

# View logs
tail -f logs/app.log
```

### Frontend Development
```bash
# Development with HMR
npm run dev

# Type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

---

## 🗄️ Database Commands

### Seed Data
```bash
cd backend
npm run seed
```

### Reset Database
```bash
# Connect to MongoDB
mongosh

# Drop database
use medicare
db.dropDatabase()

# Reseed
cd backend
npm run seed
```

### Backup Database
```bash
# Backup
mongodump --db medicare --out ./backup

# Restore
mongorestore --db medicare ./backup/medicare
```

---

## 📦 Package Management

### Install Dependencies
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install

# Admin
cd admin && npm install

# Install all at once (from root)
npm install --prefix backend && npm install --prefix frontend && npm install --prefix admin
```

### Update Dependencies
```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm update package-name
```

### Clean Install
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🐛 Debugging Commands

### Check Ports
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :5173

# Linux/Mac
lsof -i :5000
lsof -i :5173
```

### Kill Process on Port
```bash
# Windows
taskkill /PID <PID> /F

# Linux/Mac
kill -9 <PID>
```

### View Logs
```bash
# Backend logs
cd backend
npm run dev

# MongoDB logs
tail -f /var/log/mongodb/mongod.log

# System logs (Windows)
Get-EventLog -LogName Application -Newest 50
```

---

## 🔍 Inspection Commands

### Check Node Version
```bash
node --version
npm --version
```

### Check MongoDB Version
```bash
mongod --version
mongosh --version
```

### Check Git Status
```bash
git status
git log --oneline -10
```

### Check Environment Variables
```bash
# Windows
type backend\.env

# Linux/Mac
cat backend/.env
```

---

## 🚀 Deployment Commands

### Build Frontend
```bash
cd frontend
npm run build
# Output in: dist/
```

### Start Production Backend
```bash
cd backend
NODE_ENV=production npm start
```

### Docker Commands (if using Docker)
```bash
# Build image
docker build -t medicare-backend ./backend
docker build -t medicare-frontend ./frontend

# Run containers
docker run -p 5000:5000 medicare-backend
docker run -p 5173:5173 medicare-frontend

# Docker Compose
docker-compose up -d
docker-compose down
```

---

## 🧪 Testing Commands

### Run Tests (when implemented)
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run specific test
npm test -- --grep "Doctor"

# Coverage report
npm run test:coverage
```

---

## 📝 Git Commands

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit - Complete MERN stack"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### Regular Workflow
```bash
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your message"

# Push
git push

# Pull latest
git pull
```

---

## 🔐 Security Commands

### Generate Secret Keys
```bash
# Generate random string for JWT
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate UUID
node -e "console.log(require('crypto').randomUUID())"
```

### Check for Vulnerabilities
```bash
# Audit packages
npm audit

# Fix vulnerabilities
npm audit fix

# Force fix (may break things)
npm audit fix --force
```

---

## 📊 Performance Commands

### Check Bundle Size
```bash
cd frontend
npm run build
du -sh dist/
```

### Analyze Dependencies
```bash
# List all dependencies
npm list

# List production dependencies only
npm list --prod

# Check package size
npm install -g cost-of-modules
cost-of-modules
```

---

## 🎯 Quick Reference

### Start Everything (3 Terminals)

**Terminal 1:**
```bash
mongod
```

**Terminal 2:**
```bash
cd backend && npm run dev
```

**Terminal 3:**
```bash
cd frontend && npm run dev
```

### Stop Everything
```bash
# Press Ctrl+C in each terminal
# Or close all terminals
```

### Restart Everything
```bash
# Stop all (Ctrl+C)
# Then start again with commands above
```

---

## 🆘 Emergency Commands

### Reset Everything
```bash
# Stop all servers (Ctrl+C)

# Reset database
mongosh
use medicare
db.dropDatabase()
exit

# Clean install backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run seed

# Clean install frontend
cd ../frontend
rm -rf node_modules package-lock.json
npm install

# Restart servers
```

### Fix Common Issues
```bash
# Port in use
# Windows: taskkill /F /IM node.exe
# Linux/Mac: killall node

# MongoDB not starting
# Check if already running: ps aux | grep mongod
# Kill if needed: sudo killall mongod
# Restart: mongod

# Permission errors
# Windows: Run as Administrator
# Linux/Mac: sudo npm install
```

---

## 📞 Help Commands

### Get Help
```bash
# npm help
npm help

# Command specific help
npm help install
npm help run

# MongoDB help
mongosh --help

# Node help
node --help
```

---

## ✅ Verification Commands

### Verify Installation
```bash
# Check all versions
node --version && npm --version && mongod --version

# Check backend
cd backend && npm list

# Check frontend
cd frontend && npm list

# Test API
curl http://localhost:5000

# Test MongoDB
mongosh --eval "db.version()"
```

---

**Keep this file handy for quick reference!** 📌
