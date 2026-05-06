import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Trash2, Plus, X, User, Mail, Phone, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const AppointmentsPage = () => {
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
    if (location.state?.selectedDoctor) {
      setSelectedDoctor(location.state.selectedDoctor);
      setShowBookModal(true);
    }
  }, [location]);

  const fetchDoctors = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/doctors`);
      const data = await response.json();
      
      if (data.success) {
        setDoctors(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Failed to load doctors');
    }
  };

  const fetchAppointments = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/appointments`);
      const data = await response.json();
      
      if (data.success) {
        setAppointments(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Appointment cancelled successfully');
        fetchAppointments();
      }
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #e8f9f7 0%, #f5fffe 50%, #ffffff 100%)', paddingTop: '8rem' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center" style={{ background: 'linear-gradient(to bottom, #e8f9f7 0%, #f5fffe 50%, #ffffff 100%)', paddingTop: '8rem', paddingBottom: '3rem' }}>
      <div className="w-full max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Your <span className="text-teal-600">Appointments</span>
          </h1>
          <p className="text-gray-600 text-lg">Manage your doctor appointments and service bookings</p>
        </div>

        {/* Book New Appointment Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowBookModal(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all font-bold text-lg shadow-xl"
          >
            <Plus size={20} />
            Book New Appointment
          </button>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-teal-100 overflow-hidden mx-auto" style={{ maxWidth: '1200px' }}>
          {appointments.length === 0 ? (
            <div className="p-20 text-center">
              <Calendar size={80} className="mx-auto text-teal-300 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No appointments yet</h3>
              <p className="text-gray-600 text-lg mb-8">Book your first appointment to get started</p>
              <button
                onClick={() => setShowBookModal(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all font-bold shadow-lg"
              >
                <Plus size={20} />
                Book Appointment
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gradient-to-r from-teal-500 to-teal-600">
                  <tr>
                    <th className="pl-8 pr-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider w-1/5">
                      Patient
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider w-1/5">
                      Doctor
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider w-1/5">
                      Date & Time
                    </th>
                    <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider w-1/5">
                      Status
                    </th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-white uppercase tracking-wider w-1/5">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-teal-50 transition-colors bg-white">
                      <td className="pl-8 pr-6 py-5 bg-white w-1/5">
                        <div className="text-base font-bold text-gray-900">
                          {appointment.patientName}
                        </div>
                        <div className="text-sm text-gray-600">{appointment.email || appointment.mobile}</div>
                      </td>
                      <td className="px-6 py-5 bg-white w-1/5">
                        <div className="text-base font-bold text-gray-900">
                          {appointment.doctorName || 'N/A'}
                        </div>
                        <div className="text-sm text-teal-600 font-medium">
                          {appointment.speciality || ''}
                        </div>
                      </td>
                      <td className="px-6 py-5 bg-white w-1/5">
                        <div className="text-base font-medium text-gray-900">
                          {new Date(appointment.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">{appointment.time}</div>
                      </td>
                      <td className="px-6 py-5 bg-white w-1/5">
                        <span
                          className={`px-4 py-2 inline-flex text-sm font-bold rounded-full ${
                            appointment.status === 'Confirmed'
                              ? 'bg-green-100 text-green-700'
                              : appointment.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : appointment.status === 'Completed'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 bg-white w-1/5 text-center">
                        <button
                          onClick={() => handleDelete(appointment._id)}
                          className="text-red-600 hover:text-white hover:bg-red-600 transition-all p-3 rounded-full inline-flex items-center justify-center"
                          title="Cancel Appointment"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Book Appointment Modal */}
      {showBookModal && (
        <BookAppointmentModal
          doctors={doctors}
          timeSlots={timeSlots}
          onClose={() => {
            setShowBookModal(false);
            setSelectedDoctor(null);
          }}
          onSuccess={() => {
            setShowBookModal(false);
            setSelectedDoctor(null);
            fetchAppointments();
          }}
          preSelectedDoctor={selectedDoctor}
        />
      )}
    </div>
  );
};

// Book Appointment Modal Component
const BookAppointmentModal = ({ doctors, timeSlots, onClose, onSuccess, preSelectedDoctor }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    mobile: '',
    doctorId: preSelectedDoctor?._id || preSelectedDoctor?.id || '',
    date: '',
    time: '',
  });
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);

  const selectedDoctor = doctors.find((doc) => (doc._id || doc.id) === formData.doctorId);

  useEffect(() => {
    if (formData.doctorId && formData.date) {
      fetchBookedSlots();
    }
  }, [formData.doctorId, formData.date]);

  const fetchBookedSlots = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/appointments`);
      const data = await response.json();
      
      if (data.success) {
        const appointments = data.data || [];
        const slots = appointments
          .filter(
            (apt) =>
              apt.doctorId === formData.doctorId &&
              new Date(apt.date).toDateString() ===
                new Date(formData.date).toDateString() &&
              apt.status !== 'cancelled'
          )
          .map((apt) => apt.time);
        setBookedSlots(slots);
      }
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.patientName || !formData.email || !formData.mobile ||
        !formData.doctorId || !formData.date || !formData.time) {
      toast.error('Please fill all fields');
      return;
    }

    if (bookedSlots.includes(formData.time)) {
      toast.error('This time slot is already booked');
      return;
    }

    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const appointmentData = {
        doctorId: formData.doctorId,
        patientName: formData.patientName,
        mobile: formData.mobile,
        email: formData.email,
        date: formData.date,
        time: formData.time,
        paymentMethod: 'Cash',
      };

      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Appointment booked successfully!');
        onSuccess();
      } else {
        toast.error(data.message || 'Failed to book appointment');
      }
    } catch (error) {
      toast.error('Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b-2 border-teal-100 bg-gradient-to-r from-teal-50 to-white">
          <h2 className="text-3xl font-bold text-gray-900">Book Appointment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-teal-100 rounded-full transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Patient Name */}
          <div>
            <label className="flex items-center gap-2 text-base font-bold text-gray-700 mb-3">
              <User size={18} className="text-teal-600" />
              Patient Name *
            </label>
            <input
              type="text"
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
              placeholder="Enter patient name"
              required
            />
          </div>

          {/* Email and Phone */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center gap-2 text-base font-bold text-gray-700 mb-3">
                <Mail size={18} className="text-teal-600" />
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-base font-bold text-gray-700 mb-3">
                <Phone size={18} className="text-teal-600" />
                Phone *
              </label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
                placeholder="1234567890"
                maxLength="10"
                required
              />
            </div>
          </div>

          {/* Select Doctor */}
          <div>
            <label className="flex items-center gap-2 text-base font-bold text-gray-700 mb-3">
              <User size={18} className="text-teal-600" />
              Select Doctor *
            </label>
            <select
              value={formData.doctorId}
              onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base bg-white"
              required
            >
              <option value="">Choose a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id || doctor.id} value={doctor._id || doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="flex items-center gap-2 text-base font-bold text-gray-700 mb-3">
              <Calendar size={18} className="text-teal-600" />
              Appointment Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
              required
            />
          </div>

          {/* Time Slots */}
          {selectedDoctor && formData.date && (
            <div>
              <label className="flex items-center gap-2 text-base font-bold text-gray-700 mb-3">
                <Clock size={18} className="text-teal-600" />
                Available Time Slots *
              </label>
              <div className="grid grid-cols-4 gap-3">
                {timeSlots.map((slot) => {
                  const isBooked = bookedSlots.includes(slot);
                  const isSelected = formData.time === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => !isBooked && setFormData({ ...formData, time: slot })}
                      disabled={isBooked}
                      className={`px-4 py-3 rounded-xl border-2 font-bold transition-all text-base ${
                        isBooked
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          : isSelected
                          ? 'bg-teal-600 text-white border-teal-600 shadow-lg'
                          : 'border-gray-200 hover:border-teal-500 hover:bg-teal-50 text-gray-700'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-bold text-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-4 bg-teal-600 text-white rounded-full hover:bg-teal-700 hover:shadow-xl transition-all font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentsPage;
