import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Award } from 'lucide-react';
import D1 from '../assets/D1.png';
import D2 from '../assets/D2.png';
import D3 from '../assets/D3.png';
import D4 from '../assets/D4.png';
import D5 from '../assets/D5.png';
import D6 from '../assets/D6.png';
import D7 from '../assets/D7.png';
import D8 from '../assets/D8.png';
import D9 from '../assets/D9.png';
import D10 from '../assets/D10.png';
import D11 from '../assets/D11.png';
import D12 from '../assets/D12.png';

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All Specializations');

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiologist', experience: '15 years Experience', rating: 4.9, image: D1 },
    { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurologist', experience: '12 years Experience', rating: 4.8, image: D2 },
    { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'Pediatrician', experience: '10 years Experience', rating: 4.9, image: D3 },
    { id: 4, name: 'Dr. David Kim', specialization: 'Orthopedic', experience: '18 years Experience', rating: 4.9, image: D4 },
    { id: 5, name: 'Dr. Priya Sharma', specialization: 'Dermatologist', experience: '8 years Experience', rating: 4.7, image: D5 },
    { id: 6, name: 'Dr. James Wilson', specialization: 'General Physician', experience: '20 years Experience', rating: 4.8, image: D6 },
    { id: 7, name: 'Dr. Aisha Patel', specialization: 'Gynecologist', experience: '14 years Experience', rating: 4.9, image: D7 },
    { id: 8, name: 'Dr. Robert Martinez', specialization: 'ENT Specialist', experience: '11 years Experience', rating: 4.7, image: D8 },
    { id: 9, name: 'Dr. Lisa Anderson', specialization: 'Psychiatrist', experience: '9 years Experience', rating: 4.8, image: D9 },
    { id: 10, name: 'Dr. Raj Kumar', specialization: 'Gastroenterologist', experience: '13 years Experience', rating: 4.8, image: D10 },
    { id: 11, name: 'Dr. Maria Garcia', specialization: 'Ophthalmologist', experience: '16 years Experience', rating: 4.9, image: D11 },
    { id: 12, name: 'Dr. Thomas Lee', specialization: 'Urologist', experience: '12 years Experience', rating: 4.7, image: D12 },
  ];

  const specializations = ['All Specializations', 'Cardiologist', 'Neurologist', 'Pediatrician', 'Orthopedic', 'Dermatologist', 'General Physician', 'Gynecologist', 'ENT Specialist', 'Psychiatrist', 'Gastroenterologist', 'Ophthalmologist', 'Urologist'];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === 'All Specializations' || doctor.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: 'linear-gradient(to bottom, #d4f4f0 0%, #e8f9f7 50%, #ffffff 100%)' }}>
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Our Medical Experts</h1>
          <p className="text-gray-600 text-lg">Book appointments quickly with our verified specialists</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base shadow-sm"
            />
          </div>
        </div>

        {/* Filter Dropdown */}
        <div className="mb-10 max-w-xs mx-auto">
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="w-full px-5 py-3 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base shadow-sm"
          >
            {specializations.map((spec) => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-teal-100">
              <div className="relative pt-8 pb-4">
                {/* Circular Doctor Photo */}
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-teal-500 shadow-lg">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                </div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-sm text-gray-900">{doctor.rating}</span>
                </div>
              </div>

              <div className="px-6 pb-6 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-teal-600 font-semibold text-sm mb-3">{doctor.specialization}</p>
                
                {/* Experience Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mb-4 bg-teal-50 py-2 px-4 rounded-full inline-flex mx-auto">
                  <Award size={14} className="text-teal-600" />
                  <span className="font-medium">{doctor.experience}</span>
                </div>

                {/* Book Now Button */}
                <Link
                  to={`/doctors/${doctor.id}`}
                  className="block w-full py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-semibold text-sm shadow-md hover:shadow-lg"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No doctors found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
