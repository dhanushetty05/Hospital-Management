import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, CheckCircle } from 'lucide-react';
import { services, getCategories } from '../data/services';

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...getCategories()];

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-16 mb-12">
        <div className="w-full max-w-7xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-cyan-100">Comprehensive medical services for all your healthcare needs</p>
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
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
              />
            </div>

            {/* Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg text-gray-600">
            <span className="font-bold text-gray-900">{filteredServices.length}</span> Services Available
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
              {/* Service Image */}
              <div className="h-48 bg-gradient-to-br from-cyan-100 to-blue-100">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
              </div>

              {/* Service Info */}
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-semibold mb-3">
                  {service.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                {/* Details */}
                <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock size={16} className="mr-2 text-cyan-600" />
                    <span>{service.duration}</span>
                  </div>
                  {service.features && service.features.length > 0 && (
                    <div className="flex items-start text-sm text-gray-600">
                      <CheckCircle size={16} className="mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{service.features[0]}</span>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Starting from</div>
                    <div className="text-2xl font-bold text-gray-900">₹{service.price}</div>
                  </div>
                  <Link
                    to="/appointments"
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
      </div>
    </div>
  );
};

export default ServicesPage;
