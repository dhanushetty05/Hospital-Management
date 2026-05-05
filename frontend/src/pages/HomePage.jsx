import { Link } from 'react-router-dom';
import { Calendar, Users, Award, Clock, Star, ArrowRight, Phone, CheckCircle } from 'lucide-react';
import { doctors } from '../data/doctors';
import { services } from '../data/services';

const HomePage = () => {
  const topDoctors = doctors.slice(0, 6);
  const topServices = services.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-50 via-blue-50 to-white pt-32 pb-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block px-4 py-2 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-6">
                ✨ Your Health, Our Priority
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Premium Healthcare
                <span className="block text-cyan-600">At Your Fingertips</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Experience world-class medical care with our team of expert doctors and modern facilities. Book appointments online and get instant access to quality healthcare.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/appointments"
                  className="inline-flex items-center justify-center px-8 py-4 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  <Calendar className="mr-2" size={24} />
                  Book Appointment
                </Link>
                <a
                  href="tel:108"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:border-cyan-600 hover:text-cyan-600 transition-all font-semibold text-lg"
                >
                  <Phone className="mr-2" size={24} />
                  Emergency: 108
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">10,000+</div>
                  <div className="text-sm text-gray-600">Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">30+</div>
                  <div className="text-sm text-gray-600">Services</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">4.9</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800"
                alt="Healthcare"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="text-cyan-600" size={28} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600">We provide comprehensive healthcare services with a focus on quality, accessibility, and patient satisfaction.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: '24/7 Availability', desc: 'Round-the-clock medical care and emergency services', color: 'cyan' },
              { icon: Award, title: 'Certified Doctors', desc: 'Highly qualified and experienced medical professionals', color: 'blue' },
              { icon: CheckCircle, title: 'Quality Care', desc: 'International standards of healthcare excellence', color: 'green' },
              { icon: Users, title: 'Modern Equipment', desc: 'State-of-the-art medical technology and facilities', color: 'purple' }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all">
                  <div className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`text-${feature.color}-600`} size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Expert Doctors */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expert Doctors</h2>
              <p className="text-xl text-gray-600">Meet our team of highly qualified medical professionals</p>
            </div>
            <Link to="/doctors" className="hidden sm:flex items-center text-cyan-600 hover:text-cyan-700 font-semibold text-lg group">
              View All
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-cyan-100 to-blue-100 relative">
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-gray-900">{doctor.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-cyan-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Available
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-cyan-600 font-semibold mb-3">{doctor.specialization}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>{doctor.experience}</span>
                    <span>{doctor.patients}+ patients</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500">Consultation</div>
                      <div className="text-xl font-bold text-gray-900">₹{doctor.consultationFee}</div>
                    </div>
                    <Link
                      to="/appointments"
                      state={{ selectedDoctor: doctor }}
                      className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/doctors" className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-semibold text-lg">
              View All Doctors
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600">Comprehensive healthcare services for all your needs</p>
            </div>
            <Link to="/services" className="hidden sm:flex items-center text-cyan-600 hover:text-cyan-700 font-semibold text-lg group">
              View All
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topServices.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-cyan-100 to-blue-100">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-500">Starting from</div>
                      <div className="text-xl font-bold text-gray-900">₹{service.price}</div>
                    </div>
                    <Link
                      to="/appointments"
                      className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold text-sm"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600">
        <div className="w-full max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Book your appointment today and experience quality healthcare
          </p>
          <Link
            to="/appointments"
            className="inline-flex items-center px-8 py-4 bg-white text-cyan-600 rounded-xl hover:shadow-2xl transition-all font-semibold text-lg"
          >
            <Calendar className="mr-2" size={24} />
            Book Appointment Now
            <ArrowRight className="ml-2" size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
