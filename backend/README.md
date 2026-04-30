# MediCare Backend API

Backend API for the MediCare healthcare appointment system built with Node.js, Express, and MongoDB.

## Features

- 👨‍⚕️ Doctor Management (CRUD operations)
- 📅 Appointment Booking System
- 🏥 Healthcare Services Management
- 💳 Payment Integration (Stripe)
- 🖼️ Image Upload (Cloudinary)
- 🔐 Authentication Support

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** Clerk (optional)
- **Payment:** Stripe
- **File Upload:** Multer + Cloudinary
- **Security:** CORS, bcryptjs

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start MongoDB:
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in .env
```

4. Run the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors` - Create new doctor
- `POST /api/doctors/login` - Doctor login
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `GET /api/appointments/doctor/:doctorId` - Get appointments by doctor
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment
- `GET /api/appointments/stats` - Get appointment statistics
- `GET /api/appointments/confirm-payment` - Confirm Stripe payment

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Service Appointments
- `GET /api/service-appointments` - Get all service appointments
- `GET /api/service-appointments/:id` - Get service appointment by ID
- `POST /api/service-appointments` - Create service appointment
- `PUT /api/service-appointments/:id` - Update service appointment
- `DELETE /api/service-appointments/:id` - Delete service appointment

## Environment Variables

See `.env.example` for all required environment variables.

## Database Schema

### Doctor
- email, password, name, specialization
- imageUrl, experience, qualifications
- location, about, fee, availability
- schedule (Map of dates to time slots)
- rating, patients, success rate

### Appointment
- patientName, mobile, age, gender
- doctorId (ref), date, time, fees
- status (Pending, Confirmed, Completed, Canceled)
- payment (method, status, amount)
- sessionId (for Stripe)

### Service
- name, about, shortDescription
- price, available, imageUrl
- dates, slots, instructions
- totalAppointments, completed, canceled

### ServiceAppointment
- patientName, mobile, age, gender
- serviceId (ref), date, time
- status, payment details

## Development

```bash
# Install nodemon for development
npm install -D nodemon

# Run in development mode
npm run dev
```

## License

ISC
