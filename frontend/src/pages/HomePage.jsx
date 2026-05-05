import { Link } from 'react-router-dom';
import { Award, Clock, Shield, Users, Calendar, Phone, Star, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        
        const [doctorsRes, servicesRes] = await Promise.all([
          fetch(`${API_URL}/doctors?limit=6`),
          fetch(`${API_URL}/services?limit=4`)
        ]);

        const doctorsData = await doctorsRes.json();
        const servicesData = await servicesRes.json();

        if (doctorsData.success) setDoctors(doctorsData.data || []);
        if (servicesData.success) setServices(servicesData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Spacer to simulate the thin horizontal line above the hero card if needed */}
      <div className="w-full h-12 bg-white relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-100"></div>
        <div className="absolute top-1/2 left-1/4 w-1/4 h-px bg-teal-400"></div>
      </div>

      {/* Hero Section */}
      <section className="bg-white px-4 pb-16">
        <div className="container mx-auto max-w-[1100px]">
          <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden relative flex flex-col md:flex-row">
            
            {/* Left Content */}
            <div className="p-8 md:p-12 md:w-1/2 lg:w-3/5 flex flex-col justify-center relative z-10 bg-white">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center shadow-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h2 className="text-[28px] font-bold text-gray-800 tracking-tight leading-none">MediCare<span className="text-teal-500">+</span></h2>
              </div>
              
              <div className="flex items-center space-x-1 mb-6 pl-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <h1 className="text-2xl md:text-3xl font-medium text-gray-500 mb-1 leading-tight">
                Premium Healthcare
              </h1>
              <h2 className="text-4xl md:text-5xl font-bold text-teal-600 mb-8 leading-tight tracking-tight">
                At Your Fingertips
              </h2>

              {/* Feature Badges - exact flat colors */}
              <div className="grid grid-cols-2 gap-3 mb-10 max-w-sm">
                <div className="flex items-center space-x-2 bg-emerald-400 text-white px-4 py-2.5 rounded-full text-[13px] font-semibold">
                  <Award size={16} />
                  <span>Certified Specialists</span>
                </div>
                <div className="flex items-center space-x-2 bg-teal-400 text-white px-4 py-2.5 rounded-full text-[13px] font-semibold">
                  <Clock size={16} />
                  <span>24/7 Availability</span>
                </div>
                <div className="flex items-center space-x-2 bg-teal-400 text-white px-4 py-2.5 rounded-full text-[13px] font-semibold">
                  <Shield size={16} />
                  <span>Safe & Secure</span>
                </div>
                <div className="flex items-center space-x-2 bg-emerald-400 text-white px-4 py-2.5 rounded-full text-[13px] font-semibold">
                  <Users size={16} />
                  <span>500+ Doctors</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/appointments"
                  className="flex items-center justify-center space-x-2 px-8 py-3.5 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors font-bold text-sm shadow-[0_4px_14px_0_rgba(20,184,166,0.39)]"
                >
                  <Calendar size={18} />
                  <span>Book Appointment Now</span>
                </Link>
                <a
                  href="tel:108"
                  className="flex items-center justify-center space-x-2 px-8 py-3.5 bg-red-50 text-red-500 border border-red-200 rounded-full hover:bg-red-100 transition-colors font-bold text-sm"
                >
                  <Phone size={18} />
                  <span>Emergency Call</span>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="md:w-1/2 lg:w-2/5 relative bg-white flex items-end justify-end overflow-hidden pt-10">
              {/* Doctor illustration/image */}
              <div className="w-full h-full min-h-[400px] bg-cover bg-bottom bg-no-repeat" style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/successful-medical-team_329181-9252.jpg?w=1060")' }}>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-gray-100"></div>

      {/* Certified & Excellence Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-px w-16 md:w-24 bg-teal-200"></div>
            <h2 className="text-3xl font-serif text-teal-800 uppercase tracking-widest">
              CERTIFIED & EXCELLENCE
            </h2>
            <div className="h-px w-16 md:w-24 bg-teal-200"></div>
          </div>
          <p className="text-gray-500 mb-6 text-sm">
            Government recognized and internationally accredited healthcare standards
          </p>
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-teal-50 text-teal-600 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-100">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            <span>OFFICIALLY CERTIFIED</span>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-gray-100"></div>

      {/* Services Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-[1100px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-teal-900 mb-3">Our Diagnostic Services</h2>
            <p className="text-gray-500 text-sm">Safe, accurate & reliable testing.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.length > 0 ? services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            )) : (
              <>
                <ServiceCard service={{ _id: '1', name: 'Full Body Health Checkup', imageUrl: 'https://img.freepik.com/free-photo/hands-holding-blood-test-tubes_23-2148168322.jpg?w=740' }} />
                <ServiceCard service={{ _id: '2', name: 'X-Ray Scan', imageUrl: 'https://img.freepik.com/free-photo/human-skull-x-ray-image_1308-37299.jpg?w=826' }} />
                <ServiceCard service={{ _id: '3', name: 'Blood Pressure Check', imageUrl: 'https://img.freepik.com/free-photo/doctor-checking-blood-pressure-patient_1150-13175.jpg?w=826' }} />
                <ServiceCard service={{ _id: '4', name: 'Blood Sugar Test', imageUrl: 'https://img.freepik.com/free-photo/doctor-testing-patients-blood-sugar-using-glucometer_1150-14197.jpg?w=826' }} />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Certification Logos Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-[1100px]">
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap opacity-70">
            {/* Placeholder certification logos - replace with actual images */}
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Award className="text-gray-400" size={32} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-gray-100"></div>

      {/* Medical Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-[1100px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Our <span className="text-teal-600">Medical Team</span>
            </h2>
            <p className="text-gray-500 text-sm">Book appointments quickly with our verified specialists.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {doctors.length > 0 ? doctors.slice(0, 6).map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            )) : (
              <>
                <DoctorCard doctor={{ _id: '1', name: 'Dr. David Kim', specialization: 'Oncologist', experience: '7 years', imageUrl: 'https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?w=740' }} />
                <DoctorCard doctor={{ _id: '2', name: 'Dr. Emily Rodriguez', specialization: 'Pediatrician', experience: '8 years', imageUrl: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg?w=740' }} />
                <DoctorCard doctor={{ _id: '3', name: 'Dr. Kabir Malhotra', specialization: 'Nephrologist', experience: '7 years', imageUrl: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg?w=740' }} />
                <DoctorCard doctor={{ _id: '4', name: 'Dr. Rahul Sharma', specialization: 'Cardiologist', experience: '10 years', imageUrl: 'https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg?w=740' }} />
              </>
            )}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-gray-100"></div>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-teal-50/30">
        <div className="container mx-auto px-4 max-w-[1100px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-blue-900">Voices of Trust</h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Real stories from doctors and patients sharing their positive experiences with our healthcare platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Medical Professionals */}
            <div className="bg-blue-50/50 border-2 border-blue-200 rounded-3xl p-8">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <Users className="text-white" size={18} />
                </div>
                <h3 className="text-xl font-bold text-blue-900">Medical Professionals</h3>
              </div>
              <p className="text-sm text-gray-500 italic mb-6">on patient care.</p>
              
              <div className="space-y-4">
                <TestimonialCard 
                  name="Dr. Robert Martinez"
                  role="Pediatrician"
                  text="This platform has streamlined our clinic operations significantly. Patient management is much more organized."
                  rating={5}
                />
                <TestimonialCard 
                  name="Dr. Amanda Lee"
                  role="Dermatologist"
                  text="Excellent platform for managing appointments. Automated reminders reduce no-shows dramatically."
                  rating={5}
                />
                <TestimonialCard 
                  name="Dr. Sarah Johnson"
                  role="Cardiologist"
                  text="The appointment booking system is incredibly efficient. It saves us valuable time and helps us focus."
                  rating={5}
                />
              </div>
            </div>

            {/* Patients */}
            <div className="bg-teal-50/50 border-2 border-teal-200 rounded-3xl p-8">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center">
                  <Star className="text-white fill-white" size={18} />
                </div>
                <h3 className="text-xl font-bold text-teal-900">Patients</h3>
              </div>
              <p className="text-sm text-gray-500 italic mb-6">sharing their experiences.</p>
              
              <div className="space-y-4">
                <TestimonialCard 
                  name="Michael Chen"
                  role="Patient"
                  text="Scheduling appointments has never been easier. The interface is intuitive and reminders are very helpful."
                  rating={5}
                />
                <TestimonialCard 
                  name="Emily Williams"
                  role="Patient"
                  text="Booking appointments online 24/7 is a game-changer. The confirmation system gives me peace of mind."
                  rating={5}
                />
                <TestimonialCard 
                  name="David Thompson"
                  role="Patient"
                  text="The wait times have reduced significantly since using this system."
                  rating={5}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const DoctorCard = ({ doctor }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-50 overflow-hidden p-6 text-center"
    >
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full bg-teal-50 overflow-hidden border-2 border-white shadow-md">
          {doctor.imageUrl ? (
            <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-teal-400">
              {doctor.name?.charAt(0) || 'D'}
            </div>
          )}
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-gray-800 mb-1">{doctor.name}</h3>
      <p className="text-teal-500 font-medium text-sm mb-3">{doctor.specialization}</p>
      
      <div className="flex items-center justify-center space-x-1 text-xs text-gray-500 mb-4">
        <Award className="w-3 h-3 text-teal-500" />
        <span>{doctor.experience || '5+ years'} Experience</span>
      </div>
      
      <Link 
        to={`/doctors/${doctor._id}`} 
        className="w-full py-2.5 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors text-sm flex items-center justify-center space-x-1"
      >
        <ChevronRight size={14} />
        <span>Book Now</span>
      </Link>
    </motion.div>
  );
};

const TestimonialCard = ({ name, role, text, rating }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-gray-600">{name.charAt(0)}</span>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-800 text-sm">{name}</h4>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
        <div className="flex space-x-0.5">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 italic leading-relaxed">"{text}"</p>
    </div>
  );
};

const ServiceCard = ({ service }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-gray-50 overflow-hidden flex flex-col p-4"
    >
      <div className="h-44 w-full bg-teal-50 rounded-[1.5rem] overflow-hidden mb-5 relative flex items-center justify-center p-2">
        {service.imageUrl ? (
          <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover rounded-xl" />
        ) : (
          <Award className="text-teal-200 w-12 h-12" />
        )}
      </div>
      <div className="text-center flex-grow flex flex-col justify-between">
        <h3 className="text-[15px] font-bold text-teal-900 mb-4 px-2 leading-tight h-10">{service.name}</h3>
        <Link 
          to={service._id ? `/services/${service._id}` : '/services'} 
          className="w-full py-2.5 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 transition-colors text-[13px] flex items-center justify-center space-x-1"
        >
          <ChevronRight size={14} className="opacity-70" />
          <span>Book Now</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default HomePage;
