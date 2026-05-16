# 🏥 MediCare - Healthcare Appointment System

A complete MERN stack healthcare appointment booking system with doctor management, service booking, and payment integration.
Platform fir the Hospital Management
## 📋 Features

- 👨‍⚕️ **Doctor Management** - Complete CRUD operations for doctors
- 📅 **Appointment Booking** - Book appointments with doctors
- 🏥 **Healthcare Services** - Browse and book medical services
- 💳 **Payment Integration** - Stripe payment gateway support
- 🖼️ **Image Uploads** - Cloudinary integration for images
- 🔐 **Authentication** - Clerk authentication support
- 📊 **Admin Dashboard** - Manage appointments and services
- 📱 **Responsive Design** - Works on all devices

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Clerk** for authentication
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **Stripe** for payments
- **Cloudinary** for image storage
- **Multer** for file uploads
- **bcryptjs** for password hashing

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd MediCare-Site-main
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your MongoDB URI and other settings

# Start MongoDB (if using local)
mongod

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

Backend will run on **http://localhost:5000**

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables (optional)
# Edit .env file if needed

# Start the frontend
npm run dev
```

Frontend will run on **http://localhost:5173**

### 4. Setup Admin Panel (Optional)

```bash
cd admin

# Install dependencies
npm install

# Start the admin panel
npm run dev
```

## 📝 Environment Variables

### Backend (.env)

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/medicare

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Stripe (Optional - for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Clerk (Optional - for authentication)
CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

# Admin
MAJOR_ADMIN_ID=admin
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

## 🗄️ Database Setup

### Option 1: Local MongoDB

1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB:
   ```bash
   mongod
   ```
3. Database will be created automatically when you run the seed script

### Option 2: MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in backend/.env:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medicare
   ```

## 📊 Seed Sample Data

The project includes sample doctors and services:

```bash
cd backend
npm run seed
```

**Sample Doctor Credentials:**
- Email: `dr.rahul@gmail.com` | Password: `123456`
- Email: `dr.priya@gmail.com` | Password: `123456`
- Email: `dr.amit@gmail.com` | Password: `123456`

## 🔌 API Endpoints

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create doctor
- `POST /api/doctors/login` - Doctor login
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment
- `GET /api/appointments/stats` - Get statistics
- `GET /api/appointments/doctor/:doctorId` - Get by doctor

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `GET /api/services/:id` - Get service by ID
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Service Appointments
- `GET /api/service-appointments` - Get all
- `POST /api/service-appointments` - Create
- `GET /api/service-appointments/:id` - Get by ID
- `PUT /api/service-appointments/:id` - Update
- `DELETE /api/service-appointments/:id` - Delete

## 📁 Project Structure

```
MediCare-Site-main/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── scripts/         # Utility scripts
│   ├── server.js        # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── assets/      # Images and static files
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── package.json
│   └── vite.config.js
├── admin/
│   └── src/
│       └── components/  # Admin components
└── README.md
```

## 🎯 Usage

### For Patients

1. Browse available doctors by specialization
2. View doctor profiles and availability
3. Book appointments with preferred time slots
4. Browse and book healthcare services
5. Make payments (Cash or Online via Stripe)

### For Doctors

1. Login to doctor dashboard
2. View and manage appointments
3. Update profile and availability
4. Set schedule and time slots
5. Track earnings and statistics

### For Admins

1. Manage all doctors
2. View all appointments
3. Manage healthcare services
4. View statistics and reports

## 🔧 Development

### Backend Development

```bash
cd backend
npm run dev  # Runs with nodemon for auto-reload
```

### Frontend Development

```bash
cd frontend
npm run dev  # Runs Vite dev server
```

### Build for Production

```bash
# Frontend
cd frontend
npm run build

# Backend (no build needed, runs directly)
cd backend
npm start
```

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For Atlas, whitelist your IP address

### Port Already in Use

- Backend: Change `PORT` in backend/.env
- Frontend: Change port in vite.config.js

### CORS Errors

- Ensure `FRONTEND_URL` in backend/.env matches your frontend URL
- Check CORS configuration in server.js

## 📦 Optional Integrations

### Stripe Payment Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from dashboard
3. Add keys to backend/.env
4. Test with card: `4242 4242 4242 4242`

### Cloudinary Image Upload

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get credentials from dashboard
3. Add to backend/.env

### Clerk Authentication

1. Create account at [clerk.com](https://clerk.com)
2. Create application
3. Get publishable and secret keys
4. Add to both frontend and backend .env files

## 📄 License

ISC

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ using MERN Stack**
