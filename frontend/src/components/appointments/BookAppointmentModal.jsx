import { useState, useEffect } from 'react';
import { X, Calendar, Clock, User } from 'lucide-react';
import { doctorsData } from '../../data/doctorsData';
import { appointmentAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import LoadingSpinner from '../common/LoadingSpinner';

const BookAppointmentModal = ({ onClose, onSuccess, preSelectedDoctor }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    doctorId: preSelectedDoctor?.id || '',
    appointmentDate: '',
    appointmentTime: '',
  });
  const [errors, setErrors] = useState({});

  const selectedDoctor = doctorsData.find((doc) => doc.id === formData.doctorId);

  useEffect(() => {
    if (formData.doctorId && formData.appointmentDate) {
      fetchBookedSlots();
    }
  }, [formData.doctorId, formData.appointmentDate]);

  const fetchBookedSlots = async () => {
    try {
      const response = await appointmentAPI.getAll();
      if (response.success) {
        const appointments = response.data || [];
        const slots = appointments
          .filter(
            (apt) =>
              apt.doctorId === formData.doctorId &&
              new Date(apt.appointmentDate).toDateString() ===
                new Date(formData.appointmentDate).toDateString() &&
              apt.status !== 'cancelled'
          )
          .map((apt) => apt.appointmentTime);
        setBookedSlots(slots);
      }
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }

    if (!formData.patientEmail.trim()) {
      newErrors.patientEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.patientEmail)) {
      newErrors.patientEmail = 'Email is invalid';
    }

    if (!formData.patientPhone.trim()) {
      newErrors.patientPhone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.patientPhone)) {
      newErrors.patientPhone = 'Phone number must be 10 digits';
    }

    if (!formData.doctorId) {
      newErrors.doctorId = 'Please select a doctor';
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.appointmentDate = 'Date cannot be in the past';
      }
    }

    if (!formData.appointmentTime) {
      newErrors.appointmentTime = 'Please select a time slot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Check if slot is already booked
    if (bookedSlots.includes(formData.appointmentTime)) {
      toast.error('This time slot is already booked. Please select another.');
      return;
    }

    setLoading(true);
    try {
      const appointmentData = {
        ...formData,
        doctorName: selectedDoctor.name,
        doctorSpecialization: selectedDoctor.specialization,
        status: 'pending',
      };

      const response = await appointmentAPI.create(appointmentData);

      if (response.success) {
        toast.success('Appointment booked successfully!');
        onSuccess();
      } else {
        toast.error(response.message || 'Failed to book appointment');
      }
    } catch (error) {
      if (error.response?.data?.message?.includes('already booked')) {
        toast.error('This time slot is already booked. Please select another.');
        fetchBookedSlots(); // Refresh booked slots
      } else {
        toast.error('Failed to book appointment. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const availableTimeSlots = selectedDoctor?.availability.timeSlots || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Patient Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patient Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.patientName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter patient name"
              />
            </div>
            {errors.patientName && (
              <p className="mt-1 text-sm text-red-600">{errors.patientName}</p>
            )}
          </div>

          {/* Email and Phone */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="patientEmail"
                value={formData.patientEmail}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.patientEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="email@example.com"
              />
              {errors.patientEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.patientEmail}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                name="patientPhone"
                value={formData.patientPhone}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.patientPhone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="1234567890"
                maxLength="10"
              />
              {errors.patientPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.patientPhone}</p>
              )}
            </div>
          </div>

          {/* Select Doctor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Doctor *
            </label>
            <select
              name="doctorId"
              value={formData.doctorId}
              onChange={handleChange}
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.doctorId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Choose a doctor</option>
              {doctorsData.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
            {errors.doctorId && (
              <p className="mt-1 text-sm text-red-600">{errors.doctorId}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.appointmentDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.appointmentDate && (
              <p className="mt-1 text-sm text-red-600">{errors.appointmentDate}</p>
            )}
          </div>

          {/* Time Slots */}
          {selectedDoctor && formData.appointmentDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Time Slots *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimeSlots.map((slot) => {
                  const isBooked = bookedSlots.includes(slot);
                  const isSelected = formData.appointmentTime === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => !isBooked && setFormData((prev) => ({ ...prev, appointmentTime: slot }))}
                      disabled={isBooked}
                      className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                        isBooked
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              {errors.appointmentTime && (
                <p className="mt-1 text-sm text-red-600">{errors.appointmentTime}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? <LoadingSpinner size="sm" /> : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointmentModal;
