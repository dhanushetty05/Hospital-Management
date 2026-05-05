import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchAppointments();
    } else if (isLoaded && !isSignedIn) {
      setLoading(false);
      setError('Please sign in to view your appointments');
    }
  }, [isLoaded, isSignedIn]);

  const fetchAppointments = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE}/appointments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setAppointments(data.data || data.appointments || []);
      } else {
        setError(data.message || 'Failed to fetch appointments');
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'completed':
        return <CheckCircle size={16} />;
      case 'pending':
        return <AlertCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-teal-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to view your appointments</p>
            <a
              href="/login"
              className="inline-block px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors font-semibold"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-teal-800 mb-3">Your Appointments</h1>
            <p className="text-gray-600">Manage and track your medical appointments</p>
          </div>

          {/* Doctor Appointments Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-teal-800 mb-6">Your Doctor Appointments</h2>
            
            {appointments.filter(apt => apt.doctorId || apt.doctorName).length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                <Calendar className="mx-auto text-teal-200 mb-4" size={64} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">No doctor appointments found.</h3>
                <p className="text-gray-600 mb-6">Book your first appointment with our expert doctors</p>
                <a
                  href="/doctors"
                  className="inline-block px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors font-semibold"
                >
                  Browse Doctors
                </a>
              </div>
            ) : (
              <div className="grid gap-6">
                {appointments.filter(apt => apt.doctorId || apt.doctorName).map((appointment, index) => (
                  <motion.div
                    key={appointment._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                            {appointment.doctorImageUrl ? (
                              <img 
                                src={appointment.doctorImageUrl} 
                                alt={appointment.doctorName}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <User className="text-teal-600" size={28} />
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">{appointment.doctorName || 'Doctor'}</h3>
                            <p className="text-teal-600 font-medium text-sm">{appointment.speciality || appointment.specialization || 'Specialist'}</p>
                          </div>
                        </div>
                        
                        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span className="font-semibold text-sm capitalize">{appointment.status || 'Pending'}</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Calendar className="text-teal-500" size={18} />
                          <span className="text-sm">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Clock className="text-teal-500" size={18} />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <User className="text-teal-500" size={18} />
                          <span className="text-sm">{appointment.patientName}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Phone className="text-teal-500" size={18} />
                          <span className="text-sm">{appointment.mobile}</span>
                        </div>
                        {appointment.location && (
                          <div className="flex items-center space-x-3 text-gray-600 md:col-span-2">
                            <MapPin className="text-teal-500" size={18} />
                            <span className="text-sm">{appointment.location}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-3 text-gray-600">
                          <span className="text-sm font-semibold">Fee:</span>
                          <span className="text-lg font-bold text-teal-600">₹{appointment.fee || appointment.fees || 0}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <span className="text-sm font-semibold">Payment:</span>
                          <span className="text-sm">{appointment.paymentMethod || 'Cash'}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Service Appointments Section */}
          <div>
            <h2 className="text-2xl font-bold text-teal-800 mb-6">Your Booked Services</h2>
            
            {appointments.filter(apt => apt.serviceId || apt.serviceName).length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                <Calendar className="mx-auto text-teal-200 mb-4" size={64} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">No service bookings found.</h3>
                <p className="text-gray-600 mb-6">Explore our diagnostic services</p>
                <a
                  href="/services"
                  className="inline-block px-6 py-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition-colors font-semibold"
                >
                  Browse Services
                </a>
              </div>
            ) : (
              <div className="grid gap-6">
                {appointments.filter(apt => apt.serviceId || apt.serviceName).map((appointment, index) => (
                  <motion.div
                    key={appointment._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{appointment.serviceName || 'Service'}</h3>
                          <p className="text-gray-600 text-sm">{appointment.description || 'Diagnostic Service'}</p>
                        </div>
                        
                        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(appointment.status)} mt-4 md:mt-0`}>
                          {getStatusIcon(appointment.status)}
                          <span className="font-semibold text-sm capitalize">{appointment.status || 'Pending'}</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Calendar className="text-teal-500" size={18} />
                          <span className="text-sm">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Clock className="text-teal-500" size={18} />
                          <span className="text-sm">{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <User className="text-teal-500" size={18} />
                          <span className="text-sm">{appointment.patientName}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Phone className="text-teal-500" size={18} />
                          <span className="text-sm">{appointment.mobile}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <span className="text-sm font-semibold">Fee:</span>
                          <span className="text-lg font-bold text-teal-600">₹{appointment.fee || appointment.fees || 0}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                          <span className="text-sm font-semibold">Payment:</span>
                          <span className="text-sm">{appointment.paymentMethod || 'Cash'}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
