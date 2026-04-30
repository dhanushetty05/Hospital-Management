# 🚀 Complete Setup Guide - MediCare

## Step-by-Step Installation Instructions

### ✅ Step 1: Install Prerequisites

#### 1.1 Install Node.js
- Download from: https://nodejs.org/
- Recommended: LTS version (v20.x or higher)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

#### 1.2 Install MongoDB

**Option A: Local MongoDB (Recommended for Development)**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB:
  ```bash
  # Windows (run as service during installation)
  # Or manually start:
  mongod
  ```

**Option B: MongoDB Atlas (Cloud - Free Tier Available)**
- Sign up at: https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string
- Whitelist your IP address

### ✅ Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install all dependencies
npm install

# This will install:
# - express, mongoose, cors, dotenv
# - bcryptjs, stripe, cloudinary, multer
# - @clerk/clerk-sdk-node
# - nodemon (dev dependency)
```

#### 2.1 Configure Environment Variables

The `.env` file is already created. Update it if needed:

```bash
# Open backend/.env and verify/update:

# MongoDB - Use one of these:
MONGODB_URI=mongodb://localhost:27017/medicare  # Local
# OR
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/medicare  # Atlas

# Server settings (default is fine)
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Optional services (leave empty if not using):
STRIPE_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

#### 2.2 Start MongoDB

```bash
# If using local MongoDB, start it:
mongod

# Keep this terminal open
```

#### 2.3 Seed Sample Data

```bash
# In a new terminal, from backend directory:
npm run seed

# This creates:
# - 3 sample doctors
# - 3 sample services
# - All with realistic data
```

#### 2.4 Start Backend Server

```bash
# Development mode (auto-reload on changes):
npm run dev

# OR Production mode:
npm start

# You should see:
# ✅ MongoDB Connected: localhost
# 📊 Database: medicare
# 🚀 Server is running on port 5000
```

**Backend is now running at: http://localhost:5000**

### ✅ Step 3: Setup Frontend

Open a **new terminal** (keep backend running):

```bash
# Navigate to frontend directory
cd frontend

# Install all dependencies
npm install

# This will install:
# - react, react-dom, react-router-dom
# - axios, @clerk/clerk-react
# - tailwindcss, lucide-react
# - react-hot-toast, react-toastify
# - vite and dev dependencies
```

#### 3.1 Configure Environment (Optional)

The `.env` file is already created with defaults:

```bash
# frontend/.env
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=  # Optional
```

#### 3.2 Start Frontend

```bash
# From frontend directory:
npm run dev

# You should see:
# VITE v7.x.x ready in xxx ms
# ➜ Local: http://localhost:5173/
```

**Frontend is now running at: http://localhost:5173**

### ✅ Step 4: Test the Application

#### 4.1 Open Browser

Navigate to: **http://localhost:5173**

#### 4.2 Test Features

1. **View Doctors**
   - Browse the doctors page
   - See 3 sample doctors

2. **View Services**
   - Check healthcare services
   - See 3 sample services

3. **Book Appointment**
   - Select a doctor
   - Choose date and time
   - Fill patient details
   - Submit (Cash payment works without Stripe)

4. **Doctor Login**
   - Use credentials:
     - Email: `dr.rahul@gmail.com`
     - Password: `123456`

### ✅ Step 5: Setup Admin Panel (Optional)

```bash
# Open a new terminal
cd admin

# Install dependencies
npm install

# Start admin panel
npm run dev

# Runs on: http://localhost:5174 (or next available port)
```

## 🎯 Quick Commands Reference

### Backend Commands
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
npm start            # Start production server
npm run seed         # Seed sample data
```

### Frontend Commands
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Admin Commands
```bash
cd admin
npm install          # Install dependencies
npm run dev          # Start development server
```

## 🔍 Verify Installation

### Check Backend
```bash
# Test API endpoint:
curl http://localhost:5000

# Should return:
# {"success":true,"message":"MediCare API is running",...}
```

### Check Frontend
- Open: http://localhost:5173
- Should see MediCare homepage

### Check Database
```bash
# Connect to MongoDB:
mongosh

# Switch to medicare database:
use medicare

# Check collections:
show collections

# Should see: doctors, services, appointments, etc.

# Count doctors:
db.doctors.countDocuments()
# Should return: 3
```

## 🐛 Common Issues & Solutions

### Issue: MongoDB Connection Failed

**Solution:**
```bash
# 1. Check if MongoDB is running:
mongod

# 2. Check connection string in backend/.env
# 3. For Atlas, whitelist your IP
```

### Issue: Port 5000 Already in Use

**Solution:**
```bash
# Change port in backend/.env:
PORT=5001

# Update frontend/.env:
VITE_API_URL=http://localhost:5001/api
```

### Issue: npm install fails

**Solution:**
```bash
# Clear npm cache:
npm cache clean --force

# Delete node_modules and package-lock.json:
rm -rf node_modules package-lock.json

# Reinstall:
npm install
```

### Issue: CORS Error

**Solution:**
- Ensure `FRONTEND_URL` in backend/.env matches your frontend URL
- Default: `http://localhost:5173`

### Issue: Cannot find module errors

**Solution:**
```bash
# Ensure you're in the correct directory
# Backend modules must be installed in backend/
# Frontend modules must be installed in frontend/

cd backend && npm install
cd ../frontend && npm install
```

## 📊 Project Status Check

Run these commands to verify everything is working:

```bash
# 1. Check Backend
curl http://localhost:5000
# Expected: JSON response with success: true

# 2. Check Doctors API
curl http://localhost:5000/api/doctors
# Expected: JSON array with 3 doctors

# 3. Check Services API
curl http://localhost:5000/api/services
# Expected: JSON array with 3 services

# 4. Check Frontend
# Open browser: http://localhost:5173
# Expected: MediCare homepage loads
```

## 🎉 Success!

If all steps completed successfully, you now have:

✅ Backend API running on port 5000
✅ Frontend app running on port 5173  
✅ MongoDB with sample data
✅ 3 sample doctors
✅ 3 sample services
✅ Full MERN stack working

## 🚀 Next Steps

1. **Explore the Application**
   - Browse doctors and services
   - Book test appointments
   - Try doctor login

2. **Optional Integrations**
   - Setup Stripe for payments
   - Setup Cloudinary for image uploads
   - Setup Clerk for authentication

3. **Customize**
   - Add your own doctors
   - Create new services
   - Modify styling

4. **Deploy**
   - Deploy backend to Heroku/Railway
   - Deploy frontend to Vercel/Netlify
   - Use MongoDB Atlas for production

## 📞 Need Help?

- Check the main README.md for detailed documentation
- Review API endpoints in backend/README.md
- Check console logs for error messages
- Ensure all environment variables are set correctly

---

**Happy Coding! 🎉**
