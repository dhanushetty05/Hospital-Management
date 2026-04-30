import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Users, MapPin, Award, Filter, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [searchTerm, selectedSpecialization, doctors]);

  const fetchDoctors = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/doctors`);
      const data = await response.json();

      if (data.success && data.data && data.data.length > 0) {
        setDoctors(data.data || data.doctors || []);
        setFilteredDoctors(data.data || data.doctors || []);
      } else {
        // Sample seed data to match the UI aesthetic
        const seedDoctors = [
          { _id: '1', name: 'Dr. Sarah Wilson', specialization: 'Cardiology', experience: '15+ years', rating: '4.9', patients: '5000+', fee: 1000, success: '99%' },
          { _id: '2', name: 'Dr. James Smith', specialization: 'Neurology', experience: '10+ years', rating: '4.8', patients: '3200+', fee: 1200, success: '98%' },
          { _id: '3', name: 'Dr. Emily Chen', specialization: 'Pediatrics', experience: '8+ years', rating: '4.9', patients: '4500+', fee: 800, success: '99%' },
        ];
        setDoctors(seedDoctors);
        setFilteredDoctors(seedDoctors);
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = () => {
    let filtered = doctors;

    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpecialization !== 'All') {
      filtered = filtered.filter(
        (doctor) => doctor.specialization === selectedSpecialization
      );
    }

    setFilteredDoctors(filtered);
  };

  const specializations = ['All', ...new Set(doctors.map((d) => d.specialization).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (error && doctors.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-3xl shadow-[0_4px_25px_rgb(0,0,0,0.06)] border border-gray-50">
          <div className="text-red-500 mb-4 flex justify-center">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Connection Error</h2>
          <p className="text-gray-500 mb-6 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-teal-500 text-white rounded-full hover:bg-teal-600 font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/50 to-white">
      {/* Header Section */}
      <section className="pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4 tracking-tight">Our Medical Experts</h1>
            <p className="text-gray-500 mb-10">
              Find your ideal doctor by name or specialization
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400" size={20} />
              <input
                type="text"
                placeholder="Search doctors by name or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-teal-100 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm transition-shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20 max-w-6xl">
        {/* Filters */}
        <div className="mb-10 flex flex-wrap justify-center items-center gap-3">
          <div className="flex items-center space-x-2 text-gray-500 mr-2">
            <Filter size={18} />
            <span className="text-sm font-medium">Specialization:</span>
          </div>
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialization(spec)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedSpecialization === spec
                  ? 'bg-teal-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-teal-50 border border-teal-100'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center px-2">
          <p className="text-gray-500 text-sm">
            Showing <span className="font-bold text-teal-600">{filteredDoctors.length}</span> doctors
          </p>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-50">
            <div className="text-teal-200 mb-4 flex justify-center">
              <Users size={48} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No doctors found</h3>
            <p className="text-gray-500 mb-6 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-[0_4px_25px_rgb(0,0,0,0.06)] border border-gray-50 overflow-hidden"
              >
                <div className="p-8">
                  {/* Doctor Image */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-28 h-28 rounded-full bg-teal-50 border-[3px] border-white shadow-md overflow-hidden">
                        {doctor.imageUrl ? (
                          <img
                            src={doctor.imageUrl}
                            alt={doctor.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className={`w-full h-full flex items-center justify-center ${doctor.imageUrl ? 'hidden' : 'flex'}`}
                        >
                          <span className="text-3xl font-bold text-teal-400">
                            {doctor.name?.charAt(0) || 'D'}
                          </span>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                         <div className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full text-[10px] font-bold">
                           {doctor.experience || '5+ Yrs'}
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                    <p className="text-teal-500 font-medium text-sm mb-4">{doctor.specialization}</p>

                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400 fill-yellow-400 w-3 h-3" />
                        <span className="font-semibold">{doctor.rating || '4.8'}</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{doctor.patients || '1000+'} pts</span>
                      </div>
                    </div>
                  </div>

                  {/* Fee & Book */}
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Consultation</p>
                      <p className="text-lg font-bold text-teal-700">₹{doctor.fee}</p>
                    </div>
                    
                    <Link
                      to={`/doctors/${doctor._id}`}
                      className="px-5 py-2.5 bg-teal-50 text-teal-600 rounded-full hover:bg-teal-500 hover:text-white transition-colors font-semibold text-sm flex items-center space-x-1"
                    >
                      <span>Book Visit</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
