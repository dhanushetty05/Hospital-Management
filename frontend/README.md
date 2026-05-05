# Hospital Management System - Frontend

A modern, professional Hospital Management System built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and login with:
- **Email**: doctor@medicare.com
- **Password**: password123

## ✨ Features

- ✅ **Authentication** - JWT-based login with protected routes
- ✅ **Dashboard** - Statistics and recent appointments
- ✅ **Doctors** - 8 static doctors with search and filter
- ✅ **Appointments** - Book, view, and cancel appointments
- ✅ **Responsive** - Mobile-friendly design
- ✅ **Real-time** - Live data from backend API

## 📁 Project Structure

```
src/
├── components/
│   ├── common/              # Reusable components
│   ├── layout/              # Layout components
│   └── appointments/        # Appointment components
├── pages/                   # Page components
├── services/                # API services
├── context/                 # React Context
├── data/                    # Static data
├── App.jsx                  # Main app
└── main.jsx                 # Entry point
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client
- **React Router DOM** - Navigation
- **Lucide React** - Icons

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎨 Design System

- **Colors**: Blue primary, clean white background
- **Typography**: Inter font family
- **Components**: Cards, buttons, forms, tables
- **Responsive**: Mobile, tablet, desktop

## 📚 Documentation

- [Complete Documentation](../HOSPITAL_MANAGEMENT_FRONTEND.md)
- [Quick Start Guide](../QUICK_START_GUIDE.md)
- [Implementation Details](../IMPLEMENTATION_COMPLETE.md)

## 🔐 Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🌐 API Endpoints

- `POST /api/doctors/login` - Authentication
- `GET /api/appointments` - Fetch appointments
- `POST /api/appointments` - Create appointment
- `DELETE /api/appointments/:id` - Cancel appointment

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Components

### Pages
- `LoginPage` - Authentication
- `DashboardPage` - Overview with stats
- `DoctorsPage` - Doctor listing
- `AppointmentsPage` - Appointment management

### Components
- `Sidebar` - Navigation
- `Toast` - Notifications
- `LoadingSpinner` - Loading states
- `BookAppointmentModal` - Booking form

## 🔒 Security

- JWT token authentication
- Protected routes
- Input validation
- XSS prevention

## 📈 Performance

- Fast Vite builds
- Optimized bundle size
- Code splitting ready
- Lazy loading ready

## 🚀 Deployment

```bash
# Build
npm run build

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

## 📄 License

© 2026 MediCare Hospital Management System

---

**Status**: Production Ready ✅
