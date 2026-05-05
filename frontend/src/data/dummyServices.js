// Comprehensive dummy services data
export const dummyServices = [
  {
    _id: '1',
    name: 'Full Body Health Checkup',
    description: 'Comprehensive health screening including blood tests, vitals check, and consultation.',
    price: 2500,
    duration: '2-3 hours',
    category: 'Diagnostic',
    imageUrl: 'https://img.freepik.com/free-photo/hands-holding-blood-test-tubes_23-2148168322.jpg?w=740',
    features: [
      'Complete Blood Count (CBC)',
      'Lipid Profile',
      'Liver Function Test',
      'Kidney Function Test',
      'Thyroid Profile',
      'Blood Sugar Test',
      'Vitamin D & B12',
      'Doctor Consultation'
    ],
    availability: 'Available',
    preparationRequired: 'Fasting for 10-12 hours required'
  },
  {
    _id: '2',
    name: 'X-Ray Scan',
    description: 'Digital X-ray imaging for bones, chest, and other body parts.',
    price: 800,
    duration: '15-30 minutes',
    category: 'Imaging',
    imageUrl: 'https://img.freepik.com/free-photo/human-skull-x-ray-image_1308-37299.jpg?w=826',
    features: [
      'Digital X-Ray Technology',
      'Instant Results',
      'Expert Radiologist Review',
      'CD/Digital Copy Provided',
      'All Body Parts Coverage'
    ],
    availability: 'Available',
    preparationRequired: 'No special preparation needed'
  },
  {
    _id: '3',
    name: 'Blood Pressure Check',
    description: 'Regular blood pressure monitoring and cardiovascular health assessment.',
    price: 300,
    duration: '15 minutes',
    category: 'Vital Check',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-checking-blood-pressure-patient_1150-13175.jpg?w=826',
    features: [
      'Digital BP Monitoring',
      'Heart Rate Check',
      'Cardiovascular Assessment',
      'Health Counseling',
      'Report & Recommendations'
    ],
    availability: 'Available',
    preparationRequired: 'Rest for 5 minutes before test'
  },
  {
    _id: '4',
    name: 'Blood Sugar Test',
    description: 'Diabetes screening including fasting and post-meal glucose levels.',
    price: 400,
    duration: '30 minutes',
    category: 'Diagnostic',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-testing-patients-blood-sugar-using-glucometer_1150-14197.jpg?w=826',
    features: [
      'Fasting Blood Sugar',
      'Post-Prandial Sugar',
      'HbA1c Test',
      'Instant Results',
      'Diabetic Counseling'
    ],
    availability: 'Available',
    preparationRequired: 'Fasting for 8-10 hours required'
  },
  {
    _id: '5',
    name: 'Full Blood Count',
    description: 'Complete blood analysis to check overall health and detect disorders.',
    price: 500,
    duration: '1 hour',
    category: 'Diagnostic',
    imageUrl: 'https://img.freepik.com/free-photo/hands-holding-blood-test-tubes_23-2148168322.jpg?w=740',
    features: [
      'Red Blood Cell Count',
      'White Blood Cell Count',
      'Platelet Count',
      'Hemoglobin Level',
      'Hematocrit',
      'Detailed Report'
    ],
    availability: 'Available',
    preparationRequired: 'No fasting required'
  },
  {
    _id: '6',
    name: 'ECG (Electrocardiogram)',
    description: 'Heart rhythm and electrical activity monitoring.',
    price: 600,
    duration: '20 minutes',
    category: 'Cardiac',
    imageUrl: 'https://img.freepik.com/free-photo/doctor-checking-blood-pressure-patient_1150-13175.jpg?w=826',
    features: [
      '12-Lead ECG',
      'Heart Rate Analysis',
      'Rhythm Assessment',
      'Cardiologist Review',
      'Instant Report'
    ],
    availability: 'Available',
    preparationRequired: 'No special preparation needed'
  },
  {
    _id: '7',
    name: 'Ultrasound Scan',
    description: 'Non-invasive imaging for abdomen, pelvis, and other organs.',
    price: 1500,
    duration: '30-45 minutes',
    category: 'Imaging',
    imageUrl: 'https://img.freepik.com/free-photo/human-skull-x-ray-image_1308-37299.jpg?w=826',
    features: [
      'High-Resolution Imaging',
      'Abdomen & Pelvis Scan',
      'Expert Sonologist',
      'Detailed Report',
      'CD/Digital Copy'
    ],
    availability: 'Available',
    preparationRequired: 'Full bladder required for some scans'
  },
  {
    _id: '8',
    name: 'Thyroid Function Test',
    description: 'Complete thyroid hormone level assessment.',
    price: 700,
    duration: '1 hour',
    category: 'Diagnostic',
    imageUrl: 'https://img.freepik.com/free-photo/hands-holding-blood-test-tubes_23-2148168322.jpg?w=740',
    features: [
      'TSH Level',
      'T3 & T4 Levels',
      'Free T3 & T4',
      'Thyroid Antibodies',
      'Expert Consultation'
    ],
    availability: 'Available',
    preparationRequired: 'No fasting required'
  }
];

// Helper function to get services by category
export const getServicesByCategory = (category) => {
  return dummyServices.filter(service => service.category === category);
};

// Helper function to search services
export const searchServices = (query) => {
  const lowerQuery = query.toLowerCase();
  return dummyServices.filter(service => 
    service.name.toLowerCase().includes(lowerQuery) ||
    service.description.toLowerCase().includes(lowerQuery) ||
    service.category.toLowerCase().includes(lowerQuery)
  );
};
