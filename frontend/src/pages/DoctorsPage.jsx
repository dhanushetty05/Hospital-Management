import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Award, Users, Calendar, MapPin } from 'lucide-react';
import { doctors, getSpecializations } from '../data/doctors';

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');

  const specializations = ['All', ...getSpecializations()];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialization =
      selectedSpecialization === 'All' ||
      doctor.specialization === selectedSpecialization;

    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16 mb-12">
        <div className="w-full max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Expert Doctors</h1>
          <p className="text-xl text-cyan-100">Find and book appointments with our specialists</p>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
              />
            </div>

            {/* Filter */}
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec === 'All' ? 'All Specializations' : spec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg text-gray-600">
            Showing <span className="font-bold text-gray-900">{filteredDoctors.length}</span> doctors
          </p>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <Users size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                {/* Doctor Image */}
                <div className="h-64 bg-gradient-to-br from-cyan-100 to-blue-100 relative">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-full flex items-center space-x-1 shadow-lg">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-900">{doctor.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-cyan-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Available
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-cyan-600 font-semibold mb-1">{doctor.specialization}</p>
                  <p className="text-sm text-gray-600 mb-4">{doctor.qualification}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{doctor.experience}</div>
                      <div className="text-xs text-gray-500">Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{doctor.patients}+</div>
                      <div className="text-xs text-gray-500">Patients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{doctor.rating}</div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">Consultation Fee</div>
                      <div className="text-2xl font-bold text-gray-900">₹{doctor.consultationFee}</div>
                    </div>
                    <Link
                      to="/appointments"
                      state={{ selectedDoctor: doctor }}
                      className="flex items-center space-x-2 px-6 py-3 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors font-semibold"
                    >
                      <Calendar size={18} />
                      <span>Book</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
