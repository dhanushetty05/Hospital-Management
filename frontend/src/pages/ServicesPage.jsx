import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Award, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [searchTerm, services]);

  const fetchServices = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/services`);
      const data = await response.json();

      if (data.success && data.data && data.data.length > 0) {
        setServices(data.data || data.services || []);
        setFilteredServices(data.data || data.services || []);
      } else {
        // Fallback to hardcoded ones matching the design if none exist in DB
        const hardcodedServices = [
          { _id: '1', name: 'Full Body Health Checkup', imageUrl: 'https://img.freepik.com/free-photo/hands-holding-blood-test-tubes_23-2148168322.jpg?w=740' },
          { _id: '2', name: 'X-Ray Scan', imageUrl: 'https://img.freepik.com/free-photo/human-skull-x-ray-image_1308-37299.jpg?w=826' },
          { _id: '3', name: 'Blood Pressure Check', imageUrl: 'https://img.freepik.com/free-photo/doctor-checking-blood-pressure-patient_1150-13175.jpg?w=826' },
          { _id: '4', name: 'Blood Sugar Test', imageUrl: 'https://img.freepik.com/free-photo/doctor-testing-patients-blood-sugar-using-glucometer_1150-14197.jpg?w=826' },
        ];
        setServices(hardcodedServices);
        setFilteredServices(hardcodedServices);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      // Fallback
      const hardcodedServices = [
        { _id: '1', name: 'Full Body Health Checkup', imageUrl: 'https://img.freepik.com/free-photo/hands-holding-blood-test-tubes_23-2148168322.jpg?w=740' },
        { _id: '2', name: 'X-Ray Scan', imageUrl: 'https://img.freepik.com/free-photo/human-skull-x-ray-image_1308-37299.jpg?w=826' },
        { _id: '3', name: 'Blood Pressure Check', imageUrl: 'https://img.freepik.com/free-photo/doctor-checking-blood-pressure-patient_1150-13175.jpg?w=826' },
        { _id: '4', name: 'Blood Sugar Test', imageUrl: 'https://img.freepik.com/free-photo/doctor-testing-patients-blood-sugar-using-glucometer_1150-14197.jpg?w=826' },
      ];
      setServices(hardcodedServices);
      setFilteredServices(hardcodedServices);
    } finally {
      setLoading(false);
    }
  };

  const filterServices = () => {
    if (searchTerm) {
      const filtered = services.filter((service) =>
        service.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices(services);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/50 to-white">
      {/* Header */}
      <section className="pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4 tracking-tight">Our Diagnostic Services</h1>
            <p className="text-gray-500 mb-10">Safe, accurate & reliable testing.</p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-teal-400" size={20} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-teal-100 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm transition-shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20 max-w-6xl">
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-50">
            <Award size={48} className="mx-auto text-teal-200 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No services found</h3>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2rem] shadow-[0_4px_25px_rgb(0,0,0,0.06)] border border-gray-50 overflow-hidden flex flex-col p-4"
              >
                <div className="h-48 w-full bg-teal-50/30 rounded-[1.5rem] overflow-hidden mb-6 relative">
                  {service.imageUrl ? (
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover mix-blend-multiply"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Award className="text-teal-200" size={48} />
                    </div>
                  )}
                </div>

                <div className="text-center flex-grow flex flex-col justify-between">
                  <h3 className="text-[17px] font-bold text-teal-900 mb-6 px-2">
                    {service.name}
                  </h3>

                  <Link
                    to={`/services/${service._id}`}
                    className="w-full py-3 bg-teal-500 text-white rounded-[1rem] hover:bg-teal-600 transition-colors font-medium text-sm flex items-center justify-center space-x-1"
                  >
                    <ChevronRight size={16} />
                    <span>Book Now</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
