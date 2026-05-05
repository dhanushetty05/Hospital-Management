// Static dummy doctor data
export const doctorsData = [
  {
    id: 'DOC001',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: '15 years',
    qualification: 'MBBS, MD (Cardiology)',
    image: 'https://i.pravatar.cc/150?img=1',
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
      ],
    },
    rating: 4.8,
    patients: 1200,
    consultationFee: 800,
  },
  {
    id: 'DOC002',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    experience: '12 years',
    qualification: 'MBBS, DM (Neurology)',
    image: 'https://i.pravatar.cc/150?img=12',
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      timeSlots: [
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '03:00 PM',
        '04:00 PM',
        '05:00 PM',
      ],
    },
    rating: 4.9,
    patients: 980,
    consultationFee: 1000,
  },
  {
    id: 'DOC003',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    experience: '10 years',
    qualification: 'MBBS, MD (Pediatrics)',
    image: 'https://i.pravatar.cc/150?img=5',
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
      timeSlots: [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
      ],
    },
    rating: 4.7,
    patients: 1500,
    consultationFee: 700,
  },
  {
    id: 'DOC004',
    name: 'Dr. David Kim',
    specialization: 'Orthopedic',
    experience: '18 years',
    qualification: 'MBBS, MS (Orthopedics)',
    image: 'https://i.pravatar.cc/150?img=13',
    availability: {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      timeSlots: [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
      ],
    },
    rating: 4.9,
    patients: 1100,
    consultationFee: 900,
  },
  {
    id: 'DOC005',
    name: 'Dr. Priya Sharma',
    specialization: 'Dermatologist',
    experience: '8 years',
    qualification: 'MBBS, MD (Dermatology)',
    image: 'https://i.pravatar.cc/150?img=9',
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
      timeSlots: [
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
      ],
    },
    rating: 4.6,
    patients: 850,
    consultationFee: 750,
  },
  {
    id: 'DOC006',
    name: 'Dr. James Wilson',
    specialization: 'General Physician',
    experience: '20 years',
    qualification: 'MBBS, MD (Medicine)',
    image: 'https://i.pravatar.cc/150?img=14',
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      timeSlots: [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
        '05:00 PM',
      ],
    },
    rating: 4.8,
    patients: 2000,
    consultationFee: 600,
  },
  {
    id: 'DOC007',
    name: 'Dr. Aisha Patel',
    specialization: 'Gynecologist',
    experience: '14 years',
    qualification: 'MBBS, MD (OB-GYN)',
    image: 'https://i.pravatar.cc/150?img=10',
    availability: {
      days: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      timeSlots: [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
      ],
    },
    rating: 4.9,
    patients: 1300,
    consultationFee: 850,
  },
  {
    id: 'DOC008',
    name: 'Dr. Robert Martinez',
    specialization: 'ENT Specialist',
    experience: '11 years',
    qualification: 'MBBS, MS (ENT)',
    image: 'https://i.pravatar.cc/150?img=15',
    availability: {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      timeSlots: [
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '03:00 PM',
        '04:00 PM',
        '05:00 PM',
      ],
    },
    rating: 4.7,
    patients: 920,
    consultationFee: 700,
  },
];

// Get all specializations
export const getSpecializations = () => {
  return [...new Set(doctorsData.map((doc) => doc.specialization))];
};

// Get doctor by ID
export const getDoctorById = (id) => {
  return doctorsData.find((doc) => doc.id === id);
};

// Search doctors
export const searchDoctors = (query) => {
  const lowerQuery = query.toLowerCase();
  return doctorsData.filter(
    (doc) =>
      doc.name.toLowerCase().includes(lowerQuery) ||
      doc.specialization.toLowerCase().includes(lowerQuery)
  );
};

// Filter by specialization
export const filterBySpecialization = (specialization) => {
  if (specialization === 'All') return doctorsData;
  return doctorsData.filter((doc) => doc.specialization === specialization);
};
