import { useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    // Format the WhatsApp message
    const message = `*New Contact Request*%0A%0A*Name:* ${formData.fullName}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Department:* ${formData.department}%0A*Service:* ${formData.service}%0A*Message:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/918299431275?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-[0_4px_25px_rgb(0,0,0,0.06)] border border-gray-50 p-8"
          >
            <h2 className="text-3xl font-bold text-teal-800 mb-2">Contact Our Clinic</h2>
            <p className="text-gray-500 text-sm mb-8 italic">Fill the form — we'll open WhatsApp so you can connect with us instantly.</p>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <UserIcon className="w-4 h-4 mr-1 text-teal-600" /> Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-teal-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 mr-1 text-teal-600" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-teal-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 mr-1 text-teal-600" /> Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="1234567890"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-teal-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="w-4 h-4 mr-1 text-teal-600" /> Department
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-teal-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm bg-white"
                  >
                    <option value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <span className="w-4 h-4 mr-1 text-teal-600 flex items-center justify-center border border-teal-600 rounded-full text-[10px]">?</span> Service
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-teal-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm bg-white"
                >
                  <option value="">Select Service (or choose Department above)</option>
                  <option value="Full Body Checkup">Full Body Checkup</option>
                  <option value="Blood Test">Blood Test</option>
                  <option value="X-Ray">X-Ray</option>
                </select>
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <span className="w-4 h-4 mr-1 text-teal-600 flex items-center justify-center">✉</span> Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  placeholder="Describe your concern briefly..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-teal-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-colors font-medium text-sm shadow-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                <span>Send via WhatsApp</span>
              </button>
            </form>
          </motion.div>

          {/* Right Column - Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col space-y-6"
          >
            <div className="bg-white rounded-3xl shadow-[0_4px_25px_rgb(0,0,0,0.06)] border border-gray-50 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Visit Our Clinic</h2>
              <div className="space-y-3">
                <p className="flex items-start text-sm text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                  Gomtinagar, Lucknow, Uttar Pradesh
                </p>
                <p className="flex items-center text-sm text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-gray-400" />
                  8299431275
                </p>
                <p className="flex items-center text-sm text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-gray-400" />
                  info@yourclinic.com
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_4px_25px_rgb(0,0,0,0.06)] border border-teal-100 p-2 h-64 overflow-hidden relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1m2!1s0x399bfd0a1b50426b%3A0xc34a6ef9e2ff87!2sGomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1708455792984!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '1.25rem' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-90"
              ></iframe>
            </div>

            <div className="bg-teal-100/50 rounded-2xl p-4">
              <h3 className="font-semibold text-teal-800 mb-1 text-sm">Clinic Hours</h3>
              <p className="text-teal-700 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Helper icon
const UserIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default ContactPage;
