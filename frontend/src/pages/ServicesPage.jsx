import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import S1 from '../assets/S1.png';
import S2 from '../assets/S2.png';
import S3 from '../assets/S3.png';
import S4 from '../assets/S4.png';
import S5 from '../assets/S5.png';
import S6 from '../assets/S6.png';
import S7 from '../assets/S7.png';
import S8 from '../assets/S8.png';

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const services = [
    { id: 1, name: 'Blood Pressure Check', category: 'Vital Check', image: S1 },
    { id: 2, name: 'Blood Sugar Test', category: 'Diagnostic', image: S2 },
    { id: 3, name: 'Full Blood Count', category: 'Diagnostic', image: S3 },
    { id: 4, name: 'X-Ray Scan', category: 'Imaging', image: S4 },
    { id: 5, name: 'ECG Test', category: 'Cardiac', image: S5 },
    { id: 6, name: 'Ultrasound Scan', category: 'Imaging', image: S6 },
    { id: 7, name: 'Thyroid Test', category: 'Diagnostic', image: S7 },
    { id: 8, name: 'Vaccination', category: 'Preventive', image: S8 },
  ];

  const categories = ['All', 'Vital Check', 'Diagnostic', 'Imaging', 'Cardiac', 'Preventive'];

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: 'linear-gradient(to bottom, #e8f9f7 0%, #f5fffe 50%, #ffffff 100%)' }}>
      {/* Header */}
      <div className="py-12 mb-8">
        <div className="w-full max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Our <span className="text-teal-600">Diagnostic Services</span></h1>
          <p className="text-gray-600 text-lg">Safe, accurate & reliable testing</p>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-teal-100">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
              />
            </div>

            {/* Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-5 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:scale-105 border border-teal-100">
              <div className="h-48 overflow-hidden">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{service.name}</h3>
                <p className="text-sm text-teal-600 font-medium mb-4">{service.category}</p>
                <Link
                  to="/appointments"
                  className="block w-full py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-semibold text-sm shadow-md"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No services found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
