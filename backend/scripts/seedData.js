import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor from '../models/Doctor.js';
import Service from '../models/Service.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Doctor.deleteMany({});
    await Service.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Doctors
    const doctors = [
      {
        email: 'dr.rahul@gmail.com',
        password: '123456',
        name: 'Dr. Rahul Sharma',
        specialization: 'Cardiologist',
        experience: '10 years',
        qualifications: 'MBBS, MD (Cardiology)',
        location: 'Delhi',
        about: 'Experienced heart specialist with expertise in cardiac care',
        fee: 500,
        availability: 'Available',
        schedule: {
          '2026-05-01': ['10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '02:30 PM'],
          '2026-05-02': ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
          '2026-05-05': ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'],
        },
        success: '98%',
        patients: '5000+',
        rating: 4.7,
      },
      {
        email: 'dr.priya@gmail.com',
        password: '123456',
        name: 'Dr. Priya Verma',
        specialization: 'Dermatologist',
        experience: '8 years',
        qualifications: 'MBBS, MD (Dermatology)',
        location: 'Mumbai',
        about: 'Skin care specialist with focus on cosmetic dermatology',
        fee: 400,
        availability: 'Available',
        schedule: {
          '2026-05-01': ['11:00 AM', '12:00 PM', '03:00 PM', '04:00 PM'],
          '2026-05-03': ['10:00 AM', '11:00 AM', '02:00 PM'],
        },
        success: '96%',
        patients: '3500+',
        rating: 4.5,
      },
      {
        email: 'dr.amit@gmail.com',
        password: '123456',
        name: 'Dr. Amit Patel',
        specialization: 'Pediatrician',
        experience: '12 years',
        qualifications: 'MBBS, MD (Pediatrics)',
        location: 'Bangalore',
        about: 'Child health specialist with gentle care approach',
        fee: 350,
        availability: 'Available',
        schedule: {
          '2026-05-02': ['09:00 AM', '10:00 AM', '11:00 AM', '03:00 PM'],
          '2026-05-04': ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
        },
        success: '97%',
        patients: '4200+',
        rating: 4.8,
      },
    ];

    const createdDoctors = await Doctor.insertMany(doctors);
    console.log(`✅ Created ${createdDoctors.length} doctors`);

    // Seed Services
    const services = [
      {
        name: 'Full Body Health Checkup',
        about: 'Comprehensive health screening including blood tests, X-ray, ECG, and doctor consultation',
        shortDescription: 'Complete diagnostic package for overall health assessment',
        price: 999,
        available: true,
        instructions: [
          'Come empty stomach (8-10 hours fasting)',
          'Carry previous medical reports if any',
          'Wear comfortable clothing',
          'Bring ID proof',
        ],
        dates: ['2026-05-01', '2026-05-02', '2026-05-05'],
        slots: {
          '2026-05-01': ['08:00 AM', '09:00 AM', '10:00 AM'],
          '2026-05-02': ['08:00 AM', '09:00 AM'],
          '2026-05-05': ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'],
        },
      },
      {
        name: 'Diabetes Screening Package',
        about: 'Specialized diabetes detection and monitoring package',
        shortDescription: 'HbA1c, Fasting & PP Blood Sugar, Lipid Profile',
        price: 599,
        available: true,
        instructions: [
          'Fasting required (10-12 hours)',
          'Bring previous reports',
          'Continue regular medications',
        ],
        dates: ['2026-05-01', '2026-05-03', '2026-05-06'],
        slots: {
          '2026-05-01': ['07:00 AM', '08:00 AM', '09:00 AM'],
          '2026-05-03': ['07:00 AM', '08:00 AM'],
          '2026-05-06': ['07:00 AM', '08:00 AM', '09:00 AM'],
        },
      },
      {
        name: 'Cardiac Health Package',
        about: 'Heart health assessment with ECG, Echo, and cardiac markers',
        shortDescription: 'Complete cardiac evaluation package',
        price: 1499,
        available: true,
        instructions: [
          'Light breakfast allowed',
          'Avoid caffeine 4 hours before',
          'Bring previous cardiac reports',
          'Wear loose clothing',
        ],
        dates: ['2026-05-02', '2026-05-04', '2026-05-07'],
        slots: {
          '2026-05-02': ['09:00 AM', '10:00 AM', '11:00 AM'],
          '2026-05-04': ['09:00 AM', '10:00 AM'],
          '2026-05-07': ['09:00 AM', '10:00 AM', '11:00 AM'],
        },
      },
    ];

    const createdServices = await Service.insertMany(services);
    console.log(`✅ Created ${createdServices.length} services`);

    console.log('\n✨ Database seeded successfully!\n');
    console.log('📧 Doctor Login Credentials:');
    console.log('   Email: dr.rahul@gmail.com | Password: 123456');
    console.log('   Email: dr.priya@gmail.com | Password: 123456');
    console.log('   Email: dr.amit@gmail.com | Password: 123456\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
