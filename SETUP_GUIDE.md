# Frontend Setup Guide

## Issues Fixed

### 1. Import Path Errors
- ✅ Fixed `dummyStyles` import paths in `DoctorDetail.jsx` and `ServiceDetailPage.jsx`
- Changed from `../assets/dummyStyles` to `../../assets/dummyStyles`

### 2. Clerk Authentication Setup
- ✅ Added `ClerkProvider` wrapper in `main.jsx`
- Now authentication will work properly for appointments and bookings

### 3. Service Detail Fallback
- ✅ Removed undefined `servicesData` reference
- Now properly shows error when service cannot be fetched

## Environment Setup

### 1. Frontend Environment Variables
Create or update `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

**Note:** If you don't have a Clerk account yet:
1. Go to https://clerk.com
2. Sign up for a free account
3. Create a new application
4. Copy the Publishable Key
5. Paste it in the `.env` file

**Without Clerk:** The app will still work, but authentication-dependent features (appointments, bookings) won't function.

### 2. Backend Environment Variables
Make sure your `backend/.env` has:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## Running the Application

### Start Backend
```bash
cd backend
npm install
npm start
```

Backend should run on: http://localhost:5000

### Start Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend should run on: http://localhost:5173

## Testing the Application

### 1. Home Page
- Visit http://localhost:5173
- Should see:
  - Hero section with MediCare+ branding
  - Certification badges
  - Services preview
  - Medical team section
  - Testimonials section
  - Updated footer

### 2. Doctors Page
- Click "Doctors" in navigation
- Should see list of doctors with:
  - Circular profile images
  - Specialization
  - Experience
  - Book Now buttons

### 3. Services Page
- Click "Services" in navigation
- Should see diagnostic services with:
  - Service images
  - Service names
  - Book Now buttons

### 4. Contact Page
- Click "Contact" in navigation
- Should see:
  - Contact form
  - Clinic information
  - Map
  - WhatsApp integration

### 5. Appointments Page (Requires Clerk)
- Click "Appointments" in navigation
- If not signed in: Shows sign-in prompt
- If signed in: Shows your appointments

## Common Issues & Solutions

### Issue 1: "Failed to resolve import"
**Solution:** Make sure all dependencies are installed:
```bash
cd frontend
npm install
```

### Issue 2: "Cannot connect to backend"
**Solution:** 
1. Check backend is running on port 5000
2. Verify `VITE_API_URL` in frontend/.env
3. Check backend console for errors

### Issue 3: "Clerk authentication not working"
**Solution:**
1. Add your Clerk Publishable Key to frontend/.env
2. Restart the frontend dev server
3. Clear browser cache and cookies

### Issue 4: "No doctors/services showing"
**Solution:**
1. Check backend is connected to MongoDB
2. Run the seed script: `cd backend && node scripts/seedData.js`
3. Check backend API endpoints are working

### Issue 5: Linting errors from old components
**Solution:** These are from unused component folders and can be ignored. To clean them up:
```bash
cd frontend/src/components
# Remove old unused folders (optional)
rm -rf AppointmentPage/ Certification/ ContactPage/ DoctorsPage/ Footer/ HomeDoctors/ LoginPage/ ServicePage/ Testimonial/
```

## Project Structure

```
frontend/
├── src/
│   ├── assets/          # Images and styles
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx   # Main navigation (ACTIVE)
│   │   └── Footer.jsx   # Footer component (ACTIVE)
│   ├── pages/           # Page components
│   │   ├── HomePage.jsx
│   │   ├── DoctorsPage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── AppointmentsPage.jsx
│   │   ├── DoctorDetail/
│   │   │   └── DoctorDetail.jsx
│   │   └── ServiceDetailPage/
│   │       └── ServiceDetailPage.jsx
│   ├── App.jsx          # Main app with routes
│   ├── main.jsx         # Entry point with Clerk
│   └── index.css        # Global styles
└── .env                 # Environment variables
```

## Features Implemented

### ✅ Home Page
- Hero section with MediCare+ branding
- Feature badges (Certified Specialists, 24/7 Availability, etc.)
- Certification logos section
- Services preview grid
- Medical team showcase
- Testimonials (Medical Professionals & Patients)
- Updated footer with newsletter

### ✅ Doctors Page
- Doctor listing with search
- Filter by specialization
- Doctor cards with images
- Book appointment functionality

### ✅ Services Page
- Service listing with search
- Service cards with images
- Book service functionality

### ✅ Contact Page
- Contact form with WhatsApp integration
- Clinic information
- Google Maps integration
- Clinic hours

### ✅ Appointments Page
- View doctor appointments
- View service bookings
- Status tracking
- Authentication required

### ✅ Doctor Detail Page
- Doctor profile with stats
- Date and time slot selection
- Patient details form
- Payment method selection (Cash/Online)
- Booking confirmation

### ✅ Service Detail Page
- Service information
- Date and time selection
- Patient details form
- Payment method selection
- Booking confirmation

## Next Steps

1. **Add Clerk Key:** Get your Clerk Publishable Key and add it to `.env`
2. **Seed Data:** Run the backend seed script to populate doctors and services
3. **Test Booking Flow:** Try booking a doctor appointment and a service
4. **Customize Content:** Update text, images, and branding as needed
5. **Deploy:** When ready, deploy to your hosting platform

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the backend console for API errors
3. Verify all environment variables are set
4. Make sure MongoDB is connected
5. Ensure all dependencies are installed

## Design Credits

- Design: Based on provided screenshots
- Development: MediCare Healthcare Platform
- Powered by: Hexagon Digital Services
