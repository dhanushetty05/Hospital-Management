import { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, User, Mail, Phone, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const AppointmentPage = () => {
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/api/appointments`);
      const data = await response.json();
      
      if (data.success) {
        const items = data.data || [];
        setAppointments(Array.isArray(items) ? items : []);
      } else {
        setError(data.message || 'Failed to load appointments');
      }
    } catch (err) {
      console.error('Error loading appointments:', err);
      setError('Network error while loading appointments');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/appointments/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      
      if (data.success) {
        setAppointments(appointments.filter(apt => apt._id !== id));
      } else {
        alert(data.message || 'Failed to cancel appointment');
      }
    } catch (err) {
      console.error('Error canceling appointment:', err);
      alert('Failed to cancel appointment');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Confirmed: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
      Pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      Completed: { color: 'bg-blue-100 text-blue-700', icon: CheckCircle },
      Cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle },
    };

    const config = statusConfig[status] || statusConfig.Pending;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${config.color}`}>
        <Icon size={14} />
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-12" style={{ background: 'linear-gradient(to bottom, #e8f9f7 0%, #f5fffe 50%, #ffffff 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-red-900 mb-2">Error Loading Appointments</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={loadAppointments}
              className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all font-semibold"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12" style={{ background: 'linear-gradient(to bottom, #e8f9f7 0%, #f5fffe 50%, #ffffff 100%)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Your <span className="text-teal-600">Appointments</span>
          </h1>
          <p className="text-gray-600 text-lg">Manage your doctor appointments</p>
        </div>

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl border-2 border-teal-100 p-20 text-center">
            <Calendar size={80} className="mx-auto text-teal-300 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No appointments yet</h3>
            <p className="text-gray-600 text-lg">Book your first appointment to get started</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-3xl shadow-lg border-2 border-teal-100 p-8 hover:shadow-xl transition-all"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Patient Info */}
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <User size={16} />
                      <span className="text-sm font-semibold">Patient</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{appointment.patientName}</p>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <Mail size={14} />
                      <span className="text-sm">{appointment.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <Phone size={14} />
                      <span className="text-sm">{appointment.mobile}</span>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <User size={16} />
                      <span className="text-sm font-semibold">Doctor</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {appointment.doctorName || 'Not Assigned'}
                    </p>
                    <p className="text-sm text-teal-600 font-medium mt-1">
                      {appointment.speciality || appointment.specialization || ''}
                    </p>
                  </div>

                  {/* Date & Time */}
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Calendar size={16} />
                      <span className="text-sm font-semibold">Appointment</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {new Date(appointment.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <div className="flex items-center gap-2 text-gray-600 mt-1">
                      <Clock size={14} />
                      <span className="text-sm font-medium">{appointment.time}</span>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="text-sm font-semibold text-gray-500 mb-2">Status</div>
                      {getStatusBadge(appointment.status)}
                    </div>
                    <button
                      onClick={() => handleDelete(appointment._id)}
                      className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all font-semibold"
                    >
                      <Trash2 size={16} />
                      Cancel
                    </button>
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

export default AppointmentPage;
