import { Link } from 'react-router-dom';
import { Calendar, Phone, ArrowRight, Award } from 'lucide-react';
import BannerImg from '../assets/BannerImg.png';
import HD1 from '../assets/HD1.png';
import HD2 from '../assets/HD2.png';
import HD3 from '../assets/HD3.png';
import HD4 from '../assets/HD4.png';
import HD5 from '../assets/HD5.png';
import HD6 from '../assets/HD6.png';
import HD7 from '../assets/HD7.png';
import HD8 from '../assets/HD8.png';
import S1 from '../assets/S1.png';
import S2 from '../assets/S2.png';
import S3 from '../assets/S3.png';
import S4 from '../assets/S4.png';
import S5 from '../assets/S5.png';
import S6 from '../assets/S6.png';
import S7 from '../assets/S7.png';
import S8 from '../assets/S8.png';
import C1 from '../assets/C1.png';
import C2 from '../assets/C2.png';
import C3 from '../assets/C3.png';
import C4 from '../assets/C4.svg';
import C5 from '../assets/C5.png';
import C6 from '../assets/C6.png';
import C7 from '../assets/C7.svg';

const HomePage = () => {
  const doctors = [
    { id: 1, name: 'Dr. David Kim', specialization: 'Oncologist', experience: '7 years Experience', image: HD1 },
    { id: 2, name: 'Dr. Emily Rodriguez', specialization: 'Pediatrician', experience: '8 years Experience', image: HD2 },
    { id: 3, name: 'Dr. Kabir Malhotra', specialization: 'Nephrologist', experience: '7 years Experience', image: HD3 },
    { id: 4, name: 'Dr. Rahul Sharma', specialization: 'Cardiologist', experience: '10 years Experience', image: HD4 },
    { id: 5, name: 'Dr. Rohan Mehta', specialization: 'ENT Specialist', experience: '5 years Experience', image: HD5 },
    { id: 6, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', experience: '9 years Experience', image: HD6 },
    { id: 7, name: 'Dr. Lisa Anderson', specialization: 'Psychiatrist', experience: '9 years Experience', image: HD7 },
    { id: 8, name: 'Dr. Thomas Lee', specialization: 'Urologist', experience: '12 years Experience', image: HD8 },
  ];

  const services = [
    { id: 1, name: 'Blood Pressure Check', image: S1 },
    { id: 2, name: 'Blood Sugar Test', image: S2 },
    { id: 3, name: 'Full Blood Count', image: S3 },
    { id: 4, name: 'X-Ray Scan', image: S4 },
    { id: 5, name: 'ECG Test', image: S5 },
    { id: 6, name: 'Ultrasound Scan', image: S6 },
    { id: 7, name: 'Thyroid Test', image: S7 },
    { id: 8, name: 'Vaccination', image: S8 },
  ];

  const certifications = [
    { id: 1, name: 'Medical Commission', image: C1 },
    { id: 2, name: 'Government Approved', image: C2 },
    { id: 3, name: 'NABH Accredited', image: C3 },
    { id: 4, name: 'Medical Council', image: C4 },
    { id: 5, name: 'Quality Healthcare', image: C5 },
    { id: 6, name: 'Paramedical Council', image: C6 },
    { id: 7, name: 'Ministry of Health', image: C7 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ background: 'linear-gradient(to bottom, #e8f9f7 0%, #f5fffe 50%, #ffffff 100%)' }}>
      {/* HERO SECTION */}
      <section className="w-full pt-28 pb-16 flex justify-center">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ borderLeft: '8px solid #14b8a6' }}>
            <div className="grid lg:grid-cols-2 gap-0">
              {/* LEFT CONTENT */}
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                {/* MediCare+ with Icon and Stars */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <span className="text-3xl font-bold text-gray-900">
                      Medi<span className="text-teal-600">Care+</span>
                    </span>
                  </div>
                  <div className="flex gap-1 ml-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Headings */}
                <div className="mb-6">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-600 mb-1 leading-tight">Premium Healthcare</h1>
                  <h1 className="text-3xl lg:text-4xl font-bold text-teal-600 leading-tight">At Your Fingertips</h1>
                </div>

                {/* 4 Green Pills */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-teal-500 text-white px-4 py-2.5 rounded-full flex items-center gap-2 shadow-md">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm font-bold whitespace-nowrap">Certified Specialists</span>
                  </div>
                  <div className="bg-teal-500 text-white px-4 py-2.5 rounded-full flex items-center gap-2 shadow-md">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm font-bold whitespace-nowrap">24/7 Availability</span>
                  </div>
                  <div className="bg-teal-500 text-white px-4 py-2.5 rounded-full flex items-center gap-2 shadow-md">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm font-bold whitespace-nowrap">Safe & Secure</span>
                  </div>
                  <div className="bg-teal-500 text-white px-4 py-2.5 rounded-full flex items-center gap-2 shadow-md">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                    <span className="text-sm font-bold whitespace-nowrap">500+ Doctors</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/appointments" className="flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-full font-bold hover:bg-teal-700 transition-all shadow-lg text-sm">
                    <Calendar size={18} />
                    <span>Book Appointment Now</span>
                  </Link>
                  <a href="tel:+918299431275" className="flex items-center justify-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 transition-all shadow-lg text-sm">
                    <Phone size={18} />
                    <span>Emergency Call</span>
                  </a>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="h-full min-h-[450px] lg:min-h-[500px]">
                <img src={BannerImg} alt="Medical Team" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION SECTION */}
      <section className="w-full py-16 bg-white flex justify-center">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 mb-5">
            <div className="h-px w-24 bg-gray-300"></div>
            <h2 className="text-4xl font-bold text-teal-700" style={{ letterSpacing: '0.15em' }}>
              CERTIFIED & EXCELLENCE
            </h2>
            <div className="h-px w-24 bg-gray-300"></div>
          </div>
          <p className="text-gray-600 text-base mb-6 max-w-2xl mx-auto">
            Government recognized and internationally accredited healthcare standards
          </p>
          <div className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            OFFICIALLY CERTIFIED
          </div>
        </div>
      </section>

      {/* OUR MEDICAL TEAM */}
      <section className="w-full py-16 flex justify-center" style={{ background: 'linear-gradient(to bottom, #e8f9f7 0%, #f5fffe 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              Our <span className="text-teal-600">Medical Team</span>
            </h2>
            <p className="text-gray-600 text-base">Book appointments quickly with our verified specialists.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105">
                <div className="p-5">
                  <div className="mb-4">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-64 object-cover rounded-xl" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-1">{doctor.name}</h3>
                  <p className="text-teal-600 font-semibold text-sm text-center mb-3">{doctor.specialization}</p>
                  <div className="flex items-center justify-center gap-2 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full mb-4 text-xs font-medium">
                    <Award size={14} />
                    <span>{doctor.experience}</span>
                  </div>
                  <Link to={`/doctors/${doctor.id}`} className="flex items-center justify-center gap-2 w-full py-2.5 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-semibold text-sm shadow-md">
                    <ArrowRight size={16} />
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/doctors" className="inline-flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all shadow-lg font-semibold">
              View All Doctors
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="w-full py-16 bg-white flex justify-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              Why <span className="text-teal-600">Choose Us</span>
            </h2>
            <p className="text-gray-600 text-base">Experience healthcare excellence with our comprehensive services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-teal-100">
              <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Expert Doctors</h3>
              <p className="text-sm text-gray-600 text-center">Certified specialists with years of experience</p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-teal-100">
              <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">24/7 Service</h3>
              <p className="text-sm text-gray-600 text-center">Round-the-clock emergency care available</p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-teal-100">
              <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Advanced Technology</h3>
              <p className="text-sm text-gray-600 text-center">State-of-the-art medical equipment</p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-teal-100">
              <div className="w-14 h-14 bg-teal-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Patient Care</h3>
              <p className="text-sm text-gray-600 text-center">Compassionate and personalized treatment</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR DIAGNOSTIC SERVICES */}
      <section className="w-full py-16 flex justify-center" style={{ background: 'linear-gradient(to bottom, #e8f9f7 0%, #f5fffe 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              Our <span className="text-teal-600">Diagnostic Services</span>
            </h2>
            <p className="text-gray-600 text-base">Safe, accurate & reliable testing</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{service.name}</h3>
                  <Link
                    to="/services"
                    className="block w-full py-2.5 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-semibold text-sm shadow-md"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all shadow-lg font-semibold">
              View All Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS & ACCREDITATIONS */}
      <section className="w-full py-16 bg-white overflow-hidden flex justify-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3">
              Certifications & <span className="text-teal-600">Accreditations</span>
            </h2>
            <p className="text-gray-600 text-base">Recognized by leading healthcare authorities</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-gradient-to-br from-teal-50 to-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all border border-teal-100 flex items-center justify-center">
                <img src={cert.image} alt={cert.name} className="w-full h-12 object-contain grayscale hover:grayscale-0 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
