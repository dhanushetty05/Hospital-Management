// Complete static services data
export const services = [
  {
    id: 'SRV001',
    name: 'Full Body Health Checkup',
    description: 'Comprehensive health screening including blood tests, vitals check, ECG, and doctor consultation.',
    price: 2500,
    duration: '2-3 hours',
    category: 'Diagnostic',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500',
    features: [
      'Complete Blood Count (CBC)',
      'Lipid Profile',
      'Liver & Kidney Function Tests',
      'Thyroid Profile',
      'Blood Sugar Test',
      'ECG',
      'Doctor Consultation'
    ]
  },
  {
    id: 'SRV002',
    name: 'X-Ray Imaging',
    description: 'Digital X-ray imaging for bones, chest, and other body parts with instant results.',
    price: 800,
    duration: '15-30 minutes',
    category: 'Imaging',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500',
    features: [
      'Digital X-Ray Technology',
      'Instant Results',
      'Expert Radiologist Review',
      'CD/Digital Copy Provided'
    ]
  },
  {
    id: 'SRV003',
    name: 'Blood Pressure Monitoring',
    description: 'Regular blood pressure monitoring and cardiovascular health assessment.',
    price: 300,
    duration: '15 minutes',
    category: 'Vital Check',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500',
    features: [
      'Digital BP Monitoring',
      'Heart Rate Check',
      'Cardiovascular Assessment',
      'Health Counseling'
    ]
  },
  {
    id: 'SRV004',
    name: 'Diabetes Screening',
    description: 'Complete diabetes screening including fasting and post-meal glucose levels.',
    price: 500,
    duration: '30 minutes',
    category: 'Diagnostic',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500',
    features: [
      'Fasting Blood Sugar',
      'Post-Prandial Sugar',
      'HbA1c Test',
      'Diabetic Counseling'
    ]
  },
  {
    id: 'SRV005',
    name: 'ECG (Electrocardiogram)',
    description: 'Heart rhythm and electrical activity monitoring for cardiac health assessment.',
    price: 600,
    duration: '20 minutes',
    category: 'Cardiac',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=500',
    features: [
      '12-Lead ECG',
      'Heart Rate Analysis',
      'Rhythm Assessment',
      'Cardiologist Review'
    ]
  },
  {
    id: 'SRV006',
    name: 'Ultrasound Scan',
    description: 'Non-invasive imaging for abdomen, pelvis, and other organs.',
    price: 1500,
    duration: '30-45 minutes',
    category: 'Imaging',
    image: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=500',
    features: [
      'High-Resolution Imaging',
      'Abdomen & Pelvis Scan',
      'Expert Sonologist',
      'Detailed Report'
    ]
  },
  {
    id: 'SRV007',
    name: 'Thyroid Function Test',
    description: 'Complete thyroid hormone level assessment and thyroid health check.',
    price: 700,
    duration: '1 hour',
    category: 'Diagnostic',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500',
    features: [
      'TSH Level',
      'T3 & T4 Levels',
      'Free T3 & T4',
      'Expert Consultation'
    ]
  },
  {
    id: 'SRV008',
    name: 'Vaccination Services',
    description: 'Complete vaccination services for children and adults including COVID-19.',
    price: 500,
    duration: '15 minutes',
    category: 'Preventive',
    image: 'https://images.unsplash.com/photo-1632053002928-9e9c7e1f1d7f?w=500',
    features: [
      'Child Vaccinations',
      'Adult Vaccinations',
      'COVID-19 Vaccines',
      'Vaccination Certificate'
    ]
  }
];

// Helper functions
export const getCategories = () => {
  return [...new Set(services.map(srv => srv.category))].sort();
};

export const getServiceById = (id) => {
  return services.find(srv => srv.id === id);
};

export const searchServices = (query) => {
  const lowerQuery = query.toLowerCase();
  return services.filter(srv =>
    srv.name.toLowerCase().includes(lowerQuery) ||
    srv.description.toLowerCase().includes(lowerQuery)
  );
};

export const filterByCategory = (category) => {
  if (!category || category === 'All') return services;
  return services.filter(srv => srv.category === category);
};
