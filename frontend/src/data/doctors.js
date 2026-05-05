// Complete static doctors data for the hospital
export const doctors = [
  {
    id: 'DOC001',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: '15 years',
    qualification: 'MBBS, MD (Cardiology), FACC',
    image: 'https://i.pravatar.cc/300?img=1',
    rating: 4.9,
    patients: 1200,
    consultationFee: 800,
    about: 'Specialist in heart diseases, interventional cardiology, and preventive cardiac care. Expert in treating complex cardiac conditions.',
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
    }
  },
  {
    id: 'DOC002',
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    experience: '12 years',
    qualification: 'MBBS, DM (Neurology)',
    image: 'https://i.pravatar.cc/300?img=12',
    rating: 4.8,
    patients: 980,
    consultationFee: 1000,
    about: 'Expert in treating neurological disorders, stroke management, and epilepsy. Specialized in brain and nervous system conditions.',
    availability: {
      days: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
    }
  },
  {
    id: 'DOC003',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    experience: '10 years',
    qualification: 'MBBS, MD (Pediatrics)',
    image: 'https://i.pravatar.cc/300?img=5',
    rating: 4.9,
    patients: 1500,
    consultationFee: 700,
    about: 'Dedicated to child healthcare, vaccinations, and developmental care. Compassionate approach to treating children.',
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
      timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM']
    }
  },
  {
    id: 'DOC004',
    name: 'Dr. David Kim',
    specialization: 'Orthopedic',
    experience: '18 years',
    qualification: 'MBBS, MS (Orthopedics)',
    image: 'https://i.pravatar.cc/300?img=13',
    rating: 4.9,
    patients: 1100,
    consultationFee: 900,
    about: 'Specialist in joint replacement, sports injuries, and spine surgery. Expert in orthopedic trauma care.',
    availability: {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
    }
  },
  {
    id: 'DOC005',
    name: 'Dr. Priya Sharma',
    specialization: 'Dermatologist',
    experience: '8 years',
    qualification: 'MBBS, MD (Dermatology)',
    image: 'https://i.pravatar.cc/300?img=9',
    rating: 4.7,
    patients: 850,
    consultationFee: 750,
    about: 'Expert in skin diseases, cosmetic dermatology, and laser treatments. Specialized in acne and anti-aging treatments.',
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
      timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
    }
  },
  {
    id: 'DOC006',
    name: 'Dr. James Wilson',
    specialization: 'General Physician',
    experience: '20 years',
    qualification: 'MBBS, MD (Medicine)',
    image: 'https://i.pravatar.cc/300?img=14',
    rating: 4.8,
    patients: 2000,
    consultationFee: 600,
    about: 'Experienced general physician for routine checkups, chronic disease management, and preventive care.',
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
    }
  },
  {
    id: 'DOC007',
    name: 'Dr. Aisha Patel',
    specialization: 'Gynecologist',
    experience: '14 years',
    qualification: 'MBBS, MD (OB-GYN)',
    image: 'https://i.pravatar.cc/300?img=10',
    rating: 4.9,
    patients: 1300,
    consultationFee: 850,
    about: 'Specialist in women\'s health, pregnancy care, and minimally invasive gynecological surgery.',
    availability: {
      days: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
    }
  },
  {
    id: 'DOC008',
    name: 'Dr. Robert Martinez',
    specialization: 'ENT Specialist',
    experience: '11 years',
    qualification: 'MBBS, MS (ENT)',
    image: 'https://i.pravatar.cc/300?img=15',
    rating: 4.7,
    patients: 920,
    consultationFee: 700,
    about: 'Expert in ear, nose, and throat disorders. Specialized in sinus surgery and hearing problems.',
    availability: {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
    }
  },
  {
    id: 'DOC009',
    name: 'Dr. Lisa Anderson',
    specialization: 'Psychiatrist',
    experience: '9 years',
    qualification: 'MBBS, MD (Psychiatry)',
    image: 'https://i.pravatar.cc/300?img=20',
    rating: 4.8,
    patients: 750,
    consultationFee: 900,
    about: 'Mental health specialist focusing on depression, anxiety, and stress management. Compassionate counseling approach.',
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      timeSlots: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
    }
  },
  {
    id: 'DOC010',
    name: 'Dr. Raj Kumar',
    specialization: 'Gastroenterologist',
    experience: '13 years',
    qualification: 'MBBS, DM (Gastroenterology)',
    image: 'https://i.pravatar.cc/300?img=33',
    rating: 4.8,
    patients: 1050,
    consultationFee: 850,
    about: 'Specialist in digestive system disorders, liver diseases, and endoscopy procedures.',
    availability: {
      days: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
      timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
    }
  },
  {
    id: 'DOC011',
    name: 'Dr. Maria Garcia',
    specialization: 'Ophthalmologist',
    experience: '16 years',
    qualification: 'MBBS, MS (Ophthalmology)',
    image: 'https://i.pravatar.cc/300?img=24',
    rating: 4.9,
    patients: 1400,
    consultationFee: 800,
    about: 'Eye care specialist for cataract surgery, LASIK, and retinal disorders. Advanced eye treatment expert.',
    availability: {
      days: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
      timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
    }
  },
  {
    id: 'DOC012',
    name: 'Dr. Thomas Lee',
    specialization: 'Urologist',
    experience: '12 years',
    qualification: 'MBBS, MCh (Urology)',
    image: 'https://i.pravatar.cc/300?img=51',
    rating: 4.7,
    patients: 880,
    consultationFee: 850,
    about: 'Specialist in urinary tract disorders, kidney stones, and prostate care. Minimally invasive surgery expert.',
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
    }
  }
];

// Helper functions
export const getSpecializations = () => {
  return [...new Set(doctors.map(doc => doc.specialization))].sort();
};

export const getDoctorById = (id) => {
  return doctors.find(doc => doc.id === id);
};

export const searchDoctors = (query) => {
  const lowerQuery = query.toLowerCase();
  return doctors.filter(doc =>
    doc.name.toLowerCase().includes(lowerQuery) ||
    doc.specialization.toLowerCase().includes(lowerQuery)
  );
};

export const filterBySpecialization = (specialization) => {
  if (!specialization || specialization === 'All') return doctors;
  return doctors.filter(doc => doc.specialization === specialization);
};
